var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var PORT = 4000;
var users = [
    {
        id: 1,
        username: 'Test1'
    },
    {
        id: 2,
        username: 'Test2'
    },
    {
        id: 3,
        username: 'Test3'
    }
];
var typeDefs = gql(__makeTemplateObject(["\n  type User {\n    id: ID!\n    username: String!\n  }\n\n  type Query {\n    me: User\n    allUser: [User]\n  }\n"], ["\n  type User {\n    id: ID!\n    username: String!\n  }\n\n  type Query {\n    me: User\n    allUser: [User]\n  }\n"]));
var resolvers = {
    Query: {
        allUser: function () { return users; }
    }
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen({ port: PORT }).then(function (_a) {
    var url = _a.url;
    console.log("User Service ready at " + url);
});