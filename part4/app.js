const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const router = require("./controllers/blog")
const config = require("./utils/config")
const logger = require("./utils/logger")
const mongoose = require("mongoose")
logger.info(`Mongo url is ${config.MONGODB_URI}`)
mongoose.set("strictQuery", false)

mongoose.connect(config.MONGODB_URI)
logger.info(`Mongoose connection state is: ${mongoose.connection.readyState}`)
app.use(cors())
app.use(express.json())
app.use("/api/blogs", router)


module.exports = app