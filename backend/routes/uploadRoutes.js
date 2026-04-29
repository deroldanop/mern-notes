// import express from "express";
// import { upload } from "../config/cloudinary.js";
// import cloudinary from "../config/cloudinary.js";

// const router = express.Router();

// // Upload one or more files
// router.post("/upload", upload.array("files", 5), async (req, res) => {
//   try {
//     const uploaded = req.files.map((file) => ({
//       url: file.path,
//       publicId: file.filename,
//       resourceType: file.resource_type || "auto",
//       originalName: file.originalname,
//     }));
//     res.json(uploaded);
//   } catch (err) {
//     res.status(500).json({ message: "Upload failed", error: err.message });
//   }
// });

// // Delete a file from Cloudinary
// router.delete("/:publicId", async (req, res) => {
//   try {
//     await cloudinary.uploader.destroy(req.params.publicId);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// });

// export default router;

import express from "express";
import { upload } from "../config/cloudinary.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// POST /api/upload
// router.post("/upload", upload.array("files", 5), async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No files uploaded" });
//     }
//     const uploaded = req.files.map((file) => ({
//       url: file.path,
//       publicId: file.filename,
//       resourceType: file.resource_type || detectResourceType(file.mimetype),
//       mimeType: file.mimetype,
//       originalName: file.originalname,
//     }));
//     res.json(uploaded);
//   } catch (err) {
//     console.error("Upload error", err);
//     res.status(500).json({ message: "Upload failed", error: err.message });
//   }
// });
// 
router.post("/upload", (req, res) => {
    upload.array("files", 5)(req, res, async (err) => {
      if (err) {
        console.error("Multer/Cloudinary error:", JSON.stringify(err, Object.getOwnPropertyNames(err)))
        return res.status(500).json({ message: "Upload failed", error: err.message })
      }
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: "No files uploaded" })
        }
        const uploaded = req.files.map((file) => ({
          url: file.path,
          publicId: file.filename,
          resourceType: file.resource_type || detectResourceType(file.mimetype),
          mimeType: file.mimetype,
          originalName: file.originalname,
        }))
        res.json(uploaded)
      } catch (error) {
        console.error("Upload handler error:", error)
        res.status(500).json({ message: "Upload failed", error: error.message })
      }
    })
  })

// DELETE /api/upload/:publicId?resourceType=image|video|raw
router.delete("/upload/:publicId", async (req, res) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);
    const resourceType = req.query.resourceType || "image";
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete error", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

function detectResourceType(mimetype) {
  if (!mimetype) return "raw";
  if (mimetype.startsWith("image/")) return "image";
  if (mimetype.startsWith("video/")) return "video";
  if (mimetype.startsWith("audio/")) return "video";
  return "raw";
}

export default router;