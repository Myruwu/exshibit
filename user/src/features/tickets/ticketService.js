import axios from 'axios'
import authService from '../auth/authService';

const API_URL = 'http://localhost:5000/api/tickets/'

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

  const response = await axios.get(API_URL, config)

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

  const response = await axios.get(API_URL + ticketId, config)

  return response.data
}

// Close ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + ticketId,
    { status: 'closed' },
    config
  )

  return response.data
}

const ticketService = {
  createTicket,
  getTicket,
  getTickets,
  closeTicket,
}

export default ticketService
