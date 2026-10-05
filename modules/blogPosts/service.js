const BlogPost = require("./schema");

const findAll = async () => {
  return await BlogPost.find();
};

const findOne = async (blogPostId) => {
  return await BlogPost.findById();
};
const create = async (body) => {
  const blogPost = new BlogPost(body);
  return await blogPost.save();
};
const update = async (blogPostId, body) => {
  return await BlogPost.findByIdAndUpdate(blogPostId, body, {
    new: true,
    runValidators: true,
  });
};
const deleteblogPost = async (blogPostId) => {
  return await BlogPost.findByIdAndDelete(blogPostId);
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteblogPost,
};
