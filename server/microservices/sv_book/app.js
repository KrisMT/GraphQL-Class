var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var buildFederatedSchema = require('@apollo/federation').buildFederatedSchema;
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
var typeDefs = gql(__makeTemplateObject(["\n  type Book @key(fields: \"id\") {\n    id: ID!\n    title: String\n  }\n\n  type Query {\n    allBooks: [Book]\n  }\n"], ["\n  type Book @key(fields: \"id\") {\n    id: ID!\n    title: String\n  }\n\n  type Query {\n    allBooks: [Book]\n  }\n"]));
var resolvers = {
    Query: {
        allBooks: function () { return books; }
    },
    Book: {
        __resolverReference: function (book) {
            return books[book.id];
        }
    }
};
var server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs: typeDefs, resolvers: resolvers }])
});
server.listen({ port: PORT }).then(function (_a) {
    var url = _a.url;
    console.log("Book Service ready at " + url);
});
