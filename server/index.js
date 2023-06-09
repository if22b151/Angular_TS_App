const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin:'http://localhost:4200' }));
app.use(bodyParser.json());


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
            return res.status(200).json({ message: `Welcome ${users[i].email}!` });
        } else {
            return res.status(401).json({ message: "Invalid credentials!" });
        }
    }

    
});

const highscores = [];

app.post('/highscores', (req, res) => {
    const username = req.body.email;
    const highscore = req.body.highscore;

    const newHighscore = { username: username, highscore: highscore };
    highscores.push(newHighscore);

    console.log(highscores);
    if(highscores.includes(newHighscore)) {
        return res.status(200).json({ message: "Highscore successfully added!" });
    } else {
        return res.status(400).json({ message: "Couldn`t add highscore!" });
    }
})

app.get('/highscores', (req, res) => {
    if(highscores.length > 0) {
        return res.status(200).json( {highscores: highscores} );
    } else {
        return res.status(400).json({ message: "Couldn`t get highscores!" });
    }
})

app.delete('/sessions', (req, res) => {
    users.authToken.delete();
    if(users.authToken === null) {
        res.status(200).json({ message: "User successfully logged out!" });
    } else {
        res.status(400).json({ message: "Couldn`t log out user!" });
    }
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