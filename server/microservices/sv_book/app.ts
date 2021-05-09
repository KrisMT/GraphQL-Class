const { ApolloServer, gql } = require('apollo-server');

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
  type Book {
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
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen({port: PORT}).then(({url}) => {
  console.log(`User Service ready at ${url}`);
});
