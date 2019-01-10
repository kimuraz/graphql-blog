const {GraphQLServer} = require('graphql-yoga');

const typeDefs = `
  type Query {
    description: String
  }
`;

const resolvers = {
  Query: {
    description: () => 'Blog API',
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Blog server running on http://localhost:4000'));
