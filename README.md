# adding new schema type

        whenPurchased: Date,
        relatedBook: mongoose.SchemaTypes.ObjectId,
        topics: [String],
        author: {
       firstName: String,
        lastName: String
        }
