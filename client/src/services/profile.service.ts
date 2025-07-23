import type { AxiosResponse } from 'axios'
import api from '../http'
import type { QuestProgress } from '../types/QuestProgress'

export const ProfileService = {
	async getQuestProgressByUserId(
		userId: number
	): Promise<AxiosResponse<QuestProgress[]>> {
		return api.get<QuestProgress[]>(`/profile/quests/${userId}`)
	},
}
