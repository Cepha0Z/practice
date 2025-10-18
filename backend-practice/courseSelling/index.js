const express = require("express");
const zod = require("zod");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin.js");
const userRoutes = require("./routes/user.js");

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://cephajj:7Kgxdo0zHxY5dviT@cluster0.ray64mt.mongodb.net/Auth_API"
  )
  .then(() => {
    console.log("connected");
  });

const adminSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const usersSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  purchased: zod.array(),
});

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use((err, req, res, next) => {
  res.send({
    msg: "error on our backend oppsies",
  });
});

app.listen(3000);
//68f3052d08d1a4a2740ae8d3
//68f3055108d1a4a2740ae8dc
//68f3056208d1a4a2740ae8e2
