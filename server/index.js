const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
require("colors")

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"))

// Database
const database = require("./config/keys").mongoURI
const msg = "Connection to mongoDB:"
mongoose
  .connect(database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log(msg, "SUCCESS".bgGreen.brightWhite))
  .catch((err) => {
    console.log(msg, "FAILED".bgRed.brightWhite)
    console.log({ error: err.code })
  })

// Api objects
const classes = require("./routes/api/classes")
const subjects = require("./routes/api/subjects")
const chapters = require("./routes/api/chapters")
const topics = require("./routes/api/topics")
const question = require("./routes/api/questions")
const faqs = require("./routes/api/faqs")
const qa = require("./routes/api/qa")
const user = require("./routes/api/user")
const results = require("./routes/api/results")
const general = require("./routes/api/general")

// Routes
const { protectedRoute } = require("./utils/auth")
// Data routes
app.use("/api/classes", classes)
app.use("/api/subjects", protectedRoute, subjects)
app.use("/api/chapters", protectedRoute, chapters)
app.use("/api/topics", protectedRoute, topics)
app.use("/api/topics", protectedRoute, question)
app.use("/api/faqs", faqs)
app.use("/api/q&a", qa)
app.use("/api/results", results)
app.use("/api/general", general)
// User route
app.use("/api/user", user)

// PORT listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is listenting to port: ${PORT}`))
