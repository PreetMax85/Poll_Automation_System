---
sidebar_position: 1
---

# Users API Overview

The Users API handles user profile management and data retrieval operations.

## Base Path
```
/users
```

## Available Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/firebase/:firebaseUID` | Get user profile by Firebase UID | No |

## Features

### User Profile Management
- Retrieve user profiles using Firebase UID
- User data transformation and response formatting
- Integration with Firebase Authentication

### Data Transformation
The API uses transformer classes to ensure consistent user data formatting across all responses.

## Response Format

All user endpoints return transformed user objects with consistent field names and data types.

## Error Handling

Common error responses for user endpoints:

| Status Code | Description |
|-------------|-------------|
| 200 | Success - User found and returned |
| 404 | Not Found - User not found |
| 500 | Internal Server Error |

## User Object Structure

```json
{
  "_id": "mongodb_user_id",
  "firebaseUID": "firebase_user_id", 
  "email": "user@example.com",
  "name": "User Name",
  "role": "student|teacher",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Integration with Authentication

The Users API works closely with the Authentication API:
- Users are created through the authentication signup process
- Firebase UIDs link authentication records to user profiles
- User data is stored in the application database while authentication is handled by Firebase

## Next Steps

Explore the available endpoints:
- [Get User by Firebase UID](./get-by-firebase-uid)