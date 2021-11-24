const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())

const CONN_URL = 'mongodb+srv://SPECJAL:MTG539123@cluster0.wtkcx.mongodb.net/WeatherApp?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

const connection = mongoose.connect(CONN_URL)

if(connection) app.listen(PORT, () => console.log("Running on port " + PORT))
else console.log("Cannot connect to database!")

