import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export default function Toast({ message, type = "success", onClose, duration = 3500 }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        const enterTimer = setTimeout(() => setVisible(true), 10);
        const exitTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, duration);

        return () => {
            clearTimeout(enterTimer);
            clearTimeout(exitTimer);
        };
    }, [duration, onClose]);

    const isSuccess = type === "success";

    return (
        <div
            className={`
        flex items-center gap-3 min-w-[280px] max-w-sm px-4 py-3.5
        rounded-xl shadow-xl border text-sm font-medium
        transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        ${isSuccess
                    ? "bg-white border-emerald-100 text-gray-800"
                    : "bg-white border-red-100 text-gray-800"
                }
      `}
        >
            {isSuccess
                ? <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                : <XCircle size={18} className="text-red-500 shrink-0" />
            }
            <span className="flex-1">{message}</span>
            <button
                onClick={() => {
                    setVisible(false);
                    setTimeout(onClose, 300);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            >
                <X size={14} />
            </button>
        </div>
    );
}

/**
 * ToastContainer — place once at root level.
 *
 * Props:
 *  - toasts: Array<{ id, message, type }>
 *  - onRemove: (id) => void
 */
export function ToastContainer({ toasts, onRemove }) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
            {toasts.map((t) => (
                <Toast
                    key={t.id}
                    message={t.message}
                    type={t.type}
                    onClose={() => onRemove(t.id)}
                />
            ))}
        </div>
    );
}

/**
 * useToast hook — manages toast state.
 *
 * Returns: { toasts, addToast, removeToast }
 *
 * Usage:
 *   const { toasts, addToast, removeToast } = useToast();
 *   addToast("Signed in!", "success");
 *   <ToastContainer toasts={toasts} onRemove={removeToast} />
 */
export function useToast() {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = "success") => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return { toasts, addToast, removeToast };
}
