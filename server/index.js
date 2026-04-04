const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

const app = express();

// Models
const News = require("./models/News");
const Admin = require("./models/Admin");

const SECRET = "mysecretkey";

// Middleware
app.use(cors());
app.use(express.json());

/* ================== FILE UPLOAD ================== */

// FILE STORAGE CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "-");
    const uniqueName = Date.now() + "-" + cleanName;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// SERVE STATIC FILES
app.use("/uploads", express.static("uploads"));

/* ================== DATABASE ================== */

// 🔥 IMPORTANT: Use Atlas (environment variable)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch((err) => console.log(err));

/* ================== NEWS ROUTES ================== */

// GET NEWS
app.get("/get-news", async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});

// ADD NEWS
app.post("/add-news", async (req, res) => {
  const newNews = new News(req.body);
  await newNews.save();
  res.json("News added");
});

// UPLOAD IMAGE
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    // 🔥 IMPORTANT: use dynamic host (for Render)
    imageUrl: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
  });
});

// DELETE NEWS
app.delete("/delete-news/:id", async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json("News deleted");
});

// UPDATE NEWS
app.put("/update-news/:id", async (req, res) => {
  await News.findByIdAndUpdate(req.params.id, req.body);
  res.json("News updated");
});

/* ================== AUTH ================== */

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: admin._id }, SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

/* ================== SERVER ================== */

// 🔥 IMPORTANT: dynamic port for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} 🚀`);
});