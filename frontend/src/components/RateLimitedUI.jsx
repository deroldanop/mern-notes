
import { AlertCircle } from "lucide-react"

const RateLimitedUI = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-200 shadow-xl max-w-md w-full mx-4">
        <div className="card-body items-center text-center">
          <AlertCircle className="size-16 text-error mb-4" />
          <h2 className="card-title text-2xl text-error">
            Slow Down!
          </h2>
          <p className="text-base-content/70">
            You have made too many requests. Please wait a moment before trying again.
          </p>
          <div className="card-actions mt-4">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again in a few seconds,
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RateLimitedUI