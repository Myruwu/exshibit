const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    studentNumber: {
      type:Number,
      required: [true, 'Please add a student number'],
    },
    department: {
      type: String,
      required: [true, 'Please select a department'],
      enum: ['CITE', 'CEA', 'CMA', 'CSS'],
    },
    course: {
      type: String,
      required: [true, 'Please select a course'],
      enum: ['BSIT', 'BSCPE', 'BSCE', 'BSEE'],
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
