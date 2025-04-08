const express = require("express");
const router = express.Router();
const cors = require("cors");
const { newsController } = require("../controllers/newsController");

// Middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/berita", newsController);
