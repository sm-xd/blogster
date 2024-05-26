const path = require('path');
const express = require('express');
const mongoose = require("mongoose");
const cookieparser = require('cookie-parser');


const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

mongoose.connect('mongodb://localhost:27017/blog-api')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.render("home", {
        user: req.user,
    });
});

app.use(express.json())
app.use('/user', userRoute);