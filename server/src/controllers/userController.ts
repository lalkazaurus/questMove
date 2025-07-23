import dotenv from 'dotenv'
import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/apiError.js'
import {
	activate,
	addDoneQuest,
	assignRole,
	createAdmin,
	getAllUsers,
	getQuestProgressByUserId,
	login,
	logout,
	refresh,
	register,
} from '../services/userService.js'
dotenv.config()

class UserController {
	async registration(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return next(ApiError.BadRequest('Validation Error', errors.array()))
			const { email, password, nickname } = req.body
			const userData = await register(email, password, nickname)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { email, password } = req.body
			const userData = await login(email, password)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies
			const token = await logout(refreshToken)
			res.clearCookie('refreshToken')
			res.json(token)
		} catch (e) {
			next(e)
		}
	}

	async activate(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const activationLink = req.params.link
			await activate(activationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (e) {
			next(e)
		}
	}

	async refresh(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			if (!req.cookies) {
				throw ApiError.UnauthorizedError()
			}
			const refreshToken = req.cookies.refreshToken

			if (!refreshToken) {
				throw ApiError.UnauthorizedError()
			}

			const userData = await refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async getUsers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const users = await getAllUsers()
			res.json(users)
		} catch (e) {
			next(e)
		}
	}

	async createAdmin(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return next(ApiError.BadRequest('Validation Error', errors.array()))

			const { email, password, nickname } = req.body
			const userData = await createAdmin(email, password, nickname)
			res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async assignRoles(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { userId, role } = req.body
			const updatedUser = await assignRole(userId, role)
			res.json(updatedUser)
		} catch (e) {
			next(e)
		}
	}

	async addDoneQuests(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { userId, questId } = req.body
			const questProgress = await addDoneQuest(userId, questId)
			res.json(questProgress)
		} catch (e) {
			next(e)
		}
	}

	async getQuestProgressByUserID(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const userId = parseInt(req.params.userId, 10)

			if (isNaN(userId)) {
				throw ApiError.BadRequest('Invalid user ID')
			}
			const questProgress = await getQuestProgressByUserId(userId)
			res.json(questProgress)
		} catch (e) {
			next(e)
		}
	}
}

export default new UserController()
