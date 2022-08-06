const router = require("express").Router();
const { verifyAdminToken } = require("../middlewares/auth.middleware");
const { GenreController } = require("../controllers/genres/genre.controller");

//Get all genres
router.get("/", GenreController.getAllGenres);

//Get all movies by genre
router.get("/:_id", GenreController.getMoviesByGenre);

//Create a genre
router.post("/", verifyAdminToken, GenreController.createGenre);

module.exports = router;
