// // import { PenSquareIcon, Trash2Icon } from "lucide-react"
// // import { Link } from "react-router"
// // //import { formatDate } from "../lib/utils"

// // const NoteCard = ({ note }) => {
// //   return (
// //     <Link
// //       to={`/note/${note._id}`}
// //       className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
// //     >
// //       <div className="card-body">
// //         <h3 className="card-title text-base-content">{note.title}</h3>
// //         <p className="text-base-content">{note.content}</p>
// //         <div className="card-actions justify-between items-center mt-4">
// //           <span className="text-sm text-base-content/60">
// //             {new Date(note.createdAt).toLocaleDateString("en-US", {
// //         month: "short",
// //         day: "numeric",
// //         year: "numeric",})}
// //           </span>
// //           <div className="flex items-center gap-1">
// //             <PenSquareIcon className="size-4" />
// //             <button className="btn btn-ghost btn-xs text-error">
// //               <Trash2Icon className="size-4" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   )
// // }

// // export default NoteCard

// // import { PenSquareIcon, Trash2Icon } from "lucide-react"
// // import { Link } from "react-router"
// // import axios from "axios"
// // import toast from "react-hot-toast"

// // const NoteCard = ({ note, onDelete }) => {

// //   const handleDelete = async (e) => {
// //     e.preventDefault()
// //     const confirmed = window.confirm("Are you sure you want to delete this note?")
// //     if (!confirmed) return

// //     try {
// //       await axios.delete(`/api/notes/${note._id}`)
// //       toast.success("Note deleted successfully")
// //       onDelete(note._id)
// //     } catch (error) {
// //       toast.error("Failed to delete note")
// //       console.log("Error deleting note", error)
// //     }
// //   }

// //   return (
// //     <Link
// //       to={`/note/${note._id}`}
// //       className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
// //     >
// //       <div className="card-body">
// //         <h3 className="card-title text-base-content">{note.title}</h3>
// //         <p className="text-base-content">{note.content}</p>
// //         <div className="card-actions justify-between items-center mt-4">
// //           <span className="text-sm text-base-content/60">
// //             {new Date(note.createdAt).toLocaleDateString()}
// //           </span>
// //           <div className="flex items-center gap-1">
// //             <PenSquareIcon className="size-4" />
// //             <button
// //               onClick={handleDelete}
// //               className="btn btn-ghost btn-xs text-error"
// //             >
// //               <Trash2Icon className="size-4" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   )
// // }

// // export default NoteCard
// // import { PenSquareIcon, Trash2Icon } from "lucide-react"
// // import { Link } from "react-router"
// // import axios from "axios"
// // import toast from "react-hot-toast"
// // import { API_BASE } from "../config"   // ← added

// // const NoteCard = ({ note, onDelete }) => {

// //   const handleDelete = async (e) => {
// //     e.preventDefault()
// //     e.stopPropagation()   // ← added
// //     const confirmed = window.confirm("Are you sure you want to delete this note?")
// //     if (!confirmed) return

// //     try {
// //       await axios.delete(`${API_BASE}/${note._id}`)   // ← changed
// //       toast.success("Note deleted successfully")
// //       onDelete(note._id)
// //     } catch (error) {
// //       toast.error("Failed to delete note")
// //       console.log("Error deleting note", error)
// //     }
// //   }

// //   return (
// //     <Link
// //       to={`/note/${note._id}`}
// //       className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
// //     >
// //       <div className="card-body">
// //         <h3 className="card-title text-base-content">{note.title}</h3>
// //         <p className="text-base-content">{note.content}</p>
// //         <div className="card-actions justify-between items-center mt-4">
// //           <span className="text-sm text-base-content/60">
// //             {new Date(note.createdAt).toLocaleDateString()}
// //           </span>
// //           <div className="flex items-center gap-2">
// //             <Link
// //               to={`/note/${note._id}`}
// //               onClick={(e) => e.stopPropagation()}
// //               className="btn btn-ghost btn-xs text-info"
// //             >
// //               <PenSquareIcon className="size-4" />
// //             </Link>
// //             <button
// //               onClick={handleDelete}
// //               className="btn btn-ghost btn-xs text-error"
// //             >
// //               <Trash2Icon className="size-4" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   )
// // }

// // export default NoteCard


// import { PenSquareIcon, Trash2Icon } from "lucide-react"
// import { Link } from "react-router"
// import axios from "axios"
// import toast from "react-hot-toast"
// import { API_BASE } from "../config"

// // const AttachmentPreview = ({ attachments }) => {
// //   if (!attachments?.length) return null

// //   return (
// //     <div className="flex flex-wrap gap-2 mt-3">
// //       {attachments.map((a, i) => {
// //         if (a.resourceType === "image")
// //           return (
// //             <img
// //               key={i}
// //               src={a.url}
// //               alt={a.originalName}
// //               className="w-20 h-20 object-cover rounded-lg border border-base-300"
// //             />
// //           )
// //         if (a.resourceType === "video") // Cloudinary stores audio as "video"
// //           return (
// //             <audio
// //               key={i}
// //               controls
// //               src={a.url}
// //               className="w-full h-8"
// //               onClick={(e) => e.preventDefault()}
// //             />
// //           )
// //           return (
  
// //             key={i}
// //             href={a.url}
// //             target="_blank"
// //             rel="noreferrer"
// //             onClick={(e) => e.stopPropagation()}
// //             className="btn btn-xs btn-outline text-base-content/70"
// //           >
// //             📎 {a.originalName}
// //           </a>
// //         )
// //       })}
// //     </div>
// //   )
// // }
// // const AttachmentPreview = ({ attachments }) => {
// //   if (!attachments?.length) return null

// //   return (
// //     <div className="flex flex-wrap gap-2 mt-3">
// //       {attachments.map((a, i) => {
// //         if (a.resourceType === "image")
// //           return (
// //             <img
// //               key={i}
// //               src={a.url}
// //               alt={a.originalName}
// //               className="w-20 h-20 object-cover rounded-lg border border-base-300"
// //             />
// //           )
// //         if (a.resourceType === "video")
// //           return (
// //             <audio
// //               key={i}
// //               controls
// //               src={a.url}
// //               className="w-full h-8"
// //               onClick={(e) => e.preventDefault()}
// //             />
// //           )
// //         return (
          
// //             key={i}
// //             href={a.url}
// //             target="_blank"
// //             rel="noreferrer"
// //             onClick={(e) => e.stopPropagation()}
// //             className="btn btn-xs btn-outline text-base-content/70"
// //           <a>
// //             📎 {a.originalName}
// //           </a>
// //         )
// //       })}
// //     </div>
// //   )
// // }

// // const NoteCard = ({ note, onDelete }) => {

// //   const handleDelete = async (e) => {
// //     e.preventDefault()
// //     e.stopPropagation()
// //     const confirmed = window.confirm("Are you sure you want to delete this note?")
// //     if (!confirmed) return

// //     try {
// //       await axios.delete(`${API_BASE}/${note._id}`)
// //       toast.success("Note deleted successfully")
// //       onDelete(note._id)
// //     } catch (error) {
// //       toast.error("Failed to delete note")
// //       console.log("Error deleting note", error)
// //     }
// //   }

// //   return (
// //     <Link
// //       to={`/note/${note._id}`}
// //       className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
// //     >
// //       <div className="card-body">
// //         <h3 className="card-title text-base-content">{note.title}</h3>
// //         <p className="text-base-content">{note.content}</p>

// //         {/* Attachments */}
// //         <AttachmentPreview attachments={note.attachments} />

// //         <div className="card-actions justify-between items-center mt-4">
// //           <span className="text-sm text-base-content/60">
// //             {new Date(note.createdAt).toLocaleDateString()}
// //           </span>
// //           <div className="flex items-center gap-2">
// //             <Link
// //               to={`/note/${note._id}`}
// //               onClick={(e) => e.stopPropagation()}
// //               className="btn btn-ghost btn-xs text-info"
// //             >
// //               <PenSquareIcon className="size-4" />
// //             </Link>
// //             <button
// //               onClick={handleDelete}
// //               className="btn btn-ghost btn-xs text-error"
// //             >
// //               <Trash2Icon className="size-4" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   )
// // }

// // export default NoteCard

// import { PenSquareIcon, Trash2Icon } from "lucide-react"
// import { Link } from "react-router"
// import axios from "axios"
// import toast from "react-hot-toast"
// import { API_BASE } from "../config"
// import AttachmentPreview from "./AttachmentPreview"

// const NoteCard = ({ note, onDelete }) => {
//   const handleDelete = async (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (!window.confirm("Are you sure you want to delete this note?")) return

//     try {
//       await axios.delete(`${API_BASE}/${note._id}`)
//       toast.success("Note deleted successfully")
//       onDelete(note._id)
//     } catch (error) {
//       toast.error("Failed to delete note")
//       console.error("Error deleting note", error)
//     }
//   }

//   return (
//     <Link
//       to={`/note/${note._id}`}
//       className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
//     >
//       <div className="card-body">
//         <h3 className="card-title text-base-content">{note.title}</h3>
//         <p className="text-base-content/80 line-clamp-3">{note.content}</p>

//         <AttachmentPreview attachments={note.attachments} />

//         <div className="card-actions justify-between items-center mt-4">
//           <span className="text-sm text-base-content/60">
//             {new Date(note.createdAt).toLocaleDateString()}
//           </span>
//           <div className="flex items-center gap-2">
//             <Link
//               to={`/note/${note._id}`}
//               onClick={(e) => e.stopPropagation()}
//               className="btn btn-ghost btn-xs text-info"
//             >
//               <PenSquareIcon className="size-4" />
//             </Link>
//             <button
//               onClick={handleDelete}
//               className="btn btn-ghost btn-xs text-error"
//             >
//               <Trash2Icon className="size-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default NoteCard


import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link, useNavigate } from "react-router"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE } from "../config"
import AttachmentPreview from "./AttachmentPreview"

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!window.confirm("Are you sure you want to delete this note?")) return
    try {
      await axios.delete(`${API_BASE}/${note._id}`)
      toast.success("Note deleted successfully")
      onDelete(note._id)
    } catch (error) {
      toast.error("Failed to delete note")
      console.error("Error deleting note", error)
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/80 line-clamp-3">{note.content}</p>

        <AttachmentPreview attachments={note.attachments} />

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.preventDefault(); navigate(`/note/${note._id}`) }}
              className="btn btn-ghost btn-xs text-info"
            >
              <PenSquareIcon className="size-4" />
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-ghost btn-xs text-error"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard