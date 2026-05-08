import { Activity, Calendar, TrendingUp, TrendingUpDown } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Button from "../components/ui/Button";
import { IconTreadmill } from "@tabler/icons-react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { motion } from "motion/react"

const LabelChip = () => {
    return (
        <div className="flex h-7 w-auto items-center justify-center rounded-full border border-gray-400 bg-gray-100 pr-3 pl-2 text-xs font-medium text-gray-600">
            <Activity size={14} strokeWidth={2} />
            <h3 className="ml-2 text-xs text-gray-600 md:text-sm">
                Engineered for performance
            </h3>
        </div>
    );
};

const HeroText = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <h1 className="text-near-black text-center text-5xl leading-12.5 font-extrabold tracking-tight md:text-7xl md:leading-17.5">
                Log every rep. <br /> Track every gain.
            </h1>
            <p className="mt-2 max-w-[80vw] text-center text-sm font-normal text-neutral-500 md:max-w-160 md:text-xl">
                A surgical-grade interface for serious training. No bloat, no
                friction—just pure data to drive your physical evolution.
            </p>
        </div>
    );
};

const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <section id="home" className="mt-30 md:mt-40">
            <div className="flex flex-col items-center justify-center gap-5">
                <LabelChip />
                <HeroText />
            </div>
            <div className="mt-10 flex items-center justify-center gap-5 px-2 md:px-0">
                <Button
                    onClick={() => navigate("/signin")}
                    className="text-sm md:text-base"
                >
                    Get started for free
                </Button>
                <motion.div
                    whileHover={{ y: -3 }}
                >
                    <Link
                        to="features"
                        className="text-near-black flex h-10 w-auto cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-50 p-2 px-8 text-sm font-semibold transition-all hover:bg-gray-50 hover:text-gray-900  active:scale-98 md:text-base"
                        smooth={true}
                        offset={-140}
                        duration={300}
                    >
                        How it works?
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

const Layout = ({ children }) => {
    return (
        <motion.div
            className="relative mx-auto w-full overflow-hidden lg:max-w-[60vw]"
            initial={{
                y: -10
            }}
            animate={{
                y: 0
            }}
        >
            {children}
        </motion.div>
    );
};

const DashboardMockup = () => {
    return (
        <div className=" my-20 p-5  ml-15 flex h-150 w-300 items-center justify-center rounded-lg   overflow-hidden cursor-default select-none lg:ml-0 lg:w-auto">
            <img src="../../public/Screenshot from 2026-05-08 15-01-22.png" className="w-full h-full cursor-default select-none shadow-aesthetic rounded-lg  " />
        </div>
    );
};

const Features = () => {
    return (
        <section
            id="features"
            className="selection:bg-near-black selection:text-btn my-15 w-full"
        >
            <h2 className="text-near-black mb-3 text-center text-xl font-bold md:text-2xl">
                Train Smarter. Stay Consistent.
            </h2>
            <p className="text-center text-xs text-neutral-500">
                Everything you need,nothing you don't.
            </p>

            <div className="relative mt-15 flex flex-col items-center gap-4 lg:block lg:h-200">
                <FeaturesCard
                    Logo={<IconTreadmill size={30} />}
                    title={"Log Your Workout"}
                    description={
                        "Log your workouts with ease, track your progress over time, and build real consistency through structured training"
                    }
                    className={
                        "w-full max-w-sm lg:absolute lg:top-10 lg:left-10 lg:z-0 lg:w-100"
                    }
                />
                <FeaturesCard
                    Logo={<TrendingUp />}
                    title={"Track your workouts"}
                    description={
                        "See how your strength improves over time with clear and simple progress tracking."
                    }
                    className={
                        "w-full max-w-sm lg:absolute lg:top-75 lg:left-[33%] lg:z-10 lg:w-100"
                    }
                />
                <FeaturesCard
                    Logo={<Calendar />}
                    title={"Stay Consistent"}
                    description={
                        "Build discipline with a structured routine and keep your training on track every day."
                    }
                    className={
                        "w-full max-w-sm lg:absolute lg:top-10 lg:right-10 lg:z-0 lg:w-100"
                    }
                />
            </div>
        </section>
    );
};

const FeaturesCard = ({ Logo, title, description, className }) => {
    return (
        <div
            className={`border-line-color flex flex-col items-start gap-4 rounded-xl border bg-gray-50 p-10 pr-13 pb-13 shadow-md ${className}`}
        >
            {Logo}
            <h2 className="text-near-black mt-5 text-lg font-bold">{title}</h2>
            <p className="text-neutral-500">{description}</p>
        </div>
    );
};
const Workflow = () => {
    return (
        <section id="how-it-works" className="my-20 md:my-30">
            <h2 className="text-near-black md:text-2xl mb-3 text-center text-xl font-bold">
                Application Workflow
            </h2>
            <div className="relative my-15 flex w-full flex-col justify-between md:flex-row">
                <WorkflowCard
                    no={1}
                    title={"Initialize Session"}
                    description={
                        "Select your program or start an empty log. Trackout your routine instantly."
                    }
                />
                <WorkflowCard
                    no={2}
                    title={"Log Your Sets"}
                    description={
                        "Add exercises, sets, reps, and weight as you go. Fast input, zero friction."
                    }
                />
                <WorkflowCard
                    no={3}
                    title={"Track Your Gains"}
                    description={
                        "See your volume, streaks, and PRs update in real time after every session."
                    }
                />
            </div>
        </section>
    );
};

const WorkflowCard = ({ no, title, description }) => {
    return (
        <div className="flex-start my-4 flex w-auto items-center justify-center px-8 text-center md:flex-col">
            <div className="text-near-black flex h-15 w-15 items-center justify-center rounded-full bg-gray-100 p-2 font-serif font-bold">
                {no}
            </div>
            <div className="ml-5 flex flex-col">
                <h2 className="text-near-black mt-5 text-left text-lg font-bold md:text-center">
                    {title}
                </h2>
                <p className="mt-1 w-full max-w-80 text-left text-sm text-neutral-600 md:text-center">
                    {description}
                </p>
            </div>
        </div>
    );
};
const Footer = () => {
    return (
        <footer className="border-line-color mt-40 flex w-full flex-col items-center justify-center border-t py-5 md:mt-70">
            <h2 className="w-full max-w-[95%] text-center font-serif text-base text-gray-700 md:max-w-[80%] md:text-xl">
                "It removes emotion from the process. You are left only with the
                architecture of your own discipline and the numbers that prove it."
            </h2>
            <h5 className="mt-3 text-center text-[10px] text-neutral-500 md:text-xs">
                DR. E. VANCE <br />
                SPORTS SCIENTIST / ATHLETE
            </h5>
        </footer>
    );
};

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <motion.div
            className="selection:bg-near-black selection:text-btn-text relative flex w-full  flex-col items-center justify-center bg-neutral-50"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                duration: 0.3
            }}
        >
            <Navbar>
                <ul className="hidden items-center gap-10 md:flex">
                    <Link
                        className="cursor-pointer text-base text-neutral-500 transition-colors ease-in-out hover:text-gray-800 active:text-gray-900"
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
                        className="cursor-pointer text-base text-neutral-500 transition-colors ease-in-out hover:text-gray-800 active:text-gray-900"
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
                        className="ext-gray-600 cursor-pointer text-base text-neutral-500 transition-colors ease-in-out hover:text-gray-800 active:text-gray-900"
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
                <div className="flex items-center justify-center gap-2 md:gap-6">
                    <button
                        className="bg-near-black flex h-9 w-auto cursor-pointer items-center justify-center rounded-md p-2 px-4 font-semibold text-gray-200 hover:text-gray-800 md:bg-neutral-50 md:font-normal md:text-neutral-500"
                        onClick={() => navigate("/signin")}
                    >
                        Log in{" "}
                    </button>
                    <Button
                        onClick={() => navigate("/signin")}
                        className="hidden md:block"
                    >
                        Get started
                    </Button>
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
    );
};

export default LandingPage;
