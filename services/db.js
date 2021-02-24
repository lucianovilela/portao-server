
const MongoClient = require('mongodb').MongoClient;
var uri = `mongodb://admin:${process.env.DB_PASSWORD}@cluster0-shard-00-00.mrzgo.mongodb.net:27017,cluster0-shard-00-01.mrzgo.mongodb.net:27017,cluster0-shard-00-02.mrzgo.mongodb.net:27017/portaoeletronico?ssl=true&replicaSet=atlas-k6rsc8-shard-0&authSource=admin&retryWrites=true&w=majority`;
console.log(uri);
// const uri = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.mrzgo.mongodb.net/portaoeletronico?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;