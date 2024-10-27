import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import fileRoutes from './routes/fileRoutes'

const app: express.Application = express()
const PORT: number = Number(process.env.PORT) || 3000

app.use(express.json())
app.use('/api/files', fileRoutes)

app.listen(PORT, () => {
	console.log(`File upload server running on http://localhost:${PORT}`)
})
