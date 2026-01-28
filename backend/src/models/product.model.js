import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        images: [
            {
                url: {
                    type: String,
                    // required: true,
                },
                altText: {
                    type: String,
                    default: '',
                },
            },
        ],
        discountPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        ratings: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5,
                },
                comment: {
                    type: String,
                    default: '',
                },
            },
        ],
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true }
);

// calculate average rating before saving
productSchema.pre('save', function (next) {
    if (this.ratings && this.ratings.length > 0) {
        const totalRating = this.ratings.reduce(
            (sum, rating) => sum + rating.rating,
            0
        );
        this.averageRating = totalRating / this.ratings.length;
    } else {
        this.averageRating = 0;
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
