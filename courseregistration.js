const mongoose = require('mongoose');

const courseRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  courseOrProject: { type: String, required: true },
  selectionName: { type: String, required: true },
  role: { type: String, default: 'student' },
}, { timestamps: true });

module.exports = mongoose.model('CourseRegistration', courseRegistrationSchema);
