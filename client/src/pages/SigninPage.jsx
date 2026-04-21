import { useState } from "react";
import axios from "axios";
import Button from "../components/ui/Button";
import { ToastContainer, useToast } from "../components/ui/Toast";
import InputField from "../components/ui/InputField";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// ─── Validation helpers ──────────────────────────────────────────────────────

function validate({ email, password }) {
    const errors = {};
    if (!email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Enter a valid email address.";
    }
    if (!password) {
        errors.password = "Password is required.";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }
    return errors;
}

// ─── SignIn Page ─────────────────────────────────────────────────────────────

export default function SignInPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { toasts, addToast, removeToast } = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear field error on change
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault?.();

        const errors = validate(form);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setLoading(true);

        try {
            await axios.post(`${API_BASE_URL}/api/auth/signin`, {
                email: form.email,
                password: form.password,
            });

            addToast("Signed in successfully! Welcome back.", "success");
            setForm({ email: "", password: "" });
            setFieldErrors({});
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Something went wrong. Please try again.";
            addToast(message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* ── Desktop Layout ─────────────────────────────────────────────── */}
            <div className="min-h-screen bg-[#e8e8f0] flex items-center justify-center p-6">
                <div className="hidden md:flex w-full max-w-4xl bg-white rounded-2xl shadow-sm overflow-hidden min-h-[520px]">

                    {/* Left — Form Panel */}
                    <div className="flex-1 flex flex-col justify-center px-12 py-14">
                        <FormContent
                            form={form}
                            fieldErrors={fieldErrors}
                            loading={loading}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                    </div>

                    {/* Right — Image Panel */}
                    <div className="w-[395px] shrink-0 relative overflow-hidden">
                        <img
                            src={gymImage}
                            alt="Gym illustration"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* ── Mobile Layout ──────────────────────────────────────────────── */}
                <div className="md:hidden w-full max-w-sm bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-8 py-10">
                        <FormContent
                            form={form}
                            fieldErrors={fieldErrors}
                            loading={loading}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>

            {/* ── Toast Container ────────────────────────────────────────────── */}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </>
    );
}

// ─── Reusable form block (shared between desktop & mobile) ───────────────────

function FormContent({ form, fieldErrors, loading, onChange, onSubmit }) {
    return (
        <div className="w-full max-w-xs mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Welcome Back
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Enter your credentials to access your account
                </p>
            </div>

            {/* Fields */}
            <div className="space-y-4">
                <InputField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={onChange}
                    error={fieldErrors.email}
                    disabled={loading}
                />

                <InputField
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={onChange}
                    error={fieldErrors.password}
                    disabled={loading}
                />
            </div>

            {/* Forgot password */}
            <div className="flex justify-end mt-2.5 mb-6">
                <a
                    href="/forgot-password"
                    className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
                >
                    Forgot password?
                </a>
            </div>

            {/* Submit */}
            <Button
                onClick={onSubmit}
                disabled={loading}
                className="w-full"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <Spinner />
                        Signing in...
                    </span>
                ) : (
                    "Sign In"
                )}
            </Button>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-500 mt-5">
                Don't have an account?{" "}
                <a
                    href="/signup"
                    className="text-gray-900 font-semibold hover:underline underline-offset-2"
                >
                    Sign Up
                </a>
            </p>
        </div>
    );
}

// ─── Tiny spinner ─────────────────────────────────────────────────────────────

function Spinner() {
    return (
        <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
        </svg>
    );
}
