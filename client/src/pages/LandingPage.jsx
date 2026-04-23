import { Activity, Calendar, TrendingUp, TrendingUpDown } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Button from "../components/ui/Button"
import { IconTreadmill } from "@tabler/icons-react"
import { Navigate, useNavigate } from "react-router-dom"
import { Link } from "react-scroll"

const LabelChip = () => {
    return (
        <div className="bg-gray-100 text-gray-600 text-xs font-medium pl-2 pr-3 rounded-full w-auto h-7 flex justify-center items-center border border-gray-400 ">
            <Activity size={14} strokeWidth={2} />
            <h3 className="ml-2 text-gray-600 text-xs md:text-sm">Engineered for performance</h3>
        </div>
    )
}

const HeroText = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 ">
            <h1 className="font-extrabold text-near-black text-5xl md:text-7xl text-center tracking-tight leading-12.5 md:leading-17.5" >Log every rep. <br /> Track every gain.</h1>
            <p className="text-neutral-500 font-normal max-w-[80vw] text-sm md:max-w-160 text-center mt-2 md:text-xl">A surgical-grade interface for serious training. No bloat, no friction—just pure data to drive your physical evolution.</p>
        </div>
    )
}


const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <section id="home" className="mt-30 md:mt-40">
            <div className="flex flex-col items-center justify-center gap-5">
                <LabelChip />
                <HeroText />
            </div>
            <div className="flex items-center justify-center mt-10 gap-5 px-2 md:px-0">
                <Button onClick={() => navigate("/signin")} className="text-sm md:text-base">
                    Get started for free
                </Button>
                <Link to="features"
                    className="h-10 w-auto p-2 px-8 text-near-black bg-gray-50 text-sm md:text-base rounded-md flex justify-center items-center cursor-pointer font-semibold hover:bg-gray-100 hover:text-gray-900 active:scale-98 transition-all border border-gray-300"
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
        <div className="w-full lg:max-w-[60vw] mx-auto relative ">
            {children}
        </div>
    )
}

const DashboardMockup = () => {
    return (
        <div className="w-full h-150 bg-gray-200 rounded-lg flex items-center justify-center border border-line-color my-20 ml-15">
        </div>
    )
}

const Features = () => {
    return (
        <section id="features" className="my-15 w-full selection:bg-near-black selection:text-btn">
            <h2 className="text-xl font-bold text-near-black mb-3 text-center md:text-3xl">Train Smarter. Stay Consistent.</h2>
            <p className="text-neutral-500 text-xs text-center">Everything you need,nothing you don't.</p>

            {/* Mobile: flex column stack | Desktop: relative stagger */}
            <div className="relative mt-15 flex flex-col items-center gap-4 md:block md:h-200">
                <FeaturesCard
                    Logo={<IconTreadmill size={30} />}
                    title={"Log Your Workout"}
                    description={"Log your workouts with ease, track your progress over time, and build real consistency through structured training"}
                    className={"w-full max-w-sm md:absolute md:w-100 md:top-10 md:left-10 md:z-0"}
                />
                <FeaturesCard
                    Logo={<TrendingUp />}
                    title={"Track your workouts"}
                    description={"See how your strength improves over time with clear and simple progress tracking."}
                    className={"w-full max-w-sm md:absolute md:w-100 md:top-75 md:left-[33%] md:z-10"}
                />
                <FeaturesCard
                    Logo={<Calendar />}
                    title={"Stay Consistent"}
                    description={"Build discipline with a structured routine and keep your training on track every day."}
                    className={"w-full max-w-sm md:absolute md:w-100 md:top-10 md:right-10 md:z-0"}
                />
            </div>
        </section>
    )
}

const FeaturesCard = ({ Logo, title, description, className }) => {
    return (
        <div className={`flex flex-col items-start gap-4 bg-gray-50 p-10 pb-13 pr-13 border border-line-color shadow-md rounded-xl ${className}`}>
            {Logo}
            <h2 className="text-near-black text-lg mt-5 font-bold">{title}</h2>
            <p className="text-neutral-500">{description}</p>
        </div>
    )
}
const Workflow = () => {
    return (
        <section id="how-it-works" className="my-20 md:my-30">
            <h2 className="text-xl font-bold  text-near-black mb-3 text-center md:3xl">Application Workflow</h2>
            <div className="relative flex flex-col md:flex-row w-full my-15 justify-between">
                <WorkflowCard no={1} title={"Initialize Session"} description={"Select your program or start an empty log. Trackout your routine instantly."} />
                <WorkflowCard no={2} title={"Log Your Sets"} description={"Add exercises, sets, reps, and weight as you go. Fast input, zero friction."} />
                <WorkflowCard no={3} title={"Track Your Gains"} description={"See your volume, streaks, and PRs update in real time after every session."} />
            </div>
        </section>
    )
}

const WorkflowCard = ({ no, title, description }) => {
    return (
        <div className="flex md:flex-col flex-start justify-center items-center text-center w-auto px-8 my-4">
            <div className="rounded-full bg-gray-200 flex items-center justify-center h-15 w-15 p-2 font-serif font-bold text-near-black">
                {no}
            </div>
            <div className="flex flex-col ml-5">
                <h2 className="text-near-black text-lg mt-5 font-bold text-left md:text-center">{title}</h2>
                <p className="text-neutral-600 text-sm max-w-80 w-full mt-1 text-left md:text-center ">{description}</p>
            </div>
        </div>
    )
}
const Footer = () => {
    return (
        <footer className="mt-40 md:mt-70  border-t border-line-color flex flex-col justify-center items-center py-5 w-full">
            <h2 className="font-serif text-gray-700 text-base text-center w-full max-w-[95%] md:text-xl md:max-w-[80%]">"It removes emotion from the process. You are left only with the architecture of your own discipline and the numbers that prove it."
            </h2>
            <h5 className="text-center mt-3 text-[10px] text-neutral-500 md:text-xs ">DR. E. VANCE <br />SPORTS SCIENTIST / ATHLETE</h5>
        </footer>
    )
}



const LandingPage = () => {
    return (
        <div className="bg-neutral-50 w-full max-w-screen overflow-hidden flex justify-center items-center flex-col selection:bg-near-black selection:text-btn-text">
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
