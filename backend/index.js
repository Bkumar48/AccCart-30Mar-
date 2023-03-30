const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8080;
const authRouter = require("./routes/authRoute");
const blogRouter = require("./routes/blogRoute");
const BlogCateRouter = require("./routes/BlogCateRoute");
const bodyParser = require("body-parser");
const couponRouter = require("./routes/couponRoute");

const { notFound, errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blog-cate", BlogCateRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/roles", require("./routes/RoleRouter"));
app.use("/api/roles/permissions", require("./routes/RoleRouter"));

dbConnect();
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
