const Coupon = require("../models/couponModel");
const validateMongodbid = require("../utils/validateMongodbid");
const asyncHandler = require("express-async-handler");

// Create a new Coupon
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json(newCoupon);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get all Coupons
const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get one Coupon
const getOneCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const coupon = await Coupon.findById(id);
    res.status(200).json(coupon);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Update a coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true
    });
    res.status(200).json({ message: "Updated Successfully", data:updatedCoupon});
  } catch (error) {
    throw new Error(error.message);
  }
});

// Delete a coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbid(id);
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.send({message:"Deleted Successfully", data: deletedCoupon});
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = { createCoupon, getAllCoupons, getOneCoupon, updateCoupon, deleteCoupon };
