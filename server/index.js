const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');
const shareRoutes = require('./routes/shares')

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan('dev'));

app.use(cors({
    origin: '*',
}));


app.use(express.json());

app.get('/status', (req, res) => {
    return res.status(200).send('Note Vault API');
});

// Routes
app.use('/notes', notesRoutes);
app.use('/users', userRoutes);
app.use('/share', shareRoutes)

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


