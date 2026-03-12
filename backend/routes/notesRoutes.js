import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getById,
  updateNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getById);

router.post("/", createNote);

router.delete("/:id", deleteNote);

router.put("/:id", updateNote);

export default router;
