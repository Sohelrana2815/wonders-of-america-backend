const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
//Middleware
app.use(express.json());
app.use(cors());

// MongoDB related code

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5q2fm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Tourists spot collection
    const touristsSpotCollection = client
      .db("wonders_of_america_DB")
      .collection("touristSpots");

    const addedTouristsSpotCollection = client
      .db("wonders_of_america_DB")
      .collection("addedTouristSpots");

    //touristsSpotCollection
    app.get("/touristSpots", async (req, res) => {
      const result = await touristsSpotCollection.find().toArray();
      res.send(result);
    });

    app.get("/touristSpots/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await touristsSpotCollection.findOne(filter);
      res.send(result);
    });

    //addedTouristsSpotCollection api

    app.post("/addTouristSpot", async (req, res) => {
      const touristSpot = req.body;
      console.log(touristSpot);
      const result = await addedTouristsSpotCollection.insertOne(touristSpot);
      res.send(result);
    });

    app.get("/userAddedTouristSpots", async (req, res) => {
      const result = await addedTouristsSpotCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Running....");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
