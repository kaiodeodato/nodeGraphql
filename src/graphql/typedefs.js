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
    books(limit: Int, order: String): [Book]
    authors(limit: Int): [Author]
    publishers(filter: String): [Publisher]
    photos(limit: Int): [Photos]
  }

  type Photos {
    imageUrl: String
  }

`;

export default typeDefs;