const express = require("express");
const blogPostController = require("./controller");
const uploadImg = require("../../middlewares/cloudinary");
const router = express.Router();

// blogPosts routes
router.get("/", blogPostController.findAll); // GET all blogPosts
router.get("/:blogPostId", blogPostController.findOne); // GET one blogPost

router.post("/", blogPostController.create); // POST one blogPost

router.patch("/:blogPostId", blogPostController.update); // PATCH/EDIT a specific blogPost
router.patch("/:blogPostId/cover", uploadImg.single("cover"), blogPostController.uploadCover); // PATCH/EDIT a blogPost cover

router.delete("/:blogPostId", blogPostController.delete); // DELETE a blogPost

// comments routes
router.get("/:blogPostId/comments", blogPostController.findAllComments); // GET all comments of a specific blogPost
router.get("/:blogPostId/comments/:commentId", blogPostController.findOneComment); // GET a specific comment of a specific blogPost

router.post("/:blogPostId/comments", blogPostController.createComment); // POST one comment to a specific blogPost

router.patch("/:blogPostId/comments/:commentId", blogPostController.updateComment); // PATCH/EDIT a specific comment of a blogPost

router.delete("/:blogPostId/comments/:commentId", blogPostController.deleteComment); // DELETE a specific comment of a blogPost

module.exports = router;
