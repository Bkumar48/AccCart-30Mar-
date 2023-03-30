const express = require("express");
const {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    liketheBlog,
    disliketheBlog
    
} = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create-blog", createBlog);
router.put('/like', authMiddleware, liketheBlog);
router.put('/dislike', authMiddleware, disliketheBlog);
router.put("/:id", authMiddleware, updateBlog); //authMiddleware, isAdmin,
router.get("/all-blogs", getAllBlogs);
router.delete("/:id", deleteBlog);
router.get("/:id", getBlog);

module.exports = router;
