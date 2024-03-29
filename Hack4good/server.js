const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

//connection string if adding to application 
//npm install mongodb (to run on command line)

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://keithtanbh18:<1tbh234K>@cluster0.wdujara.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

//connecting to MongoDB 
mongoose.connect('mongodb://localhost:27017/your_database_name',)





//User Routes
const userRoutes = requir('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});

