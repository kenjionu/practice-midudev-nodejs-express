const express = require('express')
const ditto = require('./pokemon/ditto.json')

const app = express()

const PORT = process.env.PORT ?? 1234

app.disabled('x-powered-by')

app.use((req, res, next) => {
    console.log('middleware')
    if (req.method !== 'POST') return next()
    if (req.headers['content-type-'] !== 'application/json') return next()

    let body = ''


    req.on('data', chunk => {
        body = chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        // mutar la request y meter la informacion en el req.body
        req.body = data
        next()
    })
    // trackear la request a la bases de datos
    // revisar si el usuario tiene cookies
    // no se te puede olvidar el next, si intentas entrar ahora sin el next, se ejecutara el console.log quedara solo en la creacion del middleware
})

app.get('/', (req, res) => {
    res.status(200).send('<h1>Mi pagina</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
   res.json(ditto)
})

app.post('/pokemon', (req, res) => {
    // req body deberiamos guardar en bbdd
    res.status(201).json(req.body)
})

// la últilma a la que va a llegar
app.use((req, res ) => {
    res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`)
})