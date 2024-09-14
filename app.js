const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const connectDB = require('./src/database/db');
const routes = require('./src/routes/routes');
const app = express();
const Port = process.env.PORT || 3200;
connectDB();
// middlewares
app.use(cors());
app.use(express.json());


app.use('/api',routes);


app.listen(Port,() => {
    console.log(`Node is running on Port ${Port}`);
})