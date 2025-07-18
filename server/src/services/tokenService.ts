import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import { resolve } from 'path'
import prisma from '../prisma/prisma.js'
const envPath = resolve(process.cwd(), '.env')
const env = config({ path: envPath })

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, env.parsed.JWT_ACCESS_SECRET, {
			expiresIn: '15m',
		})
		const refreshToken = jwt.sign(payload, env.parsed.JWT_REFRESH_SECRET, {
			expiresIn: '30d',
		})

		return {
			accessToken,
			refreshToken,
		}
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	async saveToken(userId: number, refreshToken: string) {
		const tokenData = await prisma.token.findUnique({
			where: { userId },
		})

		if (tokenData) {
			return await prisma.token.update({
				where: { userId },
				data: { refreshToken },
			})
		} else {
			return await prisma.token.create({
				data: {
					user: { connect: { id: userId } },
					refreshToken,
				},
			})
		}
	}

	async removeToken(refreshToken: string) {
		const tokenData = await prisma.token.delete({
			where: { refreshToken },
		})
		return tokenData
	}

	async findToken(refreshToken: string) {
		console.log('Received refreshToken:', refreshToken)
		console.log('Type of refreshToken:', typeof refreshToken)

		if (!refreshToken || typeof refreshToken !== 'string') {
			throw new Error('refreshToken must be a valid string')
		}

		return await prisma.token.findUnique({
			where: { refreshToken },
		})
	}
}

export default new TokenService()
