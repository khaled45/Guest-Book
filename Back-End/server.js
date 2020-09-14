const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors");
const server = require('http').createServer(app)

app.use(bodyParser.json())


mongoose.connect("mongodb://localhost:27017/GuestBook")
mongoose.connection.on("error", err => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
});

app.use(
    cors({
        origin: ' http://localhost:4200',
        credentials: true
    })
)

var guest = require("./controllers/guest")
app.use("/guest", guest)


app.get('/', (req, res) => {
    res.json({ "message": "Server is running ........." })
})

server.listen(8080)