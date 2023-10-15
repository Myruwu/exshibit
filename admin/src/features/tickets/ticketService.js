import axios from 'axios'
import authService from '../auth/authService';

const API_URL = 'http://localhost:5000/api/admin/'

// Create new ticket
const createTicket = async (ticketData) => {
  const token = authService.getToken();
  console.log(token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}


// Get user tickets
const getTickets = async () => {
  const token = authService.getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/all`, config)

  return response.data
}

const getMyTickets = async (userId) => {
  const token = authService.getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/assign/all/${userId}`, config)

  return response.data
}

// Get user ticket
const getTicket = async (ticketId) => {
  const token = authService.getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}${ticketId}`, config)

  return response.data
}



const ticketService = {
  createTicket,
  getTicket,
  getTickets,
  getMyTickets,
}

export default ticketService
