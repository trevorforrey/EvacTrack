var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    type House {
        owner: String!
        address: address!
        evacuated: Boolean!
        people_in_house: Int!
        pets_in_house: Int!
    }
    type address {
        street: String!
        city: String!
        state: String!
        zip: String!
    }
    type Query {
        users: [House]
    }
`);
const start = async () => {
    const client = await MongoClient.connect("mongodb+srv://tforrey:mongopw@evac-db-cluster-mypdv.mongodb.net/test?retryWrites=true")
    const homes = client.db("EvacTrack").collection("Homes")
    // Root resolver
    var root = {
        users: () => {
              return (homes.find({}).toArray())
          }
    };
    // Create an express server and a GraphQL endpoint
    var app = express();
    app.use('/graphql', express_graphql({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));


    app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
}

start()
