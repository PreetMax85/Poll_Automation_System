---
sidebar_position: 3
---

# User Login

Authenticate a user with email and password to obtain Firebase authentication tokens.

<div className="api-endpoint">
  <span className="http-method http-post">POST</span>
  <span className="endpoint-url">/auth/login</span>
</div>

## Description

This endpoint authenticates a user using their email and password through Firebase Authentication. It returns the necessary tokens for accessing protected endpoints.

## Authentication

🔓 **No authentication required**

## Request Body

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
      <td>User's registered email address</td>
    </tr>
    <tr>
      <td>password</td>
      <td>string</td>
      <td>Yes</td>
      <td>User's password</td>
    </tr>
  </tbody>
</table>

## Request Example

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Response

### Success Response

<span className="status-code status-200">200 OK</span>

The response contains Firebase authentication tokens and user information:

```json
{
  "kind": "identitytoolkit#VerifyPasswordResponse",
  "localId": "firebase_user_id",
  "email": "john.doe@example.com",
  "displayName": "John Doe",
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2N...",
  "registered": true,
  "refreshToken": "AIwUaOm-4_refresh_token_here",
  "expiresIn": "3600"
}
```

**Response Fields:**

<table className="parameter-table">
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>idToken</td>
      <td>string</td>
      <td>Firebase ID token for API authentication</td>
    </tr>
    <tr>
      <td>refreshToken</td>
      <td>string</td>
      <td>Token for refreshing the ID token</td>
    </tr>
    <tr>
      <td>localId</td>
      <td>string</td>
      <td>Firebase user ID</td>
    </tr>
    <tr>
      <td>email</td>
      <td>string</td>
      <td>User's email address</td>
    </tr>
    <tr>
      <td>displayName</td>
      <td>string</td>
      <td>User's display name</td>
    </tr>
    <tr>
      <td>expiresIn</td>
      <td>string</td>
      <td>Token expiration time in seconds</td>
    </tr>
  </tbody>
</table>

### Error Responses

<span className="status-code status-400">400 Bad Request</span>

```json
{
  "error": {
    "code": 400,
    "message": "INVALID_PASSWORD",
    "errors": [
      {
        "message": "INVALID_PASSWORD",
        "domain": "global",
        "reason": "invalid"
      }
    ]
  }
}
```

<span className="status-code status-400">400 Bad Request</span> - User not found

```json
{
  "error": {
    "code": 400,
    "message": "EMAIL_NOT_FOUND",
    "errors": [
      {
        "message": "EMAIL_NOT_FOUND",
        "domain": "global",
        "reason": "invalid"
      }
    ]
  }
}
```

<span className="status-code status-500">500 Internal Server Error</span>

```json
{
  "error": "Internal server error",
  "message": "Authentication service temporarily unavailable"
}
```

## Using the ID Token

After successful login, use the `idToken` in the Authorization header for authenticated requests:

```http
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2N...
```

## Token Expiration

- ID tokens expire after 1 hour (3600 seconds)
- Use the refresh token to obtain new ID tokens when they expire
- The client should handle token refresh automatically

## Common Error Codes

| Firebase Error Code | Description |
|--------------------|-------------|
| `INVALID_PASSWORD` | The password is incorrect |
| `EMAIL_NOT_FOUND` | No user found with this email |
| `USER_DISABLED` | The user account has been disabled |
| `TOO_MANY_ATTEMPTS_TRY_LATER` | Too many failed login attempts |