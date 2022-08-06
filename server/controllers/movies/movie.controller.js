const mongoose = require("mongoose");
//Models
const Movie = require("../../models/Movie");
const Country = require("../../models/Country");
const Genre = require("../../models/Genre");
const Person = require("../../models/Person");
const Rating = require("../../models/Rating");
//Constants
const { selectedMovieFields } = require("../../constants/index");

exports.MovieController = {
  createMovie: async (req, res, next) => {
    const {
      title,
      type,
      year,
      runtimeStr,
      plot,
      directors,
      stars,
      genres,
      countries,
      media,
      contentRating,
      ratings,
    } = req.body;
    try {
      const { countriesData, genresData, directorsData, starsData } =
        await Promise.all([
          Country.find({ _id: { $in: [...countries.map((c) => c._id)] } }),
          Genre.find({ _id: { $in: [...genres.map((c) => c._id)] } }),
          Person.find({ _id: { $in: [...directors.map((c) => c._id)] } }),
          Person.find({ _id: { $in: [...stars.map((c) => c._id)] } }),
        ]).then(([countriesRef, genresRef, directorsRef, starsRef]) => {
          const countriesData = countriesRef.map((country) => ({
            _id: country,
            name: country.name,
          }));
          const genresData = genresRef.map((genre) => ({
            _id: genre,
            name: genre.name,
          }));
          const directorsData = directorsRef.map((director) => ({
            _id: director,
            name: director.name,
          }));
          const starsData = starsRef.map((star) => ({
            _id: star,
            name: star.name,
          }));
          return {
            countriesData,
            genresData,
            directorsData,
            starsData,
          };
        });
      const newMovie = {
        title,
        type,
        year,
        runtimeStr,
        plot,
        countries: countriesData,
        genres: genresData,
        directors: directorsData,
        stars: starsData,
        media,
        contentRating,
        ratings,
      };

      if (type === "movie") {
        newMovie.movieInfo = req.body.movieInfo;
      } else {
        newMovie.tvSeriesInfo = req.body.tvSeriesInfo;
      }

      const movie = await Movie.create(newMovie);
      await Rating.create({
        movie: movie,
      });
      res.status(201).json({
        success: true,
        msg: `${movie.title} Added`,
        movie,
      });
    } catch (error) {
      next(error);
    }
  },

  updateMovie: async (req, res, next) => {
    const {
      _id,
      title,
      type,
      year,
      runtimeStr,
      plot,
      directors,
      stars,
      genres,
      countries,
      media,
      contentRating,
      ratings,
    } = req.body;

    try {
      const { countriesData, genresData, directorsData, starsData } =
        await Promise.all([
          Country.find({ _id: { $in: [...countries.map((c) => c._id)] } }),
          Genre.find({ _id: { $in: [...genres.map((c) => c._id)] } }),
          Person.find({ _id: { $in: [...directors.map((c) => c._id)] } }),
          Person.find({ _id: { $in: [...stars.map((c) => c._id)] } }),
        ]).then(([countriesRef, genresRef, directorsRef, starsRef]) => {
          const countriesData = countriesRef.map((country) => ({
            _id: country,
            name: country.name,
          }));
          const genresData = genresRef.map((genre) => ({
            _id: genre,
            name: genre.name,
          }));
          const directorsData = directorsRef.map((director) => ({
            _id: director,
            name: director.name,
          }));
          const starsData = starsRef.map((star) => ({
            _id: star,
            name: star.name,
          }));
          return {
            countriesData,
            genresData,
            directorsData,
            starsData,
          };
        });
      const updatedMovie = {
        title,
        type,
        year,
        runtimeStr,
        plot,
        countries: countriesData,
        genres: genresData,
        directors: directorsData,
        stars: starsData,
        media,
        contentRating,
        ratings,
      };

      if (type === "movie") {
        updatedMovie.movieInfo = req.body.movieInfo;
      } else {
        updatedMovie.tvSeriesInfo = req.body.tvSeriesInfo;
      }

      const movie = await Movie.findByIdAndUpdate(_id, updatedMovie);
      res.status(201).json({
        success: true,
        msg: `${updatedMovie.title} Edited`,
        movie,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteMovie: async (req, res, next) => {
    const { _id } = req.params;
    try {
      const deletedMovie = await Movie.findByIdAndDelete(_id);
      await Rating.findOneAndDelete({ movie: mongoose.Types.ObjectId(_id) });
      res.status(200).json({
        success: true,
        msg: `Movie ${deletedMovie.title} deleted`,
      });
    } catch (error) {
      next(error);
    }
  },

  getDataForHomepage: async (req, res, next) => {
    const count = await Movie.count();
    const random = Math.floor(Math.random() * count);
    const allMovies = () => Movie.find().select(selectedMovieFields);
    const trendingMoviesPromise = () =>
      Movie.aggregate([
        { $project: selectedMovieFields },
        { $sample: { size: 10 } },
      ]);
    try {
      const [
        popularMovies,
        newReleasesMovies,
        bestMovies,
        trendingMovies,
        randMovie,
      ] = await Promise.all([
        allMovies().sort({ createdAt: -1, updatedAt: -1 }).limit(10),
        allMovies().sort({ year: -1 }).limit(10),
        allMovies().sort({ "ratings.imDbRating": -1 }).limit(10),
        trendingMoviesPromise(),
        Movie.findOne()
          .skip(random)
          .select({ ...selectedMovieFields, media: 1 }),
      ]);
      res.status(200).json({
        success: true,
        msg: "Welcome to our site",
        movies: {
          popularMovies,
          newReleasesMovies,
          bestMovies,
          trendingMovies,
          randMovie,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getAllMovies: async (req, res, next) => {
    try {
      const movies = await Movie.find().select({
        _id: 1,
        title: 1,
        runtimeStr: 1,
        type: 1,
        year: 1,
        ratings: 1,
      });
      res.status(200).json({
        success: true,
        msg: "All movies and tv-series",
        movies,
      });
    } catch (error) {
      next(error);
    }
  },

  getMoviesPaginated: async (req, res, next) => {
    const { type, lastId, limit, genre } = req.params;
    try {
      let movies;
      if (genre === "all") {
        if (!lastId) {
          movies = await Movie.find({ type })
            .limit(limit)
            .select(selectedMovieFields)
            .sort({ _id: -1 });
        } else {
          movies = await Movie.find({
            type,
            _id: { $lt: lastId },
          })
            .limit(limit)
            .select(selectedMovieFields)
            .sort({ _id: -1 });
        }
      } else {
        if (!lastId) {
          movies = await Movie.find({
            type,
            genres: {
              $elemMatch: {
                _id: mongoose.Types.ObjectId(genre),
              },
            },
          })
            .limit(limit)
            .select(selectedMovieFields)
            .sort({ _id: -1 });
        } else {
          movies = await Movie.find({
            type,
            _id: { $lt: lastId },
            genres: {
              $elemMatch: {
                _id: mongoose.Types.ObjectId(genre),
              },
            },
          })
            .limit(limit)
            .select(selectedMovieFields)
            .sort({ _id: -1 });
        }
      }
      res.status(200).json({
        success: true,
        msg: "All movies",
        movies,
      });
    } catch (error) {
      next(error);
    }
  },

  getDetails: async (req, res, next) => {
    const { _id } = req.params;
    if (req)
      if (!_id) return next(new AppError(HttpError.NOT_FOUND, "Invalid Data"));
    try {
      const movie = await Movie.findById(_id);
      const minLength = movie.genres.length >= 2 ? 2 : movie.genres.length;
      const similarMovies = await Movie.aggregate()
        .match({
          _id: { $ne: mongoose.Types.ObjectId(_id) },
        })
        .redact({
          $cond: [
            {
              $gte: [
                {
                  $size: {
                    $setIntersection: ["$genres", movie.genres],
                  },
                },
                minLength,
              ],
            },
            "$$KEEP",
            "$$PRUNE",
          ],
        })
        .project(selectedMovieFields).sample(4)
        // .limit(4);
      res.status(200).json({
        success: true,
        msg: "Get movie details",
        movie,
        similarMovies,
      });
    } catch (error) {
      next(error);
    }
  },

  searchMovies: async (req, res, next) => {
    let { query } = req.params;
    let { lastIds, lastScore, limit } = req.body;
    if (!lastScore || !lastIds) {
      (lastIds = []), (lastScore = 100);
    }
    try {
      const movies = await Movie.aggregate()
        .search({
          compound: {
            should: [
              {
                text: {
                  query: query,
                  path: [
                    "directors.name",
                    "stars.name",
                    "genres.name",
                    "countries.name",
                    "tvSeriesInfo.seasons.title",
                    "tvSeriesInfo.seasons.plot",
                    "tvSeriesInfo.seasons.episodes.title",
                    "tvSeriesInfo.seasons.episodes.plot",
                  ],
                },
              },
              {
                autocomplete: {
                  query: query,
                  path: "title",
                },
              },
              {
                autocomplete: {
                  query: query,
                  path: "plot",
                },
              },
            ],
          },
        })
        .project({
          ...selectedMovieFields,
          searchScore: { $meta: "searchScore" },
        })
        .match({
          searchScore: { $lte: lastScore },
          _id: { $nin: lastIds.map((id) => mongoose.Types.ObjectId(id)) },
        })
        .limit(limit);
      res.status(200).json({
        success: true,
        msg: "Finding movies based on query",
        movies,
      });
    } catch (error) {
      next(error);
    }
  },
};
