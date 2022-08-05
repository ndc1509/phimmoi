const passport = require("passport");
const { Provider } = require("../../../constants");
const User = require("../../../models/User");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
module.exports = function () {
    require("dotenv").config();
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FB_KEY,
                clientSecret: process.env.FB_SECRET,
                callbackURL:
                    "/api/v1/auth/facebook/callback",
                profileFields: ["id", "displayName", "photos", "email"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile._json.email;
                    const existedUser = await User.findOne({ email }).select({
                        password: 0,
                        accessToken: 0,
                        refreshToken: 0,
                    });
                    if (!existedUser) {
                        const newUser = await User.create({
                            userId: profile._json.id,
                            username: profile._json.name,
                            email,
                            picture: profile._json.picture.data.url,
                            provider: Provider.FACEBOOK,
                        });
                        done(null, newUser);
                    } else {
                        done(null, existedUser);
                    }
                } catch (error) {
                    console.log(error);
                    done(error);
                }
            }
        )
    );
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_KEY,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL:
                    "/api/v1/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile._json.email;
                    const existedUser = await User.findOne({ email }).select({
                        password: 0,
                        accessToken: 0,
                        refreshToken: 0,
                    });
                    if (!existedUser) {
                        const newUser = await User.create({
                            userId: profile._json.sub,
                            username: profile._json.name,
                            email,
                            picture: profile._json.picture,
                            provider: Provider.GOOGLE,
                        });
                        done(null, newUser);
                    } else {
                        done(null, existedUser);
                    }
                } catch (error) {
                    console.log(error);
                    done(error);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};
