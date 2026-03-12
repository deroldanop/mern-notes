// import mongoose from "mongoose";

// const noteschema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       require: true,
//     },
//     content: {
//       type: String,
//       require: true,
//     },
//   },
//   { timestamps: true },
// );

// const Note = mongoose.model("Note", noteschema);

// export default Note;

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
  },
  { timestamps: true },
);

export default mongoose.model("Note", noteSchema);
