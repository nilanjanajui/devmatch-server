const router  = require("express").Router();
const { getPosts, getPostById, createPost, likePost } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.get("/",         getPosts);
router.get("/:id",      getPostById);
router.post("/",        protect, createPost);
router.patch("/:id/like", likePost);

module.exports = router;