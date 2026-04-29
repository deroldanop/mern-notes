// import { useState } from "react";
// import axios from "axios";

// export default function FileUploader({ onUploadComplete }) {
//   const [uploading, setUploading] = useState(false);

//   const handleChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const formData = new FormData();
//     files.forEach((f) => formData.append("files", f));

//     setUploading(true);
//     const { data } = await axios.post("/api/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     setUploading(false);
//     onUploadComplete(data); // pass attachment objects up to the note form
//   };

//   return (
//     <div>
//       <input type="file" multiple accept="image/*,audio/*,.pdf,.doc,.docx" onChange={handleChange} />
//       {uploading && <span className="text-sm text-gray-400">Uploading...</span>}
//     </div>
//   );
// }


import { useRef, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { UPLOAD_URL } from "../config"

// Icons as inline SVG to avoid extra deps
const icons = {
  image: "🖼️",
  video: "🎬",
  audio: "🎵",
  pdf: "📄",
  doc: "📝",
  camera: "📷",
  record: "🎥",
  stop: "⏹️",
  trash: "🗑️",
}

export default function FileUploader({ attachments = [], onChange }) {
  const [uploading, setUploading] = useState(false)

  // Camera / video recording state
  const [cameraOpen, setCameraOpen] = useState(false)
  const [cameraMode, setCameraMode] = useState("photo") // "photo" | "video"
  const [recording, setRecording] = useState(false)
  const [stream, setStream] = useState(null)

  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const fileInputRef = useRef(null)

  // ─── File input upload ────────────────────────────────────────────────────
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    await uploadFiles(files)
    e.target.value = "" // reset so same file can be re-selected
  }

  const uploadFiles = async (files) => {
    setUploading(true)
    try {
      const formData = new FormData()
      files.forEach((f) => formData.append("files", f))
      const { data } = await axios.post(UPLOAD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      onChange([...attachments, ...data])
      toast.success(`${data.length} file(s) uploaded`)
    } catch (err) {
      toast.error("Upload failed")
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  // ─── Remove attachment ────────────────────────────────────────────────────
  const handleRemove = async (index) => {
    const a = attachments[index]
    try {
      await axios.delete(
        `${UPLOAD_URL}/${encodeURIComponent(a.publicId)}?resourceType=${a.resourceType}`
      )
    } catch {
      // silently ignore — don't block UI if Cloudinary delete fails
    }
    onChange(attachments.filter((_, i) => i !== index))
  }

  // ─── Open camera ─────────────────────────────────────────────────────────
  const openCamera = async (mode) => {
    setCameraMode(mode)
    setCameraOpen(true)
    try {
      const constraints =
        mode === "photo"
          ? { video: { facingMode: "environment" }, audio: false }
          : { video: { facingMode: "environment" }, audio: true }
      const s = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(s)
      if (videoRef.current) {
        videoRef.current.srcObject = s
        videoRef.current.play()
      }
    } catch (err) {
      toast.error("Camera access denied")
      setCameraOpen(false)
    }
  }

  const closeCamera = () => {
    if (stream) stream.getTracks().forEach((t) => t.stop())
    setStream(null)
    setCameraOpen(false)
    setRecording(false)
  }

  // ─── Take photo ───────────────────────────────────────────────────────────
  const takePhoto = async () => {
    const canvas = document.createElement("canvas")
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0)
    canvas.toBlob(async (blob) => {
      const file = new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" })
      closeCamera()
      await uploadFiles([file])
    }, "image/jpeg", 0.92)
  }

  // ─── Record video ─────────────────────────────────────────────────────────
  const startRecording = () => {
    chunksRef.current = []
    const mr = new MediaRecorder(stream)
    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    mr.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" })
      const file = new File([blob], `recording-${Date.now()}.webm`, { type: "video/webm" })
      closeCamera()
      await uploadFiles([file])
    }
    mr.start()
    mediaRecorderRef.current = mr
    setRecording(true)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        {/* File picker */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,audio/*,video/*,.pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="btn btn-sm btn-outline gap-1"
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
        >
          📎 {uploading ? "Uploading..." : "Attach File"}
        </button>

        {/* Camera photo */}
        <button
          type="button"
          className="btn btn-sm btn-outline gap-1"
          onClick={() => openCamera("photo")}
          disabled={uploading}
        >
          {icons.camera} Take Photo
        </button>

        {/* Camera video */}
        <button
          type="button"
          className="btn btn-sm btn-outline gap-1"
          onClick={() => openCamera("video")}
          disabled={uploading}
        >
          {icons.record} Record Video
        </button>
      </div>

      {/* Camera modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-base-100 rounded-2xl p-4 w-full max-w-md space-y-3">
            <h3 className="font-bold text-lg">
              {cameraMode === "photo" ? "📷 Take Photo" : "🎥 Record Video"}
            </h3>

            <video
              ref={videoRef}
              className="w-full rounded-xl bg-black"
              muted
              playsInline
            />

            <div className="flex gap-2 justify-end">
              <button type="button" className="btn btn-ghost btn-sm" onClick={closeCamera}>
                Cancel
              </button>
              {cameraMode === "photo" ? (
                <button type="button" className="btn btn-primary btn-sm" onClick={takePhoto}>
                  📸 Capture
                </button>
              ) : recording ? (
                <button type="button" className="btn btn-error btn-sm" onClick={stopRecording}>
                  {icons.stop} Stop & Save
                </button>
              ) : (
                <button type="button" className="btn btn-primary btn-sm" onClick={startRecording}>
                  ⏺️ Start Recording
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Attachment previews */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-base-content/50 uppercase tracking-wide">
            Attachments ({attachments.length})
          </p>
          <div className="flex flex-wrap gap-3">
            {attachments.map((a, i) => (
              <AttachmentChip key={i} attachment={a} onRemove={() => handleRemove(i)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function AttachmentChip({ attachment: a, onRemove }) {
  const isImage = a.resourceType === "image"
  const isAudio = a.resourceType === "video" && a.mimeType?.startsWith("audio/")
  const isVideo = a.resourceType === "video" && !a.mimeType?.startsWith("audio/")

  return (
    <div className="relative group">
      {isImage && (
        <div className="relative">
          <img
            src={a.url}
            alt={a.originalName}
            className="w-20 h-20 object-cover rounded-lg border border-base-300"
          />
          <RemoveBtn onRemove={onRemove} />
        </div>
      )}
      {isAudio && (
        <div className="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2 pr-8">
          <span>🎵</span>
          <div>
            <audio controls src={a.url} className="h-8 max-w-[200px]" />
            <p className="text-xs text-base-content/50 truncate max-w-[180px]">{a.originalName}</p>
          </div>
          <RemoveBtn onRemove={onRemove} />
        </div>
      )}
      {isVideo && (
        <div className="relative">
          <video
            src={a.url}
            controls
            className="w-40 h-28 object-cover rounded-lg border border-base-300"
          />
          <p className="text-xs text-base-content/50 truncate max-w-[160px]">{a.originalName}</p>
          <RemoveBtn onRemove={onRemove} />
        </div>
      )}
      {a.resourceType === "raw" && (
        <div className="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2 pr-8">
          <span>{a.originalName?.endsWith(".pdf") ? "📄" : "📝"}</span>
          <a
            href={a.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-primary hover:underline truncate max-w-[150px]"
          >
            {a.originalName}
          </a>
          <RemoveBtn onRemove={onRemove} />
        </div>
      )}
    </div>
  )
}

function RemoveBtn({ onRemove }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="absolute -top-2 -right-2 btn btn-error btn-circle btn-xs opacity-0 group-hover:opacity-100 transition-opacity"
      title="Remove"
    >
      ✕
    </button>
  )
}