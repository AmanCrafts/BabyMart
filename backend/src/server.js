import app from './app.js';
import { ENV } from './config/env.js';

const PORT = ENV.PORT || 3000;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`===================================`);
            console.log(`BabyMart API Server is running`);
            console.log(`Environment: ${ENV.NODE_ENV || `development`}`);
            console.log(`URL: http://localhost:${PORT}`);
            console.log(`API v1: http://localhost:${PORT}/api`);
            console.log(`===================================`);
        });
    } catch (error) {
        console.error(`Failed to start server:`, error);
    }
};

startServer();
