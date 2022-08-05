const mongoose = require("mongoose");
//Models
const Movie = require("../../models/Movie");
const Rating = require("../../models/Rating");

exports.RatingController = {
  getRating: async (req, res, next) => {
    const { _id } = req.body;
    const user = req.user;
    try {
      const ratingData = await Rating.findOne({
        movie: mongoose.Types.ObjectId(_id),
        ratings: {
          $elemMatch: {
            user: mongoose.Types.ObjectId(user._id),
          },
        },
      });
      res.status(200).json({
        success: true,
        msg: ratingData ? "Found something" : "No rating found",
        rating:
          ratingData?.ratings.find((r) => {
            return r.user.valueOf() == user._id;
          }).score || null,
      });
    } catch (error) {
      next(error);
    }
  },
  submitRating: async (req, res, next) => {
    const { _id, score = 5 } = req.body;
    const user = req.user;
    try {
      //Find movie
      const movie = await Rating.findOne({
        movie: mongoose.Types.ObjectId(_id),
      });
      //Movie not found in rating collection, create one
      if (!movie)
        await Rating.create({
          movie: mongoose.Types.ObjectId(_id),
          ratings: [],
        });
      //Rating existed
      const existedRating = await Rating.findOneAndUpdate(
        {
          movie: mongoose.Types.ObjectId(_id),
          ratings: {
            $elemMatch: {
              user: mongoose.Types.ObjectId(user._id),
            },
          },
        },
        {
          $set: {
            "ratings.$.score": score,
            "ratings.$.updatedDate": Date.now(),
          },
        }
      );
      //Rating is new
      if (!existedRating) {
        await Rating.findOneAndUpdate(
          {
            movie: mongoose.Types.ObjectId(_id),
          },
          {
            $push: {
              ratings: {
                user: mongoose.Types.ObjectId(user._id),
                score: score,
              },
            },
          }
        );
      }
      res.status(201).json({
        success: true,
        msg: "Thanks for your rating",
      });
      const newScore = await Rating.aggregate([
        {
          $match: {
            movie: mongoose.Types.ObjectId(_id),
          },
        },
        {
          $addFields: {
            avg: {
              $avg: "$ratings.score",
            },
          },
        },
      ]);

      await Movie.findByIdAndUpdate(_id, {
        $set: {
          "ratings.userRating": newScore[0].avg,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
