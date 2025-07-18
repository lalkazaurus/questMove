export default class ApiError extends Error {
	status: number
	errors: unknown[]

	constructor(status: number, message: string, errors: unknown[] = []) {
		super(message)
		this.status = status
		this.errors = errors

		Object.setPrototypeOf(this, ApiError.prototype)
	}

	static UnauthorizedError(): ApiError {
		return new ApiError(401, 'A user is unauthorized')
	}

	static BadRequest(message: string, errors: unknown[] = []): ApiError {
		return new ApiError(400, message, errors)
	}
}
