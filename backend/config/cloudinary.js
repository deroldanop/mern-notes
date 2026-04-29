// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";

// console.log("CLOUDINARY ENV CHECK:", {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING",
//   })

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     let resource_type = "auto"; // handles image, video, audio, raw
//     return {
//       folder: "thinkboard",
//       resource_type,
//       public_id: `${Date.now()}-${file.originalname}`,
//     };
//   },
// });

// export const upload = multer({ storage });
// export default cloudinary;

import dotenv from "dotenv"
dotenv.config()

import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

console.log("CLOUDINARY ENV CHECK:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING",
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resource_type = "auto"
    if (file.mimetype.startsWith("image/")) resource_type = "image"
    else if (file.mimetype.startsWith("video/")) resource_type = "video"
    else if (file.mimetype.startsWith("audio/")) resource_type = "video"
    else resource_type = "raw"

    return {
      folder: "thinkboard",
      resource_type,
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`,
    }
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
})

export default cloudinary