import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const InputField = ({
    id,
    name,
    type = "text",
    placeholder = "",
    value,
    onChange,
    label,
    error,
    disabled = false,
    className = "",
}) => {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === "password"
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="mb-1.5 block text-xs font-semibold tracking-widest text-gray-500 uppercase"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={resolvedType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full rounded-lg border bg-gray-50 px-4 py-4 text-base text-gray-800 transition-all duration-200 outline-none placeholder:text-gray-400 focus:border-gray-800 focus:bg-white focus:ring-2 focus:ring-gray-800/10 disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-gray-200"} ${isPassword ? "pr-11" : ""} `}
                />
                {isPassword && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
        </div>
    )
}
export default InputField
