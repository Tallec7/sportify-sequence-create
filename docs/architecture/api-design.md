
# API Design - KAP

## 1. REST API

### 1.1 Core Endpoints
```
/api/sessions
  GET    /        - List sessions
  POST   /        - Create session
  GET    /:id     - Get session
  PUT    /:id     - Update session
  DELETE /:id     - Delete session

/api/sequences
  GET    /        - List sequences
  POST   /        - Create sequence
  GET    /:id     - Get sequence
  PUT    /:id     - Update sequence
  DELETE /:id     - Delete sequence

/api/exercises
  GET    /        - List exercises
  POST   /        - Create exercise
  GET    /:id     - Get exercise
  PUT    /:id     - Update exercise
  DELETE /:id     - Delete exercise
```

### 1.2 Authentication Endpoints
```
/api/auth
  POST   /login   - User login
  POST   /logout  - User logout
  POST   /refresh - Refresh token
```

## 2. WebSocket API

### 2.1 Real-time Endpoints
```
/ws/collaboration
  - Real-time editing
  - Presence updates
  - Chat messages

/ws/notifications
  - System alerts
  - User notifications
  - Status updates
```

## 3. API Standards

### 3.1 Request/Response Format
- JSON payloads
- JWT authentication
- Status codes
- Error handling

### 3.2 Security
- Rate limiting
- Input validation
- CORS policies
- API versioning

See also:
- [Architecture Overview](./overview.md)
- [Component Design](./component-design.md)
- [Database Design](./database-design.md)
