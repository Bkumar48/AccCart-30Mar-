const Blog = require("../models/blogModal");
const User = require("../models/userSchema");
const asyncHandler = require("express-async-handler");
const validateMongodbid = require("../utils/validateMongodbid");
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// Update a blog

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongodbid(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true
    });
    res.json({
      updateBlog
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Fetch a blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongodbid(id);
  try {
    const getBlog = await Blog.findById(id)
    .populate("likes")
    .populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 }
      },
      { new: true }
    );
    res.json(
      getBlog
    );
  } catch (error) {
    throw new Error(error);
  }
});

// Get All blogs

const getAllBlogs = asyncHandler(async (req, res) => {
  try {

    // let {page, limit } = req.query;
    // if(!page) page = 1;
    // if(!limit) limit = 5;
    // const skip = (page - 1) * limit;
    const getBlogs = await Blog.find(); //.skip(skip).limit(limit)
    res.json(
      getBlogs
    );
    // res.send({page:page, limit:limit, data:getBlogs })
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a blogs

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbid(id);
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json(
      deleteBlog
    );
  } catch (error) {
    throw new Error(error);
  }
});

// like blog
const liketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  // validateMongodbid(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isLiked = blog?.isLiked;
  // find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});



// Dislike the Blog
const disliketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  // validateMongodbid(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  liketheBlog,
  disliketheBlog

};
