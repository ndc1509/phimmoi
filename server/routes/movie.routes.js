const router = require("express").Router();
const { MovieController } = require("../controllers/movies/movie.controller");

//Create a movie
router.post("/", MovieController.createMovie);
//Update a movie 
router.put("/", MovieController.updateMovie);
//Delete a movie
router.delete("/:_id", MovieController.deleteMovie)
//Get data for homepage
router.get("/home", MovieController.getDataForHomepage);
//Get all movies
router.get("/", MovieController.getAllMovies);
//Get movies by type, genre paginated
router.get("/:type/:genre/:limit/:lastId?", MovieController.getMoviesPaginated);
// Get all tv-series paginated
// router.get("/tv-series/:limit/:lastId?", MovieController.getTVSeriesPaginated);
//Get a movie details based on id
router.get("/details/:_id", MovieController.getDetails);
//Search
router.post("/search/:query", MovieController.searchMovies);

module.exports = router;
