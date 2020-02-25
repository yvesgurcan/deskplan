import { ApolloServer } from 'apollo-server';
import typeDefs from './apollo/schema.js';
import resolvers from './apollo/resolvers.js';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
