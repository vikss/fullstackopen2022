const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const blog = require("../models/blog")
const BlogModel = require("../models/blog")

const blogsList = [{ "title":"Why is there activated charcoal in everything?",
    "author":"Sara Hussain",
    "url":"https://tweakindia.com/wellness/health/why-is-there-activated-charcoal-in-everything/",
    "likes":30 },
{ "title":"9 best-loved bookstores across the country, from Mussoorie to Mumbai",
    "author":"Mitali Shah",
    "url":"https://tweakindia.com/tweak-book-club/9-best-loved-bookstores-across-the-country-from-mussoorie-to-mumbai/",
    "likes":10 },
{
    "title":"Hoarding stationery is the best kind of hoarding",
    "author":"Tweak Editors",
    "url":"https://tweakindia.com/living/design/stationery-shopping-journals-organisers/",
    "likes":10

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

test("blogs are returned as json",async () => {

    await api.get("/api/blogs").expect(200).expect("Content-Type","application/json; charset=utf-8")

},10000)
test("three number of blogs", async () => {

    let res = await api.get("/api/blogs")
    expect(res.body).toHaveLength(blogsList.length)
},10000)
test("expected title", async () => {

    let res = await api.get("/api/blogs")
    let titles = res.body.map(r => r.title)
    expect(titles).toContain("Hoarding stationery is the best kind of hoarding")

},10000)
afterAll(async () => {
    await mongoose.connection.close()
})