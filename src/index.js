const {GraphQLServer} = require('graphql-yoga');

let postId = 1;
const posts = [];


const resolvers = {
  Query: {
    description: () => 'Blog API',
    posts: () => posts,
    post: (parent, args) => posts.find(p => p.id === args.id),
  },
  Mutation: {
    createDraft: (parent, args) => {
      const post = {
        id: `post_${postId}`,
        title: args.title,
        content: args.content,
        published: false,
      };
      postId += 1;

      posts.push(post);
      return post;
    },
    deletePost: (parent, args) => {
      const idx = posts.findIndex(p => p.id === args.id);
      if (idx > -1) {
        posts.splice(idx, 1);
      }
      return null;
    },
    publish: (parent, args) => {
      const idx = posts.findIndex(p => p.id === args.id);
      posts[idx].published = true;
      return posts[idx];
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log('Blog server running on http://localhost:4000'));
