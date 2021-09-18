const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const express = require("express");
const expressJWT = require("express-jwt");
//const cors = require('cors');

const start = async () => {

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set('users', JSON.stringify(context.user));
  }
}

const port = 4000;
const app = express();
app.use(
  // { "Authorization": "Bearer <jwt token>" }
  expressJWT({
    secret: "supersecret", //secret
    algorithms: ["HS256"],
    credentialsRequired: false
  })
);
/*
var corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));
*/
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
    const user = req.user || null;
    return { user };
  },
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});

}


start();
