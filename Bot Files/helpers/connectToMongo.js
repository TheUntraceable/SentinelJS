const { MongoClient } = require('mongodb');
module.exports = client => {
    client.connectToMongo = async () => {
        return new Promise(async (res,rej) => {
            const mongo = new MongoClient(client.config.mongo_url);

            await mongo.connect(async (error,client) => {
                if(error) {
                    rej(error);
                } else {
                    res("Successfully connected to MongoDB.")
                }
            })
            class CachingMongoClient {

                constructor(db) {
                    this.db = db
                    this.cache = new Collection()
                }
                
                inCache (query) {
                    return this.cache.has(query)
                }

                retrieve (query) {

                    if(this.inCache(query)) {

                        return this.cache.get(query)

                    } else {

                        return await this.db.findOne(query)
                        
                    }
                }

                async retrieveFromDatabase (query) {

                    return await this.db.findOne(query)

                }

                async findOne (query) {
                    
                    return this.retrieve(query)
                
                }

                async deleteOne (query) {
                    const data = this.retrieve(query)
                    
                    if(!data) {
                        return await this.db.deleteOne(query)
                    }
                    this.cache.delete(query)
                    
                }

                async updateOne (query, update, options) {
                    const data = await this.db.updateOne(query,update,options)

                    
                }
            }
            client.db = mongo.db("discord");
            
            client.db.guilds = client.db.collection('guilds');
            client.db.users = client.db.collection("users")	
            client.db.afk = client.db.collection("afk")
            client.db.tags = client.db.collection("tags")
            
            if(!client.db) {
                rej("Failed to connect to MongoDB")
            }
            res("Connected successfully to MongoDB")
        })
    }
}