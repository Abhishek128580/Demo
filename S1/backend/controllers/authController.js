const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Import the db object which contains our models
const { db } = require('../config/db');
const User = db.User;
const Role = db.Role;

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const userRole = await Role.findOne({ where: { name: role.toLowerCase() } });
    if (!userRole) {
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      RoleId: userRole.id,
    });

    res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: userRole.name,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data', error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ 
      where: { email },
      include: Role 
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.Role.name, 
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
     res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
};