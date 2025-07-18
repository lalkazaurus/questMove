import axios, { type AxiosResponse } from 'axios'
import type { AuthResponse } from '../types/AuthResponse'

export const apiUrl = import.meta.env.VITE_SERVER_URL

const api = axios.create({
	withCredentials: true,
	baseURL: apiUrl,
})

api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

api.interceptors.response.use(
	(config: AxiosResponse) => {
		return config
	},
	async error => {
		const originalRequest = error.config

		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get<AuthResponse>(`${apiUrl}/refresh`, {
					withCredentials: true,
				})
				localStorage.setItem('token', response.data.accessToken)

				return api.request(originalRequest)
			} catch (e) {
				console.log(`There is an error: ${e}`)
			}
		}
		throw error
	}
)

export default api
