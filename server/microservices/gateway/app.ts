const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const PORT = 4000;

const gateway = new ApolloGateway({
  serviceList:[
    { name: 'users',   url: 'http://sv_user:4000' },
    { name: 'books',   url: 'http://sv_book:4000' },
    { name: 'reviews', url: 'http://sv_review:4000' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({port: PORT}).then(({ url }) => {
  console.log(`GraphQL Federated ready at ${url}`);
});
