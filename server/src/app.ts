import type { Request, Response } from 'express'
import express from 'express'
import pool from './config/db.js'

const app = express()

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
