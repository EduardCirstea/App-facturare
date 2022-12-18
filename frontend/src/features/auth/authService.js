import axios from 'axios'
import Cookies from 'js-cookie'
const API_URL = 'http://localhost:8000'

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData)
  if (response.data) {
    Cookies.set('user', JSON.stringify(response.data))
  }
  return response.data
}

const logout = () => {
  Cookies.remove('user')
}

const authService = {
  logout,
  login,
}

export default authService
