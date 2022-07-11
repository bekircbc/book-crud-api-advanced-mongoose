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
	language: {
		type: String,
		trim: true,
	},
	imageUrl: String,
	buyUrl: String,
	whenPurchased: Date,
	relatedBook: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'book',
	},
	topics: [String],
	author: authorSchema,
	whenCreated: {
		type: Date,
		default: () => Date.now(),
	},
});

bookSchema.methods.enhanceTitle = function () {
	if (this.numberOfPages >= 200) {
		this.title = this.title + ' (long book)';
	}
};

bookSchema.statics.findShortEnglishBooks = function () {
	return this.where('language')
		.equals('english')
		.where('numberOfPages')
		.lte(200);
};

export const Book = mongoose.model('book', bookSchema);
