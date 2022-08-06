const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const MovieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["movie", "tvSeries"],
      default: "movie",
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    runtimeStr: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    directors: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "People",
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    stars: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "People",
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    genres: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Genres",
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    countries: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Countries",
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    media: {
      image: {
        type: String,
        required: true,
      },
      logo: {
        type: String,
        required: true,
      },
      backdrop: {
        type: String,
        required: true,
      },
      previewVideo: {
        type: String,
      },
      trailers: [
        {
          title: {
            type: String,
          },
          videoLink: {
            type: String,
          },
        },
      ],
    },
    contentRating: {
      type: String,
      required: true,
    },
    ratings: {
      imDbRating: {
        type: Number,
        default: 0,
      },
      userRating: {
        type: Number,
        default: 0,
      },
    },
    movieInfo: {
      videoLink: {
        type: String,
      },
    },
    tvSeriesInfo: {
      seasons: [
        {
          seasonNumber: {
            type: Number,
            require: true,
          },
          title: {
            type: String,
          },
          plot: {
            type: String,
          },
          year: {
            type: Number,
          },
          totalEpisodes: {
            type: Number,
          },
          episodes: [
            {
              episodeNumber: {
                type: Number,
                required: true,
              },
              title: {
                type: String,
              },
              plot: {
                type: String,
              },
              thumbnail: {
                type: String,
              },
              runtimeStr: {
                type: String,
              },
              videoLink: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

MovieSchema.index({
  title: "text",
  plot: "text",
  "directors.name": "text",
  "stars.name": "text",
  "genres.name": "text",
  "countries.name": "text",
  "tvSeriesInfo.seasons.title": "text",
  "tvSeriesInfo.seasons.plot": "text",
  "tvSeriesInfo.seasons.episodes.title": "text",
  "tvSeriesInfo.seasons.episodes.plot": "text",
});
MovieSchema.index({
  title: 1,
  year: -1,
});
module.exports = mongoose.model("Movies", MovieSchema);
