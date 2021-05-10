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
    comment: String
    book: Book
    user: User
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }

  extend type Book @key(fields: "id") {
    id: ID! @external
  }

  type Query {
    allReviews: [Review]
  }
`;

const resolvers = {
  Query: {
    allReviews(){
      return reviews
    },
  },
  Review: {
    __resolveReference(review){
      return reviews.find(function(val){ return review.id == val.id });
    },
    book(review){
      console.log(review);
      return {
        __typename: "Book", id: review.book,
      };
    },
    user(review){
      return {
        __typename: "User", id: review.user,
      };
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{typeDefs, resolvers}]),
});

server.listen({port: PORT}).then(function({url}){
  console.log(`Review Service ready at ${url}`);
});
