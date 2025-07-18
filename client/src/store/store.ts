import { configureStore } from '@reduxjs/toolkit'
import questSlice from './questSlice/questSlice'
import userSlice from './userSlice/userSlice'

export const store = configureStore({
	reducer: {
		quests: questSlice,
		user: userSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
