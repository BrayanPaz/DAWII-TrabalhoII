
import { createServer } from 'http';

import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Rotas Admin (mantidas do original)
import routes from '../routes/route.js'
import jogoRoutes from '../routes/JogoRoute.js'
import desenvolvedoraRoutes from '../routes/DesenvolvedoraRoute.js' 
import generoRoutes from '../routes/GeneroRoute.js'
import distribuidoraRoutes from '../routes/DistribuidoraRoute.js'

// Rota da Loja (Novo)
import lojaRoutes from '../routes/LojaRoute.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '../public')))
app.set('views', join(__dirname, '../views'))

// === ROTAS ===

// A rota raiz agora aponta para a Loja Pública
app.use('/', lojaRoutes)

// Rotas do Admin
// Nota: Se 'routes' (route.js) também usa a rota '/', pode haver conflito.
// Recomenda-se deixar 'lojaRoutes' tratar o '/' ou verificar se 'routes' trata '/adm'
app.use(routes) 
app.use(jogoRoutes)
app.use(desenvolvedoraRoutes)
app.use(generoRoutes)
app.use(distribuidoraRoutes)

app.listen(3001, () => {
    console.log("Servidor rodando ");
})

export default app;