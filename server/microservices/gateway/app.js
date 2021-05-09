var ApolloServer = require('apollo-server').ApolloServer;
var ApolloGateway = require('@apollo/gateway').ApolloGateway;
var PORT = 4000;
var gateway = new ApolloGateway({
    serviceList: [
        { name: 'users', url: 'http://sv_user:4000' },
        { name: 'books', url: 'http://sv_book:4000' },
        { name: 'reviews', url: 'http://sv_review:4000' },
    ]
});
var server = new ApolloServer({
    gateway: gateway,
    subscriptions: false
});
server.listen({ port: PORT }).then(function (_a) {
    var url = _a.url;
    console.log("GraphQL Federated ready at " + url);
});
