const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');


class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    // Pass the user's id from the context to underlying services
    // as a header called `user-id`
    //console.log(`Context: ${JSON.stringify(context)}`);
    //request.http.headers.set('user-id', 'KrisMT');
    //console.log(`req: ${JSON.stringify(request)}`);
  }
}

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users',   url: 'http://sv_user:4000' },
    { name: 'books',   url: 'http://sv_book:4000' },
    { name: 'reviews', url: 'http://sv_review:4000' },
    // List other services here
  ],

  buildService({ name, url }) {
    return new AuthenticatedDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,


  context: ({ req }) => {
    // Get the user token from the headers
    const token = req.headers.authorization || '';
    // Try to retrieve a user with the token
    //const userId = getUserId(token);
    // Add the user ID to the context
    return { token };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

