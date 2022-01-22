import express, { response } from "express";
import cors from "cors";

const users = [];

let tweets = [];

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const signUpUser = req.body;
  const validateURL =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  if (signUpUser.username === "" || !validateURL.test(signUpUser.avatar)) {
    res.status(400).send("Todos os campos são obrigatórios");
    return;
  }
  users.push(signUpUser);
  res.status(201).send(users);
});

app.post("/tweets", (req, res) => {
  const username = req.get("User");

  const tweet = req.body;

  const currentUser = users.find((user) => username === user.username);

  tweet.avatar = currentUser.avatar;
  tweet.username = username;

  tweets.splice(0, 0, tweet);

  res.status(201).send("OK!");
});

app.get("/tweets", (req, res) => {
  const page = parseInt(req.query.page);
  if (page < 1) {
    res.status(400).send("Informe uma página válida");
    return;
  }
  const minTweetIndex = (page - 1) * 10;
  let maxAmountOfTweets = page * 10;

  if (maxAmountOfTweets > tweets.length) {
    maxAmountOfTweets = tweets.length;
  }

  const sectionOfTweets = tweets.slice(minTweetIndex, maxAmountOfTweets);

  res.send(sectionOfTweets);
});

app.get("/tweets/:username", (req, res) => {
  const username = req.params.username;

  const mytweets = tweets.filter((tweet) => username === tweet.username);

  res.send(mytweets);
});

app.listen(5000);
