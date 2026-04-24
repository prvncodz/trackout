import { useState } from "react"
import axios from "axios";
import Button from "../components/ui/Button.jsx";
import { ToastContainer, useToast } from "../components/ui/Toast.jsx";
import InputField from "../components/ui/Inputfield.jsx";
import gymImage from "../assets/gym-hero.jpg"
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../stores/user.store.js";


const SignInPage = () => {
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

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setLoading(true);

        try {
            await axios.post(`/api/auth/signin`, {
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
            <div className="hidden md:flex w-full h-screen bg-white rounded-2xl shadow-sm overflow-hidden min-h-[520px]">

                <div className="flex-1 flex flex-col items-start justify-center w-full px-12 py-14 ">
                    <FormContent
                        form={form}
                        fieldErrors={fieldErrors}
                        loading={loading}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>

                <div className="w-[50%] shrink-0 relative overflow-hidden">
                    <img
                        src={gymImage}
                        alt="Gym illustration"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* ── Mobile Layout ──────────────────────────────────────────────── */}
            <div className="md:hidden w-full h-screen flex justify-center items-center bg-white  shadow-sm overflow-hidden">
                <div className="px-8 py-10  w-full">
                    <FormContent
                        form={form}
                        fieldErrors={fieldErrors}
                        loading={loading}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>

            {/* ── Toast Container ────────────────────────────────────────────── */}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </>
    );
}


const FormContent = ({ form, fieldErrors, loading, onChange, onSubmit }) => {
    const navigate = useNavigate();

    return (
        <div className=" max-w-lg w-full  mx-auto tracking-normal ">
            <Backbtn />
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center md:text-left ">
                    Welcome Back
                </h1>
                <p className="text-xs text-gray-500 mt-3 text-center md:text-left ">
                    Enter your credentials to access your account
                </p>
            </div>

            <div className="space-y-6 mt-2">
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


            <Button
                onClick={onSubmit}
                disabled={loading}
                className="w-full mt-14 h-14 text-lg"
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

            <p className="text-center text-sm text-gray-500 mt-5">
                Don't have an account?{" "}
                <span
                    onClick={() => navigate("/signup")}
                    className="text-gray-900 font-semibold hover:underline underline-offset-2 cursor-pointer"
                >
                    Sign Up
                </span>
            </p>
        </div>
    );
}


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

const Backbtn = () => {
    const navigate = useNavigate();
    return (
        <button className="absolute top-5 left-5 bg-gray-50 border border-line-color text-gray-700 rounded-full p-4 hover:bg-neutral-50 hover:text-gray-800" onClick={() => navigate("/")}>
            <ArrowLeft />
        </button>
    )
}
export default SignInPage;
