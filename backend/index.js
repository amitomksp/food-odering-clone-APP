const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000

// Allow requests from all origins (*)
app.use(cors());

// const foodrouter = require('./Routes/CreateUser')
// const DisplayData = require('./Routes/DisplayData')

//DataBase Connection
 const appfood = require('./models/db');
const Food = require('./models/schema');


//Router
app.use(express.json());

app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData'))
app.use('/api',require('./Routes/OrderData'))
app.get('/', async(req, res) => {
  try {
    // Assuming 'Food' is the model for the 'foods' collection
    const foods = await Food.find({}).exec();
    console.log(); // This will log the retrieved data to the console

    res.send('Hello World!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})