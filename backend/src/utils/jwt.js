import jwt from 'jsonwebtoken';

import { ENV } from '../config/env.js';

export async function generateToken(payload, options = {}) {
    return jwt.sign(payload, ENV.JWT_SECRET, options);
}

export async function verifyToken(token) {
    return jwt.verify(token, ENV.JWT_SECRET);
}

export async function decodeToken(token) {
    return jwt.decode(token);
}

export function getTokenFromHeader(header) {
    if (!header) return null;
    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
    return parts[1];
}

export function getUserIdFromToken(token) {
    const decoded = jwt.decode(token);
    return decoded ? decoded.id : null;
}

export function isTokenExpired(token) {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
}
