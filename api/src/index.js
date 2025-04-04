const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const app = express();
const public = require("./features/public");
const user = require("./features/user");
env.config();
const port = process.env.HOST_PORT;

app.use(cors({
    origin: '*'
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(public);
app.use(user);

app.listen(port, ()=>{
    console.log(`Digit notes api is listening on ${port}`);
})
