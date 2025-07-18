import type { AxiosResponse } from 'axios'
import api from '../http'
import type { AuthResponse } from '../types/AuthResponse'

export const AuthService = {
	async login(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return api.post<AuthResponse>('/auth/login', {
			email,
			password,
		})
	},

	async registration(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return api.post<AuthResponse>('/auth/registration', {
			email,
			password,
		})
	},

	async logout(): Promise<void> {
		return api.post('/auth/logout')
	},
}
