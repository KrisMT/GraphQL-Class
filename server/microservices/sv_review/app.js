var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var buildFederatedSchema = require('@apollo/federation').buildFederatedSchema;
var PORT = 4000;
var reviews = [
    {
        id: 1,
        user: 1,
        book: 1,
        comment: "Great!!!"
    },
    {
        id: 2,
        user: 1,
        book: 2,
        comment: "Noce book!!!"
    },
    {
        id: 3,
        user: 2,
        book: 2,
        comment: "nice nice book!!!"
    }
];
var typeDefs = gql(__makeTemplateObject(["\n  type Review @key(fields: \"id\") {\n    id: ID!\n    #book: Book\n    #user: User\n  }\n\n  type Query {\n    allReviews: [Review]\n  }\n"], ["\n  type Review @key(fields: \"id\") {\n    id: ID!\n    #book: Book\n    #user: User\n  }\n\n  type Query {\n    allReviews: [Review]\n  }\n"]));
var resolvers = {
    Query: {
        allReviews: function () { return reviews; }
    }
};
var server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs: typeDefs, resolvers: resolvers }])
});
server.listen({ port: PORT }).then(function (_a) {
    var url = _a.url;
    console.log("Review Service ready at " + url);
});
