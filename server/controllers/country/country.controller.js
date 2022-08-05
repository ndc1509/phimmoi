const mongoose = require("mongoose");
const Country = require("../../models/Country");

exports.CountryController = {
  getAllCountries: async (req, res, next) => {
    try {
      const countries = await Country.find();
      res.status(200).json({
        success: true,
        msg: `Found ${countries.length} countr${
          countries.length > 1 ? "ies" : "y"
        }`,
        countries,
      });
    } catch (error) {
      next(error);
    }
  },
  createCountry: async (req, res, next) => {
    const { name } = req.body;
    if (!name) return next(new AppError(HttpError.NOT_FOUND, "Invalid Data"));
    try {
      const country = await Country.create({ name });
      res.status(201).json({
        success: true,
        msg: "Country Added",
        country,
      });
    } catch (error) {
      next(error);
    }
  },
};
