# Student Dashboard Database Setup Guide

This guide explains how to set up MongoDB for the Student Dashboard module.

## Database Collections

The Student Dashboard module uses two main collections:

### 1. `studentPolls` Collection

Stores individual student poll participation and results.

**Schema:**
```javascript
{
  studentId: String (required, indexed),
  pollId: String (required, indexed),
  roomId: String (required, indexed),
  pollTitle: String (required),
  pollType: String (enum: ['MCQ', 'Word Cloud', 'Open Ended']),
  subject: String (required),
  score: Number (default: 0),
  maxScore: Number (required),
  percentage: Number (default: 0),
  status: String (enum: ['completed', 'in_progress', 'absent', 'scheduled']),
  startedAt: Date,
  completedAt: Date,
  scheduledFor: Date,
  answers: [{
    questionId: String,
    answer: Mixed,
    isCorrect: Boolean,
    answeredAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `{ studentId: 1, status: 1 }` - For filtering polls by student and status
- `{ studentId: 1, completedAt: -1 }` - For sorting completed polls
- `{ roomId: 1, status: 1 }` - For room-based queries

### 2. `studentProfiles` Collection

Stores student profile information and preferences.

**Schema:**
```javascript
{
  studentId: String (required, unique, indexed),
  firebaseUID: String (required, unique, indexed),
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  avatar: String,
  grade: String,
  subjects: [String],
  preferences: {
    theme: String (enum: ['light', 'dark', 'auto']),
    notifications: {
      email: Boolean,
      push: Boolean,
      pollReminders: Boolean
    },
    dashboardLayout: String
  },
  statistics: {
    totalPollsTaken: Number,
    totalPollsAbsent: Number,
    averageScore: Number,
    bestSubject: String,
    lastActive: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `{ email: 1 }` - For email-based lookups
- `{ firebaseUID: 1 }` - For Firebase authentication

## Setup Instructions

### 1. MongoDB Connection

Ensure your MongoDB connection is configured in your environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/poll_automation
MONGODB_DATABASE=poll_automation
```

### 2. Create Collections

The collections will be created automatically when the application first runs, but you can also create them manually:

```javascript
// Connect to MongoDB
use poll_automation

// Create collections
db.createCollection("studentPolls")
db.createCollection("studentProfiles")

// Create indexes
db.studentPolls.createIndex({ "studentId": 1, "status": 1 })
db.studentPolls.createIndex({ "studentId": 1, "completedAt": -1 })
db.studentPolls.createIndex({ "roomId": 1, "status": 1 })

db.studentProfiles.createIndex({ "email": 1 })
db.studentProfiles.createIndex({ "firebaseUID": 1 })
```

### 3. Sample Data

Here are some sample documents to get you started:

**Sample Student Profile:**
```javascript
{
  "studentId": "student_001",
  "firebaseUID": "firebase_uid_001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "grade": "10th Grade",
  "subjects": ["Mathematics", "Physics", "Chemistry"],
  "preferences": {
    "theme": "auto",
    "notifications": {
      "email": true,
      "push": true,
      "pollReminders": true
    },
    "dashboardLayout": "default"
  },
  "statistics": {
    "totalPollsTaken": 15,
    "totalPollsAbsent": 2,
    "averageScore": 78.5,
    "bestSubject": "Mathematics",
    "lastActive": new Date()
  },
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

**Sample Student Poll:**
```javascript
{
  "studentId": "student_001",
  "pollId": "poll_001",
  "roomId": "room_001",
  "pollTitle": "Algebra Quiz",
  "pollType": "MCQ",
  "subject": "Mathematics",
  "score": 18,
  "maxScore": 20,
  "percentage": 90,
  "status": "completed",
  "startedAt": new Date("2024-01-15T10:00:00Z"),
  "completedAt": new Date("2024-01-15T10:25:00Z"),
  "answers": [
    {
      "questionId": "q1",
      "answer": 2,
      "isCorrect": true,
      "answeredAt": new Date("2024-01-15T10:05:00Z")
    }
  ],
  "createdAt": new Date("2024-01-15T09:55:00Z"),
  "updatedAt": new Date("2024-01-15T10:25:00Z")
}
```

## Integration with Existing Modules

### LiveQuizzes Integration

The Student Dashboard module integrates with the LiveQuizzes module:

1. **Room Data**: Uses `roomId` to link with room data from the LiveQuizzes module
2. **Poll Data**: References poll information from the room's polls array
3. **Real-time Updates**: Can be extended to use WebSocket connections for real-time updates

### User Module Integration

The Student Dashboard module integrates with the User module:

1. **Authentication**: Uses `firebaseUID` for user authentication
2. **Profile Data**: Extends user profile with student-specific information
3. **Role-based Access**: Can check user roles for authorization

## Performance Considerations

### Indexing Strategy

1. **Compound Indexes**: Use compound indexes for queries that filter on multiple fields
2. **Covered Queries**: Design indexes to cover frequently used queries
3. **Background Indexing**: Create indexes in the background for large collections

### Query Optimization

1. **Aggregation Pipelines**: Use MongoDB aggregation for complex statistics
2. **Projection**: Only return required fields to reduce network overhead
3. **Pagination**: Implement proper pagination for large result sets

### Caching Strategy

1. **Redis Integration**: Cache frequently accessed dashboard data
2. **TTL Indexes**: Use TTL indexes for time-based data cleanup
3. **Application-level Caching**: Cache user preferences and settings

## Monitoring and Maintenance

### Health Checks

1. **Connection Monitoring**: Monitor MongoDB connection health
2. **Query Performance**: Monitor slow queries and optimize indexes
3. **Storage Monitoring**: Monitor collection sizes and growth

### Backup Strategy

1. **Regular Backups**: Implement automated daily backups
2. **Point-in-time Recovery**: Use MongoDB oplog for point-in-time recovery
3. **Data Archival**: Archive old poll data to reduce storage costs

## Troubleshooting

### Common Issues

1. **Connection Timeouts**: Check network connectivity and MongoDB configuration
2. **Index Build Failures**: Ensure sufficient disk space and memory
3. **Query Performance**: Use MongoDB explain() to analyze query performance

### Debugging Queries

```javascript
// Enable query logging
db.setProfilingLevel(2)

// Analyze slow queries
db.system.profile.find().sort({ts: -1}).limit(10)

// Explain query execution
db.studentPolls.find({studentId: "student_001"}).explain("executionStats")
```

## Security Considerations

1. **Authentication**: Use MongoDB authentication and role-based access control
2. **Network Security**: Use SSL/TLS for MongoDB connections
3. **Data Validation**: Implement proper input validation and sanitization
4. **Audit Logging**: Log all database operations for security auditing 