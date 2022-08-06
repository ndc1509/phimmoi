const router = require("express").Router();
const { verifyAdminToken } = require("../middlewares/auth.middleware");
const {
  CountryController,
} = require("../controllers/country/country.controller");

//Get all country
router.get("/", CountryController.getAllCountries);

//Create a country
router.post("/", verifyAdminToken, CountryController.createCountry);

module.exports = router;
