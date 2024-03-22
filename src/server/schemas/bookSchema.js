import { Schema } from 'mongoose';

const bookSchema = new Schema({
    title: String,
    publisher: {
      type: Schema.Types.ObjectId,
      ref: 'Publisher',
    },
    author: [{
      type: Schema.Types.ObjectId,
      ref: 'Author',
    }],
  });

  export default bookSchema;