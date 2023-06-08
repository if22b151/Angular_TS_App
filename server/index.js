const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin:'http://localhost:4200' }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send("Hello World");
});

const users = [];

app.post('/users', (req, res) => {
    for(let i = 0; i < users.length; i++) {
        if(users[i].email === req.body.email) {
            return res.status(400).json({ message: "User already exists!" });
        }
    }

    const email = req.body.email;
    const password = req.body.password;

    const newUser = { email: email, password: password, authToken: generateAuthToken() };
    users.push(newUser);

    console.log(users);

    res.status(200).json({ message: "User successfully created!", authToken: newUser.authToken });
});

app.post('/login', (req, res) => {
    for(let i = 0; i < users.length; i++) {
        if(users[i].email === req.body.email && users[i].password === req.body.password && users[i].authToken === req.body.authToken) {
            return res.status(200).json({ message: "User successfully logged in!" });
        } else {
            return res.status(401).json({ message: "Invalid credentials!" });
        }
    }
    
});

const highscores = [];

app.post('/highscores', (req, res) => {
    
})

function generateAuthToken() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const tokenLength = 16;
  let authToken = "";

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    authToken += characters.charAt(randomIndex);
  }

  return authToken;
}

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});