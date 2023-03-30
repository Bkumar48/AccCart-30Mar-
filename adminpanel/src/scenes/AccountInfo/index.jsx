import { Box, Typography, useTheme, Card, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
const AccountDetails = () => {
  const theme = useTheme();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");
  const [access, setAccess] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const colors = tokens(theme.palette.mode);
  const { _id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/getUser/${_id}`)
      .then((res) => {
        //${localStorage.getItem("userId")}
        setUserName(res.data.userName);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setMobile(res.data.mobile);
        setStatus(res.data.status);
        setAccess(res.data.access);
        setCreatedAt(res.data.createdAt);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id]);

  const handleUpdate = (values) => {
    axios
      .put(`http://localhost:5000/api/user/updateUser/${_id}`, values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ backgroundColor: colors.background, minHeight: "100%", py: 3 }}>
      <Box m="0 0 0 20px">
        <Header title="Edit User" subtitle="Edit the existing user" />
      </Box>

      <Formik
        initialValues={{
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: mobile,
          status: status,
          access: access,
          createdAt: createdAt,
        }}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ px: 3 }}>
              <Card display="grid" gap="30px">
                <TextField
                  label="User Name"
                  margin="normal"
                  name="userName"
                  onChange={handleChange}
                  type="text"
                  value={values.userName}
                  variant="outlined"
                  error={!!touched.userName && !!errors.userName}
                  helperText={touched.userName && errors.userName}
                />
                <TextField
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  onChange={handleChange}
                  type="text"
                  value={values.firstName}
                  variant="outlined"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  onChange={handleChange}
                  type="text"
                  value={values.lastName}
                  variant="outlined"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  label="Email"
                  margin="normal"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  label="Mobile"
                  margin="normal"
                  name="mobile"
                  onChange={handleChange}
                  type="text"
                  value={values.mobile}
                  variant="outlined"
                  error={!!touched.mobile && !!errors.mobile}
                  helperText={touched.mobile && errors.mobile}
                />

                <TextField
                  label="Status"
                  margin="normal"
                  name="status"
                  onChange={handleChange}
                  type="text"
                  value={values.status}
                  variant="outlined"
                  error={!!touched.status && !!errors.status}
                  helperText={touched.status && errors.status}
                />
                <TextField
                  label="Access"
                  margin="normal"
                  name="access"
                  onChange={handleChange}
                  type="text"
                  value={values.access}
                  variant="outlined"
                  error={!!touched.access && !!errors.access}
                  helperText={touched.access && errors.access}
                />

                <TextField
                  label="Created At"
                  margin="normal"
                  name="createdAt"
                  onChange={handleChange}
                  type="text"
                  value={values.createdAt}
                  variant="outlined"
                  error={!!touched.createdAt && !!errors.createdAt}
                  helperText={touched.createdAt && errors.createdAt}
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Update
                  </Button>
                </Box>
              </Card>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = Yup.object().shape({
  userName: Yup.string().required("User Name is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .matches("Email is not valid")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(phoneRegExp, "Mobile number is not valid")
    .required("Mobile number is required"),
  status: Yup.string().required("Status is required"),
  access: Yup.string().required("Role is required"),
  createdAt: Yup.string().required("Created At is required"),
});

export default AccountDetails;

// <Box>
//   <Header />
//   <Box
//     sx={{
//       backgroundColor: colors.background,
//       minHeight: "100%",
//       py: 3,
//     }}
//   >
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         mt: 3,
//         mb: 1,
//       }}
//     >
//       <Typography color="textPrimary" variant="h4">
//         Account Details
//       </Typography>
//     </Box>
//     <Box sx={{ px: 3 }}>
//       <Card>
//         <Box sx={{ p: 3 }}>
//           <Typography color="textPrimary" variant="h5">
//             User Name: {userName}
//           </Typography>
//           <Typography color="textPrimary" variant="h5">
//             First Name: {firstName}
//           </Typography>
//           <Typography color="textPrimary" variant="h5">
//             Last Name: {lastName}
//           </Typography>
//           <Typography color="textPrimary" variant="h5">
//             Email: {email}
//           </Typography>
//           <Typography color="textPrimary" variant="h5">
//             Mobile: {mobile}
//           </Typography>
//           <Typography color="textPrimary" variant="h5">
//             Status: {status}
//           </Typography>
//           <Typography color="textPrimary" variant="h5">
//             Role: {access}
//           </Typography>
//           <Typography color="textPrimary" variant="h5">
//             Created At: {createdAt}
//           </Typography>
//         </Box>
//       </Card>
//     </Box>
//   </Box>
// </Box>
//   );
// };

// export default AccountDetails;

// useEffect(() => {
//     axios.get("http://localhost:8080/api/v1/user/me", {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//     }).then((response) => {
//         console.log(response.data);
//         setFirstName(response.data.firstName);
//         setLastName(response.data.lastName);
//         setEmail(response.data.email);
//         setPhone(response.data.phone);
//     }).catch((error) => {
//         console.log(error);
//     });
// }
// , []);

// const {enqueueSnackbar} = useSnackbar();
// const {t} = useTranslation();
// const classes = useStyles();
// const theme = useTheme();
// const navigate = useNavigate();
// const {register, handleSubmit, formState: {errors}} = useForm();

// const user = useSelector((state) => state.user);

// const onSubmit = (data) => {
//     console.log(data);
//     axios.post("http://localhost:8080/api/v1/user/register", data).then((response) => {
//         console.log(response.data);
//         enqueueSnackbar(t("User created"), {
//             variant: "success"
//         });
//         navigate("/app/account", {replace: true});
//     }).catch((error) => {
//         console.log(error);
//         enqueueSnackbar(t("User not created"), {
//             variant: "error"
//         });
//     });
// }
