import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { ENV } from './config/env.js';

dotenv.config();

const app = express();

// Middleware to Parse JSON Requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || ENV.CORS.origin.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`Not allowed by CORS`));
            }
        },
        methods: ENV.CORS.methods,
        credentials: ENV.CORS.credentials,
    })
);

// Root Endpoint
app.get(`/`, (_req, res) => {
    res.status(200).json({
        message: `BabyMart API is running`,
        version: `1.0.0`,
        status: `Running`,
        environment: ENV.NODE_ENV || `development`,
    });
});

export default app;
