const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Helper: create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// JWT auth middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid token.' });
  }
}

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, mobile, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }
    // Check for duplicate email or mobile
    const existingUser = await User.findOne({ $or: [ { email }, { mobile } ] });
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'Email or mobile already in use.' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = new User({ email, password: hashedPassword, mobile, name, verificationToken, isVerified: false });
    await user.save();
    // Send verification email
    const verifyUrl = `http://localhost:3000/api/auth/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Aintru Email Verification',
      html: `<h2>Welcome to Aintru!</h2><p>Please verify your email by clicking the link below:</p><a href="${verifyUrl}">${verifyUrl}</a>`
    });
    res.json({ success: true, message: 'Signup successful. Please check your email to verify your account.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/auth/verify-email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send('Invalid or missing token.');
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).send('Invalid or expired token.');
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.send('Email verified successfully! You can now log in.');
  } catch (err) {
    res.status(400).send('Verification failed.');
  }
});

// POST /api/auth/test-create-user
router.post('/test-create-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
  const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    // Success: return user info (do not return password)
    res.json({ success: true, user: { _id: user._id, email: user.email, mobile: user.mobile, username: user.username } });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST /api/auth/complete-profile (JWT protected)
router.post('/complete-profile', authenticateJWT, async (req, res) => {
  try {
    const { username, mobile, gender, institute, year, isStudent, currentCompany, currentPosition } = req.body;
    const userId = req.userId;
    // Check for unique username and mobile
    if (username) {
      const existingUsername = await User.findOne({ username, _id: { $ne: userId } });
      if (existingUsername) return res.status(409).json({ success: false, error: 'Username already taken.' });
    }
    if (mobile) {
      const existingMobile = await User.findOne({ mobile, _id: { $ne: userId } });
      if (existingMobile) return res.status(409).json({ success: false, error: 'Mobile already in use.' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });
    user.username = username || user.username;
    user.mobile = mobile || user.mobile;
    user.gender = gender || user.gender;
    user.institute = institute || user.institute;
    user.year = year || user.year;
    user.isStudent = typeof isStudent === 'boolean' ? isStudent : user.isStudent;
    user.currentCompany = currentCompany || user.currentCompany;
    user.currentPosition = currentPosition || user.currentPosition;
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/auth/me (JWT protected)
router.get('/me', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password -verificationToken');
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login?error=oauth_failed' }),
  (req, res) => {
    console.log('Google OAuth callback route hit');
    console.log('User in request:', req.user);
    
    if (!req.user) {
      console.log('No user found in request, redirecting to login');
      return res.redirect('http://localhost:5173/login?error=oauth_failed');
    }
    
    console.log('Generating JWT for user:', req.user._id);
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
    
    console.log('Redirecting to frontend with token');
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  }
);

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: 'http://localhost:5173/login?error=oauth_failed' }),
  (req, res) => {
    console.log('GitHub OAuth callback route hit');
    console.log('User in request:', req.user);
    
    if (!req.user) {
      console.log('No user found in request, redirecting to login');
      return res.redirect('http://localhost:5173/login?error=oauth_failed');
    }
    
    console.log('Generating JWT for user:', req.user._id);
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
    
    console.log('Redirecting to frontend with token');
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  }
);

module.exports = router; 