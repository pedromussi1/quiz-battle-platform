# Quiz Battle Platform - Setup & Deployment Guide

All code has been pushed to your GitHub repository: https://github.com/pedromussi1/quiz-battle-platform

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/pedromussi1/quiz-battle-platform.git
cd quiz-battle-platform
```

### Step 2: Setup MongoDB Atlas (Free Tier)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create an M0 cluster (free tier)
4. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)

### Step 3: Setup OAuth Credentials

#### Google OAuth
1. Go to https://console.cloud.google.com
2. Create a new project
3. Go to "Credentials" → Create OAuth 2.0 Client ID
4. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
5. Copy Client ID and Client Secret

#### Discord OAuth
1. Go to https://discord.com/developers/applications
2. Create new application
3. In "OAuth2" → Add redirect URL: `http://localhost:5000/api/auth/discord/callback`
4. Copy Client ID and Client Secret

### Step 4: Setup Cloudinary (Free Tier)
1. Go to https://cloudinary.com/
2. Create free account
3. Go to Dashboard → Copy Cloud Name
4. Go to Settings → API Keys → Copy API Key and API Secret

### Step 5: Configure Backend
```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-battle?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-this
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
DISCORD_CALLBACK_URL=http://localhost:5000/api/auth/discord/callback
```

Start backend:
```bash
npm start
# Server runs on http://localhost:5000
```

### Step 6: Configure Frontend
```bash
cd client
npm install
cp .env.example .env
```

Edit `client/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_DISCORD_CLIENT_ID=your_discord_client_id
```

Start frontend:
```bash
npm start
# App runs on http://localhost:3000
```

### Step 7: Seed Initial Categories (Optional)
In MongoDB Atlas, go to Collections and run this in the mongosh console:
```javascript
db.categories.insertMany([
  { name: "Animals", slug: "animals", description: "Animal-related quizzes" },
  { name: "Anime", slug: "anime", description: "Anime and manga quizzes" },
  { name: "Gaming", slug: "gaming", description: "Video game quizzes" },
  { name: "Movies", slug: "movies", description: "Movie quizzes" },
  { name: "Music", slug: "music", description: "Music quizzes" },
  { name: "Sports", slug: "sports", description: "Sports quizzes" },
  { name: "TV Shows", slug: "tv-shows", description: "TV show quizzes" },
  { name: "Entertainment", slug: "entertainment", description: "General entertainment" }
])
```

---

## 🌍 Production Deployment

### Deploy Frontend to Vercel (Free Tier)

1. **Connect GitHub Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select `client` as the root directory
   - Click "Deploy"

2. **Configure Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `REACT_APP_API_URL=https://your-backend-url.com/api`
   - Add: `REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id`
   - Add: `REACT_APP_DISCORD_CLIENT_ID=your_discord_client_id`
   - Redeploy

3. **Update OAuth Redirect URIs**
   - Get your Vercel domain from the deployment
   - Update Google OAuth: Add `https://your-vercel-domain/api/auth/google/callback`
   - Update Discord OAuth: Add `https://your-vercel-domain/api/auth/discord/callback`

### Deploy Backend to Render (Free Tier)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → Web Service
   - Select your GitHub repository
   - Configure:
     - Name: `quiz-battle-api`
     - Root Directory: `server`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Environment: `Node`

3. **Add Environment Variables**
   - In Render dashboard → Environment:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-battle?retryWrites=true&w=majority
     JWT_SECRET=generate-a-strong-secret
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     DISCORD_CLIENT_ID=your_discord_client_id
     DISCORD_CLIENT_SECRET=your_discord_client_secret
     CLOUDINARY_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     NODE_ENV=production
     PORT=5000
     FRONTEND_URL=https://your-vercel-domain
     GOOGLE_CALLBACK_URL=https://your-render-url/api/auth/google/callback
     DISCORD_CALLBACK_URL=https://your-render-url/api/auth/discord/callback
     ```

4. **Update OAuth Redirect URIs**
   - Get your Render URL from the deployment
   - Update Google OAuth: Add `https://your-render-url/api/auth/google/callback`
   - Update Discord OAuth: Add `https://your-render-url/api/auth/discord/callback`

5. **Update MongoDB IP Whitelist**
   - Go to MongoDB Atlas → Network Access
   - Add IP `0.0.0.0/0` (allows all IPs - required for Render)

---

## 📊 API Endpoints

### Authentication
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/discord` - Discord OAuth login
- `GET /api/auth/profile` - Get user profile (requires token)
- `PUT /api/auth/profile` - Update user profile (requires token)

### Quizzes
- `GET /api/quizzes` - Get all quizzes (with filters)
  - Query params: `search`, `category`, `sortBy`, `order`, `limit`, `skip`
- `POST /api/quizzes` - Create quiz (requires token)
- `GET /api/quizzes/:id` - Get quiz by ID
- `PUT /api/quizzes/:id` - Update quiz (requires token)
- `DELETE /api/quizzes/:id` - Delete quiz (requires token)
- `GET /api/quizzes/user/my-quizzes` - Get user's quizzes (requires token)

### Play History
- `POST /api/play-history` - Record quiz play (requires token)
- `GET /api/play-history/user/history` - Get play history (requires token)
- `GET /api/play-history/:quizId/stats` - Get quiz statistics

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category

### Upload
- `POST /api/upload/image` - Upload image (requires token)
- `POST /api/upload/video` - Upload video (requires token)

---

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas (Network Access)
- Ensure database exists in MongoDB

### OAuth Not Working
- Verify redirect URIs match exactly (including https/http)
- Check Client ID and Client Secret are correct
- Ensure FRONTEND_URL matches your actual domain

### Cloudinary Upload Fails
- Verify API credentials are correct
- Check file size (max 50MB)
- Ensure file is image or video format

### CORS Errors
- Verify FRONTEND_URL in server .env matches frontend domain
- Check that frontend is making requests to correct API URL

---

## 📝 Features Implemented

✅ Social Authentication (Google & Discord OAuth)
✅ Quiz Creation with Multiple-Choice Questions
✅ Full-Text Search & Category Filtering
✅ Quiz Discovery & Browsing
✅ Asynchronous Quiz Play (No Live Multiplayer)
✅ Score Tracking & Play History
✅ User Profiles with Statistics
✅ Cloudinary Image Upload Integration
✅ Responsive Design
✅ MongoDB Database

---

## 🚀 Future Enhancements

- [ ] Bracket Battle Tournament System
- [ ] Real-time Multiplayer Games (WebSockets)
- [ ] Quiz Ratings & Comments
- [ ] Leaderboards & Rankings
- [ ] User Following System
- [ ] Quiz Sharing & Embed
- [ ] Admin Dashboard
- [ ] Analytics & Insights

---

## 📚 Project Structure

```
quiz-battle-platform/
├── client/                    # React Frontend
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # Auth context
│   │   └── App.js
│   └── package.json
├── server/                    # Node.js Backend
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth middleware
│   ├── utils/              # Helper utilities
│   ├── server.js
│   ├── config.js
│   ├── passport.js
│   └── package.json
└── README.md
```

---

## 🤝 Contributing

1. Clone the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT
