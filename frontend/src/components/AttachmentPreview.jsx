const AttachmentPreview = ({ attachments }) => {
    if (!attachments?.length) return null
  
    const openUrl = (url) => {
      const link = document.createElement("a")
      link.href = url
      link.target = "_blank"
      link.rel = "noreferrer"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  
    return (
      <div className="flex flex-wrap gap-2 mt-3" onClick={(e) => e.preventDefault()}>
        {attachments.map((attachment, i) => {
          const isImage = attachment.resourceType === "image"
          const isAudio = attachment.resourceType === "video" && attachment.mimeType?.startsWith("audio/")
          const isVideo = attachment.resourceType === "video" && !attachment.mimeType?.startsWith("audio/")
  
          if (isImage)
            return (
              <img
                key={i}
                src={attachment.url}
                alt={attachment.originalName}
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); openUrl(attachment.url) }}
                className="w-20 h-20 object-cover rounded-lg border border-base-300 cursor-pointer"
              />
            )
  
          if (isAudio)
            return (
              <audio
                key={i}
                controls
                src={attachment.url}
                className="w-full h-8"
                onClick={(e) => { e.stopPropagation(); e.preventDefault() }}
              />
            )
  
          if (isVideo)
            return (
              <video
                key={i}
                controls
                src={attachment.url}
                className="w-full max-h-40 rounded-lg"
                onClick={(e) => { e.stopPropagation(); e.preventDefault() }}
              />
            )
  
          return (
            <button
              key={i}
              type="button"
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); openUrl(attachment.url) }}
              className="btn btn-xs btn-outline text-base-content/70"
            >
              {attachment.originalName?.endsWith(".pdf") ? "📄" : "📝"} {attachment.originalName}
            </button>
          )
        })}
      </div>
    )
  }
  
  export default AttachmentPreview