import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './graphql/typedefs.js';
import resolvers from './server/resolvers/resolvers.js';
import connectToDatabase from './db/index.js';

const startServer = async () => {
  try {
    await connectToDatabase();

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      introspection: true, // Habilitar a introspecção para permitir que o Apollo Sandbox leia seu schema
    });

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
