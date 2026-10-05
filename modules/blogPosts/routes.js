const express = require("express");
const blogPostController = require("./controller");
const uploadImg = require("../../middlewares/cloudinary");
const router = express.Router();

//routes
router.get("/", blogPostController.findAll); //GET all blogPosts
router.get("/:blogPostId", blogPostController.findOne); //GET one blogPost
router.post("/", blogPostController.create); //POST one blogPost
router.patch("/:blogPostId", blogPostController.update);
router.patch("/:blogPostId/cover", uploadImg.single("cover"), blogPostController.uploadCover)
router.delete("/:blogPostId", blogPostController.delete);

module.exports = router;
