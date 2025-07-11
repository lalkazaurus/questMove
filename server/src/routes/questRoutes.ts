import { Router } from 'express'
import {
	createQuest,
	getAllQuests,
	getQuestById,
} from '../controllers/questController.js'

const router = Router()

router.get('/', getAllQuests)
router.post('/', createQuest)
router.get('/:id', getQuestById)

export default router
