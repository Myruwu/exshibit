import axios from 'axios'

const API_URL = 'http://localhost:5000/api/admin/';

// Get Token
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

// Register user
const register = async userData => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const login = async userData => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    console.log(response.data.token)
  }
  return response.data
}

// Logout user
const logout = () => {
  alert("Are you sure you want to logout?")
  localStorage.removeItem('user')

}

const authService = {
  getToken,
  register,
  logout,
  login,
}

export default authService
