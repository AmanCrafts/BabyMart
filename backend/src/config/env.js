import dotenv from 'dotenv';

dotenv.config();

// Export the Environment Variables for Use in Other Parts of the Application
export const ENV = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ADMIN_URL: process.env.ADMIN_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CORS: {
        origin: [
            process.env.ADMIN_URL,
            process.env.FRONTEND_URL,
            process.env.DEVELOPMENT_ADMIN_URL,
            process.env.DEVELOPMENT_FRONTEND_URL,
            'http://localhost:3000',
        ],
        methods: [`GET`, `POST`, `PUT`, `DELETE`],
        credentials: true,
    },
};
