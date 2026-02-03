# Quiz Battle Platform

A community-driven quiz platform where users can create multiple-choice quizzes and bracket battle tournaments, discover quizzes through full-text search and category filtering, and play asynchronously with simple percentage-based scoring.

## Features

- **Social Authentication**: Google OAuth and Discord OAuth login
- **Quiz Discovery**: Full-text search and category filtering
- **Quiz Types**: Multiple-choice quizzes and bracket battle tournaments
- **Media Support**: Cloudinary integration for image/video uploads
- **User Profiles**: Track created quizzes and play history
- **Simple Scoring**: Percentage-based score calculation

## Tech Stack

- **Frontend**: React (Create React App)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (free tier)
- **Media Storage**: Cloudinary
- **Authentication**: Passport.js (Google & Discord OAuth)
- **Deployment**: Vercel (frontend) + Render (backend)

## Project Structure

```
quiz-battle-platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── server.js
└── README.md
```

## Installation

### Server Setup
```bash
cd server
npm install
cp .env.example .env
# Update .env with your MongoDB URI, OAuth credentials, and Cloudinary API keys
npm start
```

### Client Setup
```bash
cd client
npm install
cp .env.example .env
# Update .env with backend API URL
npm start
```

## Environment Variables

### Server (.env)
```
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_DISCORD_CLIENT_ID=your_discord_client_id
```

## License

MIT
