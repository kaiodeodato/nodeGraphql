import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mongoose, Schema, model } from 'mongoose';
import 'dotenv/config'

const startServer = async () => {
  try {
    await mongoose.connect(process.env.SECRET_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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

    const authorSchema = new Schema({
      name: String,
      booksByAuthor: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
      }],
    });

    const publisherSchema = new Schema({
        company: String,
        booksByPublisher: [{
          type: Schema.Types.ObjectId,
          ref: 'Book',
        }],
      });
      
    const Book = model('Book', bookSchema, 'my_books_collection');
    const Author = model('Author', authorSchema, 'my_authors_collection');
    const Publisher = model('Publisher', publisherSchema, 'my_publishers_collection');

    const typeDefs = `
      type Book {
        title: String
        author: [Author]
        publisher: Publisher
      }

      type Author {
        name: String
        booksByAuthor: [Book]
      }

      type Publisher {
        company: String
        booksByPublisher: [Book]
      }

      type Query {
        books: [Book]
        authors: [Author]
        publishers: [Publisher]
      }
    `;

    const resolvers = {
        Query: {
          books: async () => {
            const books = await Book.find();
            return books;
          },
          authors: async () => {
            const authors = await Author.find();
            return authors;
          },
          publishers: async () => {
            const publishers = await Publisher.find();
            return publishers;
          },
        },
        Author: {
          booksByAuthor: async (parent) => {
            if (typeof parent._id === 'object') {
              const books = await Book.find({ author: parent._id });
              return books;
            } else {
              const books = await Book.find({ author: parent.name });
              return books;
            }
          },
        },
        Book: {
          author: async (parent) => {
            if (typeof parent.author === 'object') {
              const authors = await Author.find({ _id: parent.author });
              return authors;
            } else {
              const authors = await Author.find({ name: parent.author });
              return authors;
            }
          },
          publisher: async (parent) => {
            if (parent.publisher) {
              const publisher = await Publisher.findById(parent.publisher);
              return publisher;
            }
            return null;
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
        },
      };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);

  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};

startServer();
