---
sidebar_position: 1
---

# PAS API Documentation

Welcome to the **PAS (Personal Active System) API Documentation**. This comprehensive guide provides detailed information about all REST API endpoints and frontend routes available in the PAS application.

## Overview

PAS is a comprehensive learning management system that includes:
- **Authentication System** - User registration, login, and session management
- **User Management** - Profile management and user data handling
- **Live Quizzes** - Real-time interactive polling and quiz rooms
- **GenAI Features** - AI-powered content generation and video processing

## API Structure

The PAS API is organized into the following main modules:

### 🔐 Authentication (`/auth`)
Handles user authentication, registration, and session management.

### 👥 Users (`/users`)
Manages user profiles and user-related operations.

### 📊 Live Quizzes (`/livequizzes`)
Manages real-time quiz rooms, polls, and interactive sessions.

### 🤖 GenAI (`/genai`)
AI-powered features for content generation, video processing, and transcript analysis.

## Base URL

All API endpoints are relative to the base URL:
```
http://localhost:3000
```

## Authentication

Most endpoints require authentication using Firebase Authentication. Include the Firebase ID token in the Authorization header:

```http
Authorization: Bearer <firebase_id_token>
```

## Response Format

All API responses follow a consistent JSON format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

## Getting Started

1. **Authentication**: Start with the [Authentication endpoints](./api/auth/overview) to register and login users
2. **User Management**: Use [Users endpoints](./api/users/overview) to manage user profiles
3. **Live Features**: Explore [Live Quizzes](./api/livequizzes/overview) for interactive sessions
4. **AI Features**: Check out [GenAI endpoints](./api/genai/overview) for AI-powered content generation

## Frontend Routes

In addition to the backend API, this documentation also covers the frontend URL structure for both student and teacher interfaces.

---

For detailed information about each endpoint, use the navigation menu on the left to explore the specific API sections.