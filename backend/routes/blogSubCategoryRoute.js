const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const {create_subcategory, updateSubCategory, deleteSubCategory, getSubCategory, getAllSubCategory} = require("../controller/blogSubCategoryCtrl")
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");

router.post("/add-blog-sub-category", authMiddleware, isAdmin,  create_subcategory)
router.put("/update-blog-sub-category/:id", authMiddleware, isAdmin,  updateSubCategory)
router.delete("/delete-blog-sub-category/:id", authMiddleware, isAdmin,  deleteSubCategory)
router.get("/get-blog-sub-category/:id", authMiddleware, isAdmin,  getSubCategory)
router.get("/getall-blog-sub-category", authMiddleware, isAdmin,  getAllSubCategory)

module.exports = router;   