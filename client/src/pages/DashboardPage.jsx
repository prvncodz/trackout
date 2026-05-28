import Calendar from "../components/ui/Calender.jsx";
import SideBarLayout from "../components/layout/SideBar";
import { useAuth } from "@/stores/user.store";
import ChartAreaInteractive from "@/components/dashboard/DashBoardChart.jsx";
import { Activity, Dumbbell, TrendingDown, TrendingUp } from "lucide-react";
import { IconCampfireFilled, IconChartLine, IconCircleDotted, IconClipboardData, IconFlameFilled } from "@tabler/icons-react";
import { useStats } from "../stores/user.store.js";

const Greetings = () => {
    const fullname = useAuth((state) => state.user?.fullname);
    return (
        <div className="flex flex-col justify-center items-start gap-3 p-10 cursor-default lg:p-0 lg:my-10 lg:justify-start lg:items-start lg:pl-10">

            <h1 className="text-xl text-gray-700 text-left font-heading antialiased">Welcome again {fullname}</h1>
            <p className="text-neutral-500 text-sm text-left subpixel-antialiased ">A surgical-grade interface for serious training. No bloat, no friction — just pure data to drive your physical evolution.</p>
        </div>
    );
}
const Cards = () => {
    const userStats = useStats((state) => state.stats);
    const stats = [
        { label: "Active Days", value: userStats?.totalActiveDays ?? "—", icon: Activity, trending: false, trendingValue: 12 },
        { label: "Current Streak", value: userStats?.consistencyStreak ?? "—", icon: IconFlameFilled, trending: true, trendingValue: 14 },
        { label: "Total PRs", value: userStats?.totalPrs ?? "—", icon: IconChartLine, trending: true, trendingValue: 17 },
        { label: "Total Workouts", value: userStats?.totalWorkouts ?? "—", icon: IconClipboardData, trending: false, trendingValue: 12 },
    ];

    return (
        <div className="no-scrollbar grid grid-cols-2 items-center justify-center h-auto w-full gap-3 overflow-hidden py-4   cursor-default lg:w-auto lg:px-0 lg:grid-cols-4">
            {stats.map((stat, index) => {
                let Icon = stat.icon;
                return <div key={index} className="bg-card shadow-standard rounded-xl p-6 flex flex-col gap-3 w-fit min-w-48 ">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-mockup-text antialiased">
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
    const workouts = useStats((state) => state.stats?.recentWorkouts ?? []);

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
                    <div key={w._id}>
                        <div className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg hover:bg-[#f7f7f6] cursor-pointer transition-colors group">
                            {/* Icon */}
                            <div
                                className={`size-8.5 rounded-lg flex items-center justify-center flex-shrink-0 text-[15px] bg-gray-100`}
                            >
                                <IconCircleDotted className="h-4 w-4" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium text-mockup-text tracking-wide truncate">
                                    {w.name}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[11px] text-gray-400 font-mono">{w.noOfSets} sets</span>
                                    <span className="w-0.5 h-0.5 rounded-full bg-gray-300 shrink-0" />
                                </div>
                            </div>

                            {/* Time */}
                            <span className="text-[11px] text-gray-300 shrink-0 whitespace-nowrap">
                                {w.timeAgo + " ago"}
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
                            <ChartAreaInteractive />
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 px-5 h-screen lg:px-0">

                        <div className="bg-white shadow-standard h-auto w-full rounded-2xl p-5">
                            <Calendar size={"md"} className="bg-white" />
                        </div>
                        <div className="bg-white shadow-standard h-auto w-full rounded-2xl  ">
                            <PreviousWorkout />
                        </div>
                    </div>
                </div>
            </div>
        </SideBarLayout>
    );
};

export default DashboardPage;
