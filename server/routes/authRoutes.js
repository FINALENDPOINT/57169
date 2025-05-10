const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { register } = require("../controllers/authSqlController");

// Middleware
// router.use(
//   cors({
//     credentials: true,
//     origin: "5173",
//   })
// );

router.get("/", test);
router.post("/register", register);
// router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

module.exports = router;
