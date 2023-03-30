import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  TextField,
  MenuItem,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
const EditBlog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [images, setImages] = useState("");
  const [slug, setSlug] = useState("");
  const [imagesList, setImagesList] = useState([]);
  const [categoryList, setCategoryList] = useState([""]);
  const [authorList, setAuthorList] = useState([]);
  const { id } = useParams();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/blog/${id}`
        );
        setBlog(data);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setAuthor(data.author);
        setImages(data.images);
        setSlug(data.slug);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getBlog();
  }, [id]);

  // useEffect(() => {
  //   const getImages = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await axios.get(
  //         "http://localhost:5000/api/images"
  //       );
  //       setImagesList(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };
  //   getImages();
  // }
  // , []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/blog-cate/getallcate");
        setCategoryList(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getAuthors = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/user/all-users"
        );
        setAuthorList(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getAuthors();
  }
  , []);

  const handleEditBlog = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/blog/${id}`, {
        title,
        description,
        category,
        author,
        images,
        slug,
      });
      setSuccess("Blog edited successfully");
      setLoading(false);
      setTimeout(() => {
        navigate("/app/blogs");
      }, 2000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          backgroundColor: colors.background,
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              borderRadius: 1,
              boxShadow: 1,
              width: isMobile ? "100%" : "95%",
              p: 3,
            }}
          >
            <Formik
              initialValues={{
                title: "",
                description: "",
                category: "",
                author: "",
                images: "",
                slug: "",
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .max(255)
                  .required("Title is required"),
                description: Yup.string()
                  .max(255)
                  .required("Description is required"),
                category: Yup.string()
                  .max(255)
                  .required("Category is required"),
                author: Yup.string()
                  .max(255)
                  .required("Author is required"),
                // images: Yup.string()
                //   .max(255)
                //   .required("Image is required"),
                slug: Yup.string()
                  .max(255)
                  .required("Slug is required"),
              })}
              onSubmit={() => {
                handleEditBlog();
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Header
                    title={"Edit Blog"}
                    subtitle={"Edit the existing Blog"}
                  />
                  {error && (
                    <Alert severity="error" sx={{ mt: 3 }}>
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert severity="success" sx={{ mt: 3 }}>
                      {success}
                    </Alert>
                  )}
                  <Box
                    sx={{
                      mb: 3,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Title"
                      name="title"
                      onBlur={handleBlur}
                      onChange={(e) => setTitle(e.target.value)}
                      value={values.title}
                      variant="outlined"
                    />
                    {errors.title && touched.title && (
                      <Box sx={{ color: "red", mt: 1 }}>{errors.title}</Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      mb: 3,
                    }}
                  >
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={3}
                      placeholder="Description"
                      style={{ width: "100%" }}
                      onBlur={handleBlur}
                      onChange={(e) => setDescription(e.target.value)}
                      value={values.description}
                    />
                    {errors.description && touched.description && (
                      <Box sx={{ color: "red", mt: 1 }}>
                        {errors.description}
                      </Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      mb: 3,
                    }}
                  >
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={values.category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                      >
                        {categoryList.map((category) => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.category && touched.category && (
                      <Box sx={{ color: "red", mt: 1 }}>{errors.category}</Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      mb: 3,
                    }}
                  >
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Author
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={values.author}
                        onChange={(e) => setAuthor(e.target.value)}
                        label="Author"
                      >
                        {authorList.map((author) => (
                          <MenuItem key={author._id} value={author._id}>
                            {author.userName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.author && touched.author && (
                      <Box sx={{ color: "red", mt: 1 }}>{errors.author}</Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      mb: 3,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Image"
                      name="images"
                      onBlur={handleBlur}
                      onChange={(e) => setImages(e.target.value)}
                      value={values.images}
                      variant="outlined"
                    />
                    {errors.images && touched.images && (
                      <Box sx={{ color: "red", mt: 1 }}>{errors.images}</Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      mb: 3,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Slug"
                      name="slug"
                      onBlur={handleBlur}
                      onChange={(e) => setSlug(e.target.value)}
                      value={values.slug}
                      variant="outlined"
                    />
                    {errors.slug && touched.slug && (
                      <Box sx={{ color: "red", mt: 1 }}>{errors.slug}</Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      p: 2,
                    }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Update"}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EditBlog;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { tokens } from "../../theme";
// import { useLocation } from "react-router-dom";
// import { SnackbarProvider, useSnackbar } from "notistack";
// import {
//   Box,
//   Button,
//   TextField,
//   MenuItem,
//   TextareaAutosize,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import { CircularProgress } from "@mui/material";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material/styles";
// const EditBlog = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState({});
//   const [categories, setCategories] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [imagesList, setImagesList] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [author, setAuthor] = useState("");
//   const [images, setImages] = useState([]);
//   const [slug, setSlug] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const { id } = useParams();
//   const location = useLocation();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const handleEditBlog = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.put(`http://localhost:5000/api/blog/${id}`, {
//         title,
//         description,
//         category,
//         author,
//         images,
//         slug,
//       });
//       setLoading(false);
//       setSuccess(data.message);
//       enqueueSnackbar(data.message, { variant: "success" });
//       setTimeout(() => {
//         navigate("/blogs");
//       }, 2000);
//     } catch (error) {
//       setLoading(false);
//       setError(error.response.data.message);
//       enqueueSnackbar(error.response.data.message, { variant: "error" });
//     }
//   };

//   useEffect(() => {
//     const getBlog = async () => {
//       const { data } = await axios.get(`http://localhost:5000/api/blog/${id}`);
//       setBlog(data);
//       setTitle(data.title);
//       setDescription(data.description);
//       setCategory(data.category);
//       setAuthor(data.author);
//       setImages(data.images);
//       setSlug(data.slug);
//     };
//     getBlog();
//   }, []);
//   // useEffect(() => {
//   //   const getCategories = async () => {
//   //     const {data} = await axios.get(`http://localhost:5000/api/category`);
//   //     setCategories(data.categories);
//   //   }
//   //   getCategories();
//   // }
//   // ,[]);
//   // useEffect(() => {
//   //   const getAuthors = async () => {
//   //     const {data} = await axios.get(`http://localhost:5000/api/author`);
//   //     setAuthors(data.authors);
//   //   }
//   //   getAuthors();
//   // }
//   // ,[]);
//   // useEffect(() => {
//   //   const getImages = async () => {
//   //     const {data} = await axios.get(`http://localhost:5000/api/image`);
//   //     setImagesList(data.images);
//   //   }
//   //   getImages();
//   // }
//   // ,[]);
//   return (
//     <div>
//       <Header />
//       <Box
//         sx={{
//           backgroundColor: colors.background,
//           minHeight: "100%",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: colors.white,
//               borderRadius: 1,
//               boxShadow: 3,
//               P: 3,
//               width: isMobile ? "100%" : "95%",
//             }}
//           >
//             <Formik
//               initialValues={{
//                 title: blog.title,
//                 description: blog.description,
//                 category: blog.category,
//                 author: blog.author,
//                 images: blog.images,
//                 slug: blog.slug,
//               }}
//               validationSchema={Yup.object().shape({
//                 title: Yup.string().max(255).required("Title is required"),
//                 description: Yup.string()
//                   .max(255)
//                   .required("Description is required"),
//                 category: Yup.string()
//                   .max(255)
//                   .required("Category is required"),
//                 author: Yup.string().max(255).required("Author is required"),
//                 images: Yup.string().max(255).required("Images is required"),
//                 slug: Yup.string().max(255).required("Slug is required"),
//               })}
//               onSubmit={handleEditBlog}
//             >
//               {({
//                 errors,
//                 handleBlur,
//                 handleChange,
//                 handleSubmit,
//                 isSubmitting,
//                 touched,
//                 values,
//               }) => (
//                 <form onSubmit={handleSubmit}>
//                   <Header title="Edit Blog" />
//                   <Box sx={{ mb: 3 }}>
//                     <TextField
//                       error={Boolean(touched.title && errors.title)}
//                       fullWidth
//                       helperText={touched.title && errors.title}
//                       label="Title"
//                       margin="normal"
//                       name="title"
//                       onBlur={handleBlur}
//                       onChange={(e) => setTitle(e.target.value)}
//                       type="text"
//                       value={title}
//                       variant="outlined"
//                     />
//                   </Box>
//                   <Box sx={{ mb: 3 }}>
//                     <TextareaAutosize
//                       aria-label="minimum height"
//                       minRows={3}
//                       placeholder="Description"
//                       style={{ width: "100%" }}
//                       onChange={(e) => setDescription(e.target.value)}
//                       value={description}
//                     />
//                   </Box>
//                   <Box sx={{ mb: 3 }}>
//                     <TextField
//                       error={Boolean(touched.category && errors.category)}
//                       fullWidth
//                       helperText={touched.category && errors.category}
//                       label="Category"
//                       margin="normal"
//                       name="category"
//                       onBlur={handleBlur}
//                       onChange={(e) => setCategory(e.target.value)}
//                       type="text"
//                       value={category}
//                       variant="outlined"
//                     />
//                   </Box>
//                   <Box sx={{ mb: 3 }}>
//                     <TextField
//                       error={Boolean(touched.author && errors.author)}
//                       fullWidth
//                       helperText={touched.author && errors.author}
//                       label="Author"
//                       margin="normal"
//                       name="author"
//                       onBlur={handleBlur}
//                       onChange={(e) => setAuthor(e.target.value)}
//                       type="text"
//                       value={author}
//                       variant="outlined"
//                     />
//                   </Box>
//                   <Box sx={{ mb: 3 }}>
//                     <TextField
//                       error={Boolean(touched.images && errors.images)}
//                       fullWidth
//                       helperText={touched.images && errors.images}
//                       label="Images"
//                       margin="normal"
//                       name="images"
//                       onBlur={handleBlur}
//                       onChange={(e) => setImages(e.target.value)}
//                       type="text"
//                       value={images}
//                       variant="outlined"
//                     />
//                   </Box>
//                   <Box sx={{ mb: 3 }}>
//                     <TextField
//                       error={Boolean(touched.slug && errors.slug)}
//                       fullWidth
//                       helperText={touched.slug && errors.slug}
//                       label="Slug"
//                       margin="normal"
//                       name="slug"
//                       onBlur={handleBlur}
//                       onChange={(e) => setSlug(e.target.value)}
//                       type="text"
//                       value={slug}
//                       variant="outlined"
//                     />
//                   </Box>
//                   {error && <Alert severity="error">{error}</Alert>}
//                   {success && <Alert severity="success">{success}</Alert>}
//                   <Box sx={{ py: 2 }}>
//                     <Button
//                       color="primary"
//                       disabled={loading}
//                       fullWidth
//                       size="large"
//                       type="submit"
//                       variant="contained"
//                     >
//                       {loading ? (
//                         <CircularProgress color="secondary" />
//                       ) : (
//                         "Edit Blog"
//                       )}
//                     </Button>
//                   </Box>
//                 </form>
//               )}
//             </Formik>
//           </Box>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default EditBlog;
