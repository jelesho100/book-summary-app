const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT || 5000

app.use(express.json()); //middleware

mongoose
    .connect(process.env.MONGO_URI, {
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

const userRoutes = require("./routes/users")
app.use('/users', userRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`))