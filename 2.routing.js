const http = require('node:http')


//commonJS => modulos clasicos de node
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
    const { method, url } = req

    sw
    switch (method) {
        case 'GET':
        switch(url) {
            case '/pokemon/ditto':
                req.setHeader('Content-Type', 'application/json; charset=utf-8')
                return req.end(JSON.stringify(dittoJSON))
            default:
                req.statusCode = 404
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                return res.end('<h1>404</h1>')
        }

        case 'POST':
        switch (url) {
            case '/pokemon': {
                let body = ''
                req.on('data', chunk => {
                    body = chunk.toString()
                })

                req.on('end', () => {
                    const data = JSON.parse(body)
                    //lamar a una base de datos para guardar la info
                    res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
                    res.end(JSON.stringify((data)))
                })

                break
            }

            default:
                req.statusCode = 404
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                res.end('<h1>404</h1>')

        }
    }
}

const server = http.createServer(processRequest)
const port = 1234

server.listen(port, () => {
    console.log(`server listening on port: ${port}`)
})