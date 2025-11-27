
import { createServer } from 'http';

import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import routes from '../routes/route.js'
import jogoRoutes from '../routes/JogoRoute.js'
import desenvolvedoraRoutes from '../routes/DesenvolvedoraRoute.js' 
import generoRoutes from '../routes/GeneroRoute.js'
import distribuidoraRoutes from '../routes/DistribuidoraRoute.js'

import lojaRoutes from '../routes/LojaRoute.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


app.use(express.static(join(__dirname, '../public')))
app.set('views', join(__dirname, '../views'))

app.use('/', lojaRoutes)

app.use(routes) 
app.use(jogoRoutes)
app.use(desenvolvedoraRoutes)
app.use(generoRoutes)
app.use(distribuidoraRoutes)

app.listen(3001, () => {
    console.log("Servidor rodando ");
})

export default app;