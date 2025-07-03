---
sidebar_position: 2
---

# User Signup

Register a new user account using Firebase Authentication and store additional user details in the application database.

<div className="api-endpoint">
  <span className="http-method http-post">POST</span>
  <span className="endpoint-url">/auth/signup</span>
</div>

## Description

This endpoint registers a new user using Firebase Authentication and stores additional user details in the application database. This is typically the first step for any new user to access the system.

## Authentication

🔓 **No authentication required**

## Rate Limiting

⚡ **Rate limited** - This endpoint has rate limiting applied to prevent abuse.

## Request Body

The request body should contain user registration details:

<table className="parameter-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td>string</td>
      <td>Yes</td>
      <td>User's email address</td>
    </tr>
    <tr>
      <td>password</td>
      <td>string</td>
      <td>Yes</td>
      <td>User's password (min 6 characters)</td>
    </tr>
    <tr>
      <td>name</td>
      <td>string</td>
      <td>Yes</td>
      <td>User's full name</td>
    </tr>
    <tr>
      <td>role</td>
      <td>string</td>
      <td>No</td>
      <td>User role (student/teacher)</td>
    </tr>
  </tbody>
</table>

## Request Example

```http
POST /auth/signup
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "role": "student"
}
```

## Response

### Success Response

<span className="status-code status-201">201 Created</span>

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "acknowledgedInvites": [],
    "userId": "firebase_user_id"
  }
}
```

If the user acknowledges existing invites during signup, the response may include invite information:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "acknowledgedInvites": [
      {
        "inviteId": "invite_123",
        "courseId": "course_456",
        "status": "acknowledged"
      }
    ],
    "userId": "firebase_user_id"
  }
}
```

### Error Responses

<span className="status-code status-400">400 Bad Request</span>

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

<span className="status-code status-429">429 Too Many Requests</span>

```json
{
  "error": "Rate limit exceeded",
  "message": "Too many signup attempts, please try again later"
}
```

<span className="status-code status-500">500 Internal Server Error</span>

```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred during registration"
}
```

## Notes

- Email addresses must be unique across the system
- Passwords must meet Firebase security requirements (minimum 6 characters)
- User profiles are created in both Firebase Authentication and the application database
- The endpoint may process existing course invites if the email matches pending invitations
- Rate limiting helps prevent spam registration attempts