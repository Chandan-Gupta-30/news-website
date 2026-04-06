const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const app = express();

// Models
const News = require("./models/News");
const Admin = require("./models/Admin");

const SECRET = "mysecretkey";

// Middleware
app.use(cors());
app.use(express.json());

// FILE STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "-");
    const uniqueName = Date.now() + "-" + cleanName;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Serve images
app.use("/uploads", express.static("uploads"));

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

/* ================= AUTH ================= */

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

// VERIFY TOKEN
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json("Access denied");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json("Invalid token");
  }
};

/* ================= ADMIN ================= */

// CREATE ADMIN
app.post("/create-admin", verifyToken, async (req, res) => {
  const { username, password } = req.body;

  const existing = await Admin.findOne({ username });
  if (existing) return res.status(400).json("Admin already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({ username, password: hashedPassword });

  res.json("New admin created ✅");
});

// UPDATE ADMIN
app.put("/update-admin", verifyToken, async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.findByIdAndUpdate(req.user.id, {
    username,
    password: hashedPassword,
  });

  res.json("Admin updated ✅");
});

/* ================= NEWS ================= */

// GET
app.get("/get-news", async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});

// ADD
app.post("/add-news", async (req, res) => {
  await News.create(req.body);
  res.json("News added");
});

// DELETE
app.delete("/delete-news/:id", async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

// UPDATE
app.put("/update-news/:id", async (req, res) => {
  await News.findByIdAndUpdate(req.params.id, req.body);
  res.json("Updated");
});

// UPLOAD
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    imageUrl: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
  });
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});