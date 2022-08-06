const router = require("express").Router();
const { verifyAdminToken } = require("../middlewares/auth.middleware");
const { MovieController } = require("../controllers/movies/movie.controller");

//Create a movie
router.post("/", verifyAdminToken, MovieController.createMovie);

//Update a movie
router.put("/", verifyAdminToken, MovieController.updateMovie);

//Delete a movie
router.delete("/:_id", verifyAdminToken, MovieController.deleteMovie);

//Get data for homepage
router.get("/home", MovieController.getDataForHomepage);

//Get all movies
router.get("/", MovieController.getAllMovies);

//Get movies by type, genre paginated
router.get("/:type/:genre/:limit/:lastId?", MovieController.getMoviesPaginated);

//Get a movie details based on id
router.get("/details/:_id", MovieController.getDetails);

//Search
router.post("/search/:query", MovieController.searchMovies);

module.exports = router;
