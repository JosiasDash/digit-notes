const express = require("express");
const app = express();
const uuid = require("uuid");
const db = require("../config/db");
const {check_authenticated_user} = require("../config/middleware");
const prototype = {
    title: "",
    content: "",
    user: "",
}

app.get("/notes", check_authenticated_user, async (req, res)=> {
    const notesRef = db.collection("notes");
    const notes = await notesRef.where("user", "==", req.user.id).get();
    let data = [];
    notes.forEach((result)=> {
        data.push({
            title: result.data()["title"],
            content: result.data()["content"]
        })
    })
    return res.status(200).json({
        notes: data,
    })
})


app.post("/notes", check_authenticated_user, async (req, res)=> {
    const form = req.body;

    if (!form.title || !form.content) {
        return res.status(400).json({
            message: "Invalid form"
        })
    }
    let new_note = prototype;
    new_note.id = uuid.v4();
    new_note.title = form.title;
    new_note.content = form.content;
    new_note.user = req.user.id;
    await db.collection("notes").add(new_note);
    return res.status(200).json({
        message: "Note added"
    })
})

module.exports = app;
