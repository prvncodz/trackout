import { motion } from "motion/react"
import React, { useState } from "react"
import axios from "../lib/axios"
import InputField from "../components/ui/Inputfield"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import gymImage from "../assets/gym-hero.jpg"
import MyButton from "../components/ui/MyButton"
import { userSignUpSchema } from "../schemas/user.schemas"
import { toast } from "sonner"

const SignUpPage = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ fullname: "", email: "", password: "", height: "", weight: "" })
    const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null)
    const navigate = useNavigate()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        // Clear field error on change
        if (fieldErrors && fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e?.preventDefault?.()
        setLoading(true)

        try {
            //validate before api
            userSignUpSchema.parseAsync(form)
            const res = await axios.post("/user/signup", {
                fullname: form.fullname,
                email: form.email,
                password: form.password,
                height: parseInt(form.height),
                weight: parseInt(form.weight),
            })
            if (res.status === 201) {
                setForm({ fullname: "", email: "", password: "", height: "", weight: "" })
                setFieldErrors(null)
                toast.success("Signup successful. Redirecting...")
                setTimeout(() => {
                    navigate("/signin")
                }, 500)
            }
        } catch (err: any) {
            const message = err?.message || "Something went wrong. Please try again."
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="hidden h-dvh min-h-130 w-full overflow-hidden rounded-2xl bg-white shadow-sm md:flex">
                <div className="flex w-full flex-1 flex-col items-start justify-center px-12 py-14">
                    <FormContent
                        form={form}
                        loading={loading}
                        fieldErrors={fieldErrors}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>

                <div className="relative w-[50%] shrink-0 overflow-hidden">
                    <img src={gymImage} alt="Gym illustration" className="h-full w-full object-cover" />
                </div>
            </div>

            {/* ── Mobile Layout ──────────────────────────────────────────────── */}
            <div className="flex h-screen w-full items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm md:hidden">
                <div className="px-8 py-10">
                    <FormContent
                        form={form}
                        loading={loading}
                        fieldErrors={fieldErrors}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </>
    )
}

interface FormInputProps {
    form: {
        fullname: string;
        email: string;
        password: string;
        height: string;
        weight: string;
    };
    fieldErrors: Record<string, string> | null;
    loading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
}

const FormContent = ({ form, loading, fieldErrors, onChange, onSubmit }: FormInputProps) => {
    const navigate = useNavigate()

    return (
        <form onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => onSubmit(e)} className="mx-auto w-full max-w-lg tracking-normal">
            <Backbtn />
            <div className="mb-8">
                <h1 className="text-center text-3xl font-bold text-gray-900 md:text-left">Create Your Account</h1>
                <p className="mt-3 text-center text-xs text-gray-500 md:text-left">
                    Enter your details to get started with your fitness journey
                </p>
            </div>

            <div className="mt-2 space-y-6">
                <InputField
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="Fullname"
                    value={form?.fullname}
                    error={fieldErrors?.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
                    disabled={loading}
                />
                <InputField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={form?.email}
                    error={fieldErrors?.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
                    disabled={loading}
                />

                <InputField
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form?.password}
                    error={fieldErrors?.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
                    disabled={loading}
                />
                <div className="flex gap-3">
                    <InputField
                        id="height"
                        name="height"
                        type="number"
                        placeholder="Height (cm)"
                        value={form?.height}
                        error={fieldErrors?.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
                        disabled={loading}
                    />
                    <InputField
                        id="weight"
                        name="weight"
                        type="number"
                        placeholder="Weight (kg)"
                        value={form?.weight}
                        error={fieldErrors?.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
                        disabled={loading}
                    />
                </div>
            </div>

            <MyButton type="submit" disabled={loading} className="mt-14 h-14 w-full text-base">
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <Spinner />
                        Signing up...
                    </span>
                ) : (
                    "Create Account"
                )}
            </MyButton>

            <p className="mt-5 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <span
                    onClick={() => navigate("/signin")}
                    className="cursor-pointer font-semibold text-gray-900 underline-offset-2 hover:underline"
                >
                    Sign In
                </span>
            </p>
        </form>
    )
}

function Spinner() {
    return (
        <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    )
}
const Backbtn = () => {
    const navigate = useNavigate()
    return (
        <motion.button
            type="button"
            className="border-line-color absolute top-5 left-5 cursor-pointer rounded-full border bg-gray-50 p-4 text-gray-700"
            initial={{
                opacity: 0,
                scale: 0.9,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.3,
            }}
            whileHover={{
                scale: 1,
            }}
            onClick={() => navigate("/")}
        >
            <ArrowLeft />
        </motion.button>
    )
}

export default SignUpPage
