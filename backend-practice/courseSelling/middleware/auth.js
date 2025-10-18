function auth(model) {
  return async function authh(req, res, next) {
    const { username, password } = req.headers;
    if (!username || !password) {
      console.log("wrong input");
      return res.status(401).send("error");
    }
    try {
      const exists = await model.findOne({
        username: username,
        password: password,
      });
      if (!exists) {
        console.log("user doesnt exists");
        return res.status(401).send("nononono");
      }
      next();
    } catch (error) {
      return res.status(401).send("idk man");
    }
  };
}

module.exports = auth;
