import authorResolver from './authorResolver.js'; 
import bookResolver from './bookResolver.js';
import publisherResolver from './publisherResolver.js';
import photoResolver from './photoResolver.js';

const resolvers = {
    Query: {
      ...authorResolver.Query,
      ...bookResolver.Query,
      ...publisherResolver.Query,
      ...photoResolver.Query,
    },
    Author: {
      ...authorResolver.Author,
    },
    Book: {
      ...bookResolver.Book,
    },
    Publisher: {
      ...publisherResolver.Publisher,
    },
  };

  export default resolvers;