const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

function isValidEmail(email) {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(email);
}

function cryptPassword(password) {
    let salt = crypt.genSaltSync(12);
    let hashedPassword = crypt.hashSync(password, salt);
    return hashedPassword;
}

function generate_token(payload) {
    return jwt.sign(payload, process.env.HOST_SECRET);
}

module.exports = {isValidEmail, cryptPassword, generate_token};