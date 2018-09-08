var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
var root = {
    message: () => 'Hello World!'
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

var uri = "mongodb+srv://tforrey:mongopw@evac-db-cluster-mypdv.mongodb.net/test?retryWrites=true";
MongoClient.connect(uri, function(err, client) {
    const db = client.db('EvacTrack');
   const collection = client.db("EvacTrack").collection("Homes");
   console.log('connected to Mongo Db...\n');

    collection.find().toArray(function(err, docs) {
        console.log(docs);
    });

   // perform actions on the collection object
   client.close();
});




app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));