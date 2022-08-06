const router = require("express").Router();
const passport = require("passport");
const {
  verifyToken,
  verifyRefreshToken,
} = require("../middlewares/auth.middleware");

const { AuthController } = require("../controllers/auth/auth.controller");
//Register
router.post("/register", AuthController.register);

//Verify refresh token then give new one for user
router.post("/token", verifyRefreshToken, AuthController.refreshToken);

//Verify token then logout
router.post("/logout", verifyToken, AuthController.logout);

//Login by email
router.post("/login", AuthController.emailLogin);

//Facebook login
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    assignProperty: "user",
    scope: ["email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/login",
    failureMessage: true,
  }),
  AuthController.facebookLoginCallback
);

//Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    failureMessage: true,
  }),
  AuthController.googleLoginCallback
);

module.exports = router;
