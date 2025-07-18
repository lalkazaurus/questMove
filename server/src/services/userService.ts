import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import UserDto from '../dtos/userDto.js'
import ApiError from '../exceptions/apiError.js'
import prisma from '../prisma/prisma.js'
import mailService from './mailService.js'
import tokenService from './tokenService.js'

export const register = async (email, password) => {
	try {
		const exists = await prisma.user.findUnique({ where: { email } })
		if (exists) throw ApiError.BadRequest('Email already taken')

		const hash = await bcrypt.hash(password, 10)
		const activationLink = uuidv4()

		const user = await prisma.user.create({
			data: { email, password: hash, activationLink },
		})

		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/activate/${activationLink}`
		)

		const userDto = new UserDto(user)
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
	const user = await prisma.user.findUnique({ where: { email } })
	if (!user) throw ApiError.BadRequest('User not found')

	const validPass = await bcrypt.compare(password, user.password)
	if (!validPass) throw ApiError.BadRequest('Wrong password')

	const userDto = new UserDto(user)
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

	const user = await prisma.user.findUnique({ where: { id: userData.id } })
	if (!user) throw ApiError.UnauthorizedError()

	const userDto = new UserDto(user)
	const tokens = tokenService.generateTokens({ ...userDto })
	await tokenService.saveToken(userDto.id, tokens.refreshToken)

	return { ...tokens, user: userDto }
}

export const getAllUsers = async () => {
	return await prisma.user.findMany()
}
