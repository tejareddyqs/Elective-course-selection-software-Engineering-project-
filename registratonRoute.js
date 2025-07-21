const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  registerForCourseOrProject,
  getAllRegistrations,
  updateRegistration,
  deleteRegistration
} = require('../controler/registrationController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/register', registerForCourseOrProject);
router.get('/registrations', getAllRegistrations);
router.put('/registrations/:id', updateRegistration);
router.delete('/registrations/:id', deleteRegistration);

module.exports = router;
