const mongoose = require("mongoose");
//Models
const Person = require("../../models/Person");
const Movie = require("../../models/Movie");
//Error
const AppError = require("../../utils/AppError");
const { HttpError, selectedMovieFields } = require("../../constants");

exports.PersonController = {
  getAllDirectors: async (req, res, next) => {
    try {
      const directors = await Person.find({
        role: "director",
      });
      res.status(200).json({
        success: true,
        msg: `Found ${directors.length} director${
          directors.length > 1 ? "s" : ""
        }`,
        directors,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllActors: async (req, res, next) => {
    try {
      const actors = await Person.find({
        role: "actor",
      });
      res.status(200).json({
        success: true,
        msg: `Found ${actors.length} actor${actors.length > 1 ? "s" : ""}`,
        actors,
      });
    } catch (error) {
      next(error);
    }
  },
  getMoviesByPerson: async (req, res, next) => {
    const { _id } = req.params;
    if (!_id) return next(new AppError(HttpError.NOT_FOUND, "Invalid Data"));
    try {
      const [person, movies] = await Promise.all([
        Person.findById(_id),
        Movie.find({
          $or: [
            {
              directors: { _id: mongoose.Types.ObjectId(_id) },
            },
            {
              stars: { _id: mongoose.Types.ObjectId(_id) },
            },
          ],
        }).select(selectedMovieFields),
      ]);
      res.status(200).json({
        success: true,
        msg: `Found ${movies.length} movie${movies.length > 1 ? "s" : ""}`,
        person,
        movies,
      });
    } catch (error) {
      next(error);
    }
  },
  createPerson: async (req, res, next) => {
    const { name, role } = req.body;
    if (!name || !role)
      return next(new AppError(HttpError.NOT_FOUND, "Invalid Data"));
    try {
      const person = await Person.create({ name, role });
      res.status(201).json({
        success: true,
        msg: `${name} Added`,
        person,
      });
    } catch (error) {
      next(error);
    }
  },
  updatePerson: async (req, res, next) => {
    const { _id, name, role } = req.body;
    if (!_id || !name)
      return next(new AppError(HttpError.NOT_FOUND), "Invalid Data");
    try {
      const person = await Person.findByIdAndUpdate(
        _id,
        { name, role },
        { new: true }
      );
      res.status(200).json({
        success: true,
        msg: `${name} Updated`,
        person,
      });
    } catch (error) {
      next(error);
    }
  },
  deletePerson: async (req, res, next) => {
    const { _id } = req.params;
    if (!_id) return next(new AppError(HttpError.NOT_FOUND), "Invalid Data");
    try {
      const person = await Person.findByIdAndDelete(_id);
      res.status(200).json({
        success: true,
        msg: `${person.name} Deleted`,
        person,
      });
    } catch (error) {
      next(error);
    }
  },
};
