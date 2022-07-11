import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	url: String,
	email: {
		type: String,
		validate: [
			{
				validator: function (v) {
					return v.toLowerCase() === v;
				},
				message: 'Email must be lowercase.',
			},
			{
				validator: function (v) {
					return /^\S+@\S+\.\S+$/.test(v);
				},
				message: 'Please enter a valid email.',
			},
		],
	},
});

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		minLength: 5,
		maxLength: 255,
		required: true,
		trim: true,
	},
	description: String,
	numberOfPages: {
		type: Number,
		min: 10,
		max: 2000,
		required: true,
	},
	language: String,
	imageUrl: String,
	buyUrl: String,
	whenPurchased: Date,
	relatedBook: mongoose.SchemaTypes.ObjectId,
	topics: [String],
	author: authorSchema,
});

export const Book = mongoose.model('book', bookSchema);
