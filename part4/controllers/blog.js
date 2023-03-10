const router = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")
router.get("/", async (request, response) => {
    const list = await Blog.find({})
    logger.info(list)
    response.json(list)

})

router.post("/", async (request, response) => {

    logger.info(request)
    const blog = new Blog(request.body)
    logger.info("Posting a new entry")
    logger.info(request.body)

    let result = await blog.save()
    response.status(201).json(result)



})

module.exports = router