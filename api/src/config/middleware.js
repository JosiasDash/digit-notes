const jwt = require("jsonwebtoken");
const db = require("./db");
const env = require("dotenv");
env.config();

function check_authenticated_user(req, res, next) {
    let token = req.headers["authorization"].split(" ")[1];
    if (!token)
        return res.status(401).json({
            message: "Bad authentication"
        })
    jwt.verify(token, process.env.HOST_SECRET, async (error, payload)=> {
        if (error) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        const usersRef = db.collection("users");
        const snapshot = await usersRef.where("id", "==", payload.id).get();
        req.user = snapshot.docs[0].data();
        next();
    });
}

module.exports = {
    check_authenticated_user,
}
