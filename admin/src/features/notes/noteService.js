import axios from 'axios'

const API_URL = 'http://localhost:5000/api/admin/'

// Get ticket notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'notes/' + ticketId, config)

  return response.data
}

// Create ticket note
const createNote = async ( userId, noteText, ticketId, token) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    `${API_URL}add/notes/${ticketId}`,
    {
      text: noteText,
      user:  userId
    },
    config
  )

  return response.data
}

const noteService = {
  getNotes,
  createNote,
}

export default noteService
