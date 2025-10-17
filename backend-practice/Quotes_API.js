require("dotenv").config();
const express = require("express");
const app = express();
const z = require("zod");

app.use(express.json());

const schema = z.object({ id: z.string().regex(/^\d+$/) });

const data = [
  {
    author: "Albert Einstein",
    text: "Life is like riding a bicycle. To keep your balance you must keep moving.",
  },
  {
    author: "Oscar Wilde",
    text: "Be yourself; everyone else is already taken.",
  },
  {
    author: "Marilyn Monroe",
    text: "I'm selfish, impatient and a little insecure.",
  },
  {
    author: "Maya Angelou",
    text: "You will face many defeats in life, but never let yourself be defeated.",
  },
  {
    author: "Confucius",
    text: "It does not matter how slowly you go as long as you do not stop.",
  },
];

app.get("/quotes", (req, res) => {
  res.send(data);
});

app.get("/quotes/:id", (req, res) => {
  const id = schema.safeParse(req.params);
  if (!id.success) {
    res.status(401).send("error");
  }
  const book = data[req.params.id];
  res.send(book);
});

app.use((err, req, res, next) => {
  res.send("errorrrrrrrrrrr");
});

app.listen(process.env.PORT, () => {
  console.log("started in server 3000");
});
