const { default: mongoose } = require("mongoose");
const blogPostService = require("./service");

// Posts Controller
const findAll = async (req, res, next) => {
  try {
    const blogPosts = await blogPostService.findAll();
    if (!blogPosts || blogPosts.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No Posts found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      blogPosts,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const findOne = async (req, res, next) => {
  const { blogPostId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const blogPost = await blogPostService.findOne(blogPostId);
    if (!blogPost) {
      return res.status(404).send({
        statusCode: 404,
        message: "No Post found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      blogPost,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { category, title, content } = req.body;
  try {
    const blogPost = await blogPostService.create({ category, title, content, author: req.author });
    res.status(201).send({
      statusCode: 201,
      message: "Post saved successfully",
      blogPost,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { blogPostId } = req.params;
  try {
    const { category, title, content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const updateData = { category, title, content };
    const blogPostUpdated = await blogPostService.update(
      blogPostId,
      updateData,
    );
    if (!blogPostUpdated) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Post updated successfully",
      blogPostUpdated,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const uploadCover = async (req, res, next) => {
  const { blogPostId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
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
    const body = { cover: req.file.path };
    const blogPost = await blogPostService.update(blogPostId, body);
    if (!blogPost) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Cover uploaded successfully",
      blogPost,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const deleteblogPost = async (req, res, next) => {
  const { blogPostId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid id",
      });
    }
    const deletedPost = await blogPostService.deleteblogPost(blogPostId);
    if (!deletedPost) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Post deleted successfully",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// Comments controller

const findAllComments = async (req, res, next) => {
  const { blogPostId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const comments = await blogPostService.findAllComments(blogPostId);
    if (!comments || comments.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No comments found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      comments,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const findOneComment = async (req, res, next) => {
  const {blogPostId, commentId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(commentId) ||!mongoose.Types.ObjectId.isValid(blogPostId)  ) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const comment = await blogPostService.findOneComment(commentId, blogPostId);
    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      comment,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const createComment = async (req, res, next) => {
  const { blogPostId } = req.params;
  const { text } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const comment = await blogPostService.createComment({ text }, blogPostId);
    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "No blogPost found",
      });
    }
    res.status(201).send({
      statusCode: 201,
      message: "Comment created successfully",
      comment,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { text } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const updatedComment = await blogPostService.updateComment(
      commentId,
      { text },
    );
    if (!updatedComment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Comment updated successfully",
      updatedComment,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const result = await blogPostService.deleteComment(commentId);
    if (!result) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Comment deleted successfully",
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
  uploadCover,
  delete: deleteblogPost,
  deleteComment,
  findAllComments,
  findOneComment,
  createComment,
  updateComment,
};
