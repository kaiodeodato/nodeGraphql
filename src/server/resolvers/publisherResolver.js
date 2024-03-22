import Publisher from '../models/publisherModel.js';
import Book from '../models/bookModel.js';

const publisherResolver = {
  Query: {
    publishers: async () => {
      const publishers = await Publisher.find();
      return publishers;
    },
  },
  Publisher: {
    booksByPublisher: async (parent) => {
      if (typeof parent._id === 'object') {
        const books = await Book.find({ publisher: parent._id });
        return books;
      } else {
        const books = await Book.find({ publisher : parent.company });
        return books;
      }
    },
  }
}

export default publisherResolver;