const express = require('express');
const { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, getOneCoupon } = require('../controller/couponCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-coupon', authMiddleware, isAdmin, createCoupon); 
router.get('/getall-coupons', authMiddleware, isAdmin, getAllCoupons); 
router.get('/getone-coupon/:id', authMiddleware, isAdmin, getOneCoupon); 
router.put('/update-coupon/:id', authMiddleware, isAdmin, updateCoupon); 
router.delete('/delete-coupon/:id', authMiddleware, isAdmin, deleteCoupon); 



module.exports = router;