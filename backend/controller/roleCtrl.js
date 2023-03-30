const { Role, Permission } = require("../models/roleSchema");
const asyncHandler = require("express-async-handler");

// create a role
const createRole = asyncHandler(async (req, res) => {
  try {
    const role = await Role.create(req.body);
    // role.save();
    res.send(role);
  } catch (error) {
    throw new Error(error);
  }
});

// get all roles
const getAllRoles = asyncHandler(async (req, res) => {
  try {
    const roles = await Role.find({});
    res.send(roles);
  } catch (error) {
    throw new Error(error);
  }
});

// get one role
const getOneRole = asyncHandler(async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate("permissions");
    res.send(role);
  } catch (error) {
    throw new Error(error);
  }
});

// update a role
const updateRole = asyncHandler(async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(role);
  } catch (error) {
    throw new Error(error);
  }
});

// delete a role
const deleteRole = asyncHandler(async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    await Permission.deleteMany({ roleId: role._id });
    res.send(role);
  } catch (error) {
    throw new Error(error);
  }
});

// get Permissions by roleId
const getPermissionsByRoleId = asyncHandler(async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    const permissions = await Permission.find({
      _id: { $in: role.permissions },
    });
    res.send(permissions);
  } catch (error) {
    throw new Error(error);
  }
});

// --------------------------------------Permissions--------------------------------------------

// create a permission
const createPermission = asyncHandler(async (req, res) => {
  try {
    const permission = await Permission.create(req.body);
    permission.save();
    const role = await Role.findById(req.body.roleId);
    role.permissions.push(permission._id);
    role.save();
    res.send(permission);
  } catch (error) {
    throw new Error(error);
  }
});

// delete a permission
const deletePermission = asyncHandler(async (req, res) => {
  try {
    await Role.updateOne(
      { permissions: req.params.id },
      { $pull: { permissions: req.params.id } }
    );
    const permission = await Permission.findByIdAndDelete(req.params.id);
    res.send(permission);
  } catch (error) {
    throw new Error(error);
  }
});

// update a permission
const updatePermission = asyncHandler(async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.send(permission);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createRole,
  getAllRoles,
  getOneRole,
  updateRole,
  deleteRole,
  createPermission,
  deletePermission,
  updatePermission,
  getPermissionsByRoleId,
};

// router.post("/roles", async (req, res) => {
//     try {
//       const role = new Role(req.body);
//       await role.save();
//       res.send(role);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });

//   router.get("/roles", async (req, res) => {
//     try {
//       const roles = await Role.find({});
//       res.send(roles);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });

//   router.get("/roles/:id", async (req, res) => {
//     try {
//       const role = await Role.findById(req.params.id);
//       res.send(role);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });

//   router.put("/roles/:id", async (req, res) => {
//     try {
//       const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//       });
//       res.send(role);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });

//   router.delete("/roles/:id", async (req, res) => {
//     try {
//       const role = await Role.findByIdAndDelete(req.params.id);
//       res.send(role);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });

// module.exports = router;
