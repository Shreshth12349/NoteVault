const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRoute = require('./routes/notes');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/notes', notesRoute);

(async function () {
    try {
        const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
        const dbName = process.env.MONGODB_DBNAME;
        const uri = `mongodb+srv://shreshth:${password}@cluster0.rdkhsn5.mongodb.net/${dbName}?retryWrites=true&w=majority`;
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
})();



app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
