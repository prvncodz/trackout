import { Activity, Workflow } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import MyButton from "../components/ui/MyButton"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Link } from "react-scroll"
import { motion } from "motion/react"
import { useEffect } from "react"
import { useGetUser } from "@/hooks/useUser"
import DashboardMockup from "@/components/landing/DashboardMockup"
import HeroText from "@/components/landing/HeroText"
import Features from "@/components/landing/Features"
import { Footer } from "react-day-picker"

const LabelChip = () => {
    return (
        <div className="flex h-7 w-auto items-center justify-center rounded-full border border-gray-400 bg-gray-100 pr-3 pl-3  text-xs font-medium text-gray-600">
            <Activity size={14} strokeWidth={2} />
            <h3 className="ml-2 text-xs  md:text-sm">Engineered for performance</h3>
        </div>
    )
}


const HeroSection = () => {
    const navigate = useNavigate()
    return (
        <section id="home" className="mt-30 md:mt-40">
            <div className="flex flex-col items-center justify-center gap-5">
                <LabelChip />
                <HeroText />
            </div>
            <div className="mt-10 flex items-center justify-center gap-5 px-2 md:px-0">
                <MyButton onClick={() => navigate("/signup")} className="text-sm md:text-base">
                    Get started for free
                </MyButton>
                <div >
                    <Link
                        to="features"
                        className="text-near-black flex h-10 w-auto cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-50 p-2 px-8 text-sm font-semibold transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-98 md:text-base"
                        smooth={true}
                        offset={-140}
                        duration={300}
                    >
                        How it works?
                    </Link>
                </div>
            </div>
        </section>
    )
}

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            className="relative mx-auto w-full overflow-hidden lg:max-w-[60vw]"
            initial={{
                y: -10,
            }}
            animate={{
                y: 0,
            }}
        >
            {children}
        </motion.div>
    )
}


const LandingPage = () => {
    const navigate = useNavigate()
    const [searchQueryParams] = useSearchParams()
    const userQuery = searchQueryParams.get("user")

    useEffect(() => {
        if (userQuery && userQuery === "google") {
            useGetUser()
        }
    })

    return (
        <motion.div
            className="selection:bg-near-black selection:text-btn-text relative flex min-h-dvh w-full flex-col items-center justify-start overflow-x-hidden bg-neutral-50"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.3,
            }}
            exit={{
                opacity: 0,
            }}
        >
            <Navbar>
                <ul className="hidden items-center gap-10 md:flex">
                    <Link
                        className="cursor-pointer text-base text-line-color0 transition-colors ease-in-out hover:text-gray-800 active:text-gray-900 dark:hover:text-gray-300 dark:active:text-gray-400"
                        to="home"
                        smooth={true}
                        offset={-240}
                        duration={300}
                        activeClass="active"
                        spy={true}
                    >
                        Home
                    </Link>
                    <Link
                        className="cursor-pointer text-base text-line-color0 transition-colors ease-in-out hover:text-gray-800 active:text-gray-900 dark:hover:text-gray-300 dark:active:text-gray-400"
                        to="features"
                        smooth={true}
                        offset={-140}
                        duration={300}
                        activeClass="active"
                        spy={true}
                    >
                        Features
                    </Link>
                    <Link
                        className="ext-gray-600 cursor-pointer text-base text-line-color0 transition-colors ease-in-out hover:text-gray-800 active:text-gray-900 dark:hover:text-gray-300 dark:active:text-gray-400"
                        to="how-it-works"
                        smooth={true}
                        offset={-70}
                        duration={300}
                        activeClass="active"
                        spy={true}
                    >
                        How it works
                    </Link>
                </ul>
                <div className="flex items-center justify-center gap-4 md:gap-6">
                    <button
                        className=" flex h-9 w-auto cursor-pointer items-center justify-center rounded-md bg-near-black p-2 px-4 font-semibold text-gray-200 hover:text-gray-800 md:bg-neutral-50 md:font-normal md:text-neutral-500 dark:bg-gray-100 dark:text-near-black dark:md:text-neutral-500 dark:md:bg-near-black dark:hover:text-gray-300"
                        onClick={() => navigate("/signin")}
                    >
                        Log in
                    </button>
                    <MyButton onClick={() => navigate("/signup")} className="hidden md:block">
                        Get started
                    </MyButton>
                </div>
            </Navbar>
            <Layout>
                <HeroSection />
                <DashboardMockup />
                <Features />
                <Workflow />
                <Footer />
            </Layout>
        </motion.div>
    )
}

export default LandingPage
