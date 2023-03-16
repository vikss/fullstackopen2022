const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const BlogModel = require("../models/blog")
const logger = require("../utils/logger")


jest.setTimeout(20000)
logger.info(`Mongoose connection state is: ${mongoose.connection.readyState}`)
const blogsList = [{
    "title": "Why is there activated charcoal in everything?",
    "author": "Sara Hussain",
    "url": "https://tweakindia.com/wellness/health/why-is-there-activated-charcoal-in-everything/",
    "likes": 30
},
{
    "title": "9 best-loved bookstores across the country, from Mussoorie to Mumbai",
    "author": "Mitali Shah",
    "url": "https://tweakindia.com/tweak-book-club/9-best-loved-bookstores-across-the-country-from-mussoorie-to-mumbai/",
    "likes": 10
},
{
    "title": "Hoarding stationery is the best kind of hoarding",
    "author": "Tweak Editors",
    "url": "https://tweakindia.com/living/design/stationery-shopping-journals-organisers/",
    "likes": 10

}
]

const api = supertest.agent(app)
beforeEach(async () => {
    await BlogModel.deleteMany({})
    let entry = new BlogModel(blogsList[0])
    await entry.save()
    entry = new BlogModel(blogsList[1])
    await entry.save()
    entry = new BlogModel(blogsList[2])
    await entry.save()

})

test("blogs are returned as json", async () => {

    await api.get("/api/blogs").expect(200).expect("Content-Type", "application/json; charset=utf-8")

}, 10000)
test("three number of blogs", async () => {

    let res = await api.get("/api/blogs")
    expect(res.body).toHaveLength(blogsList.length)
}, 10000)
test("expected title", async () => {

    let res = await api.get("/api/blogs")
    let titles = res.body.map(r => r.title)
    expect(titles).toContain("Hoarding stationery is the best kind of hoarding")

}, 10000)
test("a valid blog entry can be added", async () => {
    let entry = {
        "title": "12 holiday reads that make the best travel companions",
        "author": "Kahini Iyer",
        "url": "https://tweakindia.com/living/travel/12-holiday-reads-that-make-the-best-travel-companions/",
        "likes": 12
    }
    let res = await api.get("/api/blogs")
    let countBlogs = res.body.length
    logger.log(`Number of blogs before the post request ${countBlogs}`)
    logger.log("Adding a new blog")
    let response = await api.post("/api/blogs").send(entry).expect(201).expect("Content-Type", "application/json; charset=utf-8")

    res = await api.get("/api/blogs")
    let titles = res.body.map(r => r.title)
    let newCountBlogs = res.body.length
    expect(newCountBlogs).toBe(countBlogs + 1)
    expect(titles).toContain("12 holiday reads that make the best travel companions")


}, 10000)
test("id property is returned", async () => {

    let res = await api.get("/api/blogs")
    let ids = res.body.map(r => r.id)

    expect(ids[0]).toBeDefined()

})
test("add a blog without likes property", async () => {

    let entry = {
        "title": "Vogue edits",
        "author": "Anna Vintour",
        "url": "https://vogue.com/edits/",
    }
    let response = await api.post("/api/blogs").send(entry)
    let res = await api.get("/api/blogs")
    res = res.body.filter(r => r.title === "Vogue edits")
    logger.info(res[0].likes)
    expect(res[0].likes).toBe(0)


})
test("fail to add an entry without title and url", async () => {

    let entry = {
        "author": "Anna Vintour",

    }
    let response = await api.post("/api/blogs").send(entry).expect(400)

})

afterAll(async () => {
    await mongoose.connection.close()
})