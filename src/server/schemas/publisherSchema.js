import { Schema } from 'mongoose';

const publisherSchema = new Schema({
    company: String,
    booksByPublisher: [{
      type: Schema.Types.ObjectId,
      ref: 'Book',
    }],
  });

  export default publisherSchema;