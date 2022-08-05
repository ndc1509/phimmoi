const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const PersonSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        role: [
            {
                type: String,
                enum: ["actor", "director"],
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("People", PersonSchema);
