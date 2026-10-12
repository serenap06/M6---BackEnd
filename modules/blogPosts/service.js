const BlogPost = require("./schema");
const Author = require("../authors/schema");
const Comment = require("../comments/schema");

const findAll = async () => {
  return await BlogPost.find().populate("author");
};

const findOne = async (blogPostId) => {
  return await BlogPost.findById(blogPostId).populate("author");
};
const create = async (postData) => {
  const blogPost = new BlogPost(postData);
  const savedPost = await blogPost.save();

  if (savedPost.author) {
    await Author.updateOne(
      {
        _id: savedPost.author,
      },
      {
        $push: {
          posts: { posts: savedPost._id },
        },
      },
    );
  }

  return savedPost;
};

const update = async (blogPostId, updateData) => {
  return await BlogPost.findByIdAndUpdate(blogPostId, updateData, {
    new: true,
    runValidators: true,
  });
};
const deleteblogPost = async (blogPostId) => {
  const deletedPost = await BlogPost.findByIdAndDelete(blogPostId);
  if (deletedPost.author) {
    await Author.updateOne(
      {
        _id: deletedPost.author,
      },
      {
        $pull: {
          posts: { posts: deletedPost._id },
        },
      },
    );
  }
};

const findAllComments = async (blogPostId) => {
  return await Comment.find({ blogPost: blogPostId }).populate("author");
};
const findOneComment = async (commentId) =>{
  return await Comment.findById(commentId).populate("author")
}
const createComment = async (commentData, blogPostId) => {
  const newComment = new Comment({...commentData, blogPost:blogPostId})
  return await newComment.save()
}



module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteblogPost,
  findAllComments,
  findOneComment,
  createComment,
  
};
