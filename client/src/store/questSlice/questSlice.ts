import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import type { Quest } from '../../types/Quest'
const apiUrl = import.meta.env.VITE_SERVER_URL

interface QuestState {
	quests: Array<Quest>
	currentData: Quest
}

interface Coordinates {
	lat: number
	lng: number
}

const initialState: QuestState = {
	quests: [],
	currentData: {
		id: '',
		name: '',
		description: '',
		checkpoints: [
			{
				lat: 0,
				lng: 0,
				title: '',
				task: '',
				question: '',
				answer: '',
			},
		],
		createdBy: '',
	},
}

export const addQuest = createAsyncThunk(
	'quests/addQuest',
	async (quest: Quest) => {
		const response = await axios.post<Quest>(`${apiUrl}/quests`, quest)
		return response.data
	}
)

export const getAllQuests = createAsyncThunk(
	'quests/getAllQuests',
	async () => {
		const response = await axios.get<Array<Quest>>(`${apiUrl}/quests`)
		return response.data
	}
)

const questSlice = createSlice({
	name: 'quests',
	initialState,
	reducers: {
		setCoordinates: (state, action: PayloadAction<Coordinates>) => {
			state.currentData.checkpoints = []
			state.currentData.checkpoints.push({
				lat: action.payload.lat,
				lng: action.payload.lng,
				title: '',
				task: '',
				question: '',
				answer: '',
			})
		},
	},
	extraReducers: builder => {
		builder
			.addCase(
				getAllQuests.fulfilled,
				(state, action: PayloadAction<Array<Quest>>) => {
					state.quests = action.payload
				}
			)
			.addCase(addQuest.fulfilled, (state, action: PayloadAction<Quest>) => {
				state.quests.push(action.payload)
			})
	},
})

export default questSlice.reducer
