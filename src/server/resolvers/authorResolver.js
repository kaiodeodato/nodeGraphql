import Author from '../models/authorModel.js';
import Book from '../models/bookModel.js';

const authorResolver = {
  Query: {
    authors: async () => {
      const authors = await Author.find();
      return authors;
    },
  },
  Author: {
    booksByAuthor: async (parent) => {
      const books = await Book.find({ author: parent._id });
      return books;
    },
  },
};

export default authorResolver;
