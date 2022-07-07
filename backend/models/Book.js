import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	url: String,
	email: String,
});

const bookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: String,
	numberOfPages: Number,
	language: String,
	imageUrl: String,
	buyUrl: String,
	whenPurchased: Date,
	relatedBook: mongoose.SchemaTypes.ObjectId,
	topics: [String],
	author: authorSchema,
});

export const Book = mongoose.model('book', bookSchema);
