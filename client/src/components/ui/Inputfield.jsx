import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputField({
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
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
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
                    className={`
            w-full bg-gray-50 border rounded-lg px-4 py-3 text-sm text-gray-800
            placeholder:text-gray-400 outline-none transition-all duration-200
            focus:bg-white focus:border-gray-800 focus:ring-2 focus:ring-gray-800/10
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-gray-200"}
            ${isPassword ? "pr-11" : ""}
          `}
                />
                {isPassword && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
            )}
        </div>
    );
}
