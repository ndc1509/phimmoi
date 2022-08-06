const router = require("express").Router();
const { verifyAdminToken } = require("../middlewares/auth.middleware");
const { PersonController } = require("../controllers/person/person.controller");

//Get all directors
router.get("/directors", PersonController.getAllDirectors);

//Get all actors
router.get("/actors", PersonController.getAllActors);

//Get all movies of a person
router.get("/:_id", PersonController.getMoviesByPerson);

//Create new person
router.post("/", verifyAdminToken, PersonController.createPerson);

//Update a person
router.put("/", verifyAdminToken, PersonController.updatePerson);

//Delete a person
router.delete("/:_id", verifyAdminToken, PersonController.deletePerson);

module.exports = router;
