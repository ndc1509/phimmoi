const mongoose = require("mongoose");
const { Role, Provider } = require("../constants");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    userId: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      enum: [Provider.GOOGLE, Provider.FACEBOOK],
    },
    role: {
      type: String,
      enum: [Role.ADMIN, Role.USER],
      default: Role.USER,
      required: true,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    watchList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movies",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
