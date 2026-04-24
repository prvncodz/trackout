import { Activity } from "lucide-react"

const Logo = ({ className = "" }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-near-black text-white p-1 px-2 rounded-sm flex justify-center items-center">
                <Activity size={21} />
            </div>
            <h3 className={`text-xl font-black text-near-black ml-2 text-center md:ml-3 ${className}`}>Trackout</h3>
        </div>
    )
}

export default Logo
