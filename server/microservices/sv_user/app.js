const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

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
  type User @key(fields: "id") {
    id: ID!
    username: String!
  }

  type Query {
    me: User
    allUser: [User]
  }

  type Mutation {
    login(username: String, password: String): String
  }
`;

const resolvers = {
  Query: {
    allUser(){ 
      return users
    },
  },
  Mutation: {
    login(parent, args, context, info) {
      console.log(`Token: ${JSON.stringify(context)}`);
      return `Username: ${args.username}, Password: ${args.password}`;
    },
  },
  User: {
    __resolveReference(user) {
      console.log(user);
      return users.find(function(val){ return user.id == val.id});
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({port: PORT}).then( function({url}) {
  console.log(`User Service ready at ${url}`);
});
