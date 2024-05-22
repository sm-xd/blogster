const path = require('path');
const express = require('express');
const mongoose = require("mongoose");


const userRoute = require("./routes/user");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

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
    res.send("node running here");
});

app.use(express.json())
app.use('/user', userRoute);