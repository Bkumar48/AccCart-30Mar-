const mongoose = require("mongoose"); // Erase if already required

// Sub Category Schema
var SubCategorySchema = new mongoose.Schema(
  {
    categoryId:{
      type: String,
      required: true
    },
    subcategory: {
      type: String,
      required: true
    },
  parentCategory: [{ type: mongoose.Types.ObjectId, ref: "Category"}]
});

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);


// Category Schema
var CategorySchema = new mongoose.Schema({


    category: {
        type: String,
        required: true
      },
  subCategories: [{ type: mongoose.Types.ObjectId, ref: "SubCategory" }]
});

const Category = mongoose.model('Category', CategorySchema);


module.exports = {Category, SubCategory};
