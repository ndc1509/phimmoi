const passport = require("passport");
const argon2 = require("argon2");
const AppError = require("../../utils/AppError");
const User = require("../../models/User");
const { generateTokens, setTokens } = require("./lib/index");
const { AuthAction, HttpError } = require("../../constants");

exports.AuthController = {
  register: async (req, res, next) => {
    const { username, email, password } = req.body;
    //Validate input
    if (!username || !email || !passport)
      return next(
        new AppError(HttpError.NOT_FOUND, "Missing username or password")
      );
    try {
      //Check user existed
      const existedUser = await User.findOne({ email });
      if (existedUser)
        return next(new AppError(HttpError.CONFLICT, "User existed"));
      //Save new user
      const newUser = await User.create({
        username,
        email,
        password: await argon2.hash(password),
      });
      //Gen and save tokens
      const { accessToken, refreshToken } = await setTokens(
        AuthAction.REGISTER,
        newUser
      );
      //Response
      res
        .status(201)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 3600 * 1000,
        })
        .json({
          success: true,
          msg: "User created successfully",
          accessToken,
        });
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      //Gen and save tokens
      const accessToken = await setTokens(AuthAction.REFRESH_TOKEN, req.user);
      //Response
      res.status(200).json({
        success: true,
        msg: "Token refreshed",
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      //Update token in DB
      await setTokens(AuthAction.LOGOUT, req.user);
      req.logout((err) => {
        if (err) return next(err);
        res.status(200).clearCookie("refreshToken").json({
          success: true,
          msg: "User logged out",
        });
      });
    } catch (error) {
      next(error);
    }
  },
  emailLogin: async (req, res, next) => {
    const { email, password } = req.body;
    //Validate input
    if (!email || !password)
      return next(
        new AppError(HttpError.BAD_REQUEST, "Email and password are required")
      );

    try {
      const user = await User.findOne({ email });
      //User does not exist
      if (!user)
        return next(new AppError(HttpError.NOT_FOUND, "Incorrect Email"));

      //A social signed up account without a password
      if (!user.password)
        return next(
          new AppError(
            HttpError.NOT_FOUND,
            "An account is linked with this email address but it doesn't have password"
          )
        );

      //Password do not match
      const isMatched = await argon2.verify(user.password, password);
      if (!isMatched)
        return next(new AppError(HttpError.FORBIDDEN, "Incorrect Password"));
      //Gen and save tokens
      const tokens = await setTokens(AuthAction.LOGIN, user);
      //Response
      res
        .status(200)
        .cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 3600 * 1000,
        })
        .json({
          success: true,
          msg: "User login successfully",
          accessToken: tokens.accessToken,
        });
    } catch (error) {
      next(error);
    }
  },
  facebookLoginCallback: async (req, res, next) => {
    const user = req.user;
    if (!user)
      return next(new AppError(HttpError.UNAUTHORIZED, "Login failed"));
    try {
      //Gen and save tokens
      const tokens = await setTokens(AuthAction.LOGIN, user);
      //Response
      res
        .status(200)
        .cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 3600 * 1000,
        })
        .redirect("http://localhost:3000");
    } catch (error) {
      next(error);
    }
  },
  googleLoginCallback: async (req, res, next) => {
    const user = req.user;
    if (!user)
      return next(new AppError(HttpError.UNAUTHORIZED, "Login failed"));
    try {
      //Gen and save tokens
      const tokens = await setTokens(AuthAction.LOGIN, user);
      //Response
      res
        .status(200)
        .cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 3600 * 1000,
        })
        .redirect("http://localhost:3000");
    } catch (error) {
      next(error);
    }
  },
};
