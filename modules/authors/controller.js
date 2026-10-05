const { default: mongoose } = require("mongoose");
const sendGrid = require("@sendgrid/mail")
const authorService = require("./service");

const findAll = async (req, res, next) => {
  try {
    const authors = await authorService.findAll();
    if (authors.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No authors found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      authors,
    });
  } catch (e) {
    console.error(e);
    next();
  }
};

const findOne = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const author = await authorService.findOne(authorId);
    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: "No author found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      author,
    });
  } catch (e) {
    console.error(e);
    next();
  }
};

const create = async (req, res, next) => {
  const { body } = req;
  try {
    const author = await authorService.create(body);
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: author.email,
      from: "serenapoletano@gmail.com",
      subject: "Benvenuto su StriveBLog",
      text: "Ti sei registrato correttamente",
      html: "Ti sei registrato correttamente"
    }
    const [response] = await sendGrid.send(msg)
    console.log("status",response.statusCode)
    res.status(201).send({
      statusCode: 201,
      message: "Author saved successfully",
      author,
    });
  } catch (e) {
    console.error(e);
    next();
  }
};

const update = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const { body } = req;
    const authorUpdated = await authorService.update(authorId, body);
    if (!authorUpdated) {
      return res.status(404).send({
        statusCode: 404,
        message: "Author not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Author updated successfully",
      authorUpdated,
    });
  } catch (e) {
    next();
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    await authorService.deleteAuthor(authorId);
    return res.status(200).send({
      statusCode: 200,
      message: "Author deleted successfully",
    });
  } catch (e) {
    console.error(e);
    next();
  }
};

const uploadAvatar = async (req, res, next) => {
  const { authorId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid id",
      });
    }
    if (!req.file) {
      return res.status(400).send({
        statusCode: 400,
        message: "File not uploaded",
      });
    }
    const body = { avatar: req.file.path };
    const author = await authorService.update(authorId, body);
    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: "Author not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      author,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  uploadAvatar,
  delete: deleteAuthor,
};
