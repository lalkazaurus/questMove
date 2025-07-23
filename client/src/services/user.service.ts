import type { AxiosResponse } from 'axios'
import api from '../http'
import type { QuestProgress } from '../types/QuestProgress'
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
	async addDoneQuest(
		userId: number,
		questId: number
	): Promise<AxiosResponse<QuestProgress>> {
		return api.post<QuestProgress>('/profile/complete', { userId, questId })
	},
}
