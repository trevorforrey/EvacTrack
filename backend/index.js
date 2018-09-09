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
        home: Home
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
        homes: [Home]
        evacuations: [Evacuation]
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
    const Evacuations = Client.db("EvacTrack").collection("Evacuations")

    // Gets all users
    var get_all_users = async function() {
        return (await Users.find({}).toArray()).map(add_house_to_user)
    }

    // Get all homes
    var get_all_homes = async function() {
        return (await Homes.find({}).toArray()).map(add_user_to_house)
    }

    var add_user_to_house = function(house) {
        user = Users.findOne({_id:house.owner_id})
        house.owner = user
        return house
    }

    var add_house_to_user = function(user) {
        house = Homes.findOne({_id:user.home_id})
        user.home = house
        return user
    }

    // Get all evacuations
    var get_all_evacuations = async function() {
        return (Evacuations.find({}).toArray())
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
        users: get_all_users,
        homes: get_all_homes,
        evacuations: get_all_evacuations,
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
