import axios from 'axios'

export const apiUrl = import.meta.env.VITE_SERVER_URL

const api = axios.create({
	baseURL: apiUrl,
	withCredentials: true,
})

api.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get(`${apiUrl}/auth/refresh`, {
					withCredentials: true,
				})
				localStorage.setItem('token', response.data.accessToken)
				return api.request(originalRequest)
			} catch (e: unknown) {
				console.log(e)
			}
		}
		throw error
	}
)

api.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export default api
