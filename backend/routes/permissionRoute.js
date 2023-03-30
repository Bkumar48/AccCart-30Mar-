const express = require("express");
const router = express.Router();
const {
    createPermission,
    getAllPermissions,
    getOnePermission,
    updatePermission,
    deletePermission,
} = require("../controller/permissionCtrl");


// Create a new Permission
router.post("/create", createPermission);

// Get all Permissions
router.get("/all", getAllPermissions);

// Get one Permission
router.get("/:id", getOnePermission);

// Update a permission
router.put("/:id", updatePermission);

// Delete a permission
router.delete("/:id", deletePermission);

module.exports = router;
