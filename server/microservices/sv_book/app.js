var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var PORT = 4000;
var books = [
    {
        id: 1,
        title: "The first GraphQL"
    },
    {
        id: 2,
        title: "The second world"
    },
    {
        id: 3,
        title: "The last of us"
    }
];
var typeDefs = gql(__makeTemplateObject(["\n  type Book {\n    id: ID!\n    title: String\n  }\n\n  type Query {\n    allBooks: [Book]\n  }\n"], ["\n  type Book {\n    id: ID!\n    title: String\n  }\n\n  type Query {\n    allBooks: [Book]\n  }\n"]));
var resolvers = {
    Query: {
        allBooks: function () { return books; }
    }
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen({ port: PORT }).then(function (_a) {
    var url = _a.url;
    console.log("User Service ready at " + url);
});
