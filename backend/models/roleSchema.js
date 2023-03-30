const mongoose = require("mongoose");

//---------------------------------Permission Schema---------------------------------//
const PermissionSchema = new mongoose.Schema({
  // roleId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Role",
  // },
  roleId: {
    type: String,
    required: true,
  },

  users: {
    create: Boolean,
    default: false,
    read: Boolean,
    default: false,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
  blogs: {
    create: Boolean,
    default: false,
    read: Boolean,
    update: Boolean,
    default: false,
    delete: Boolean,
    default: false,
  },
});

const Permission = mongoose.model("Permission", PermissionSchema);

PermissionSchema.methods.toJSON = function () {
  return {
    id: this._id,
    users: this.users,
  };
};

// ---------------------------------Role Schema---------------------------------//
var roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
  }
);


const Role = mongoose.model("Role", roleSchema);

module.exports = { Role, Permission };
