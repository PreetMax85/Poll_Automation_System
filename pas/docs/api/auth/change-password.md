---
sidebar_position: 5
---

# Change Password

Change the password for an authenticated user account.

<div className="api-endpoint">
  <span className="http-method http-patch">PATCH</span>
  <span className="endpoint-url">/auth/change-password</span>
</div>

## Description

Allows an authenticated user to update their password. This action is performed via Firebase Authentication and requires the user to be currently authenticated with a valid ID token.

## Authentication

🔐 **Authentication required** - Requires a valid Firebase ID token in the Authorization header.

## Headers

```http
Authorization: Bearer <firebase_id_token>
```

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
      <td>currentPassword</td>
      <td>string</td>
      <td>Yes</td>
      <td>User's current password for verification</td>
    </tr>
    <tr>
      <td>newPassword</td>
      <td>string</td>
      <td>Yes</td>
      <td>New password (min 6 characters)</td>
    </tr>
  </tbody>
</table>

## Request Example

```http
PATCH /auth/change-password
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2N...
Content-Type: application/json

{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456"
}
```

## Response

### Success Response

<span className="status-code status-200">200 OK</span>

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Error Responses

<span className="status-code status-400">400 Bad Request</span> - Invalid current password

```json
{
  "error": "Bad Request",
  "message": "Current password is incorrect"
}
```

<span className="status-code status-400">400 Bad Request</span> - Validation error

```json
{
  "error": "Bad Request",
  "message": "New password must be at least 6 characters long"
}
```

<span className="status-code status-401">401 Unauthorized</span> - Invalid or expired token

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired authentication token"
}
```

<span className="status-code status-500">500 Internal Server Error</span>

```json
{
  "error": "Internal Server Error",
  "message": "Password change service temporarily unavailable"
}
```

## Password Requirements

- **Minimum length**: 6 characters
- **Firebase enforced**: Follows Firebase Authentication password policies
- **Current password verification**: Must provide correct current password
- **Token validity**: User must be authenticated with a valid ID token

## Security Features

### Current Password Verification
The endpoint requires the current password to be provided and verified before allowing the password change. This prevents unauthorized password changes even if someone gains access to a user's session.

### Token-based Authentication
The user must be authenticated with a valid Firebase ID token, ensuring that only the actual account owner can change the password.

### Firebase Security
All password changes are processed through Firebase Authentication, leveraging Firebase's security infrastructure and policies.

## Example Implementation

```javascript
const changePassword = async (currentPassword, newPassword, idToken) => {
  try {
    const response = await fetch('/auth/change-password', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Password changed successfully');
      return { success: true, message: result.message };
    } else {
      console.error('Password change failed:', result.message);
      return { success: false, error: result.message };
    }
  } catch (error) {
    console.error('Network error:', error);
    return { success: false, error: 'Network error occurred' };
  }
};
```

## Notes

- The user's Firebase ID token remains valid after password change
- The user does not need to log in again after changing their password
- This endpoint does not invalidate existing sessions on other devices
- For enhanced security, consider implementing additional verification steps
- Password change events can be logged for security auditing purposes