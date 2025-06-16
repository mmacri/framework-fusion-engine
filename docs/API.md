
# API Documentation

## Overview

The Framework Fusion Engine currently uses mock data for demonstration purposes. This document outlines the planned API structure for future backend integration.

## Planned API Endpoints

### Controls

#### Get Controls
```http
GET /api/controls?framework={framework}&category={category}&page={page}
```

**Parameters:**
- `framework` (optional): Filter by framework (nist, pci, hipaa, sox, iso27001)
- `category` (optional): Filter by control category
- `page` (optional): Page number for pagination

**Response:**
```json
{
  "controls": [
    {
      "id": "AC-1",
      "title": "Access Control Policy and Procedures",
      "description": "...",
      "framework": "nist",
      "category": "access-control",
      "priority": "High",
      "status": "implemented"
    }
  ],
  "pagination": {
    "page": 1,
    "totalPages": 50,
    "totalControls": 1000
  }
}
```

#### Get Control Details
```http
GET /api/controls/{controlId}
```

**Response:**
```json
{
  "id": "AC-1",
  "title": "Access Control Policy and Procedures",
  "description": "...",
  "implementation": "...",
  "testingProcedures": "...",
  "relatedControls": ["AC-2", "AC-3"],
  "versions": [
    {
      "version": "1.3",
      "timestamp": "2024-12-15T14:30:00Z",
      "editor": "security_expert_123",
      "changes": ["Updated implementation guidance"]
    }
  ]
}
```

### Community

#### Submit Control Edit
```http
POST /api/controls/{controlId}/edits
```

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "implementation": "Updated implementation",
  "editSummary": "Improved clarity and added examples"
}
```

#### Get Edit History
```http
GET /api/controls/{controlId}/history
```

### Framework Mappings

#### Get Control Mappings
```http
GET /api/mappings/{controlId}
```

**Response:**
```json
{
  "sourceControl": "NIST-AC-1",
  "mappings": [
    {
      "targetFramework": "iso27001",
      "targetControl": "A.9.1.1",
      "relationship": "equivalent",
      "confidence": 0.95
    }
  ]
}
```

## Authentication (Future)

### JWT Token Authentication
```http
Authorization: Bearer <jwt_token>
```

### User Endpoints
```http
POST /api/auth/login
POST /api/auth/register
GET /api/user/profile
PUT /api/user/profile
```

## Error Responses

```json
{
  "error": {
    "code": "INVALID_FRAMEWORK",
    "message": "The specified framework is not supported",
    "details": {
      "supportedFrameworks": ["nist", "pci", "hipaa", "sox", "iso27001"]
    }
  }
}
```

## Rate Limiting

- Anonymous users: 100 requests/hour
- Authenticated users: 1000 requests/hour
- Contributors: 5000 requests/hour

## WebSocket Events (Future)

For real-time collaboration:

```javascript
// Control being edited
socket.on('control:editing', { controlId, userId, timestamp })

// Control updated
socket.on('control:updated', { controlId, changes, editor })

// New comment added
socket.on('comment:added', { controlId, comment, author })
```

This API structure supports the collaborative nature of the platform while maintaining security and performance.
