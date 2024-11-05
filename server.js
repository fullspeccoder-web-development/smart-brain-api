const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const clarifai = require("./controllers/clarifai");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "jacobwilson",
    password: "",
    database: "smart-brain",
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to the face recognition server");
});

app.post("/clarifai", clarifai.handleClarifai);

app.post("/signin", signin.handleSignIn(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/profile/:userId", profile.handleProfileGet(db));

app.put("/image", image.handleImage(db));

app.listen(3000, () => {
  console.log("Server is running...");
});
