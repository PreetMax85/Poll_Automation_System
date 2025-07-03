---
sidebar_position: 1
---

# Authentication API Overview

The Authentication API handles user registration, login, password management, and token verification using Firebase Authentication.

## Base Path
```
/auth
```

## Available Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register a new user account | No |
| POST | `/auth/login` | Authenticate user and get tokens | No |
| POST | `/auth/verify` | Verify Firebase ID token validity | Yes |
| PATCH | `/auth/change-password` | Change user password | Yes |

## Authentication Flow

1. **Registration**: Use `/auth/signup` to create a new user account
2. **Login**: Use `/auth/login` to authenticate and receive tokens
3. **Token Usage**: Include the Firebase ID token in subsequent requests
4. **Token Verification**: Use `/auth/verify` to validate token status
5. **Password Management**: Use `/auth/change-password` to update passwords

## Rate Limiting

Authentication endpoints are protected by rate limiting to prevent abuse. The rate limiter is applied to:
- `/auth/signup`

## Error Responses

Common error responses for authentication endpoints:

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid credentials |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Firebase Integration

This API integrates with Firebase Authentication for:
- User account creation and management
- Password authentication
- ID token generation and verification
- Password change operations

All authentication operations leverage Firebase's secure infrastructure while maintaining a consistent REST API interface.

## Next Steps

Explore individual endpoints:
- [User Signup](./signup)
- [User Login](./login)
- [Token Verification](./verify)
- [Change Password](./change-password)