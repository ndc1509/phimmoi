const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});
module.exports = {
    webpack: {
        alias: {
            "@components": path.resolve(__dirname, "src/components/"),
            "@types": path.resolve(__dirname, "src/types"),
            "@api": path.resolve(__dirname, "src/api/modules/"),
            "@hooks": path.resolve(__dirname, "src/hooks/"),
            "@store": path.resolve(__dirname, "src/store/"),
        },
        plugins: [new webpack.DefinePlugin(envKeys)],
    },
};
