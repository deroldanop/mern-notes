import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

const PORT = process.env.PORT || 5001
const app = express()

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.onrender.com"  // add your actual frontend URL here
  ]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(rateLimiter)

// Routes
app.use("/api/notes", notesRoutes)
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});
app.get("/favicon.ico", (req, res) => res.status(204).end())

// Connect DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})