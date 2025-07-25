const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String },
  role: { type: String },
  questions: [{
    question: String,
    type: String, // e.g., 'technical', 'behavioral', etc.
  }],
  answers: [{
    answer: String,
    questionIndex: Number,
    score: Number,
    feedback: String,
    mode: { type: String, enum: ['voice', 'video', 'text'], default: 'text' },
    recordedUrl: String, // for voice/video answers
  }],
  overallScore: { type: Number },
  feedbackSummary: { type: String },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

module.exports = mongoose.model('Interview', InterviewSchema); 