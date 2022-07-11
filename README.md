# try - catch

-   for saving our app from crashing app and stopping server..

        		app.post('/book', async (req, res) => {
        		try {
        const book = new Book(req.body);
        await book.save();
        res.status(200).json({ message: 'book created', book });
        	} catch (err) {
        res.status(400).json({ error: err.message });
        	}
        });

# adding new schema type

        whenPurchased: Date,
        relatedBook: mongoose.SchemaTypes.ObjectId,
        topics: [String],
        author: {
        firstName: String,
        lastName: String
        }

# add new Schema

-   for nested Object.. new schema takes its own Objectid..

        const authorSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        url: String,
        email:String
        });

# for emails schema

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

# for title of book

                	title: {
    	type: String,
    	minLength: 5,
    	maxLength: 255,
    	required: true,
    	trim: true,
    },

# number of pages

        	numberOfPages: {
    	type: Number,
    	min: 10,
    	max: 2000,
    	required: true,
    },

# language, whencreated, relatedbook

        	language: {
    	type: String,
    	trim: true,
    },

    relatedBook: {
    	type: mongoose.SchemaTypes.ObjectId,
    	ref: 'book',
    },

    whenCreated: {
    	type: Date,
    	default: () => Date.now(),
    },
