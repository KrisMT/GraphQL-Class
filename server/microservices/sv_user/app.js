const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const jwt = require("jsonwebtoken");

const PORT = 4000;

const users = [
  {
    id: "1",
    username: 'Test1',
    email: "alice@email.com",
    password: "pAsSWoRd!",
    roles: ["admin"],
    permissions: ["read:any_account", "read:own_account"]
  },
  {
    id: "2",
    username: 'Test2',
    email: "bob@email.com",
    password: "pAsSWoRd!",
    roles: ["subscriber"],
    permissions: ["read:own_account"]
  },
  {
    id: "3",
    username: 'Test3',
    email: "char@email.com",
    password: "pAsSWoRd!",
    roles: ["subscriber"],
    permissions: ["read:own_account"]
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
    login(email: String, password: String): String
  }
`;

const resolvers = {
  Query: {
    allUser(){ 
      return users
    },
  },
  Mutation: {
    login(parent, { email, password }, context, info) {
      console.log(`Token: ${JSON.stringify(context)}`);

      const { id, permissions, roles } = users.find(
        user => user.email === email && user.password
      );
      return jwt.sign(
        { "http://localhost:4000/graphql": { roles, permissions } },
        "supersecret",
        { algorithm: "HS256", subject: id, expiresIn: "1d" }
      );
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
  context: ({ req }) => {
    const user = req.headers.users ? req.headers.users : null;
    if(user) console.log(`User Service: ${user}`);
    return { user };
  }
});

server.listen({port: PORT}).then( function({url}) {
  console.log(`User Service ready at ${url}`);
});
