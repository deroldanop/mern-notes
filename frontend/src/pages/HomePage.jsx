// import { useEffect, useState } from "react"
// import RateLimitedUI from "../components/RateLimitedUI"
// import Navbar from "../components/Navbar"
// import NoteCard from "../components/NoteCard"
// import axios from "axios"
// import toast from "react-hot-toast"
// import { API_BASE } from "../config"

// const HomePage = () => {
//   const [isRateLimited, setIsRateLimited] = useState(false)
//   const [notes, setNotes] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const res = await axios.get(API_BASE)
//         setNotes(res.data)
//         setIsRateLimited(false)
//       } catch (error) {
//         if (error.response?.status === 429) {
//           setIsRateLimited(true)
//         } else {
//           toast.error("Failed to load notes")
//         }
//         console.log("Error fetching notes", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchNotes()
//   }, [])

//   if (isRateLimited) return <RateLimitedUI />
//   const handleDeleteNote = (deletedId) => {
//     setNotes(notes.filter((note) => note._id !== deletedId))
//   }

//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <div className="max-w-7xl mx-auto p-4 mt-6">
//         {loading && (
//           <div className="text-center text-primary py-10">
//             Loading notes...
//           </div>
//         )}
//         {notes.length === 0 && !loading && (
//           <div className="text-center text-base-content/60 py-10">
//             No notes yet. Create one!
//           </div>
//         )}
//         {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {notes.map((note) => (
//             <NoteCard key={note._id} note={note} />
//           ))}
//         </div> */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {notes.map((note) => (
//     <NoteCard
//       key={note._id}
//       note={note}
//       onDelete={handleDeleteNote}
//     />
//   ))}
// </div>
//       </div>
//     </div>
//   )
// }

// export default HomePage

import { useEffect, useState } from "react"
import RateLimitedUI from "../components/RateLimitedUI"
import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import axios from "axios"
import toast from "react-hot-toast"
import { API_BASE } from "../config"

const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  // Time & Weather state
  const [time, setTime] = useState(new Date())
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)

  // Live clock — updates every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-detect location and fetch weather
  useEffect(() => {
    if (!navigator.geolocation) {
      setWeatherLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude, longitude } = coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${WEATHER_KEY}`
          const res = await axios.get(url)
          setWeather(res.data)
        } catch (error) {
          console.log("Weather fetch error", error)
        } finally {
          setWeatherLoading(false)
        }
      },
      () => setWeatherLoading(false)
    )
  }, [])

  // Fetch notes
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

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

  const formatDate = (date) =>
    date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">

        {/* Time & Weather Card */}
        <div className="card bg-base-100 shadow mb-8 border-t-4 border-primary">
          <div className="card-body py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              {/* Time */}
              <div>
                <p className="text-4xl font-mono font-bold text-primary">
                  {formatTime(time)}
                </p>
                <p className="text-base-content/60 mt-1">
                  {formatDate(time)}
                </p>
              </div>

              {/* Weather */}
              <div className="flex items-center gap-3">
                {weatherLoading && (
                  <p className="text-base-content/40 text-sm">Detecting location...</p>
                )}
                {!weatherLoading && weather && (
                  <>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      className="w-14 h-14"
                    />
                    <div>
                      <p className="text-3xl font-bold text-base-content">
                        {Math.round(weather.main.temp)}°F
                      </p>
                      <p className="text-base-content/60 capitalize">
                        {weather.weather[0].description}
                      </p>
                      <p className="text-base-content/40 text-sm">
                        📍 {weather.name}, {weather.sys.country}
                      </p>
                    </div>
                  </>
                )}
                {!weatherLoading && !weather && (
                  <p className="text-base-content/40 text-sm">Weather unavailable</p>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Notes */}
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
        {notes.length === 0 && !loading && (
          <div className="text-center text-base-content/60 py-10">
            No notes yet. Create one!
          </div>
        )}
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