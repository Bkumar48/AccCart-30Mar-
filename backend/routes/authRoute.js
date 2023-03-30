const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser, 
  getoneUser,
  deleteaUser,
  updateaUser,
  handleRefreshToken,
  logout,
  loginAdmin,
  pushRoleToUser,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
// const { hasPermissionTo } = require("../middleware/permissionCheck");
const router = express.Router();

router.post("/register",  createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getallUser); //, , isAdmin
router.get("/getUser/:id", getoneUser); //, authMiddleware, isAdmin
router.delete("/delUser/:id", deleteaUser);
router.put("/updateUser/:id", updateaUser); //, authMiddleware, isAdmin
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.post("/admin-login", loginAdmin);
router.post("/patch", pushRoleToUser);
module.exports = router;
  