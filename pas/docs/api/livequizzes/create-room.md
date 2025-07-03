---
sidebar_position: 2
---

# Create Room

Create a new quiz room for interactive polling sessions.

<div className="api-endpoint">
  <span className="http-method http-post">POST</span>
  <span className="endpoint-url">/livequizzes/rooms</span>
</div>

## Description

Creates a new quiz room that teachers can use to host interactive polling sessions. Each room gets a unique access code that students can use to join the session.

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
      <td>name</td>
      <td>string</td>
      <td>Yes</td>
      <td>Display name for the quiz room</td>
    </tr>
    <tr>
      <td>teacherId</td>
      <td>string</td>
      <td>Yes</td>
      <td>Firebase UID of the teacher creating the room</td>
    </tr>
  </tbody>
</table>

## Request Example

```http
POST /livequizzes/rooms
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2N...
Content-Type: application/json

{
  "name": "Biology Quiz - Chapter 5",
  "teacherId": "abc123def456ghi789"
}
```

## Response

### Success Response

<span className="status-code status-200">200 OK</span>

```json
{
  "id": "room_507f1f77bcf86cd799439011",
  "name": "Biology Quiz - Chapter 5",
  "code": "XYZ789",
  "teacherId": "abc123def456ghi789",
  "inviteLink": "http://localhost:5173/student/pollroom/XYZ789",
  "createdAt": "2024-01-15T14:30:00.000Z",
  "status": "active"
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
      <td>id</td>
      <td>string</td>
      <td>Unique identifier for the room</td>
    </tr>
    <tr>
      <td>name</td>
      <td>string</td>
      <td>Display name of the room</td>
    </tr>
    <tr>
      <td>code</td>
      <td>string</td>
      <td>6-character access code for students to join</td>
    </tr>
    <tr>
      <td>teacherId</td>
      <td>string</td>
      <td>Firebase UID of the room creator</td>
    </tr>
    <tr>
      <td>inviteLink</td>
      <td>string</td>
      <td>Direct URL for students to join the room</td>
    </tr>
    <tr>
      <td>createdAt</td>
      <td>string (ISO date)</td>
      <td>Timestamp when the room was created</td>
    </tr>
    <tr>
      <td>status</td>
      <td>string</td>
      <td>Current room status ("active", "ended")</td>
    </tr>
  </tbody>
</table>

### Error Responses

<span className="status-code status-400">400 Bad Request</span> - Missing required fields

```json
{
  "error": "Bad Request",
  "message": "Room name and teacherId are required"
}
```

<span className="status-code status-401">401 Unauthorized</span> - Invalid or missing token

```json
{
  "error": "Unauthorized",
  "message": "Valid authentication token required"
}
```

<span className="status-code status-500">500 Internal Server Error</span>

```json
{
  "error": "Internal Server Error",
  "message": "An error occurred while creating the room"
}
```

## Room Access Code

The system automatically generates a unique 6-character alphanumeric code for each room. Students use this code to join the room from the student interface.

## Invite Link

The response includes a pre-formatted invite link that can be shared with students. The link follows the pattern:
```
http://localhost:5173/student/pollroom/{room_code}
```

## Use Cases

### Teacher Creating a Quiz Session

```javascript
const createQuizRoom = async (roomName, teacherId, authToken) => {
  try {
    const response = await fetch('/livequizzes/rooms', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: roomName,
        teacherId: teacherId
      })
    });

    if (response.ok) {
      const room = await response.json();
      console.log('Room created:', room.code);
      
      // Share the invite link with students
      shareInviteLink(room.inviteLink);
      
      return room;
    }
  } catch (error) {
    console.error('Failed to create room:', error);
  }
};
```

### Sharing Room Access

Once created, teachers can share the room with students using:
1. **Room Code**: Students can manually enter the 6-character code
2. **Invite Link**: Direct link that opens the room in the student interface
3. **QR Code**: Generate a QR code from the invite link for easy mobile access

## Room Lifecycle

1. **Creation**: Teacher creates room with name and authentication
2. **Active**: Students can join and participate in polls
3. **Polls**: Teacher creates polls, students submit answers
4. **Results**: Real-time results viewing
5. **End**: Teacher ends the session when complete

## Notes

- Rooms remain active until explicitly ended by the teacher
- Multiple students can join the same room simultaneously
- Teachers can create multiple rooms concurrently
- Room codes are unique and generated automatically
- The invite link points to the frontend student interface