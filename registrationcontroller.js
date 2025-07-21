const User = require('../model/user');
const CourseRegistration = require('../model/courseRegistration');


const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', data: { name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const registerForCourseOrProject = async (req, res) => {
  try {
    const { name, email, courseOrProject, selectionName } = req.body;
    if (!name || !email || !courseOrProject || !selectionName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRegistration = new CourseRegistration({ name, email, courseOrProject, selectionName });
    await newRegistration.save();

    res.status(201).json({ message: 'Registration successful', data: newRegistration });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await CourseRegistration.find();
    res.status(200).json({ message: 'Registrations retrieved successfully', data: registrations });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, courseOrProject, selectionName } = req.body;
    
    if (!name || !email || !courseOrProject || !selectionName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedRegistration = await CourseRegistration.findByIdAndUpdate(
      id,
      { name, email, courseOrProject, selectionName },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.status(200).json({ message: 'Registration updated successfully', data: updatedRegistration });
  } catch (error) {
    console.error('Update registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRegistration = await CourseRegistration.findByIdAndDelete(id);

    if (!deletedRegistration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.status(200).json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Delete registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  signup,
  login,
  registerForCourseOrProject,
  getAllRegistrations,
  updateRegistration,
  deleteRegistration
};
