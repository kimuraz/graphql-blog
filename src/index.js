const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');

const resolvers = {
  Query: {
    posts: (parent, args, ctx, info) => {
      return ctx.db.query.posts({}, info);
    },
    post: (parent, args, ctx, info) => {
      return ctx.db.query.post({where: {id: args.id}}, info);
    },
  },
  Mutation: {
    createDraft: (parent, args, ctx, info) => {
      const {title, content} = args;
      return ctx.db.mutation.createPost(
        {
          data: {
            title,
            content,
          },
        },
        info,
      );
    },
    deletePost: (parent, {id}, ctx, info) => {
      return ctx.db.mutation.deletePost({where: {id}}, info);
    },
    publish: (parent, {id}, ctx, info) => {
      return ctx.db.mutation.updatePost(
        {
          where: {id},
          data: {published: true},
        },
        info,
      );
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
      debug: true,
    }),
  }),
});

server.start(() => console.log('Blog server running on http://localhost:4000'));
