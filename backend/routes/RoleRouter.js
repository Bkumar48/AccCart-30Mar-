const express = require("express");
const router = express.Router();

const {
  createRole,
  getAllRoles,
  getOneRole,
  updateRole,
  deleteRole,
  createPermission,
  deletePermission,
  updatePermission,
  getPermissionsByRoleId,
} = require("../controller/roleCtrl");

router.post("/create", createRole);
router.get("/all", getAllRoles);
router.get("/:id", getOneRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);
router.get("/permissions/:id", getPermissionsByRoleId);

// permissions routes
router.post("/create-permission", createPermission);
router.delete("/delete-permission/:id", deletePermission);
router.put("/update-permission/:id", updatePermission);

module.exports = router;
