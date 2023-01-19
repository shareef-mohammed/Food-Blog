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

router.post("/user/addPost/:id", addPost);
router.get("/user/allPosts", allPosts);
router.get("/user/posts", userPosts);
router.get("/user/homePosts", homePosts);
router.get("/user/singlePost/:id", singlePost);
router.post("/user/likePost/:id", likePost);
router.post("/user/commentPost/:id", commentPost);
router.get("/user/postComments/:id", postComments);
router.get("/user/getPost/:id", getPost);
router.put("/user/editPost/:id", editPost);
router.delete("/user/deletePost/:id", deletePost);
router.get("/user/getLikeDetails/:id", getLikeDetails);
router.post("/user/reportPost/:id", reportPost);
router.get("/posts/locations", locations);
router.get("/posts/categories", categories);
router.get("/posts/singleCategory/:id", singleCategory);
router.get("/posts/filteredPosts", filteredPosts);

module.exports = router;
