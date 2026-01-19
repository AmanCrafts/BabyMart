import mongoose from 'mongoose';

import { ENV } from './env.js';

// Function to Connect to MongoDB

const connectDB = async () => {
    try {
        // Validate MONGODB_URI
        if (!ENV.MONGODB_URI) {
            throw new Error(
                'MONGODB_URI is not set in environment variables. Please add it to your .env file.'
            );
        }

        // connect to MongoDB using Mongoose
        const db = await mongoose.connect(ENV.MONGODB_URI);
        console.log(`MongoDB connected: ${db.connection.host}`);

        mongoose.connection.on('error', err => {
            console.error(`MongoDB connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log(`MongoDB disconnected`);
        });

        mongoose.connection.on('connected', () => {
            console.log(`MongoDB reconnected`);
        });

        // Handle graceful shutdown
        const gracefulShutdown = async signal => {
            console.log(`Received ${signal}. Closing MongoDB connection...`);
            await mongoose.connection.close();
            console.log(`MongoDB connection closed.`);
            process.exit(0);
        };

        // Listen for termination signals
        process.on('SIGINT', () => gracefulShutdown('SIGINT')); // Ctrl+C || Cmd+C || Interrupt signal
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Termination signal || kill command
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
