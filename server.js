import express from "express";
const app = express();
import cors from "cors";
import bcrypt from "bcrypt-nodejs";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import handleClarifai from "./controllers/clarifai.js";
import handleProfileGet from "./controllers/profile.js";
import handleImage from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to the face recognition server");
});

app.post("/clarifai", handleClarifai);

app.post("/signin", handleSignIn(db, bcrypt));

app.post("/register", handleRegister(db, bcrypt));

app.get("/profile/:userId", handleProfileGet(db));

app.put("/image", handleImage(db));

app.listen(3000, () => {
  console.log("Server is running...");
});
