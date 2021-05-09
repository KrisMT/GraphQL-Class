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
        title: "The first GraphQL",
        owner: 1
    },
    {
        id: 2,
        title: "The second world",
        owner: 1
    },
    {
        id: 3,
        title: "The last of us",
        owner: 3
    }
];
var typeDefs = gql(__makeTemplateObject(["\n  type Book @key(fields: \"id\") {\n    id: ID!\n    title: String\n    owner: User\n  }\n\n  extend type User @key(fields: \"id\") {\n    id: ID! @external\n  }\n\n  type Query {\n    allBooks: [Book]\n  }\n"], ["\n  type Book @key(fields: \"id\") {\n    id: ID!\n    title: String\n    owner: User\n  }\n\n  extend type User @key(fields: \"id\") {\n    id: ID! @external\n  }\n\n  type Query {\n    allBooks: [Book]\n  }\n"]));
var resolvers = {
    Query: {
        allBooks: function () { return books; }
    },
    Book: {
        __resolveReference: function (book) {
            console.log(book);
            return books.find(function (val) { return book.id == val.id; });
        },
        owner: function (book) {
            return { __typename: "User", id: book.owner };
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
