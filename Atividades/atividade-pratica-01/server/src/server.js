import express from 'express'
// Import Routes
import { estadoRouter } from './routes/estados.js'
import { cidadeRouter } from './routes/cidades.js'
import { pessoaRouter } from './routes/pessoas.js'
import { tipoRouter } from './routes/tipo-sanguineo.js'
import { doacaoRouter } from './routes/doacoes.js'
import { localRouter } from './routes/locais-coleta.js'

import cors from 'cors'

const server = express()
const PORT = 5000

// Routes
server.get('/', (request, response) =>{
    response.json({
        message: 'Status: Server is running.'
    })
})

server.use(express.json())
server.use(cors())
server.use([estadoRouter, cidadeRouter, pessoaRouter, tipoRouter, doacaoRouter, localRouter])


// Start - listen (vai abrir uma porta e esperar requisições HTTP)
server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}.`)
})
