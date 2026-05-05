import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3500,
}) {
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
      className={`flex max-w-sm min-w-[280px] items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium shadow-xl transition-all duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} ${
        isSuccess
          ? "border-emerald-100 bg-white text-gray-800"
          : "border-red-100 bg-white text-gray-800"
      } `}
    >
      {isSuccess ? (
        <CheckCircle size={18} className="shrink-0 text-emerald-500" />
      ) : (
        <XCircle size={18} className="shrink-0 text-red-500" />
      )}
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="shrink-0 text-gray-400 transition-colors hover:text-gray-600"
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
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-2">
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
