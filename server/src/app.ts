import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import type { Request, Response } from 'express'
import express from 'express'
import pool from './config/db.js'
import userRouter from './routes/authRoutes.js'
import questRoutes from './routes/questRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)

pool.query('SELECT NOW()', (err: Error | null, res: any) => {
	if (err) {
		console.error('Error connecting to the database', err.stack)
	} else {
		console.log('Database connection successful:', res.rows[0])
	}
})

app.use('/', questRoutes)
app.use('/auth', userRouter)

app.get('/', (_req: Request, res: Response) => {
	res.send('Server is running')
})

export default app
