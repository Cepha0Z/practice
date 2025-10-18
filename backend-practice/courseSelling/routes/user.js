const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { admin, user, courses } = require("../models/model.js");

router.post("/signup", (req, res) => {
  const { username, password } = req.headers;
  const newUser = new user({
    username: username,
    password: password,
  });
  newUser.save();
  return res.json({ msg: "new User created" });
});

router.get("/courses", auth(user), async (req, res) => {
  const course = await courses.find();
  return res.send(course);
});

router.post("/courses/:courseId", auth(user), async (req, res) => {
  const bookID = req.params.courseId;
  const username = req.headers.username;
  await user.updateOne({ username }, { $push: { purchasedCourses: bookID } });
  return res.send("Added course with id:" + "" + " successfully");
});

router.get("/courses/purchasedCourses", auth(user), async (req, res) => {
  const { username } = req.headers;
  const purchasedbooks = await user
    .findOne({ username })
    .populate("purchasedCourses")
    .select("purchasedCourses -_id");
  res.send(purchasedbooks);
});

module.exports = router;
