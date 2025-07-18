import type { AxiosResponse } from 'axios'
import api from '../http'
import type { IUser } from '../types/User'

export const UserService = {
	async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return api.get<IUser[]>('/auth/users')
	},
}
