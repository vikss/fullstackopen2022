const router = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")
router.get("/", (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

router.post("/", (request, response) => {
    const blog = new Blog(request.body)
    logger.info("Posting a new entry")
    logger.info(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = router