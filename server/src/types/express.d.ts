import UserDto from '../dtos/userDto.ts'

declare global {
	namespace Express {
		interface Request {
			user?: UserDto
		}
	}
}
