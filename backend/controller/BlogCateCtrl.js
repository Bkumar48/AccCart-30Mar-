const asyncHandler = require("express-async-handler");
const { Category, SubCategory } = require("../models/BlogCatModel");
// create a new category
const addCategory = asyncHandler(async (req, res) => {
  try {
    const cate = await Category.find();
    if (cate.length > 0) {
      let checking = false;
      0.0;
      for (let i = 0; i < cate.length; i++) {
        if (
          cate[i]["category"].toLowerCase() === req.body.category.toLowerCase()
        ) {
          checking = true;
          break;
        }
      }

      console.log(checking);
      if (checking == false) {
        const category = new Category({
          category: req.body.category,
        });

        const catData = await category.save();
        res
          .status(200)
          .send({ success: true, msg: "Category Data", data: catData });
      } else {
        res.status(400).send({
          success: false,
          msg: "(" + req.body.category + ") Category Already Exists",
        });
      }
    } else {
      const category = new Category({
        category: req.body.category,
      });

      const catData = await category.save();
      res
        .status(200)
        .send({ success: true, msg: "Category Data", data: catData });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get all categories
const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: "subCategories",
    });
    res
      .status(200).json(categories)
      // .send({ success: true, msg: "Categories Data", data: categories });
  } catch (error) {
    throw new Error(error.message);
  }
});

// const subCategory = asyncHandler(async (req, res) => {
//   try {
//     const subcategory = await SubCategory.create(req.body)
//     const subData = await subcategory.save();

//     const category = await Category.findById({_id: subData.categoryId});
//    category.subCategories.push(subData);
//    subData.parentCategory.push(category)
//    await category.save();

//    res.status(200).send({ success: true, msg: "Sub Category Data", data: subData });
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// Create a Sub Category
const subCategory = asyncHandler(async (req, res) => {
  try {
    const subcate = await SubCategory.find();
    if (subcate.length > 0) {
      let checking = false;
      for (let i = 0; i < subcate.length; i++) {
        if (
          subcate[i]["subcategory"].toLowerCase() ===
          req.body.subcategory.toLowerCase()
        ) {
          checking = true;
          break;
        }
      }
      if (checking == false) {
        const subcategory = new SubCategory({
          subcategory: req.body.subcategory,
          categoryId: req.body.categoryId,
        });
        const subData = await subcategory.save();
        const category = await Category.findById({ _id: subData.categoryId });
        category.subCategories.push(subData);
        subData.parentCategory.push(category);
        await category.save();
        res
          .status(200)
          .send({ message: "Sub Category Created Succesfully", data: subData });
      } else {
        res.status(400).send({
          message:
            " (" + req.body.subcategory + ") Sub Category Already Exists ",
        });
      }
    } else {
      const subcategory = new SubCategory({
        subcategory: req.body.subcategory,
        categoryId: req.body.categoryId,
      });
      const subData = await subcategory.save();

      const category = await Category.findById({ _id: subData.categoryId });
      category.subCategories.push(subData);
      subData.parentCategory.push(category);
      await category.save();

      res
        .status(200)
        .send({ message: "Sub Category Created Succesfully", data: subData });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get all Sub Categories
const getSubCategories = asyncHandler(async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate({
      path: "parentCategory",
    });
    res.status(200).send({ msg: "Sub Categories Data", data: subcategories });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = { addCategory, subCategory, getCategories, getSubCategories };
