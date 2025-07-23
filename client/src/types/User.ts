export interface IUser {
	email: string
	isActivated: boolean
	id: string
	role: string
	nickname: string
	done_quests: number[]
}

export interface IUserLogin {
	email: string
	password: string
	nickname: string
}
