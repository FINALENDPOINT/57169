const express = require("express");
const router = express.Router();
const cors = require("cors");
const fileUpload = require("express-fileupload"); // Impor express-fileupload
const {
  test,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { register } = require("../controllers/authSqlController");
const { login } = require("../controllers/authLoginController");
const { registerauthor } = require("../controllers/authRegisSUMController");
const { loginAuthor } = require("../controllers/authLoginSUMController");
const { storeSuara } = require("../controllers/storeSuaraController");

// Middleware
// router.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

router.use(
  fileUpload({
    createParentPath: true,
  })
);

router.get("/", test);
router.post("/register", register);
router.post("/Registerauthor", registerauthor);
router.post("/loginAuthor", loginAuthor);

router.post("/storeSuara", storeSuara);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

module.exports = router;
