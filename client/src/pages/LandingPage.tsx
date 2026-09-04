import { Activity, Calendar, Dumbbell, NotebookPen, TrendingUp } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import MyButton from "../components/ui/MyButton"
import { IconTreadmill } from "@tabler/icons-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Link } from "react-scroll"
import { motion } from "motion/react"
import { useEffect } from "react"
import { useGetUser } from "@/hooks/useUser"
import Logo from "@/components/ui/Logo"

const LabelChip = () => {
    return (
        <div className="flex h-7 w-auto items-center justify-center rounded-full border border-gray-400 bg-gray-100 pr-3 pl-3  text-xs font-medium text-gray-600">
            <Activity size={14} strokeWidth={2} />
            <h3 className="ml-2 text-xs  md:text-sm">Engineered for performance</h3>
        </div>
    )
}

const HeroText = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <h1 className="text-near-black text-center text-[2.85rem] leading-12.5 font-extrabold tracking-tight md:text-7xl md:leading-17.5">
                Log every rep. <br /> Track every gain.
            </h1>
            <p className="mt-2 max-w-[80vw] text-center text-sm font-normal text-line-color0 md:max-w-160 md:text-xl">
                A surgical-grade interface for serious training. No bloat, no friction—just pure data to drive your
                physical evolution.
            </p>
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

const DashboardMockup = () => {
    return (
        <div className="my-20 ml-15 flex h-150 w-300 cursor-default items-center justify-center overflow-hidden rounded-lg p-5 select-none lg:ml-0 lg:w-auto">
            <img
                src="./mockup.png"
                className="shadow-aesthetic h-full w-full cursor-default rounded-lg select-none"
            />
        </div>
    )
}

const Features = () => {
    return (
        <section
            id="features"
            className="selection:bg-near-black selection:text-btn-color my-16 w-full px-5 md:my-24 lg:my-32 lg:px-0"
        >
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                <h2 className="text-near-black mb-3 text-center text-xl font-bold md:text-2xl ">Train Smarter. Stay Consistent</h2>
                <p className="max-w-xl text-sm leading-6 text-line-color0 md:text-base">
                    Everything you want, nothing you don&apos;t.
                </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-6">
                <FeaturesCard
                    Logo={<NotebookPen size={26} />}
                    title={"Log in seconds"}
                    description={
                        "Add exercises, sets, reps, and weight without fighting the interface during a workout."
                    }
                    className={"lg:col-span-2"}
                />
                <FeaturesCard
                    Logo={<TrendingUp size={26} />}
                    title={"Read your progress"}
                    description={"Spot strength trends and training volume changes with clean, practical feedback."}
                    className={"lg:col-span-2"}
                />
                <FeaturesCard
                    Logo={<Calendar size={26} />}
                    title={"Stay Consistent"}
                    description={
                        "Keep routines visible, build repeatable habits, and make every completed session count."
                    }
                    className={"lg:col-span-2"}
                />
                <FeaturesCard
                    Logo={<IconTreadmill size={27} />}
                    title={"Move through sessions"}
                    description={"A compact flow helps you start, update, and finish workouts with less tapping."}
                    className={"lg:col-span-3"}
                />
                <FeaturesCard
                    Logo={<Dumbbell size={27} />}
                    title={"Designed around the set, not the spreadsheet."}
                    description={" Trackout keeps the important numbers close, so you can focus on the next set instead of managing a complicated dashboard."}
                    className={"lg:col-span-3"}
                />

            </div>
        </section>
    )
}

interface FeatureCardProps {
    Logo: React.ReactNode;
    title: string;
    description: string;
    className: string;
}


const FeaturesCard = ({ Logo, title, description, className }: FeatureCardProps) => {
    return (
        <div
            className={`border-line-color flex min-h-56 flex-col items-start rounded-lg border bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${className}`}
        >
            <div className="text-near-black flex h-11 w-11 items-center justify-center rounded-md bg-gray-100">
                {Logo}
            </div>
            <h2 className="text-near-black mt-8 text-lg font-bold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-line-color0">{description}</p>
        </div>
    )
}
const Workflow = () => {
    return (
        <section id="how-it-works" className="my-20 md:my-40">
            <h2 className="text-near-black mb-3 text-center text-xl font-bold md:text-2xl ">Application Workflow</h2>
            <div className="relative my-15 flex w-full flex-col justify-between md:flex-row">
                <WorkflowCard
                    no={1}
                    title={"Initialize Session"}
                    description={"Select your program or start an empty log. Trackout your routine instantly."}
                />
                <WorkflowCard
                    no={2}
                    title={"Log Your Sets"}
                    description={"Add exercises, sets, reps, and weight as you go. Fast input, zero friction."}
                />
                <WorkflowCard
                    no={3}
                    title={"Track Your Gains"}
                    description={"See your volume, streaks, and PRs update in real time after every session."}
                />
            </div>
        </section>
    )
}

interface WorkflowCardProps {
    no: number;
    title: string;
    description: string;
}

const WorkflowCard = ({ no, title, description }: WorkflowCardProps) => {
    return (
        <div className="flex-start my-4 flex w-auto items-center justify-center px-8 text-center md:flex-col">
            <div className="text-near-black flex h-15 w-15 items-center justify-center rounded-full bg-gray-100 p-2 font-serif font-bold">
                {no}
            </div>
            <div className="ml-5 flex flex-col">
                <h2 className="text-near-black mt-5 text-left text-lg font-bold md:text-center">{title}</h2>
                <p className="mt-1 w-full max-w-80 text-left text-sm text-neutral-600 md:text-center">{description}</p>
            </div>
        </div>
    )
}
const Footer = () => {
    return (
        <footer className="border-line-color mt-24 w-full border-t px-5 py-8 md:mt-42 lg:px-0">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Logo />
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-line-color0">
                        Simple workout tracking for lifters who want clean logs and useful progress signals.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-line-color0">
                    <Link className="cursor-pointer hover:text-near-black" to="home" smooth={true} offset={-240} duration={300}>
                        Home
                    </Link>
                    <Link className="cursor-pointer hover:text-near-black" to="features" smooth={true} offset={-140} duration={300}>
                        Features
                    </Link>
                    <Link className="cursor-pointer hover:text-near-black" to="how-it-works" smooth={true} offset={-70} duration={300}>
                        How it works
                    </Link>
                </div>
            </div>
        </footer>
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
