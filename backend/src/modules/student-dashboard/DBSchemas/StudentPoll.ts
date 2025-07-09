import mongoose from 'mongoose';

// Schema for tracking individual student's poll participation
const StudentPollSchema = new mongoose.Schema({
  studentId: { type: String, required: true, index: true },
  pollId: { type: String, required: true, index: true },
  roomId: { type: String, required: true, index: true },
  pollTitle: { type: String, required: true },
  pollType: { type: String, enum: ['MCQ', 'Word Cloud', 'Open Ended'], required: true },
  subject: { type: String, required: true },
  score: { type: Number, default: 0 },
  maxScore: { type: Number, required: true },
  percentage: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['completed', 'in_progress', 'absent', 'scheduled'], 
    default: 'scheduled' 
  },
  startedAt: { type: Date },
  completedAt: { type: Date },
  scheduledFor: { type: Date },
  answers: [{
    questionId: { type: String, required: true },
    answer: { type: mongoose.Schema.Types.Mixed }, // Can be string, number, or array
    isCorrect: { type: Boolean, default: false },
    answeredAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Compound index for efficient queries
StudentPollSchema.index({ studentId: 1, status: 1 });
StudentPollSchema.index({ studentId: 1, completedAt: -1 });
StudentPollSchema.index({ roomId: 1, status: 1 });

// Update the updatedAt field before saving
StudentPollSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const StudentPoll = mongoose.model('StudentPoll', StudentPollSchema); 