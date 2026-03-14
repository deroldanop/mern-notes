// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router"
// import axios from "axios"
// import toast from "react-hot-toast"
// import { API_BASE } from "../config" 

// const NoteDetailPage = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [title, setTitle] = useState("")
//   const [content, setContent] = useState("")
//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)

//   // Fetch existing note
//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const res = await axios.get(`/api/notes/${id}`)
//         setTitle(res.data.title)
//         setContent(res.data.content)
//       } catch (error) {
//         toast.error("Failed to load note")
//         console.log("Error fetching note", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchNote()
//   }, [id])

//   // Save updated note
//   const handleSave = async (e) => {
//     e.preventDefault()

//     if (!title || !content) {
//       toast.error("Please fill in all fields")
//       return
//     }

//     setSaving(true)
//     try {
//       await axios.put(`/api/notes/${id}`, { title, content })
//       toast.success("Note updated successfully!")
//       navigate("/")
//     } catch (error) {
//       toast.error("Failed to update note")
//       console.log("Error updating note", error)
//     } finally {
//       setSaving(false)
//     }
//   }

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE } from "../config"        // ← added

const NoteDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${id}`)   // ← changed
        setTitle(res.data.title)
        setContent(res.data.content)
      } catch (error) {
        toast.error("Failed to load note")
        console.log("Error fetching note", error)
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  const handleSave = async (e) => {
    e.preventDefault()

    if (!title || !content) {
      toast.error("Please fill in all fields")
      return
    }

    setSaving(true)
    try {
      await axios.put(`${API_BASE}/${id}`, { title, content })  // ← changed
      toast.success("Note updated successfully!")
      navigate("/")
    } catch (error) {
      toast.error("Failed to update note")
      console.log("Error updating note", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-primary">Loading note...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-base-content mb-6">
          Edit Note
        </h1>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSave}>

              {/* Title */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-40 w-full"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Buttons */}
              <div className="card-actions justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage