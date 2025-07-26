const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // hashed password (if using local auth)
  avatar: { type: String },   // profile picture URL
  skills: [String],           // array of skills
  dreamCompanies: [String],   // array of target companies
  dreamRoles: [String],       // array of target roles
  resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' }, // latest resume
  resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resume' }], // all resumes
  interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }], // all interviews
  username: { type: String, unique: true, sparse: true }, // set after signup
  mobile: { type: String, unique: true, sparse: true },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  institute: { type: String },
  year: { type: String },
  isStudent: { type: Boolean },
  currentCompany: { type: String },
  currentPosition: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  provider: { type: String }, // 'google', 'github', or undefined for local
  providerId: { type: String }, // OAuth provider user ID
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema); 