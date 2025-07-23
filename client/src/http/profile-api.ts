import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { QuestProgress } from '../types/QuestProgress'

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: builder => ({
		getQuestProgressByUserId: builder.query<QuestProgress[], number>({
			query: userId => `profile/quests/${userId}`,
		}),
		addDoneQuest: builder.mutation<
			QuestProgress,
			{ userId: number; questId: number }
		>({
			query: ({ userId, questId }) => ({
				url: 'profile/complete',
				method: 'POST',
				body: { userId, questId },
			}),
		}),
	}),
})

export const { useGetQuestProgressByUserIdQuery, useAddDoneQuestMutation } =
	profileApi
