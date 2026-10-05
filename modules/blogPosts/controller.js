const { default: mongoose } = require("mongoose");
const blogPostservice = require("./service");

const findAll = async (req, res,next) => {
  try {
    const blogPosts = await blogPostservice.findAll();
    if (blogPosts.length === 0) {
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
    next()
  }
};

const findOne = async (req, res,next) => {
  try {
    const { blogPostId } = req.params;
    const blogPost = await blogPostservice.findOne(blogPostId);
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
    next()
  }
};

const create = async (req, res,next) => {
  const { body } = req;
  try {
    const blogPost = await blogPostservice.create(body);
    res.status(201).send({
      statusCode: 201,
      message: "Post saved successfully",
      blogPost,
    });
  } catch (e) {
    console.error(e);
    next()
  }
};

const update = async (req, res,next) => {
  try {
    const { blogPostId } = req.params;
    const { body } = req;
    const blogPostUpdated = await blogPostservice.update(blogPostId, body);
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
    next()
  }
};

const deleteblogPost = async (req, res,next) => {
  try {
    const { blogPostId } = req.params;
    await blogPostservice.deleteblogPost(blogPostId);
    return res.status(200).send({
      statusCode: 200,
      message: "Post deleted successfully",
    });
  } catch (e) {
    console.error(e);
    next()
  }
};

const uploadCover = async(req,res,next) =>{
  const {blogPostId} = req.params;
  try {
    if(!mongoose.Types.ObjectId.isValid(blogPostId)){
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid id",
      });
    }
    if(!req.file){
      return res.status(400).send({
        statusCode: 400,
        message: "File not uploaded",
      });
    }
    const body = {cover:req.file.path};
    const blogPost = await blogPostservice.update(blogPostId,body);
    if(!blogPost){
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found",
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
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  uploadCover,
  delete: deleteblogPost,
};
