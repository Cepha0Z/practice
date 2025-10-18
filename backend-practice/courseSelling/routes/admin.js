const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { admin, user, courses } = require("../models/model.js");

router.post("/signup", (req, res) => {
  const { username, password } = req.headers;
  const newAdmin = new admin({
    username: username,
    password: password,
  });
  newAdmin.save();
  return res.json({ msg: "new admin created" });
});

router.post("/courses", auth(admin), async (req, res) => {
  const { title, description, price, imageLink } = req.body;
  const newBook = new courses({ title, description, price, imageLink });
  await newBook.save();
  return res.json({ msg: "new book created", id: newBook._id });
});

router.get("/courses", auth(admin), async (req, res) => {
  const Books = await courses.find();
  return res.send(Books);
});

module.exports = router;
