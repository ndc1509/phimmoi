const {
  CountryController,
} = require("../controllers/country/country.controller");
const router = require("express").Router();

//Get all country
router.get("/", CountryController.getAllCountries);
//Create a country
router.post("/", CountryController.createCountry);

module.exports = router;
