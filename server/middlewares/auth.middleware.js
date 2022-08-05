const jwt = require("jsonwebtoken");
const { Role, ClientError, HttpError } = require("../constants");
const User = require("../models/User");
const AppError = require("../utils/AppError");
//Check access token
const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const accessToken = authHeader && authHeader.split(" ")[1];

  //Token not found
  if (!accessToken)
    return next(new AppError(HttpError.NOT_FOUND, "Token not found"));

  try {
    //Decode token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    //User role
    const user = await User.findOne({
      _id: decoded._id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
      //accessToken,
    });
    //User not found
    if (!user) return next(new AppError(HttpError.FORBIDDEN, "User not found"));
    //Forward
    req.user = user;
    next();
  } catch (error) {
    next(new AppError(HttpError.FORBIDDEN, "Invalid token", error));
  }
};

//Check refresh token
const verifyRefreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  //Token not found
  if (!refreshToken)
    return next(new AppError(HttpError.NOT_FOUND, "Token not found"));
  try {
    //Decode token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    //Find user
    const user = await User.findOne({
      _id: decoded._id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
      refreshToken,
    });
    //User not found
    if (!user) return next(new AppError(HttpError.NOT_FOUND, "User not found"));
    //Forward
    req.user = user;
    next();
  } catch (error) {
    next(new AppError(HttpError.FORBIDDEN, "Invalid token", error));
  }
};

module.exports = { verifyRefreshToken, verifyToken };
