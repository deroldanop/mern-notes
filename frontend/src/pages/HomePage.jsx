import { useEffect, useState } from "react"
import RateLimitedUI from "../components/RateLimitedUI"
import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE } from "../config"

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(API_BASE)
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Failed to load notes")
        }
        console.log("Error fetching notes", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  if (isRateLimited) return <RateLimitedUI />
  const handleDeleteNote = (deletedId) => {
    setNotes(notes.filter((note) => note._id !== deletedId))
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        )}
        {notes.length === 0 && !loading && (
          <div className="text-center text-base-content/60 py-10">
            No notes yet. Create one!
          </div>
        )}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {notes.map((note) => (
    <NoteCard
      key={note._id}
      note={note}
      onDelete={handleDeleteNote}
    />
  ))}
</div>
      </div>
    </div>
  )
}

export default HomePage