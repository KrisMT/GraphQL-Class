const { ApolloServer, gql } = require('apollo-server');

const PORT = 4000;

const users = [
  {
    id: 1,
    username: 'Test1',
  },
  {
    id: 2,
    username: 'Test2',
  },
  {
    id: 3,
    username: 'Test3',
  }
];
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Query {
    me: User
    allUser: [User]
  }
`;

const resolvers = {
  Query: {
    allUser: () => users,
  },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen({port: PORT}).then(({url}) => {
  console.log(`User Service ready at ${url}`);
});
