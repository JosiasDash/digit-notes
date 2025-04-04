const express = require("express");
const uuid = require("uuid");
const app = express();
const {isValidEmail, cryptPassword, generate_token} = require("../utils");
const db = require("../config/db");
const crypt = require("bcrypt");

const prototype = {
    email: "",
    password: "",
    id: "",
}

app.post("/register", async (req, res)=> {
    const form = req.body;
    if (!form.email || !form.password || form.password.length < 4 || !isValidEmail(form.email))
        return res.status(400).json({
            message: "Invalid credential"
        });
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", form.email).get();
    let users = snapshot.docs;
    if (!snapshot.empty || users.length != 0) {
        return res.status(400).json({
            message: "Email address already used"
        })
    }
    const hashedPassword = cryptPassword(form.password);
    let user = prototype;
    user.email = form.email;
    user.password = hashedPassword;
    user.id = uuid.v4();
    await db.collection("users").add(user);
    return res.status(200).json({
        message: "User successfully registered"
    })
})

app.post("/login", async (req, res)=> {
    const form = req.body;
    if (!form.email || !form.password) {
        return res.status(400).json({
            message: "Invalid credential"
        })
    }
    const usersRef = db.collection("users");
    const snapshot = usersRef.where("email", "==", form.email).get();
    let users = (await snapshot).docs;
    if (snapshot.empty || users.length == 0) {
        return res.status(400).json({
            message: "Account not found"
        })
    } else {
        console.log("The snaphot is not empty");
        (await snapshot).forEach((result)=> {
            console.log(`User ${result.data()["id"]}`);
        })
    }

    let user = (await snapshot).docs[0];
    if (!crypt.compareSync(form.password, user.data()["password"])) {
        return res.status(400).json({
            message: "Invalid credential"
        })
    }
    const token = generate_token({id: user.data()["id"]});
    return res.status(200).json({
        message: "Successfully signin",
        access_token: token
    })
})

module.exports = app;
