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

app.use(cors({
    origin: 'note-vault-frontend-mgog2xy4v-shreshth12349s-projects.vercel.app', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Note Vault API');
});

// Routes
app.use('/notes', notesRoutes);
app.use('/users', userRoutes);

// Database connection
const username = process.env.MDBUSERNAME;
const password = encodeURIComponent(process.env.PASSWORD);

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.rdkhsn5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log("Database connected");
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});


module.exports = app