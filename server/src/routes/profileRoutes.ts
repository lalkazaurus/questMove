import { Router } from 'express'
import userController from '../controllers/userController.js'

const router = Router()

router.get('/quests/:userId', userController.getQuestProgressByUserID)
router.post('/complete', userController.addDoneQuests)

export default router
