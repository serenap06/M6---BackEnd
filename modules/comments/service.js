const BlogPost = require("../blogPosts/schema");
const Author = require("../authors/schema");
const Comment = require("./schema");

const findAllComments = async (blogPostId) => {
  return await Comment.find({ blogPost: blogPostId }).populate("author");
};
const findOneComment = async (commentId) => {
  return await Comment.findById(commentId).populate("author");
};
const createComment = async (commentData, blogPostId) => {
  const newComment = new Comment({ ...commentData, blogPost: blogPostId });
  return await newComment.save();
};

module.exports = {
  findAllComments,
  findOneComment,
  createComment,
};
