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
    "MONOG_URL"
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


