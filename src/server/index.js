import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '../graphql/typedefs.js';
import resolvers from './resolvers/resolvers.js';
import connectToDatabase from '../db/index.js';

const startServer = async () => {
  try {
    await connectToDatabase();

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const server = new ApolloServer({
      schema
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
