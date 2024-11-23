
// Importing required dependencies


const express = require('express');                        // Express.js for building the web server
// const bodyParser=require('body-parser');                    // Middleware to parse incoming request bodies (JSON or URL-encoded)
const userRoutes=require('./routes/userRoutes');             // Import user-related routes
const electionRoutes=require('./routes/electionRoutes');       // Import election-related routes
const voteRoutes=require('./routes/voteRoutes');                // Import vote-related routes
const {connectDB}=require('./config/db')                      // Import database connection function


// Initialize Express application

const app = express();                // Create an instance of an Express application

// app.get('/', (req, res) => {
//     res.status(200).send("hello world");
// })


//Middleware
app.use(express.json());


// app.use(bodyParser.json());

const cors=require('cors');
app.use(cors())

// Connect to MongoDB
connectDB();

//app.use('/api',routesAPI);

// Defining API routes
app.use('/api/user',userRoutes);
app.use('/api/election',electionRoutes);
app.use('/api/vote',voteRoutes);



// Start the Express server and listen for requests on port 5005
app.listen(5005, () => {
    console.log('server started');       // Log a message when the server is running
})
