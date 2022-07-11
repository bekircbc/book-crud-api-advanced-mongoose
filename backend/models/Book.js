import mongoose from 'mongoose';

const pageLimit = 198;

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
		.lt(pageLimit);
};

bookSchema.statics.findShortBooksByLanguage = function (language) {
	return this.where('language')
		.equals(language)
		.where('numberOfPages')
		.lt(pageLimit);
};

bookSchema.query.byLanguage = function (language) {
	return this.where('language').equals(language);
};

bookSchema.query.isLongBook = function () {
	return this.where('numberOfPages').gte(pageLimit);
};

bookSchema.virtual('bookInfoText').get(function () {
	return `${this.title}, ${this.numberOfPages} pages: ${this.description}`;
});

bookSchema.set('toJSON', { virtuals: true });

bookSchema.pre('save', function (next) {
	this.whenUpdated = Date.now();
	next();
});

bookSchema.post('save', function (doc, next) {
	const dt = new Date();
	const timestamp = dt.toISOString();
	console.log(`${timestamp}: updated book "${doc.title}`);
	next();
});

export const Book = mongoose.model('book', bookSchema);
