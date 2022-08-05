const jwt = require("jsonwebtoken");
const { AuthAction } = require("../../../constants");
const User = require("../../../models/User");

//Generate access and refresh tokens based on user's data
const generateTokens = (payload) => {
    const { _id, username, picture, email, role } = payload;
    const accessToken = jwt.sign(
        { _id: _id, username, picture, email, role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "100s" }
    );
    const refreshToken = jwt.sign(
        { _id: _id, username, email, role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "24h" }
    );
    return { accessToken, refreshToken };
};

//Set tokens in DB
// LOGIN, REGISTER => set access and refresh tokens
// LOGOUT => set tokens to null
// REFRESH => set new access token
const setTokens = async (action, user) => {
    try {
        if (action === AuthAction.LOGIN || action === AuthAction.REGISTER) {
            const { accessToken, refreshToken } = generateTokens(user);
            await User.findByIdAndUpdate(
                { _id: user._id },
                { accessToken, refreshToken }
            );
            return { accessToken, refreshToken };
        }

        if (action === AuthAction.REFRESH_TOKEN) {
            const { accessToken } = generateTokens(user);
            await User.findByIdAndUpdate({ _id: user._id }, { accessToken });
            return accessToken;
        }
        if (action === AuthAction.LOGOUT) {
            await User.findByIdAndUpdate(
                { _id: user._id },
                { accessToken: null, refreshToken: null }
            );
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { generateTokens, setTokens };
