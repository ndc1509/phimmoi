const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RatingSchema = new Schema(
    {
        movie: {
            type: Schema.Types.ObjectId,
            ref: "Movies",
            unique: true
        },
        ratings: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "Users",
                },
                score: {
                    type: Number,
                    required: true,
                    default: 5,
                },
                updatedDate: {
                    type: Date,
                    default: Date.now()
                }
            },
        ],
    }
);

module.exports = mongoose.model("Ratings", RatingSchema);
