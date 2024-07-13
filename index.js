const { MongoClient } = require("mongodb");

const client = new MongoClient('mongodb://localhost:27017', { monitorCommands: true });

client.on('commandStarted', started => console.log(started));
client.db('emprecruiter').collection('users').insertMany