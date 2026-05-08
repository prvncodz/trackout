import Calendar from "../components/ui/Calender.jsx";
import SideBarLayout from "../components/layout/SideBar";
import { useAuth } from "@/stores/user.store";
import ChartAreaInteractive from "@/components/dashboard/DashBoardChart.jsx";
import { Dumbbell, TrendingDown, TrendingUp } from "lucide-react";
import { IconCampfireFilled, IconChartLine, IconClipboardData, IconFlameFilled } from "@tabler/icons-react";

const Greetings = () => {
    const fullname = useAuth((s) => s.user.fullname);
    return (
        <div className="flex flex-col justify-center items-start gap-3 p-10 cursor-default lg:p-0 lg:my-10 lg:justify-start lg:items-start lg:pl-10">

            <h1 className="text-xl text-gray-700 text-left font-heading antialiased">Welcome again {fullname}</h1>
            <p className="text-neutral-500 text-sm text-left subpixel-antialiased ">A surgical-grade interface for serious training. No bloat, no friction — just pure data to drive your physical evolution.</p>
        </div>
    );
}
const Cards = () => {
    const user = undefined;
    const stats = [
        { label: "Total Volume", value: user?.height ? `${user.height}kg` : "—", icon: Dumbbell, trending: false, trendingValue: 12 },
        { label: "Current streak", value: user?.weight ? `${user.weight}` : "—", icon: IconFlameFilled, trending: true, trendingValue: 14 },
        { label: "Total PRs", value: user?.totalWorkouts ?? "—", icon: IconChartLine, trending: true, trendingValue: 17 },
        { label: "Total Workouts", value: user?.totalWorkouts ?? "—", icon: IconClipboardData, trending: false, trendingValue: 12 },
    ];

    return (
        <div className="no-scrollbar grid grid-cols-2 items-center justify-center h-auto w-full gap-3 overflow-hidden py-4   cursor-default lg:w-auto lg:px-0 lg:grid-cols-4">
            {stats.map((stat, index) => {
                let Icon = stat.icon;
                return <div key={index} className="bg-card border border-line-color/50 rounded-xl p-6 flex flex-col gap-3 w-fit min-w-48 ">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-mockup-text antialiased">
                            {stat.label}
                        </p>
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="flex items-baseline gap-1 antialiased">
                        {stat.value}
                    </div>

                    <div className="flex items-center gap-1.5">
                        {stat.trending ?
                            <span className="text-xs text-green-500 flex items-center gap-0.5 antialiased">
                                <TrendingUp className="w-3 h-3" />
                                {stat.trendingValue}
                            </span>
                            :
                            <span className="text-xs text-red-500 flex items-center gap-0.5 antialiased">
                                <TrendingDown className="w-3 h-3" />
                                {stat.trendingValue}
                            </span>
                        }
                        <span className="text-xs text-muted-foreground antialiased">vs last week</span>
                    </div>
                </div>
            })}
        </div>

    )
}
const PreviousWorkout = () => {
    const workouts = [
        {
            id: 1,
            name: "Push Day — Chest & Triceps",
            icon: "🏋️",
            iconBg: "bg-gray-100",
            sets: "6 sets",
            duration: "42 min",
            timeAgo: "1h ago",
            pr: true,
        },
        {
            id: 2,
            name: "Pull Day — Back & Biceps",
            icon: "🔄",
            iconBg: "bg-gray-100",
            sets: "7 sets",
            duration: "55 min",
            timeAgo: "2d ago",
            pr: false,
        },
        {
            id: 3,
            name: "Leg Day — Squat Focus",
            icon: "🦵",
            iconBg: "bg-gray-100",
            sets: "8 sets",
            duration: "1h 10m",
            timeAgo: "4d ago",
            pr: true,
        },
        {
            id: 4,
            name: "Cardio — Zone 2 Run",
            icon: "🏃",
            iconBg: "bg-gray-100",
            sets: "5.4 km",
            duration: "30 min",
            timeAgo: "1w ago",
            pr: false,
        },
        {
            id: 5,
            name: "Core & Mobility",
            icon: "⚡",
            iconBg: "bg-gray-100",
            sets: "4 sets",
            duration: "25 min",
            timeAgo: "2w ago",
            pr: false,
        },
    ];

    return (
        <div className="bg-white rounded-xl p-5 w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-mockup-text">
                    Recent Workouts
                </span>
            </div>

            {/* List */}
            <div className="flex flex-col gap-0.5 divide-y divide-line-color">
                {workouts.map((w, i) => (
                    <div key={w.id}>
                        <div className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg hover:bg-[#f7f7f6] cursor-pointer transition-colors group">
                            {/* Icon */}
                            <div
                                className={`size-8.5 rounded-lg flex items-center justify-center flex-shrink-0 text-[15px] ${w.iconBg}`}
                            >
                                {w.icon}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium text-mockup-text tracking-wide truncate">
                                    {w.name}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[11px] text-gray-400 font-mono">{w.sets}</span>
                                    <span className="w-0.5 h-0.5 rounded-full bg-gray-300 shrink-0" />
                                    {w.pr && (
                                        <span className="text-[9px] font-semibold tracking-wider text-white bg-[#1a1a1a] px-1.5 py-0.5 rounded uppercase">
                                            PR
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Time */}
                            <span className="text-[11px] text-gray-300 shrink-0 whitespace-nowrap">
                                {w.timeAgo}
                            </span>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
}
const DashboardPage = () => {
    return (
        <SideBarLayout>
            <div className="flex flex-col overflow-auto no-scrollbar h-screen scroll-smooth transition-scroll duration-300 ease-in-out">
                <Greetings />
                <div className="flex gap-3  flex-col lg:flex-row">
                    <div className="flex flex-col h-screen overflow-hidden no-scrollbar px-5 gap-6 lg:pl-10 ">
                        <Cards />
                        <div className=" h-120  rounded-2xl w-full bg-neutral-50">
                            <ChartAreaInteractive className="border-line-color/50" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 px-5 h-screen lg:px-0">
                        <Calendar size={"md"} className="bg-white mt-3" />
                        <div className="bg-neutral-50 border border-line-color h-auto w-full rounded-2xl  ">
                            <PreviousWorkout />
                        </div>
                    </div>
                </div>
            </div>
        </SideBarLayout>
    );
};

export default DashboardPage;
