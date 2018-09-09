var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    type user {
        name: name!
        email: String!
        phone_number: String!
        home: home!
        user_type: String!
    }
    type home {
        owner: user!
        address: address!
        evacuated: Boolean!
        people_in_house: Int!
        pets_in_house: Int!
    }
    type evacuation{
        date: String
        evac_type: String
        homes_evacuated:[home]
    }

    type name {
        first: String!
        last: String!
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
    type Mutation {
        evac_toggle(owner:String!):House
        evac(owner:String!):House
    }
`);

const start = async () => {
    const Client = await MongoClient.connect("mongodb+srv://tforrey:mongopw@evac-db-cluster-mypdv.mongodb.net/test?retryWrites=true",{ useNewUrlParser: true })
    const Homes = Client.db("EvacTrack").collection("Homes")
    // Root resolver
    var evac_toggle = async function({owner}) {
        house = await Homes.findOne({owner:owner})
        await Homes.updateOne({owner:owner},{$set:{evacuated:!house.evacuated}})
        return await Homes.findOne({owner:owner})
    }
    var set_evac_true = async function({owner}) {
        await Homes.updateOne({owner:owner},{$set:{evacuated:true}})
        return await Homes.findOne({owner:owner})
    }
    var root = {
        users: () => {
            return (Homes.find({}).toArray())
        },
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
