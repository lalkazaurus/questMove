import type { Request, Response } from 'express'
import prisma from '../prisma/prisma.js'

export const getAllQuests = async (_req: Request, res: Response) => {
	try {
		const quests = await prisma.quest.findMany({
			include: { checkpoints: true },
		})
		res.json(quests)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Failed to fetch quests' })
	}
}

export const createQuest = async (req: Request, res: Response) => {
	const { name, description, createdBy, checkpoints } = req.body
	try {
		const newQuest = await prisma.quest.create({
			data: {
				name,
				description,
				createdBy,
				checkpoints: {
					create: checkpoints,
				},
			},
			include: { checkpoints: true },
		})
		res.status(201).json(newQuest)
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: 'Error creating quest' })
	}
}
