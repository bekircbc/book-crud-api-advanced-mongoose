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
