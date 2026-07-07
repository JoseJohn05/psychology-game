# Backend Server Setup

## Environment Variables

Create `.env.local` in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api

# Game Settings
REACT_APP_GAME_VERSION=1.0.0
REACT_APP_ENABLE_VOICE=true
REACT_APP_ENABLE_MULTIPLAYER=true

# Feature Flags
REACT_APP_BETA_FEATURES=false
```

## Backend Server (Node.js/Express)

The frontend expects a backend server at `http://localhost:3001/api`

### Required API Endpoints

#### Authentication
- `POST /auth/register` - Register new player
- `POST /auth/login` - Login player
- `GET /auth/profile` - Get player profile
- `PUT /auth/profile` - Update player profile

#### Games
- `GET /games/cognitive?level=1` - Get cognitive questions
- `GET /games/memory?level=1` - Get memory objects
- `GET /games/emotional?level=1` - Get emotional scenarios
- `GET /games/pattern?level=1` - Get pattern challenges
- `GET /games/levels?gameType=cognitive` - Get game levels
- `POST /games/sessions` - Create game session
- `POST /games/sessions/submit` - Submit game results
- `GET /games/stats?gameType=cognitive` - Get player stats

#### Leaderboard
- `GET /leaderboard/global?page=1&limit=10` - Global leaderboard
- `GET /leaderboard/weekly?page=1&limit=10` - Weekly leaderboard
- `GET /leaderboard/country?country=USA&limit=20` - Country leaderboard
- `POST /leaderboard/submit` - Submit score

### Mock Server (for development)

All endpoints have mock implementations using local state. Replace with real backend when ready.

## Running the Frontend

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Backend Technologies Recommended

- **Node.js** with Express.js
- **MongoDB** for database
- **JWT** for authentication
- **Socket.io** for multiplayer/real-time
- **WebRTC** for voice (optional)

## API Response Format

All responses should follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

Errors:

```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```
