// import { PenSquareIcon, Trash2Icon } from "lucide-react"
// import { Link } from "react-router"
// //import { formatDate } from "../lib/utils"

// const NoteCard = ({ note }) => {
//   return (
//     <Link
//       to={`/note/${note._id}`}
//       className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
//     >
//       <div className="card-body">
//         <h3 className="card-title text-base-content">{note.title}</h3>
//         <p className="text-base-content">{note.content}</p>
//         <div className="card-actions justify-between items-center mt-4">
//           <span className="text-sm text-base-content/60">
//             {new Date(note.createdAt).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",})}
//           </span>
//           <div className="flex items-center gap-1">
//             <PenSquareIcon className="size-4" />
//             <button className="btn btn-ghost btn-xs text-error">
//               <Trash2Icon className="size-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default NoteCard

// import { PenSquareIcon, Trash2Icon } from "lucide-react"
// import { Link } from "react-router"
// import axios from "axios"
// import toast from "react-hot-toast"

// const NoteCard = ({ note, onDelete }) => {

//   const handleDelete = async (e) => {
//     e.preventDefault()
//     const confirmed = window.confirm("Are you sure you want to delete this note?")
//     if (!confirmed) return

//     try {
//       await axios.delete(`/api/notes/${note._id}`)
//       toast.success("Note deleted successfully")
//       onDelete(note._id)
//     } catch (error) {
//       toast.error("Failed to delete note")
//       console.log("Error deleting note", error)
//     }
//   }

//   return (
//     <Link
//       to={`/note/${note._id}`}
//       className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
//     >
//       <div className="card-body">
//         <h3 className="card-title text-base-content">{note.title}</h3>
//         <p className="text-base-content">{note.content}</p>
//         <div className="card-actions justify-between items-center mt-4">
//           <span className="text-sm text-base-content/60">
//             {new Date(note.createdAt).toLocaleDateString()}
//           </span>
//           <div className="flex items-center gap-1">
//             <PenSquareIcon className="size-4" />
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
import { Link } from "react-router"
import axios from "axios"
import toast from "react-hot-toast"

const NoteCard = ({ note, onDelete }) => {

  const handleDelete = async (e) => {
    e.preventDefault()
    const confirmed = window.confirm("Are you sure you want to delete this note?")
    if (!confirmed) return

    try {
      await axios.delete(`/api/notes/${note._id}`)
      toast.success("Note deleted successfully")
      onDelete(note._id)
    } catch (error) {
      toast.error("Failed to delete note")
      console.log("Error deleting note", error)
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-2">

            {/* Edit button */}
            <Link
              to={`/note/${note._id}`}
              onClick={(e) => e.stopPropagation()}
              className="btn btn-ghost btn-xs text-info"
            >
              <PenSquareIcon className="size-4" />
            </Link>

            {/* Delete button */}
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