var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    type User {
        name: Name!
        email: String!
        phone_number: String!
        home: Home!
        user_type: String!
    }
    type Home {
        owner: User!
        address: Address!
        evacuated: Boolean!
        people_in_house: Int!
        pets_in_house: Int!
    }
    type Evacuation{
        date: String!
        evac_type: String!
        homes_evacuated:[Home!]
    }

    type Name {
        first: String!
        last: String!
    }
    type Address {
        street: String!
        city: String!
        state: String!
        zip: String!
    }

    type Query {
        users: [User]
    }
    type Mutation {
        evac_toggle(owner:String!):Home
        evac(owner:String!):Home
    }
`);

const start = async () => {

    // Get connections to database and collections
    const Client = await MongoClient.connect("mongodb+srv://tforrey:mongopw@evac-db-cluster-mypdv.mongodb.net/test?retryWrites=true",{ useNewUrlParser: true })
    const Homes = Client.db("EvacTrack").collection("Homes")
    const Users = Client.db("EvacTrack").collection("Users")

    // Gets all users
    var users = async function({owner}) {
        return (Users.find({}).toArray())
    }

    // Toggles Evacuation status
    var evac_toggle = async function({owner}) {
        house = await Homes.findOne({owner:owner})
        await Homes.updateOne({owner:owner},{$set:{evacuated:!house.evacuated}})
        return await Homes.findOne({owner:owner})
    }

    // Sets Evacuation status to true
    var set_evac_true = async function({owner}) {
        await Homes.updateOne({owner:owner},{$set:{evacuated:true}})
        return await Homes.findOne({owner:owner})
    }

    // Root resolver
    var root = {
        users: users,
        evac_toggle: evac_toggle,
        evac: set_evac_true
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
