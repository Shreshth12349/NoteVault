const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');


dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


// Middleware
app.use(morgan('dev'));
app.use(cors(
    {
        origin: ["https://note-vault-frontend.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credential: true
    }
));
app.use(express.json());


// Routes
app.use('/notes', notesRoutes)
app.use('/users', userRoutes)


//Database connection

const username = process.env.MDBUSERNAME
const password = encodeURIComponent(process.env.PASSWORD)
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.rdkhsn5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=>{
        console.log("Database connected")})


app.listen(port, async () => {
    console.log(`Server listening on port ${port}...`);
});
