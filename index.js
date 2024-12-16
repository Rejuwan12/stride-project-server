const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000


//middleware
app.use(cors())
app.use(express.json())


const url = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.anrbjpf.mongodb.net/<databaseName>?retryWrites=true&w=majority`;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1, // Add this line
});
 
const userCollection = client.db('gadgetShop').collection('users')
const productCollection = client.db('gadgetShop').collection('products')




// MongoDB connection function
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');


// get user

app.get('/user/:email', async (req,res) => {
  const query = {email: req.params.email};
  const user = await userCollection.findOne(query);
  return res.send(user);
});

// insert user in mongodb
app.post('/users', async (req,res) => {
  const user = req.body;
  const query = {email: user.email};
  const existingUser = await userCollection.findOne(query);
  if(existingUser){
    return res.send({message: "User Already Exist"})
  };
  const result = await userCollection.insertOne(user);
  res.send(result);
});


    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
  }
  
  // Call the function to connect to the database
  connectToDatabase();


app.get('/', (req, res) => {
    res.send('Server Is Running.....')
  });

  //JWT
  app.post('/authentication', async(req,res)=>{
    const userEmail = req.body;
    const token = jwt.sign(userEmail, process.env.ACCESS_KEY_TOKEN, {expiresIn: "10d"});
    res.send({token})
  })

  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })