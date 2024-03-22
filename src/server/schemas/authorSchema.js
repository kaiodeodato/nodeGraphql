import { Schema } from 'mongoose';

const authorSchema = new Schema({
    name: String,
    booksByAuthor: [{
      type: Schema.Types.ObjectId,
      ref: 'Book',
    }],
  });

  export default authorSchema;