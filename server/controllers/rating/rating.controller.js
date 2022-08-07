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
    const { _id, score } = req.body;
    const user = req.user;
    const updateRating = async () => {
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

      let rounded = parseFloat(
        (Math.round(newScore[0].avg * 100) / 100).toFixed(1)
      );
      if (rounded === newScore[0].avg) rounded = newScore[0].avg;
      await Movie.findByIdAndUpdate(_id, {
        $set: {
          "ratings.userRating": rounded,
        },
      });
    }
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
      //If user removes the rating
      if (score === -1) {
        const data = await Rating.findOneAndUpdate(
          {
            movie: mongoose.Types.ObjectId(_id),
            ratings: {
              $elemMatch: {
                user: mongoose.Types.ObjectId(user._id),
              },
            },
          },
          {
            $pull: {
              ratings: {
                user: mongoose.Types.ObjectId(user._id),
              },
            },
          }
        );
        console.log(data)
        updateRating()
        return res.status(201).json({
          success: true,
          msg: "Rating removed",
        });
      }

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
      updateRating()
    } catch (error) {
      next(error);
    }
  },
};
