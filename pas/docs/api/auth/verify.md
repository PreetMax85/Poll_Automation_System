---
sidebar_position: 4
---

# Token Verification

Verify whether a Firebase ID token is authentic and not expired.

<div className="api-endpoint">
  <span className="http-method http-post">POST</span>
  <span className="endpoint-url">/auth/verify</span>
</div>

## Description

Validates whether the provided Firebase ID token is authentic and not expired. This endpoint is useful for checking session validity or re-authenticating a user without requiring login credentials.

## Authentication

🔐 **Authentication required** - Requires a valid Firebase ID token in the Authorization header.

## Headers

```http
Authorization: Bearer <firebase_id_token>
```

## Request Body

No request body required. The token is validated from the Authorization header.

## Request Example

```http
POST /auth/verify
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2N...
Content-Type: application/json
```

## Response

### Success Response

<span className="status-code status-200">200 OK</span>

```json
{
  "message": "Token is valid"
}
```

### Error Responses

<span className="status-code status-401">401 Unauthorized</span> - Invalid or expired token

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

<span className="status-code status-401">401 Unauthorized</span> - Missing token

```json
{
  "error": "Unauthorized", 
  "message": "No authorization token provided"
}
```

<span className="status-code status-500">500 Internal Server Error</span>

```json
{
  "error": "Internal server error",
  "message": "Token verification service temporarily unavailable"
}
```

## Use Cases

### Session Validation
Check if a user's session is still valid before allowing access to protected resources:

```javascript
const verifyUserSession = async (token) => {
  try {
    const response = await fetch('/auth/verify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      return true; // Token is valid
    }
    return false; // Token is invalid
  } catch (error) {
    return false; // Network error or token invalid
  }
};
```

### Re-authentication Check
Verify that a user is still authenticated before performing sensitive operations:

```javascript
const checkAuthBeforeSensitiveOperation = async (token) => {
  const isValid = await verifyUserSession(token);
  if (!isValid) {
    // Redirect to login page
    window.location.href = '/login';
    return;
  }
  
  // Proceed with sensitive operation
  performSensitiveOperation();
};
```

## Notes

- This endpoint validates the token signature and expiration
- It does not refresh or extend the token's validity period
- Use this endpoint to implement "keep alive" functionality in your application
- The endpoint returns quickly and can be called frequently for session checks
- If the token is expired, the user should be redirected to the login page