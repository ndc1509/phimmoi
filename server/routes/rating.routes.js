const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const { RatingController } = require("../controllers/rating/rating,controller");

//Get a rating
router.post("/", verifyToken, RatingController.getRating);

//Submit a rating
router.post("/submit", verifyToken, RatingController.submitRating);

module.exports = router;
