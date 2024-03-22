import Book from '../models/bookModel.js';
import Author from '../models/authorModel.js';
import Publisher from '../models/publisherModel.js';

const bookResolver = {
  Query: {
    books: async () => {
      const books = await Book.find();
      return books;
    },
  },
  Book: {
    author: async (parent) => {
      const authors = await Author.find({ _id: { $in: parent.author } });
      return authors;
    },
    publisher: async (parent) => {
      if (parent.publisher) {
        const publisher = await Publisher.findById(parent.publisher);
        return publisher;
      }
      return null;
    },
  },
};

export default bookResolver;
