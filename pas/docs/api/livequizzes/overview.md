---
sidebar_position: 1
---

# Live Quizzes API Overview

The Live Quizzes API manages real-time interactive quiz rooms, polls, and collaborative learning sessions.

## Base Path
```
/livequizzes/rooms
```

## Available Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/livequizzes/rooms` | Create a new quiz room | Yes |
| GET | `/livequizzes/rooms/:code` | Get room details by code | No |
| POST | `/livequizzes/rooms/:code/polls` | Create a poll in a room | No |
| POST | `/livequizzes/rooms/:code/generate-questions` | Generate AI questions from media | No |
| POST | `/livequizzes/rooms/:code/polls/answer` | Submit an answer to a poll | No |
| GET | `/livequizzes/rooms/:code/polls/results` | Get poll results for a room | No |
| POST | `/livequizzes/rooms/:code/end` | End a quiz room session | No |

## Key Features

### Real-time Room Management
- Create and manage quiz rooms with unique access codes
- Join rooms using simple room codes
- Real-time collaboration between teachers and students

### Interactive Polling
- Create multiple-choice polls within rooms
- Real-time answer submission and collection
- Instant results and analytics

### AI-Powered Question Generation
- Generate questions from uploaded video/audio files
- Support for YouTube URL processing
- Automatic transcription and content analysis
- Intelligent question creation based on content

### File Upload Support
- Video and audio file processing
- YouTube URL integration
- Automatic media transcription
- Content-based question generation

## Room Structure

```json
{
  "id": "room_id",
  "name": "Quiz Room Name",
  "code": "ABC123",
  "teacherId": "teacher_firebase_uid",
  "inviteLink": "http://localhost:5173/student/pollroom/ABC123",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "status": "active"
}
```

## Poll Structure

```json
{
  "id": "poll_id",
  "roomCode": "ABC123",
  "question": "What is the capital of France?",
  "options": ["London", "Berlin", "Paris", "Madrid"],
  "creatorId": "teacher_firebase_uid",
  "answers": {},
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## File Upload Workflow

1. **Media Upload**: Upload video/audio files or provide YouTube URLs
2. **Transcription**: Automatic transcription of audio content
3. **Content Analysis**: AI-powered content segmentation and analysis
4. **Question Generation**: Intelligent question creation based on content
5. **Integration**: Questions are available for use in polls

## AI Integration

The Live Quizzes module integrates with GenAI services for:
- Video and audio transcription
- Content segmentation and analysis
- Automatic question generation
- Multi-model AI support for different question types

## Real-time Features

While the REST API handles the data management, the live functionality is enhanced by:
- WebSocket connections for real-time updates
- Instant poll results
- Live participant tracking
- Real-time answer submission

## Error Handling

Common error responses:

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input or missing required fields |
| 404 | Not Found - Room or poll not found |
| 500 | Internal Server Error |

## Next Steps

Explore individual endpoints:
- [Create Room](./create-room)
- [Get Room](./get-room) 
- [Create Poll](./create-poll)
- [Generate Questions](./generate-questions)
- [Submit Answer](./submit-answer)
- [Get Results](./get-results)
- [End Room](./end-room)