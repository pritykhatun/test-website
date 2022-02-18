const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
 const ObjectId = require('mongodb').ObjectId;
 require('dotenv').config();

const app = express();
const port = 5000;

// middleware 
app.use(cors());
app.use(express.json()); 

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lcv2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    const database = client.db("food-chemistry");
    const menuCollection = database.collection("menus");
    

       // GET API FOR SHOWING ALL menu
 app.get('/menus', async(req, res) => {
   const cursor = menuCollection.find({});
   const menus = await cursor.toArray();
   res.send(menus);
 })
// GET API FOR SHOWING INDIVIDUAL ROOM DETAILS 
app.get('/menus/:id', async(req,res)=>{
  const id = req.params.id;
  const query = {_id:ObjectId(id)};
  const hotel = await menuCollection.findOne(query);
  res.json(hotel);

})
   //   POST API TO ADD menu 
app.post('/menus', async(req, res) => {
  const newmenu = req.body; 
   const result = await menuCollection.insertOne(newmenu);
   console.log('added menu', result)
    res.send(result);
        
})
  } finally {
    
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running my server')
})

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})