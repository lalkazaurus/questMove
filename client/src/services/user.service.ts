import type { AxiosResponse } from 'axios'
import api from '../http'
import type { IUser } from '../types/User'

export const UserService = {
	async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return api.get<IUser[]>('/auth/users')
	},
	async assignRoles(
		userId: string,
		roles: string[]
	): Promise<AxiosResponse<IUser>> {
		return api.patch<IUser>(`/auth/assign-roles`, { userId, roles })
	},
}
