const router = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")
router.get("/", async (request, response) => {
    const list = await Blog.find({})
    logger.info(list)
    response.json(list)

})

router.post("/", async (request, response) => {

    logger.info(`Request obtained is ${request.body}`)
    logger.info(`Title supplied is {request.body.title}`)
    logger.info(`Url supplied is {request.body.url}`)
    if(!request.body.title || !request.body.url){
      logger.info("Either title or url is not supplied in the request")
      response.status(400).send('Bad Request')

    }
    else{
    const blog = new Blog(request.body)
    logger.info("Posting a new entry")
    logger.info(request.body)

    let result = await blog.save()
    response.status(201).json(result)
    }



})

module.exports = router