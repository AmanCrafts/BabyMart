import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            default: '',
        },
        imageUrl: {
            type: String,
            required: false,
        },
        categoryType: {
            type: String,
            required: true,
            enum: ['Featured', 'Regular'],
        },
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
