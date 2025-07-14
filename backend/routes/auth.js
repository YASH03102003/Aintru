const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { addUser, findUserByEmail, findUserByProvider } = require('../models/user');

const router = express.Router();

// JWT secret (in real app, use process.env)
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@aintru.com';
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

// Setup nodemailer transporter (for demo: use ethereal or your SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your provider
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Email/password signup with verification
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (findUserByEmail(email)) return res.status(400).json({ error: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const user = addUser({ email, password: hashed, name, provider: 'local', isVerified: false, verificationToken });

  // Send verification email
  const verifyUrl = `http://localhost:5173/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`;
  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: 'Verify your Aintru account',
      html: `<p>Hi ${name || ''},</p><p>Please verify your email by clicking <a href="${verifyUrl}">here</a>.</p>`
    });
  } catch (err) {
    console.error('Nodemailer error:', err);
    return res.status(500).json({ error: 'Failed to send verification email' });
  }

  res.json({ message: 'Signup successful. Please check your email to verify your account.' });
});

// Email verification endpoint
router.get('/verify', (req, res) => {
  const { token, email } = req.query;
  const user = findUserByEmail(email);
  if (!user || user.verificationToken !== token) {
    return res.status(400).send('Invalid or expired verification link.');
  }
  user.isVerified = true;
  user.verificationToken = null;
  res.send('Email verified! You can now log in.');
});

// Email/password login (only if verified)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  if (!user.isVerified) return res.status(403).json({ error: 'Please verify your email before logging in.' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ user: { email: user.email, name: user.name }, token });
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login?error=oauth_failed' }), 
  (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      
      // Redirect to frontend with token
      res.redirect(`http://localhost:5173/oauth-success?token=${token}&user=${encodeURIComponent(JSON.stringify({
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }))}`);
    } catch (error) {
      console.error('Google OAuth error:', error);
      res.redirect('http://localhost:5173/login?error=oauth_failed');
    }
  }
);

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: 'http://localhost:5173/login?error=oauth_failed' }), 
  (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      
      // Redirect to frontend with token
      res.redirect(`http://localhost:5173/oauth-success?token=${token}&user=${encodeURIComponent(JSON.stringify({
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }))}`);
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      res.redirect('http://localhost:5173/login?error=oauth_failed');
    }
  }
);

module.exports = router; 