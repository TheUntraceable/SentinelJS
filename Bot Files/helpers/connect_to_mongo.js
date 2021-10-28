const { MongoClient } = require('mongodb');

module.exports = client => {
    client.connect_to_mongo = async () => {

        const mongo = new MongoClient(client.config.mongo_url);

        await mongo.connect();

        console.log('Connected successfully to server');
        
        client.db = mongo.db("discord");
        
        client.db.guilds = db.collection('guilds');
        client.db.users = db.collection("users")	
    }
}