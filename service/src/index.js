import { ApolloServer } from 'apollo-server';
import { mergeSchemas } from 'graphql-tools';
import schemas from './schema.js';
import resolvers from './resolvers.js';

const schema = mergeSchemas({
    schemas,
    resolvers
});

const server = new ApolloServer({ schema, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
