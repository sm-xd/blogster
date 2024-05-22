const path = require('path');
const express = require('express');

const userRoute = require("./routes/user");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("node running here");
});

app.use(express.json())
app.use('/user', userRoute);