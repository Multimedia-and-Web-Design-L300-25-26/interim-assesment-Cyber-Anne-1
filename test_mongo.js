const mongoose = require('mongoose');

async function testMongo() {
  const uri = "mongodb://hayibordzifa9_db_user:oJYgNBnR0JudyoIv@ac-vtdxphr-shard-00-00.bmyqrmg.mongodb.net:27017,ac-vtdxphr-shard-00-01.bmyqrmg.mongodb.net:27017,ac-vtdxphr-shard-00-02.bmyqrmg.mongodb.net:27017/?ssl=true&replicaSet=atlas-r7qvit-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
  
  try {
    console.log("Connecting...");
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected!");
    
    const db = mongoose.connection.db;
    console.log("Pinging database...");
    const pingResult = await db.command({ ping: 1 });
    console.log("Ping result:", pingResult);
    
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    console.log("Creating document...");
    const doc = new TestModel({ name: 'test_doc' });
    await doc.save();
    console.log("Document saved:", doc._id);
    
    console.log("Finding document...");
    const found = await TestModel.findOne({ _id: doc._id });
    console.log("Document found:", found);
    
    console.log("Success!");
  } catch (err) {
    console.error("MongoDB Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

testMongo();
