const express = require('express');
const router = express.Router();
const {addCategory,subCategory, getCategories, getSubCategories} = require('../controller/BlogCateCtrl')
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");

router.post('/addcate', addCategory);
router.get('/getallcate', getCategories);
router.post('/addsubcate', subCategory);
router.get('/getallsubcate', getSubCategories);


module.exports = router;