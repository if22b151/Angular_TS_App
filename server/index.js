const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors({ origin:'http://localhost:4200' }));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/', (req, res) => {
    res.send("Hello World from post!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});