import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl } from '../../http'
import { AuthService } from '../../services/auth.service'
import { UserService } from '../../services/user.service'
import type { AuthResponse } from '../../types/AuthResponse'
import type { IUser } from '../../types/User'

interface UserState {
	user: IUser
	isAuth: boolean
	isLoading: boolean
	users: IUser[]
}

const initialState: UserState = {
	user: {
		email: '',
		isActivated: false,
		id: '',
		role: '',
		nickname: '',
	},
	isAuth: false,
	isLoading: false,
	users: [],
}

export const login = createAsyncThunk<
	IUser,
	{ email: string; password: string },
	{ rejectValue: string }
>('user/login', async ({ email, password }, { rejectWithValue }) => {
	try {
		const response = await AuthService.login(email, password)
		const user = response.data.user as IUser
		const token = response.data.accessToken
		localStorage.setItem('token', token)
		return user
	} catch (e: unknown) {
		if (axios.isAxiosError(e)) {
			console.log(e.response?.data?.message)
			return rejectWithValue(e.response?.data?.message || 'Login error')
		}
		return rejectWithValue('Unknown login error')
	}
})

export const logout = createAsyncThunk('user/logout', async () => {
	try {
		await AuthService.logout()
		localStorage.removeItem('token')
	} catch (e: unknown) {
		if (axios.isAxiosError(e)) {
			console.log(e.response?.data?.message)
		}
	}
})

export const registration = createAsyncThunk<
	IUser,
	{ email: string; password: string; nickname: string },
	{ rejectValue: string }
>(
	'user/registration',
	async ({ email, password, nickname }, { rejectWithValue }) => {
		try {
			const response = await AuthService.registration(email, password, nickname)
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)
			return response.data.user as IUser
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				console.log(e.response?.data?.message)
				return rejectWithValue(e.response?.data?.message || 'Login error')
			}
			return rejectWithValue('Unknown login error')
		}
	}
)

export const checkAuth = createAsyncThunk<IUser, void, { rejectValue: string }>(
	'user/checkAuth',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get<AuthResponse>(`${apiUrl}/auth/refresh`, {
				withCredentials: true,
				timeout: 5000,
			})
			localStorage.setItem('token', response.data.accessToken)
			return response.data.user
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				console.log(e.response?.data?.message)
				return rejectWithValue(e.response?.data?.message || 'Login error')
			}
			return rejectWithValue('Unknown login error')
		}
	}
)

export const fetchUsers = createAsyncThunk(
	'user/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			const response = await UserService.fetchUsers()
			return response.data
		} catch (e) {
			if (axios.isAxiosError(e)) {
				return rejectWithValue(e.response?.data?.message)
			}
			return rejectWithValue('Unknown error')
		}
	}
)

export const assignUserRoles = createAsyncThunk(
	'user/assignRoles',
	async (
		{ userId, roles }: { userId: string; roles: string[] },
		{ rejectWithValue }
	) => {
		try {
			const response = await UserService.assignRoles(userId, roles)
			return response.data
		} catch (e) {
			if (axios.isAxiosError(e)) {
				return rejectWithValue(e.response?.data?.message)
			}
			return rejectWithValue('Unknown error')
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload
		},
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isAuth = true
				state.user = action.payload
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
			})

			.addCase(registration.pending, state => {
				state.isLoading = true
			})
			.addCase(registration.fulfilled, (state, action) => {
				state.isLoading = false
				state.isAuth = true
				state.user = action.payload
				console.log(state.user)
			})
			.addCase(registration.rejected, state => {
				state.isLoading = false
			})

			.addCase(logout.pending, state => {
				state.isLoading = true
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.isAuth = false
				state.user = {} as IUser
			})
			.addCase(logout.rejected, state => {
				state.isLoading = false
			})

			.addCase(checkAuth.pending, state => {
				state.isLoading = true
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false
				state.isAuth = true
				state.user = action.payload
			})
			.addCase(checkAuth.rejected, state => {
				state.isLoading = false
			})
			.addCase(fetchUsers.pending, state => {
				state.isLoading = true
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.isLoading = false
				state.users = action.payload
			})
			.addCase(fetchUsers.rejected, state => {
				state.isLoading = false
			})

			.addCase(assignUserRoles.pending, state => {
				state.isLoading = true
			})
			.addCase(assignUserRoles.fulfilled, (state, action) => {
				state.isLoading = false
				state.users = state.users.map(user =>
					user.id === action.payload.id ? action.payload : user
				)
			})
			.addCase(assignUserRoles.rejected, state => {
				state.isLoading = false
			})
	},
})

export default userSlice.reducer
