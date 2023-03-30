const { default: mongoose } = require("mongoose");
const dbConnect = () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected");
  } catch (err) {
    console.log("Database Error");
  }
};

module.exports = dbConnect;
