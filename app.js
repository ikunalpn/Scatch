// app.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const pool = require('./config/db'); 
const expressSession = require("express-session");
const flash = require("connect-flash");

dotenv.config();


const indexRouter = require('./routes/index');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
)
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs")


// Routes
app.use("/", indexRouter)
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


// Test the database connection
async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}
testDbConnection();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
