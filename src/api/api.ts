import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle common response scenarios
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lies within the range of 2xx cause this function to trigger
    return response
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
