export const typeDefs = `
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
export default typeDefs;