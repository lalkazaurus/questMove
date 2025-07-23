import bcrypt from 'bcrypt'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import UserDto from '../dtos/userDto.js'
import ApiError from '../exceptions/apiError.js'
import prisma from '../prisma/prisma.js'
import mailService from './mailService.js'
import tokenService from './tokenService.js'

export const register = async (
	email: string,
	password: string,
	nickname: string
) => {
	try {
		const exists = await prisma.user.findFirst({
			where: {
				OR: [{ email }, { nickname }],
			},
		})
		if (exists) throw ApiError.BadRequest('Email or nickname already taken')
		console.log(nickname)

		const hash = await bcrypt.hash(password, 10)
		const activationLink = uuidv4()

		const userRole = await prisma.role.findUnique({
			where: { name: 'USER' },
		})

		if (!userRole) {
			throw ApiError.BadRequest('Default user role not found')
		}

		const user = await prisma.user.create({
			data: {
				email,
				password: hash,
				activationLink,
				role_id: userRole.id,
				nickname,
			},
			include: {
				role: true,
			},
		})

		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/activate/${activationLink}`
		)

		const userDto = new UserDto({
			...user,
			role: user.role.name,
		})

		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto }
	} catch (error) {
		console.error('Registration error:', error)
		throw error
	}
}

export const activate = async (activationLink: string) => {
	const user = await prisma.user.findUnique({ where: { activationLink } })
	if (!user) throw ApiError.BadRequest('Invalid link')

	await prisma.user.update({
		where: { id: user.id },
		data: { isActivated: true },
	})
}

export const login = async (email: string, password: string) => {
	const user = await prisma.user.findUnique({
		where: { email },
		include: { role: true },
	})

	if (!user) throw ApiError.BadRequest('User not found')

	const validPass = await bcrypt.compare(password, user.password)
	if (!validPass) throw ApiError.BadRequest('Wrong password')

	const userDto = new UserDto({
		...user,
		role: user.role.name,
	})

	const tokens = tokenService.generateTokens({ ...userDto })
	await tokenService.saveToken(userDto.id, tokens.refreshToken)

	return { ...tokens, user: userDto }
}

export const logout = async (refreshToken: string) => {
	return await tokenService.removeToken(refreshToken)
}

export const refresh = async (refreshToken: string) => {
	if (!refreshToken) throw ApiError.UnauthorizedError()

	const userData = tokenService.validateRefreshToken(refreshToken)
	const tokenFromDb = await tokenService.findToken(refreshToken)
	if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError()

	const user = await prisma.user.findUnique({
		where: { id: userData.id },
		include: { role: true },
	})

	if (!user) throw ApiError.UnauthorizedError()

	const userDto = new UserDto({
		...user,
		role: user.role.name,
	})

	const tokens = tokenService.generateTokens({ ...userDto })
	await tokenService.saveToken(userDto.id, tokens.refreshToken)

	return { ...tokens, user: userDto }
}

export const addDoneQuest = async (userId: number, questId: number) => {
	const user = await prisma.user.findUnique({ where: { id: userId } })
	const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
	if (!user) {
		throw ApiError.BadRequest(`User not found`)
	}

	const quest = await prisma.quest.findUnique({ where: { id: questId } })
	if (!quest) {
		throw ApiError.BadRequest(`Quest not found`)
	}

	const existingProgress = await prisma.quest_progress.findUnique({
		where: {
			userId_questId: { userId, questId },
		},
	})

	if (existingProgress) {
		return existingProgress
	}

	await prisma.user.update({
		where: { id: userId },
		data: {
			done_quests: { push: questId },
		},
	})

	return await prisma.quest_progress.create({
		data: {
			userId,
			questId,
			completedAt: formattedDate,
			status: 'Successfully done',
		},
	})
}

export const getQuestProgressByUserId = async (userId: number) => {
	const user = await prisma.user.findUnique({ where: { id: userId } })
	if (!user) {
		throw ApiError.BadRequest(`User not found`)
	}

	return await prisma.quest_progress.findMany({
		where: {
			userId: user.id,
		},
	})
}

export const getAllUsers = async () => {
	return await prisma.user.findMany({
		include: { role: true },
	})
}

export const assignRole = async (userId: number, roleName: string) => {
	const role = await prisma.role.findUnique({
		where: { name: roleName },
	})

	if (!role) {
		throw ApiError.BadRequest(`Role ${roleName} not found`)
	}

	return await prisma.user.update({
		where: { id: userId },
		data: {
			role_id: role.id,
		},
		include: { role: true },
	})
}

export const createAdmin = async (
	email: string,
	password: string,
	nickname: string
) => {
	try {
		const exists = await prisma.user.findUnique({ where: { email, nickname } })
		if (exists) throw ApiError.BadRequest('Email or nickname already taken')

		const hash = await bcrypt.hash(password, 10)
		const activationLink = uuidv4()

		const adminRole = await prisma.role.findUnique({
			where: { name: 'ADMIN' },
		})

		if (!adminRole) {
			throw ApiError.BadRequest('Admin role not found')
		}

		const user = await prisma.user.create({
			data: {
				nickname,
				email,
				password: hash,
				activationLink,
				role_id: adminRole.id,
			},
			include: {
				role: true,
			},
		})

		const userDto = new UserDto({
			...user,
			role: user.role.name,
		})

		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto }
	} catch (error) {
		console.error('Admin creation error:', error)
		throw error
	}
}
