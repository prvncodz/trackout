import { Activity, Calendar, TrendingUp, TrendingUpDown } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Button from "../components/ui/Button"
import { IconTreadmill } from "@tabler/icons-react"
import { Navigate, useNavigate } from "react-router-dom"
import { Link } from "react-scroll"

const LabelChip = () => {
    return (
        <div className="bg-gray-100 text-gray-600 text-xs font-medium pl-2 pr-3 rounded-full w-auto h-7 flex justify-center items-center border border-gray-400 ">
            <Activity size={16} strokeWidth={2} />
            <h3 className="ml-3 text-gray-600 text-sm">Engineered for performance</h3>
        </div>
    )
}

const HeroText = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 ">
            <h1 className="font-extrabold text-near-black text-7xl text-center tracking-tight leading-[70px]" >Log every rep. <br /> Track every gain.</h1>
            <p className="text-neutral-500 font-normal max-w-160 text-center mt-2 text-xl">A surgical-grade interface for serious training. No bloat, no friction—just pure data to drive your physical evolution.</p>
        </div>
    )
}


const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <section id="home" className="mt-40">
            <div className="flex flex-col items-center justify-center gap-5">
                <LabelChip />
                <HeroText />
            </div>
            <div className="flex items-center justify-center mt-10 gap-5">
                <Button onClick={() => navigate("/signin")}>
                    Get started for free
                </Button>
                <Link to="features"
                    className="h-10 w-auto p-2 px-8 text-near-black bg-gray-50 rounded-md flex justify-center items-center cursor-pointer font-semibold hover:bg-gray-100 hover:text-gray-900 active:scale-98 transition-all border border-gray-300"
                    smooth={true}
                    offset={-140} duration={300}
                >
                    How it works?
                </Link>
            </div>
        </section>
    )
}


const Layout = ({ children }) => {
    return (
        <div className="w-full md:max-w-[60vw] mx-auto relative ">
            {children}
        </div>
    )
}

const DashboardMockup = () => {
    return (
        <div className="w-full h-150 bg-gray-200 rounded-lg flex items-center justify-center border border-line-color my-20">
        </div>
    )
}

const Features = () => {
    return (
        <section id="features" className="my-15 h-200 w-full selection:bg-near-black selection:text-btn">
            <h2 className="text-2xl font-bold  text-near-black mb-3 text-center">Train Smarter.Stay Consistent</h2>
            <p className="text-neutral-500 text-sm text-center">Everything you need,nothing you don't.</p>
            <div className="relative mt-10">
                <FeaturesCard Logo={<IconTreadmill size={30} />} title={"Log Your Workout"} description={"Log your workouts with ease, track your progress over time, and build real consistency through structured training"} className={"absolute top-10 left-10 z-0"} />
                <FeaturesCard Logo={<TrendingUp />} title={"Track your workouts"} description={"See how your strength improves over time with clear and simple progress tracking."} className={"absolute top-75 left-[33%] z-10"} />
                <FeaturesCard Logo={<Calendar />} title={"Stay Consistent"} description={"Build discipline with a structured routine and keep your training on track every day."} className={"absolute top-10 right-10 z-0"} />
            </div>
        </section>
    )
}


const FeaturesCard = ({ Logo, title, description, className }) => {
    return (
        <div className={`flex flex-col items-start gap-4 bg-gray-50 h-75  w-100  p-10 pb-13 pr-13 border border-line-color shadow-sm rounded-xl ${className}`}>
            {Logo}
            <h2 className="text-near-black text-lg mt-5 font-bold">{title}</h2>
            <p className="text-neutral-500">{description}</p>
        </div>
    )
}

const Workflow = () => {
    return (
        <section id="how-it-works" className="my-30">
            <h2 className="text-3xl font-bold  text-near-black mb-3 text-center">Application Workflow</h2>
            <div className="relative flex w-full my-15 justify-between">
                <WorkflowCard no={1} title={"Initialize Session"} description={"Select your program or start an empty log. Trackout your routine instantly."} />
                <WorkflowCard no={2} title={"Log Your Sets"} description={"Add exercises, sets, reps, and weight as you go. Fast input, zero friction."} />
                <WorkflowCard no={3} title={"Track Your Gains"} description={"See your volume, streaks, and PRs update in real time after every session."} />
            </div>
        </section>
    )
}

const WorkflowCard = ({ no, title, description }) => {
    return (
        <div className="flex flex-col flex-start justify-center items-center text-center w-auto">
            <div className="rounded-full bg-gray-200 flex items-center justify-center h-15 w-15 p-2 font-serif font-bold text-near-black">
                {no}
            </div>
            <h2 className="text-near-black text-lg mt-5 font-bold">{title}</h2>
            <p className="text-neutral-600 text-sm max-w-80 w-full mt-3 ">{description}</p>
        </div>
    )
}
const Footer = () => {
    return (
        <footer className="mt-70  border-t border-line-color flex flex-col justify-center items-center py-5 w-full">
            <h2 className="font-serif text-gray-700 text-xl text-center w-full max-w-[80%]">"It removes emotion from the process. You are left only with the architecture of your own discipline and the numbers that prove it."
            </h2>
            <h5 className="text-center mt-3 text-xs text-neutral-500  ">DR. E. VANCE <br />SPORTS SCIENTIST / ATHLETE</h5>
        </footer>
    )
}



const LandingPage = () => {
    return (
        <div className="bg-neutral-50 w-full max-w-screen flex justify-center items-center flex-col selection:bg-near-black selection:text-btn-text">
            <Navbar />
            <Layout>
                <HeroSection />
                <DashboardMockup />
                <Features />
                <Workflow />
                <Footer />
            </Layout>
        </div>
    )
}

export default LandingPage
