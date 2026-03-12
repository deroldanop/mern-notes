# ThinkBoard 📝

A full stack notes application built with the MERN stack.

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- DaisyUI
- Axios
- React Router
- React Hot Toast
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Upstash Redis (rate limiting)

## Features

- ✅ Create notes
- ✅ View all notes
- ✅ Edit notes
- ✅ Delete notes with confirmation
- ✅ Rate limiting protection
- ✅ Toast notifications
- ✅ Responsive design

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- Upstash Redis account

### Installation

1. Clone the repository
```bash
   git clone https://github.com/roldanordas/mern-notes.git
   cd mern-notes
```

2. Install backend dependencies
```bash
   cd backend
   npm install
```

3. Install frontend dependencies
```bash
   cd frontend
   npm install
```

4. Create `.env` file in backend folder
```
   MONGO_URI=your_mongodb_atlas_uri
   PORT=5001
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

5. Run the backend
```bash
   cd backend
   npm run dev
```

6. Run the frontend
```bash
   cd frontend
   npm run dev
```

7. Open your browser at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notes | Get all notes |
| POST | /api/notes | Create a note |
| GET | /api/notes/:id | Get single note |
| PUT | /api/notes/:id | Update a note |
| DELETE | /api/notes/:id | Delete a note |

## Deployment

- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Database hosted on **MongoDB Atlas**

## License

MIT