const cors = require('cors');
const express = require('express');
require('dotenv').config()
const router = require("./routes")

const app = express()

const corsOption = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: [
        "x-auth-token",
        "authorization",
    ]
};

app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", router)

const PORT = process.env.PORT || 8000

console.log("process.env.PORT------------",process.env.PORT);
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));