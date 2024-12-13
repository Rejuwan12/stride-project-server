const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000


//middleware
app.use(cors())
app.use(express.json())


const url = `mongodb+srv://gedget-shop:zkIMABBBisHzuy3O@cluster0.anrbjpf.mongodb.net/<databaseName>?retryWrites=true&w=majority`;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1, // Add this line
});




// MongoDB connection function
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
  }
  
  // Call the function to connect to the database
  connectToDatabase();


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })