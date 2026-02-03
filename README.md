# Quiz Battle Platform

A community-driven quiz platform where users can create multiple-choice quizzes, discover quizzes through full-text search and category filtering, and play asynchronously with simple percentage-based scoring.

## Features

- **🔐 Social Authentication**: Google OAuth and Discord OAuth login
- **🔍 Advanced Discovery**: Full-text search and category filtering
- **📝 Quiz Creation**: Create multiple-choice quizzes with image support
- **🎮 Quiz Play**: Asynchronous quiz play with instant scoring
- **📊 Statistics**: Track play history and view statistics
- **👤 User Profiles**: Manage created quizzes and view play history
- **🖼️ Cloudinary Integration**: Upload and manage quiz images
- **📱 Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: React 18 with React Router
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas (free tier)
- **Media Storage**: Cloudinary
- **Authentication**: Passport.js (Google & Discord OAuth)
- **Deployment**: Vercel (frontend) + Render (backend)

## Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
.\setup.bat
```

**Unix/Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

## Project Structure

```
quiz-battle-platform/
├── client/                 # React Frontend (Port 3000)
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── context/       # Auth context provider
│   │   └── App.js
│   └── package.json
├── server/                # Node.js Backend (Port 5000)
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route handlers
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth & other middleware
│   ├── utils/            # Helper utilities (Cloudinary)
│   ├── server.js
│   ├── config.js
│   └── package.json
├── SETUP_GUIDE.md        # Detailed setup & deployment guide
└── README.md
```

## API Endpoints

### Authentication
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/discord` - Discord OAuth login
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Quizzes
- `GET /api/quizzes` - Get all quizzes (with search & filters)
- `POST /api/quizzes` - Create new quiz
- `GET /api/quizzes/:id` - Get quiz details
- `PUT /api/quizzes/:id` - Update quiz
- `DELETE /api/quizzes/:id` - Delete quiz
- `GET /api/quizzes/user/my-quizzes` - Get user's created quizzes

### Play & History
- `POST /api/play-history` - Record quiz play & score
- `GET /api/play-history/user/history` - Get user's play history
- `GET /api/play-history/:quizId/stats` - Get quiz statistics

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category details

### Media Upload
- `POST /api/upload/image` - Upload quiz image
- `POST /api/upload/video` - Upload quiz video

## Environment Variables

### Backend (server/.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
DISCORD_CLIENT_ID=your_discord_oauth_id
DISCORD_CLIENT_SECRET=your_discord_oauth_secret
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
PORT=5000
```

### Frontend (client/.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_DISCORD_CLIENT_ID=your_discord_client_id
```

## Development

Start both servers in separate terminals:

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Deployment

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete deployment instructions to:
- **Frontend**: Vercel (free tier)
- **Backend**: Render (free tier)
- **Database**: MongoDB Atlas (free tier)

## Features Implemented

✅ Social Authentication (Google & Discord)
✅ Quiz CRUD Operations
✅ Full-Text Search & Category Filtering
✅ Multiple-Choice Quiz Type
✅ Cloudinary Image Integration
✅ Score Tracking & Play History
✅ User Profiles & Statistics
✅ Responsive Design
✅ JWT Authentication

## Future Enhancements

- [ ] Bracket Battle Tournament System
- [ ] Real-Time Multiplayer Games (WebSockets)
- [ ] Quiz Comments & Ratings
- [ ] Leaderboards & Rankings
- [ ] Social Features (Follow, Share)
- [ ] Admin Dashboard
- [ ] Quiz Analytics

## Database Schema

### Users
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  displayName: String,
  profileImage: String (URL),
  googleId: String,
  discordId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Quizzes
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  creator: ObjectId (User),
  category: ObjectId (Category),
  type: String (multiple-choice/bracket-battle),
  questions: [{
    question: String,
    imageUrl: String,
    options: [String],
    correctAnswerIndex: Number
  }],
  playCount: Number,
  rating: Number,
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### PlayHistory
```javascript
{
  _id: ObjectId,
  user: ObjectId (User),
  quiz: ObjectId (Quiz),
  score: Number (0-100),
  totalQuestions: Number,
  answers: [{
    questionIndex: Number,
    selectedAnswerIndex: Number,
    isCorrect: Boolean
  }],
  createdAt: Date
}
```

## Troubleshooting

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for troubleshooting common issues.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Repository**: https://github.com/pedromussi1/quiz-battle-platform
