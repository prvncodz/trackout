import { motion } from "motion/react"
import { useState } from "react"
import axios from "../lib/axios.js"
import Button from "../components/ui/Button.jsx"
import InputField from "../components/ui/Inputfield.jsx"
import gymImage from "../assets/gym-hero.jpg"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../stores/user.store.js"
import { userSignInSchema } from "../../../server/src/schemas/user.schemas.js"
import { toast } from "sonner"

const SignInPage = () => {
    const [form, setForm] = useState({ email: "", password: "" })
    const [fieldErrors, setFieldErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const setUser = useAuth((state) => state.setUser)
    const setIsUserLogged = useAuth((state) => state.setIsUserLogged)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        // Clear field error on change
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const handleSubmit = async (e) => {
        e?.preventDefault?.()

        setLoading(true)

        try {
            //validate
            userSignInSchema.parseAsync(form)

            const res = await axios.post("/user/signin", {
                email: form.email,
                password: form.password,
            })

            if (res.status === 200) {
                setUser(res.data?.data)
                setIsUserLogged(true)
                setForm({ email: "", password: "" })
                setFieldErrors({})
                toast.success("Signin successful. Redirecting...")
                setTimeout(() => {
                    navigate("/")
                }, 500)
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Something went wrong. Please try again."
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="hidden h-screen min-h-[520px] w-full overflow-hidden rounded-2xl bg-white shadow-sm md:flex">
                <div className="flex w-full flex-1 flex-col items-start justify-center px-12 py-14">
                    <FormContent
                        form={form}
                        fieldErrors={fieldErrors}
                        loading={loading}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>

                <div className="relative w-[50%] shrink-0 overflow-hidden">
                    <img src={gymImage} alt="Gym illustration" className="h-full w-full object-cover" />
                </div>
            </div>

            {/* ── Mobile Layout ──────────────────────────────────────────────── */}
            <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-white shadow-sm md:hidden">
                <div className="w-full px-8 py-10">
                    <FormContent
                        form={form}
                        fieldErrors={fieldErrors}
                        loading={loading}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </>
    )
}

const FormContent = ({ form, fieldErrors, loading, onChange, onSubmit }) => {
    const navigate = useNavigate()

    return (
        <div className="mx-auto w-full max-w-lg tracking-normal">
            <Backbtn />
            <div className="mb-8">
                <h1 className="text-center text-3xl font-bold text-gray-900 md:text-left">Welcome Back</h1>
                <p className="mt-3 text-center text-xs text-gray-500 md:text-left">
                    Enter your credentials to access your account
                </p>
            </div>

            <div className="mt-2 space-y-6">
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

            <Button onClick={onSubmit} disabled={loading} className="mt-14 h-14 w-full text-lg">
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <Spinner />
                        Signing in...
                    </span>
                ) : (
                    "Sign In"
                )}
            </Button>

            <p className="mt-5 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <span
                    onClick={() => navigate("/signup")}
                    className="cursor-pointer font-semibold text-gray-900 underline-offset-2 hover:underline"
                >
                    Sign Up
                </span>
            </p>
        </div>
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
            className="border-line-color absolute top-5 left-5 cursor-pointer rounded-full border bg-gray-50 p-4 text-gray-700 hover:bg-neutral-50 hover:text-gray-800"
            onClick={() => navigate("/")}
            initial={{
                opacity: 0,
                scale: 0.9,
            }}
            animate={{
                opacity: 1,
                duration: 0.3,
            }}
            whileHover={{
                scale: 1,
            }}
        >
            <ArrowLeft />
        </motion.button>
    )
}
export default SignInPage
