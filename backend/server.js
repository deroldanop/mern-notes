// import dotenv from "dotenv"
// dotenv.config()

// import express from "express"
// import cors from "cors"
// import notesRoutes from "./routes/notesRoutes.js"
// import uploadRoutes from "./routes/uploadRoutes.js";
// import { connectDB } from "./config/db.js"
// import rateLimiter from "./middleware/rateLimiter.js"

// const PORT = process.env.PORT || 5001
// const app = express()

// // Middleware
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://mern-notes-frontend-ry0o.onrender.com"  // ← no trailing slash
//   ]
// }))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(rateLimiter)
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://mern-notes-frontend-ry0o.onrender.com",
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }))

// // Routes
// app.use("/api/notes", notesRoutes)
// app.use("/api", uploadRoutes);
// app.get('/', (req, res) => {
//   res.json({ message: 'API is running' });
// });
// app.get("/favicon.ico", (req, res) => res.status(204).end())

// // Connect DB then start server
// app._router.stack.forEach((r) => {
//   if (r.route) console.log(r.route.path)
//   if (r.handle?.stack) {
//     r.handle.stack.forEach((rr) => {
//       if (rr.route) console.log(rr.route.path)
//     })
//   }
// })

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`)
//   })
// })

import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import notesRoutes from "./routes/notesRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

const PORT = process.env.PORT || 5001
const app = express()

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mern-notes-frontend-ry0o.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(rateLimiter)

// Routes
app.use("/api/notes", notesRoutes)
app.use("/api", uploadRoutes)
app.get("/", (req, res) => res.json({ message: "API is running" }))
app.get("/favicon.ico", (req, res) => res.status(204).end())

// Connect DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})