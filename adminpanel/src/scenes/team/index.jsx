import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const Team = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [refresh, setRefresh] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/all-users")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:5000/api/user/delUser/${_id}`)
      .then((res) => {
        setSuccess(res.data);
        const newUsers = users.filter((user) => user._id !== _id);
        setUsers(newUsers);
        return res.data;
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const handleEdit = (_id) => {
    axios
      .put(`http://localhost:5000/api/user/updateUser/${_id}`, user)
      .then((res) => {
        setSuccess(res.data);
        setOpenEdit(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        setError(err.response.data);
        setOpenEdit(false);
      });
  };

  const columns = [
    { field: "_id", headerName: "ID", width:70 },
    {
      field: "userName",
      headerName: "Username",
      // flex: 1,
      editable: true,
      width:100,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      editable: true,
      flex: .5,
    },
    {
      field: "mobile",
      headerName: "Phone Number",
      editable: true,
      flex: .5,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: .8,
      type: "singleSelect",
      valueOptions: ["admin", "manager", "user"],
      editable: true,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            // m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: .5,
      type: "singleSelect",
      valueOptions: ["Active", "Inactive"],
      editable: true,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            // m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "Active"
                ? colors.greenAccent[600]
                : status === "Inactive"
                ? colors.redAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { _id, name, email, mobile, access, status } }) => {
        return (
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              // onClick={() => {
              //   handleEdit(_id);
              // }}
              href={`/account/${_id}`}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                handleDelete(_id);
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => {
                handleEdit(_id);
              }}
            >
              Save
            </Button>

          </Box>
        );
      },
    }
  ];

  return (
    <Box m="20px"
     sx={{
      width: isMobile ? "100%" : "95%",
      
    }}>
      <Box
        m="20px 0 0 0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="Users" subtitle="Managing the Team Members" />
        <Button
          variant="contained"
          color="success"
          title="Add User"
          size="small"
          href="/form"
        >
          Add User
        </Button>
      </Box>
      <Box
        m="5px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={users}
          getRowId={(users) => users._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Team;
