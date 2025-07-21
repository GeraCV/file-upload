import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import apiRouter from './routes/ApiRouter.js'

const app = express()
app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(json())

const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use('/api', apiRouter)

const port = process.env.PORT ?? 3000

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`)
})