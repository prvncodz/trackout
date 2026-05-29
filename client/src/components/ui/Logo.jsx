import { Activity } from "lucide-react"

const Logo = ({ className = "" }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-near-black flex items-center justify-center rounded-sm p-1 px-2 text-white antialiased">
        <Activity size={21} />
      </div>
      <h3
        className={`text-near-black ml-2 cursor-default text-center text-xl font-black subpixel-antialiased md:ml-3 ${className}`}
      >
        Trackout
      </h3>
    </div>
  )
}

export default Logo
