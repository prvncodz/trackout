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

            <h1 className="text-xl text-gray-700 text-left ">Welcome again {fullname}</h1>
            <p className="text-neutral-500 text-sm text-left ">A surgical-grade interface for serious training. No bloat, no friction — just pure data to drive your physical evolution.</p>
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
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {stat.label}
                        </p>
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="flex items-baseline gap-1">
                        {stat.value}
                    </div>

                    <div className="flex items-center gap-1.5">
                        {stat.trending ?
                            <span className="text-xs text-green-500 flex items-center gap-0.5">
                                <TrendingUp className="w-3 h-3" />
                                {stat.trendingValue}
                            </span>
                            :
                            <span className="text-xs text-red-500 flex items-center gap-0.5">
                                <TrendingDown className="w-3 h-3" />
                                {stat.trendingValue}
                            </span>
                        }
                        <span className="text-xs text-muted-foreground">vs last week</span>
                    </div>
                </div>
            })}
        </div>

    )
}

const DashboardPage = () => {
    return (
        <SideBarLayout>
            <div className="flex flex-col overflow-auto no-scrollbar h-screen pb-25">
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
                        <div className="bg-neutral-50 border border-line-color h-120 w-full rounded-2xl  "></div>
                    </div>
                </div>
            </div>
        </SideBarLayout>
    );
};

export default DashboardPage;
