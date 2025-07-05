import { Router } from 'express'
import { createQuest, getAllQuests } from '../controllers/questController.js'

const router = Router()

router.get('/', getAllQuests)
router.post('/', createQuest)

export default router
