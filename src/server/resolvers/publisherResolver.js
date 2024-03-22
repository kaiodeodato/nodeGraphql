import Publisher from '../models/publisherModel.js';
import Book from '../models/bookModel.js';

const publisherResolver = {
  Query: {
    publishers: async (_, { filter }) => {
      try {
        let publishers;
        if (filter){
          publishers = await Publisher.find({ company: { $regex: filter, $options: 'i' } });
        } else {
          publishers = await Publisher.find();
        }
        return publishers;
      } catch {
        throw new Error(`Failed to fetch publishers: ${error.message}`);
      }
    }
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