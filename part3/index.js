const express = require("express")
const PORT = process.env.PORT || 3001
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./model/person")
require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors())
morgan.token("bodycontent", (req, res) => {

    return JSON.stringify(req.body)


})
app.use(express.static("build"))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :bodycontent"))



app.delete("/api/persons/:id", (request, response, next) => {
    console.log(`Delete request for id - ${request.params.id}`)
    Person.findByIdAndRemove(request.params.id).then(res => {
        if (res)
            response.status(204).end()
        else
            response.status(404).end()

    }).catch(err => {
        next(err)

    })


})

app.post("/api/persons", (request, response, next) => {

    const body = request.body
    const person = new Person({ name: body.name, number: body.number })
    if (!person.name || !person.number) {
        response.status(404).send({ error: "name and number must be present in the request" })
    }

    person.save().then((saved) => {

        console.log(person.name)
        console.log(person.number)

        return response.json(person)
    }).catch((error) => { next(error) })

})
app.get("/api/persons", (request, response, next) => {
    Person.find({}).then((result) => {
        if (result)
            response.json(result)

        else
            response.status(204).json({ error: "No content" })
    }
    ).catch(error => { next(error) })
})
app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id).then(result => {
        console.log(result)
        if (result)
            response.json(result)

        else
            response.status(404).json({ error: "no content found" })
    }).catch(error => {
        next(error)
    })
})
app.put("/api/persons/:id", (request, response) => {
    console.log("Executing the put request")
    let entry = request.body
    Person.findByIdAndUpdate(request.params.id, entry, { new: true, runValidators: true, context: "query" }).then((updatedDoc) => response.json(updatedDoc)).catch(error => next(error))

})

app.get("/info", (request, response) => {

    response.send(`<div>Phonebook has info for ${Person.find({}).length} people</div>
    <div>${new Date()}</div>`)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {

    console.log(error.message)
    if (error.name === "CastError")
        return response.status(400).send({ error: "malformatted id" })
    else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }
    next(error)

}
app.use(errorHandler)


app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })

