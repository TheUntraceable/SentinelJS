const { MongoClient } = require('mongodb');

module.exports = client => {
    client.connect_to_mongo = async () => {

        const mongo = new MongoClient(client.config.mongo_url);

        await mongo.connect();

        console.log('Connected successfully to MongoDB');
        
        client.db = mongo.db("discord");
        
        client.db.guilds = client.db.collection('guilds');
        client.db.users = client.db.collection("users")	
        client.db.afk = client.db.collection("afk")
    }
}