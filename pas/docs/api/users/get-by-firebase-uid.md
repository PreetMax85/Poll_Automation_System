---
sidebar_position: 2
---

# Get User by Firebase UID

Retrieve a user profile using their Firebase UID.

<div className="api-endpoint">
  <span className="http-method http-get">GET</span>
  <span className="endpoint-url">/users/firebase/:firebaseUID</span>
</div>

## Description

This endpoint retrieves a user profile from the application database using the Firebase UID as the lookup key. It's commonly used to get user information after authentication.

## Authentication

🔓 **No authentication required** - This is a public endpoint for user profile lookup.

## Path Parameters

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
      <td>firebaseUID</td>
      <td>string</td>
      <td>Yes</td>
      <td>The Firebase UID of the user to retrieve</td>
    </tr>
  </tbody>
</table>

## Request Example

```http
GET /users/firebase/abc123def456ghi789
```

## Response

### Success Response

<span className="status-code status-200">200 OK</span>

Returns a transformed user object:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firebaseUID": "abc123def456ghi789",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "role": "student",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "profile": {
    "avatarUrl": "https://example.com/avatar.jpg",
    "bio": "Computer Science student"
  }
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
      <td>_id</td>
      <td>string</td>
      <td>MongoDB object ID of the user record</td>
    </tr>
    <tr>
      <td>firebaseUID</td>
      <td>string</td>
      <td>Firebase user ID (matches the path parameter)</td>
    </tr>
    <tr>
      <td>email</td>
      <td>string</td>
      <td>User's email address</td>
    </tr>
    <tr>
      <td>name</td>
      <td>string</td>
      <td>User's full name</td>
    </tr>
    <tr>
      <td>role</td>
      <td>string</td>
      <td>User role: "student" or "teacher"</td>
    </tr>
    <tr>
      <td>createdAt</td>
      <td>string (ISO date)</td>
      <td>Timestamp when the user account was created</td>
    </tr>
    <tr>
      <td>updatedAt</td>
      <td>string (ISO date)</td>
      <td>Timestamp when the user record was last updated</td>
    </tr>
    <tr>
      <td>profile</td>
      <td>object</td>
      <td>Additional profile information (optional)</td>
    </tr>
  </tbody>
</table>

### Error Responses

<span className="status-code status-404">404 Not Found</span>

```json
{
  "error": "User not found",
  "message": "No user found with the provided Firebase UID"
}
```

<span className="status-code status-400">400 Bad Request</span> - Invalid Firebase UID format

```json
{
  "error": "Bad Request",
  "message": "Invalid Firebase UID format"
}
```

<span className="status-code status-500">500 Internal Server Error</span>

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred while retrieving user data"
}
```

## Use Cases

### Post-Authentication User Lookup
After a user successfully authenticates, retrieve their profile information:

```javascript
const getUserProfile = async (firebaseUID) => {
  try {
    const response = await fetch(`/users/firebase/${firebaseUID}`);
    
    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else if (response.status === 404) {
      console.error('User profile not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};
```

### Profile Display
Use this endpoint to display user information in the application UI:

```javascript
const displayUserProfile = async (firebaseUID) => {
  const user = await getUserProfile(firebaseUID);
  
  if (user) {
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userRole').textContent = user.role;
  }
};
```

### Role-based Access Control
Check user roles for authorization decisions:

```javascript
const checkUserRole = async (firebaseUID) => {
  const user = await getUserProfile(firebaseUID);
  return user?.role || null;
};

const isTeacher = async (firebaseUID) => {
  const role = await checkUserRole(firebaseUID);
  return role === 'teacher';
};
```

## Data Transformation

The endpoint uses the `User` transformer class to ensure consistent data formatting. This includes:
- Standardized field names
- Proper data type conversion
- Removal of sensitive internal fields
- Optional field handling

## Notes

- The Firebase UID is the primary lookup key, not the MongoDB `_id`
- This endpoint does not require authentication, making it suitable for public profile lookups
- The response includes both authentication-related fields and profile information
- User data is transformed for consistency and security before being returned
- The endpoint handles cases where users exist in Firebase but not in the application database