import User from '../models/user.model.js';
import { getTokenFromHeader, verifyToken } from '../utils/jwt.js';

export async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers?.authorization;
        const token = getTokenFromHeader(authHeader);

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = await verifyToken(token);
        const user = await User.findById(decoded._id).select('-password');

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req?.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
}
