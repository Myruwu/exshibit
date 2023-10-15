const express = require('express')
const router = express.Router()
const {
  getNotes,
  addNotes,
  assignTicket,
  viewTicket,
  getAllTickets,
  getAllAssignTickets,
  registerAdmin,
  loginAdmin,
  getMe,
} = require('../controllers/adminController')

router.get('/notes/:ticketId', getNotes)
router.post('/add/notes/:ticketId', addNotes)
router.post('/', registerAdmin)
router.post('/login', loginAdmin)
router.get('/me/:id', getMe)
router.get("/all", getAllTickets)
router.get("/:id", viewTicket)
router.get("/assign/all/:id", getAllAssignTickets)
router.post("/assign/:id", assignTicket)

module.exports = router
