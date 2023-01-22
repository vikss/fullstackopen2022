const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const config = require("./utils/config")
const router = require("./controllers/blog")


mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use("/api/blogs", router)




const PORT = config.PORT
app.listen(PORT, () => {
    logger.log(`Server running on port ${PORT}`)
})
module.export = app