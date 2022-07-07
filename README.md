# adding new schema type

        whenPurchased: Date,
        relatedBook: mongoose.SchemaTypes.ObjectId,
        topics: [String],
        author: {
        firstName: String,
        lastName: String
        }

# add new Schema

      const authorSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      url: String,
      email:String
      });
