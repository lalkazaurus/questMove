import cors from 'cors'
import dotenv from 'dotenv'
import type { Request, Response } from 'express'
import express from 'express'
import pool from './config/db.js'
import questRoutes from './routes/questRotes.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)
app.use('/', questRoutes)

pool.query('SELECT NOW()', (err: Error | null, res: any) => {
	if (err) {
		console.error('Error connecting to the database', err.stack)
	} else {
		console.log('Connected to the database:', res.rows)
	}
})

app.get('/', (_req: Request, res: Response) => {
	res.send('Server is running')
})

export default app
