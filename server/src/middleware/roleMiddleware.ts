import { NextFunction, Request, Response } from 'express'
import ApiError from '../exceptions/apiError.js'

export const checkRole = (requiredRoles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const userRole = req.user?.role || ''

			// requiredRoles — масив дозволених
			// userRole — один рядок
			const hasRole = requiredRoles.includes(userRole)

			if (!hasRole) {
				return next(ApiError.Forbidden('Access denied'))
			}

			next()
		} catch (e) {
			next(e)
		}
	}
}
