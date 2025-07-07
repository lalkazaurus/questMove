import { configureStore } from '@reduxjs/toolkit'
import questSlice from './questSlice/questSlice'

export const store = configureStore({
	reducer: {
		quests: questSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
