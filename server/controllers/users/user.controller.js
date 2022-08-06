const mongoose = require("mongoose");
//Models
const Movie = require("../../models/Movie");
const User = require("../../models/User");
//Constants
const { selectedMovieFields } = require("../../constants/index");

exports.UserController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find().select({
        _id: 1,
        username: 1,
        email: 1,
        role: 1,
      });
      res.status(200).json({
        success: true,
        msg: "Found all users",
        users,
      });
    } catch (error) {
      next(error);
    }
  },
  getUserWatchList: async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      msg: `${user.username}'s watchList`,
      watchList: user.watchList.map((movieId) => movieId.valueOf()),
    });
  },
  getUserWatchListDetails: async (req, res, next) => {
    const user = req.user;
    try {
      const watchListDetails = await Movie.find(
        { _id: { $in: user.watchList } },
        { ...selectedMovieFields }
      );
      res.status(200).json({
        success: true,
        msg: `${user.username}'s watchList`,
        watchList: watchListDetails,
      });
    } catch (error) {
      next(error);
    }
  },
  addToWatchList: async (req, res, next) => {
    const { _id } = req.body;
    const user = req.user;
    try {
      const movie = await Movie.findById(_id);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          $addToSet: {
            watchList: movie,
          },
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        msg: `${movie.title} has been added to watch list`,
        watchList: updatedUser.watchList,
      });
    } catch (error) {
      next(error);
    }
  },
  removeFromWatchList: async (req, res, next) => {
    const { _id } = req.body;
    const user = req.user;
    try {
      const movie = await Movie.findById(_id);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          $pull: {
            watchList: mongoose.Types.ObjectId(_id),
          },
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        msg: `${movie.title} has been removed from watch list`,
        watchList: updatedUser.watchList,
      });
    } catch (error) {
      next(error);
    }
  },
};
