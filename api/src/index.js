const express = require("express");
const env = require("dotenv");
const app = express();
env.config();
const port = process.env.HOST_PORT;

app.listen(port, ()=>{
    console.log(`Digit notes api is listening on ${port}`);
})
