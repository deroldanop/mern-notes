import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachments: [
      {
        url: String,
        publicId: String,
        resourceType: String,
        originalName: String,
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);