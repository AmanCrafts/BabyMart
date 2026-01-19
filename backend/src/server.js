import app from './app.js';
import connectDB from './config/database.js';
import { ENV } from './config/env.js';

const PORT = ENV.PORT || 3000;

const startServer = async () => {
    try {
        // Connect to Database
        await connectDB();
        // Create Express Server
        const server = app.listen(PORT, () => {
            console.log(`===================================`);
            console.log(`BabyMart API Server is running`);
            console.log(`Environment: ${ENV.NODE_ENV || `development`}`);
            console.log(`URL: http://localhost:${PORT}`);
            console.log(`API v1: http://localhost:${PORT}/api`);
            console.log(`===================================`);
        });

        // Handle graceful shutdown
        const gracefulShutdown = async signal => {
            console.log(`Received ${signal}. Shutting down gracefully...`);

            server.close(() => {
                console.log(`Server shutdown complete.`);
                process.exit(0);
            });
        };

        // Listen for termination signals
        process.on('SIGINT', () => gracefulShutdown('SIGINT')); // Ctrl+C || Cmd+C || Interrupt signal
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Termination signal || kill command
    } catch (error) {
        console.error(`Failed to start server:`, error);
    }
};

startServer();
