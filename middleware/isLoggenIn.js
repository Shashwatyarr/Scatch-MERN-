const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

module.exports = async function (req, res, next) {
    // If token is not present, redirect with flash
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }

    try {
        // Verify the token
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // Find user from DB
        const user = await usermodel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/");
        }

        // Attach user to request
        req.user = user;

        next(); // Allow route to continue
    } catch (err) {
        req.flash("error", "Invalid or expired token");
        return res.redirect("/");
    }
};
