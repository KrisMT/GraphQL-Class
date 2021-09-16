const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const jwt = require("jsonwebtoken");
const { Pool } = require('pg');
const DataLoader = require('dataloader');

const PORT = 4000;
/*
const users = [
  {
    id: "1",
    username: 'Test1',
    email: "alice@email.com",
    password: "pAsSWoRd!",
    roles: ["admin"],
    permissions: ["read:any_account", "read:own_account"]
  },
  {
    id: "2",
    username: 'Test2',
    email: "bob@email.com",
    password: "pAsSWoRd!",
    roles: ["subscriber"],
    permissions: ["read:own_account"]
  },
  {
    id: "3",
    username: 'Test3',
    email: "char@email.com",
    password: "pAsSWoRd!",
    roles: ["subscriber"],
    permissions: ["read:own_account"]
  }
];
*/
const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    username: String!
  }

  type Query {
    me: User
    allUser: [User]
  }

  type Mutation {
    login(email: String, password: String): String
  }
`;

const resolvers = {
  Query: {
    allUser: async (parent, args, { db }, info) => { 
      const res = await db.query('SELECT id, username FROM users.users;');
      return res.rows;
    },
  },
  Mutation: {
    login: async (parent, { email, password }, { db }, info) => {
      //console.log(`Token: ${JSON.stringify(context)}`);
      
      //const { id, permissions, roles } = users.find(
      //  user => user.email === email && user.password === password
      //);
      const values = [email, password];
  
      const query = {
        text: 'SELECT id, roles, permissions FROM users.users WHERE email = $1 AND password = $2',
        values: values,
      };

      const res = await db.query(query);
      const { id, permissions, roles } = res.rows[0];

      return jwt.sign(
        { "http://localhost:4000/graphql": { roles, permissions } },
        "supersecret",
        { algorithm: "HS256", subject: id, expiresIn: "1d" }
      );      
    },
  },
  User: {
    __resolveReference: async (user, {dataLoader: {usersByIdsLoader} }, info) => {
      //console.log(user);

      /*const query = {
        text: 'SELECT id, username FROM users.users WHERE id = $1',
        values: [user.id],
      };
 
      const res = await db.query(query);
      return res.rows[0];*/
      //console.log(usersByIdsLoader.load(user.id));
      //return users.find(function(val){ return user.id == val.id});

      return usersByIdsLoader.load(user.id);
    },
  },
};

//Data Loader
const dataLoaderFn = (pool) => ({
  getUsersByIds: async (userIds) => {
    const query = {
      text: 'SELECT * FROM users.users WHERE id = ANY($1)',
      values: [userIds],
    };

    const res = await pool.query(query);

    return res.rows;
  }
});

const start = async () => {
//Connect to db
  const db = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'example'
  });

  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    context: ({ req }) => {
      const user = req.headers.users ? req.headers.users : null;
      if(user) console.log(`User Service: ${user}`);

      //data loader
      const dataLoader = {
        usersByIdsLoader: new DataLoader(dataLoaderFn(db).getUsersByIds),
      }

      return { user, db, dataLoader };
    }
  });

  server.listen({port: PORT}).then( function({url}) {
    console.log(`User Service ready at ${url}`);
  });
}

start();
