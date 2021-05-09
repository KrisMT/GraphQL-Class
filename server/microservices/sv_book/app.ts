const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const PORT = 4000;

const books = [
  {
    id: 1,
    title: "The first GraphQL",
  },
  {
    id: 2,
    title: "The second world",
  },
  {
    id: 3,
    title: "The last of us",
  }
];

const typeDefs = gql`
  type Book @key(fields: "id") {
    id: ID!
    title: String
  }

  type Query {
    allBooks: [Book]
  }
`;

const resolvers = {
  Query: {
    allBooks: () => books,
  },
  Book: {
    __resolverReference: (book) => {
      return books[book.id];
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({port: PORT}).then(({url}) => {
  console.log(`Book Service ready at ${url}`);
});
