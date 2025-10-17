require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const z = require("zod");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
app.use(express.json());
const secretKey = process.env.JWT_SECRET;

//mongoose
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB..");
  console.log("Ready to Go..");
});
const user = mongoose.model("users", {
  firstName: String,
  username: String,
  password: String,
});

//zod
const registerSchema = z.object({
  firstName: z.string(),
  username: z.string(),
  password: z.string(),
});
const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

//routes
app.post("/register", (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(401).send("error man");
  }

  const { firstName, username, password } = req.body;

  const newUser = new user({
    firstName: firstName,
    username: username,
    password: password,
  });
  newUser.save();
  res.send("Data Uploaded");
});

app.post("/login", async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(401).send("Invalid inputs");
  }
  const { username, password } = req.body;

  const exists = await user.findOne({
    username: username,
    password: password,
  });
  if (!exists) {
    return res.status(401).send("NONONONO u aint part of the club");
  }
  const token = jwt.sign(username, secretKey);
  res.send(token);
});

app.post("/getdata", async (req, res) => {
  try {
    const tokenExists = req.headers.authorization;
    const verifyy = jwt.verify(tokenExists, secretKey);
  } catch (error) {
    return res.status(401).err();
  }
  const data = await user.find();
  console.log("Connected");
  res.send(data);
});

app.use((err, req, res, next) => {
  res.send({
    msg: "error on our backend oppsies",
  });
});
app.listen(process.env.PORT);
