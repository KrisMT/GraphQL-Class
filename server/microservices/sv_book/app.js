const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const PORT = 4000;

const books = [
  {
    id: 1,
    title: "The first GraphQL",
    owner: 1,
  },
  {
    id: 2,
    title: "The second world",
    owner: 1,
  },
  {
    id: 3,
    title: "The last of us",
    owner: 3,
  }
];

const typeDefs = gql`
  type Book @key(fields: "id") {
    id: ID!
    title: String
    owner: User
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }

  type Query {
    allBooks: [Book]
  }
`;

const resolvers = {
  Query: {
    allBooks(){
      return books;
    },
  },
  Book: {
    __resolveReference(book){
      console.log(book);
      return books.find(function( val ){ return book.id == val.id});
    },
    owner(book){
      return { __typename: "User", id: book.owner };
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({port: PORT}).then( function({url}){
  console.log(`Book Service ready at ${url}`);
});
