const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
  {
    studentNumber: {
      type: Number,
      required: [true, 'Please add a student number'],
    },
    department: {
      type: String,
      required: [true, 'Please add a department'],
    },
    course: {
      type: String,
      required: [true, 'Please add a course'],
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['Tuition Fee', 'Exam Permit', 'Scholarship', 'Class Schedule'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of an issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)
