const express = require('express');
const path = require('path')
const cors = require('cors')
const finalPath = path.join(__dirname,"views/new.html")
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: '*'
}));
// Replace the following with your Atlas connection string
const uri = "mongodb+srv://civil20:20@cluster0.syij2.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/collections/:collectionName', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('civil20');
    const collection = database.collection(req.params.collectionName);
    const documents = await collection.find({}).toArray();
    const collections = await database.listCollections().toArray();
    res.json(documents);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error listing collections');
  } finally {
    await client.close();
  }
});

app.get('/', (req, res) => {
    // res.send('Hello, world!');
    res.sendFile(finalPath);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});