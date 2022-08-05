const Role = {
  ADMIN: "ADMIN",
  USER: "USER",
};

const Provider = {
  GOOGLE: "GOOGLE",
  FACEBOOK: "FACEBOOK",
};

const AuthAction = {
  REGISTER: "REGISTER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REFRESH_TOKEN: "REFRESH_TOKEN",
};

const MovieType = {
  TV_SERIES: "TV_SERIES",
  MOVIE: "MOVIE",
};

const HttpError = {
  BAD_REQUEST: { code: 400, name: "Bad Request" },
  UNAUTHORIZED: { code: 401, name: "Unauthorized" },
  // PAYMENT_REQUIRED: "Payment Required",
  FORBIDDEN: { code: 403, name: "Forbidden" },
  NOT_FOUND: { code: 404, name: "Not Found" },
  CONFLICT: { code: 409, name: "Conflict" },
  INTERNAL_SERVER_ERROR: { code: 500, name: "Internal Server Error" },
};

const selectedMovieFields = {
  _id: 1,
  type: 1,
  title: 1,
  media: { image: 1 },
};

module.exports = {
  Role,
  Provider,
  AuthAction,
  MovieType,
  HttpError,
  selectedMovieFields,
};
