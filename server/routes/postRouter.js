const experss = require("express");

const router = experss();
const {
  addPost,
  likePost,
  commentPost,
  allPosts,
  userPosts,
  homePosts,
  editPost,
  singlePost,
  postComments,
  deletePost,
  getPost,
  getLikeDetails,
  reportPost,
  locations,
  categories,
  singleCategory,
  filteredPosts,
} = require("../controllers/postController");

const auth = require('../middleware/auth')

router.post("/user/addPost/:id", auth.validateUserToken, addPost);
router.get("/user/allPosts", allPosts);
router.get("/user/posts", userPosts);
router.get("/user/homePosts", homePosts);
router.get("/user/singlePost/:id", auth.validateUserToken, singlePost);
router.post("/user/likePost/:id", auth.validateUserToken, likePost);
router.post("/user/commentPost/:id", auth.validateUserToken, commentPost);
router.get("/user/postComments/:id", auth.validateUserToken, postComments);
router.get("/user/getPost/:id", auth.validateUserToken, getPost);
router.put("/user/editPost/:id", auth.validateUserToken, editPost);
router.delete("/user/deletePost/:id", auth.validateUserToken, deletePost);
router.get("/user/getLikeDetails/:id", getLikeDetails);
router.post("/user/reportPost/:id", reportPost);
router.get("/posts/locations", locations);
router.get("/posts/categories", categories);
router.get("/posts/singleCategory/:id", singleCategory);
router.get("/posts/filteredPosts", filteredPosts);

module.exports = router;
