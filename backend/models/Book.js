import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	title: String,
	description: String,
	numberOfPages: Number,
	language: String,
	imageUrl: String,
	buyUrl: String,
	whenPurchased: Date,
	relatedBook: mongoose.SchemaTypes.ObjectId,
	topics: [String],
	author: {
		firstName: String,
		lastName: String,
	},
});

export const Book = mongoose.model('book', bookSchema);
