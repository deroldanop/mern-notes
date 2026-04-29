// import React, { useState } from "react";

// const CreatePage = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState("");
//   return <div>CreatePage</div>;
// };

// export default CreatePage;

// 



import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE } from "../config"
import FileUploader from "../components/FileUploader"

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [attachments, setAttachments] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      await axios.post(API_BASE, { title, content, attachments })
      toast.success("Note created successfully!")
      navigate("/")
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests, slow down!")
      } else {
        toast.error("Failed to create note")
      }
      console.error("Error creating note", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-base-content mb-6">Create New Note</h1>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>

              {/* Title */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter note title..."
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Content</span>
                </label>
                <textarea
                  placeholder="Enter note content..."
                  className="textarea textarea-bordered h-40 w-full"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* File Attachments */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-semibold">Attachments</span>
                </label>
                <FileUploader attachments={attachments} onChange={setAttachments} />
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
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage