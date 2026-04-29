
// import Note from "../models/Note.js";

// export async function getAllNotes(_, res) {
//   try {
//     const notes = await Note.find().sort({ createdAt: -1 });
//     res.status(200).json(notes);
//   } catch (error) {
//     console.error("Error in getAllNotes", error);
//     res.status(500).json({ message: error.message });
//   }
// }

// export async function getById(req, res) {
//   try {
//     const note = await Note.findById(req.params.id);

//     if (!note) return res.status(404).json({ message: "Note not found" });

//     res.status(200).json(note);
//   } catch (error) {
//     console.error("Error in getAllNotes controller", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

// export async function createNote(req, res) {
//   console.log("req.body:", req.body);
//   try {
//     const { title, content } = req.body;
//     const note = new Note({ title, content });

//     const saveNote = await note.save();
//     res.status(201).json(saveNote);
//   } catch (error) {
//     console.error("Error in getAllNotes", error);
//     res.status(500).json({ message: error.message });
//   }
// }

// export async function updateNote(req, res) {
//   try {
//     const { title, content } = req.body;
//     const updateNote = await Note.findByIdAndUpdate(
//       req.params.id,
//       { title, content },
//       { new: true },
//     );
//     if (!updateNote) return res.status(404).json({ message: "Note not found" });
//     res.status(200).json({ message: "Note updated successfully" });
//   } catch (error) {
//     console.error("Error in updateNote controller", error);
//     res.status(500).json({ message: "internal server error" });
//   }
// }

// export async function deleteNote(req, res) {
//   try {
//     const note = await Note.findByIdAndDelete(req.params.id);

//     if (!note) return res.status(404).json({ message: "Note not found" });

//     res.status(200).json({ message: "Note deleted successfully" });
//   } catch (error) {
//     console.error("Error in deleteNote controller", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }


import Note from "../models/Note.js";
import cloudinary from "../config/cloudinary.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes", error);
    res.status(500).json({ message: error.message });
  }
}

export async function getById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getById", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  console.log("req.body:", req.body);
  try {
    const { title, content, attachments } = req.body;
    const parsedAttachments = attachments
      ? typeof attachments === "string"
        ? JSON.parse(attachments)
        : attachments
      : [];
    const note = new Note({ title, content, attachments: parsedAttachments });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote", error);
    res.status(500).json({ message: error.message });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content, attachments } = req.body;
    const parsedAttachments = attachments !== undefined
      ? typeof attachments === "string"
        ? JSON.parse(attachments)
        : attachments
      : undefined;

    const updateData = { title, content };
    if (parsedAttachments !== undefined) updateData.attachments = parsedAttachments;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.attachments?.length) {
      await Promise.all(
        note.attachments.map((a) =>
          cloudinary.uploader.destroy(a.publicId, {
            resource_type: a.resourceType === "raw" ? "raw" : a.resourceType,
          })
        )
      );
    }

    await note.deleteOne();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote", error);
    res.status(500).json({ message: "Internal server error" });
  }
}