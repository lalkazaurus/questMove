import { Router } from 'express'
import {
	createQuest,
	getAllQuests,
	getQuestById,
} from '../controllers/questController.js'
import { checkRole } from '../middleware/roleMiddleware.js'

const router = Router()

router.get('/', getAllQuests)
router.post('/', checkRole(['ADMIN', 'MODERATOR']), createQuest)
router.get('/:id', getQuestById)

export default router
