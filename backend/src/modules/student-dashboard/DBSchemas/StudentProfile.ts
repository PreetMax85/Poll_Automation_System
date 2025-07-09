import mongoose from 'mongoose';

// Schema for student profile and preferences
const StudentProfileSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true, index: true },
  firebaseUID: { type: String, required: true, unique: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  grade: { type: String },
  subjects: [{ type: String }],
  preferences: {
    theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'auto' },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      pollReminders: { type: Boolean, default: true }
    },
    dashboardLayout: { type: String, default: 'default' }
  },
  statistics: {
    totalPollsTaken: { type: Number, default: 0 },
    totalPollsAbsent: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    bestSubject: { type: String },
    lastActive: { type: Date, default: Date.now }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for efficient queries
StudentProfileSchema.index({ email: 1 });
StudentProfileSchema.index({ firebaseUID: 1 });

// Update the updatedAt field before saving
StudentProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema); 