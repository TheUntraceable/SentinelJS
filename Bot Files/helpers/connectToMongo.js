const { Collection } = require('discord.js');
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

            client.db = mongo.db("discord");
            
            class CachingCollection {

                constructor(databaseName) {
                    this.db = client.db.collection(databaseName);
                    this.cache = new Collection()
                }

                inCache(query) {
                    return this.cache.has(query);
                }

                getFromCache(query) {
                    return this.cache.get(query);
                }

                async getFromDatabase(query) {
                    return await this.db.findOne(query);
                }

                async findOne(query) {
                    if(this.inCache(query)) {
                        return this.getFromCache(query);
                    } else {
                        const data = await this.getFromDatabase(query);
                        this.cache.set(query, data)
                        return data
                    }
                }
            
                async find(query) {
                    return await this.db.find(query) // Can't use Cache for this one :(
                }

                async findMany(query) {
                    return await this.db.findMany(query)
                }

                async updateOne(query, update, options) {
                    options = options || {};
                    options.returnDocument = "after";
                    const data = await this.db.findOneAndUpdate(query, update, options);
                    this.cache.set(query, data);
                }

                async deleteOne(query) {
                    const data = await this.db.deleteOne(query)
                    if(data.deletedCount > 0) {
                        this.cache.delete(query)
                    }
                    return data
                }

                async deleteMany(query) {
                    const data = await this.db.deleteMany(query)
                    if(data.deletedCount > 0) {
                        this.cache.delete(query)
                    }
                    return data
                }

                async insertOne(document) {
                    await this.db.insertOne(document)
                    // You can't exactly add a document to the cache as I map it by query, and I can't guess what I'm doing.
                }
                
                async insertMany(documents) {
                    await this.db.insertMany(documents)
                }
            }

            client.db.guilds = new CachingCollection('guilds');
            client.db.users = new CachingCollection("users")	
            client.db.afk = client.db.collection("afk") // For some reason it can't use the .find function.
            client.db.tags = new CachingCollection("tags")
            
            if(!client.db) {
                rej("Failed to connect to MongoDB")
            }
            res("Connected successfully to MongoDB")
        })
    }
}