const router = require("express").Router();
const {
  verifyToken,
  verifyAdminToken,
} = require("../middlewares/auth.middleware");
const { UserController } = require("../controllers/users/user.controller");

//Get all users data
router.get("/", verifyAdminToken, UserController.getAllUsers);

//Get a user watch list
router.get("/watchList", verifyToken, UserController.getUserWatchList);

//Get a user watch list details
router.get(
  "/watchList/details",
  verifyToken,
  UserController.getUserWatchListDetails
);

//Post add a movie to a user's watch list
router.post("/watchList", verifyToken, UserController.addToWatchList);

//Put remove a movie from user's watch list
router.put("/watchList", verifyToken, UserController.removeFromWatchList);

module.exports = router;
