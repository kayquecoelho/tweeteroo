import express, { response } from "express";
import cors from "cors";

const users = [];

const tweets = [];

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const signUpUser = req.body;
  const validateURL =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  if (signUpUser.username === "" || !validateURL.test(signUpUser.avatar)) {
    res.status(400).send("Todos os campos são obrigatórios");
  } else {
    users.push(signUpUser);
    res.status(201).send(users);
  }
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;

  const currentUser = users.find((user) => tweet.username === user.username);

  tweet.avatar = currentUser.avatar;

  if (tweets.length === 10) {
    tweets.shift();
  }
  tweets.push(tweet);

  res.send("OK!");
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.listen(5000);
