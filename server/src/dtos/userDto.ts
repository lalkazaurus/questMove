export default class UserDto {
	email: string
	id: number
	isActivated: boolean
	role: string
	nickname: string

	constructor(model: {
		email: string
		id: number
		isActivated: boolean
		role: string
		nickname: string
	}) {
		this.email = model.email
		this.id = model.id
		this.isActivated = model.isActivated
		this.role = model.role || 'USER'
		this.nickname = model.nickname
	}
}
