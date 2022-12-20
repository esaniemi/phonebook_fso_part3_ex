const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

// app.use(morgan('combined'))

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

app.get('/api/persons', (request, response) => {
    console.log('persoonat paluuna')
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    console.log('persoona yksi kerrallaan')
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/info', (request, response) => {
    const date = new Date()
    const n_persons = persons.length
    response.send(`<p>Phonebook has info for ${n_persons} people</p> <p>${date}</p>`)
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if (!body.name) {
        return response.status(400).json({ error: 'name missing' })
    } else if (!body.number) {
        return response.status(400).json({ error: 'number missing' })
    }
    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000)
    }
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

