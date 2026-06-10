import { motion } from "motion/react"
import { useState } from "react"
import axios from "../lib/axios"
import MyButton from "../components/ui/MyButton"
import InputField from "../components/ui/Inputfield"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../stores/user.store"
import { userSignInSchema } from "../schemas/user.schemas"
import { toast } from "sonner"
import gymImage from "../assets/gym-hero.jpg"

const SignInPage = () => {
    const [form, setForm] = useState({ email: "", password: "" })
    const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null)
    const [loading, setLoading] = useState(false)
    const setUser = useAuth((state) => state.setUser)
    const setIsUserLogged = useAuth((state) => state.setIsUserLogged)
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
                setFieldErrors(null)
                toast.success("Signin successful. Redirecting...")
                setTimeout(() => {
                    navigate("/")
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
            <div className="hidden h-screen min-h-130 w-full overflow-hidden rounded-2xl bg-white shadow-sm md:flex">
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

interface FormInputProps {
    form: {
        email: string;
        password: string;
    };
    fieldErrors: Record<string, string> | null;
    loading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
}
const FormContent = ({ form, fieldErrors, loading, onChange, onSubmit }: FormInputProps) => {
    const navigate = useNavigate()

    return (
        <form onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => onSubmit(e)} className="mx-auto w-full max-w-lg tracking-normal">
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
                    value={form?.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
                    error={fieldErrors?.email}
                    disabled={loading}
                />

                <InputField
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form?.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
                    error={fieldErrors?.password}
                    disabled={loading}
                />
            </div>

            <MyButton disabled={loading} className="mt-14 h-14 w-full text-lg">
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <Spinner />
                        Signing in...
                    </span>
                ) : (
                    "Sign In"
                )}
            </MyButton>

            <p className="mt-5 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <span
                    onClick={() => navigate("/signup")}
                    className="cursor-pointer font-semibold text-gray-900 underline-offset-2 hover:underline"
                >
                    Sign Up
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
            className="border-line-color absolute top-5 left-5 cursor-pointer rounded-full border bg-gray-50 p-4 text-gray-700 hover:bg-neutral-50 hover:text-gray-800"
            onClick={() => navigate("/")}
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
        >
            <ArrowLeft />
        </motion.button>
    )
}
export default SignInPage
