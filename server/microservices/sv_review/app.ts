const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const PORT = 4000;

const reviews = [
  {
    id: 1,
    user: 1,
    book: 1,
    comment: "Great!!!",
  },
  {
    id: 2,
    user: 1,
    book: 2,
    comment: "Noce book!!!",
  },
  {
    id: 3,
    user: 2,
    book: 2,
    comment: "nice nice book!!!",
  }
];

const typeDefs = gql`
  type Review @key(fields: "id") {
    id: ID!
    #book: Book
    #user: User
  }

  type Query {
    allReviews: [Review]
  }
`;

const resolvers = {
  Query: {
    allReviews: () => reviews,
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{typeDefs, resolvers}]),
});

server.listen({port: PORT}).then(({url}) => {
  console.log(`Review Service ready at ${url}`);
});
