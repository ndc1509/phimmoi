const mongoose = require("mongoose");
//Models
const Movie = require("../../models/Movie");
const Genre = require("../../models/Genre");
//Error
const AppError = require("../../utils/AppError");
const { HttpError, selectedMovieFields } = require("../../constants");
exports.GenreController = {
  getAllGenres: async (req, res, next) => {
    try {
      const genres = await Genre.find();
      res.status(200).json({
        success: true,
        msg: `Found ${genres.length} genre${genres.length > 1 ? "s" : ""}`,
        genres,
      });
    } catch (error) {
      next(error);
    }
  },
  getMoviesByGenre: async (req, res, next) => {
    const { _id } = req.params;
    if (!_id) return next(new AppError(HttpError.NOT_FOUND, "Invalid Data"));
    try {
      const [genre, movies] = await Promise.all([
        Genre.findById(_id),
        Movie.find({
          genres: {
            $elemMatch: {
              _id: mongoose.Types.ObjectId(_id),
            },
          },
        }).select(selectedMovieFields),
      ]);
      res.status(200).json({
        success: true,
        msg: `Found ${movies.length} movie${movies.length > 1 ? `s` : ``}`,
        genre,
        movies,
      });
    } catch (error) {
      next(error);
    }
  },
  createGenre: async (req, res, next) => {
    const { name } = req.body;
    if (!name)
      return next(new AppError(ClientError.BAD_REQUEST, "Invalid data"));
    try {
      const genre = await Genre.create({ name });
      res.status(201).json({
        success: true,
        msg: "Genre Added",
        genre,
      });
    } catch (error) {
      next(error);
    }
  },
};
