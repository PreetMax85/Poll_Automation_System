# Student Dashboard Module

This module provides backend functionality for the student dashboard, handling poll statistics, results, and active/upcoming polls.

## Structure

```
student-dashboard/
├── controllers/           # HTTP request handlers
│   └── StudentDashboardController.ts
├── services/             # Business logic
│   └── StudentDashboardService.ts
├── interfaces/           # Type definitions
│   ├── IStudentDashboardService.ts
│   └── index.ts
├── classes/             # Validators and transformers
│   └── validators/
│       ├── StudentDashboardValidators.ts
│       └── index.ts
├── container.ts         # Dependency injection setup
├── types.ts            # DI symbols
├── index.ts            # Module exports
└── README.md           # This file
```

## API Endpoints

### Core Dashboard Endpoints
- `GET /student-dashboard/:studentId` - Get complete dashboard data
- `GET /student-dashboard/:studentId/statistics` - Get poll statistics
- `GET /student-dashboard/:studentId/results` - Get poll results
- `GET /student-dashboard/:studentId/active-polls` - Get active polls
- `GET /student-dashboard/:studentId/upcoming-polls` - Get upcoming polls

### Enhanced Analytics Endpoints
- `GET /student-dashboard/:studentId/analytics?timeRange=30d` - Get student analytics
- `GET /student-dashboard/:studentId/subjects/:subject/performance` - Get subject performance
- `PUT /student-dashboard/:studentId/profile` - Update student profile

## Features

### Core Features
- **Poll Statistics**: Total, taken, and absent polls
- **Poll Results**: Student performance in completed polls
- **Active Polls**: Currently running polls
- **Upcoming Polls**: Scheduled polls

### Enhanced Features
- **Student Analytics**: Performance trends and subject analysis
- **Subject Performance**: Detailed analysis by subject
- **Profile Management**: Student preferences and settings
- **Real-time Data**: Live updates for active polls
- **Performance Tracking**: Historical performance data

## Current Status

This module currently returns mock data. In a real implementation, it would:
1. Connect to the database to fetch real data
2. Integrate with the livequizzes module for poll data
3. Add authentication and authorization
4. Add caching for better performance 