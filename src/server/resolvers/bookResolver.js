import Book from '../models/bookModel.js';
import Author from '../models/authorModel.js';
import Publisher from '../models/publisherModel.js';

const bookResolver = {
  Query: {
    books: async (_, { limit, order }) => {
      try {
       let books;
       if(order === 'ASC'){
          if(limit){
              books = await Book.find().sort({ title: 1 }).limit(limit);
          }else {
              books = await Book.find().sort({ title: 1 });
          }
       }else if (order === 'DESC'){
          if(limit){
              books = await Book.find().sort({ title: -1 }).limit(limit);
          }else {
              books = await Book.find().sort({ title: -1 });
          }
       } else {
          if(limit){
              books = Book.find().limit(limit);
          }else {
              books = Book.find();
          }
       }
       return books;
      } catch (error) {
        throw new Error(`Failed to fetch books: ${error.message}`);
      }
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
