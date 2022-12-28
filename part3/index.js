const { json } = require('express')
const express = require('express')
const PORT = 3001

const app = express()
app.use(express.json())
let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
app.delete("/api/persons/:id", (request, response) => {

  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id)
  if (person) {
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()

  }
  else
    response.status(404).end()


})
app.post("/api/persons", (request, response) => {

  const num = Math.floor(Math.random() * 100000);
  console.log(num)

  const person = request.body;

  person.id = num;
  persons.concat(person)
  response.json(person)


})
app.get("/api/persons", (request, response) => {

  response.json(persons)


})
app.get("/api/persons/:id", (request, response) => {

  const id = Number(request.params.id)
  let person = persons.find(person => id === person.id)
  console.log(person)
  if (person)
    response.json(person)
  else
    response.status(404).end()

})


app.get("/info", (request, response) => {

  response.send(`<div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date()}</div>`)
})
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })