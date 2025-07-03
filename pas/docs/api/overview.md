---
sidebar_position: 1
---

# API Overview

The PAS API provides a comprehensive REST interface for managing authentication, users, live quizzes, and AI-powered content generation. All endpoints follow RESTful conventions and return JSON responses.

## API Modules

### Authentication Module
- **Base Path**: `/auth`
- **Purpose**: User registration, login, password management, and token verification
- **Key Features**: Firebase Authentication integration, rate limiting

### Users Module
- **Base Path**: `/users`
- **Purpose**: User profile management and data retrieval
- **Key Features**: Firebase UID lookup, user transformations

### Live Quizzes Module
- **Base Path**: `/livequizzes`
- **Purpose**: Real-time interactive quiz rooms and polling
- **Key Features**: Room management, poll creation, answer submission, AI question generation

### GenAI Module
- **Base Path**: `/genai`
- **Purpose**: AI-powered content generation and video processing
- **Key Features**: Video transcription, content segmentation, question generation, course item creation

## Common Patterns

### HTTP Methods
- **GET**: Retrieve data
- **POST**: Create new resources or perform actions
- **PATCH**: Update existing resources
- **DELETE**: Remove resources

### Authentication
Most endpoints require authentication. The API uses Firebase Authentication with ID tokens.

### Error Handling
The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created successfully
- `400`: Bad request / validation error
- `401`: Unauthorized
- `404`: Resource not found
- `500`: Internal server error

### Response Structure
All responses follow a consistent JSON structure with appropriate HTTP status codes and error messages when applicable.

## Rate Limiting

Authentication endpoints include rate limiting to prevent abuse. The current implementation uses Express rate limiting middleware.

## File Upload Support

Several endpoints support file uploads (particularly in GenAI and Live Quizzes modules) using multipart/form-data encoding.

## Next Steps

Explore the specific modules:
- [Authentication API](./auth/overview)
- [Users API](./users/overview)
- [Live Quizzes API](./livequizzes/overview)
- [GenAI API](./genai/overview)