const mongoose = require("mongoose");

const admin = mongoose.model("Admin", {
  username: String,
  password: String,
});

const courses = mongoose.model("Course", {
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const user = mongoose.model("User", {
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: courses,
    },
  ],
});

module.exports = { admin, user, courses };
