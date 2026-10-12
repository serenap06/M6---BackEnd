const jwt = require("jsonwebtoken");
const Author = require("../modules/authors/schema");
const authenticate = (req, res, next) => {
  const authHeader = req.header.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send({
      statusCode: 401,
      message: "Token not valid",
    });
  }

  const jwtToken = authHeader.split(" ")[1];
  jwt.verify(jwtToken, process.env.JWT_SECRET, async function (err, payload) {
    if (err) {
      return res.status(401).send({
        statusCode: 401,
        message: "Token not valid",
      });
    }
    try {
      const { id } = payload;
      const author = await Author.findById(id);
      if (!author) {
        return res.status(401).send({
          statusCode: 401,
          message: "Author not found",
        });
      }
      req.author = author;
      next();
    } catch (e) {
      return res.status(500).send({
        statusCode: 500,
        message: e.message,
      });
    }
  });
};

module.exports = authenticate;
