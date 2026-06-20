import Calendar from "../components/ui/Calender"
import SideBarLayout from "../components/layout/SideBar"
import { useAuth, useStats } from "../stores/user.store"
import ChartAreaInteractive from "@/components/dashboard/DashBoardChart"
import { Activity, TrendingDown, TrendingUp } from "lucide-react"
import {
    IconChartLine,
    IconCircleDotted,
    IconClipboardData,
    IconFlameFilled,
} from "@tabler/icons-react"


const Greetings = () => {
    const fullname = useAuth((state) => state.user?.fullname)
    return (
        <div className="flex cursor-default flex-col items-start justify-center gap-3 p-10 lg:my-10 lg:items-start lg:justify-start lg:p-0 lg:pl-10">
            <h1 className="font-heading text-left text-xl text-gray-700 antialiased dark:text-line-color">Welcome again {fullname}</h1>
            <p className="text-left text-sm text-neutral-500 subpixel-antialiased dark:text-gray-400">
                A surgical-grade interface for serious training. No bloat, no friction — just pure data to drive your
                physical evolution.
            </p>
        </div>
    )
}
const Cards = () => {
    const userStats = useStats((state) => state.stats)
    const stats = [
        {
            label: "Active Days",
            value: userStats?.totalActiveDays ?? "—",
            icon: Activity,
            trending: false,
            trendingValue: 12,
        },
        {
            label: "Current Streak",
            value: userStats?.consistencyStreak ?? "—",
            icon: IconFlameFilled,
            trending: true,
            trendingValue: 14,
        },
        {
            label: "Total PRs",
            value: userStats?.totalPrs ?? "—",
            icon: IconChartLine,
            trending: true,
            trendingValue: 17,
        },
        {
            label: "Total Workouts",
            value: userStats?.totalWorkouts ?? "—",
            icon: IconClipboardData,
            trending: false,
            trendingValue: 12,
        },
    ]

    return (
        <div className="no-scrollbar grid h-auto w-full cursor-default grid-cols-2 items-center justify-center gap-3 overflow-hidden py-4 md:w-auto md:grid-cols-4 md:px-0">
            {stats.map((stat, index) => {
                let Icon = stat.icon
                return (
                    <div
                        key={index}
                        className="bg-card flex w-full min-w-43 max-w-48 flex-col gap-3 rounded-xl p-6 border border-line-color dark:bg-neutral-900 dark:text-line-color dark:border-gray-800"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-mockup-text text-xs font-medium tracking-wide uppercase antialiased dark:text-line-color">
                                {stat.label}
                            </p>
                            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg dark:bg-line-color">
                                <Icon className="text-muted-foreground h-4 w-4 dark:text-near-black" />
                            </div>
                        </div>

                        <div className="flex items-baseline gap-1 antialiased">{stat.value}</div>

                        <div className="flex items-center gap-1.5">
                            {stat.trending ? (
                                <span className="flex items-center gap-0.5 text-xs text-green-500 antialiased">
                                    <TrendingUp className="h-3 w-3" />
                                    {stat.trendingValue}
                                </span>
                            ) : (
                                <span className="flex items-center gap-0.5 text-xs text-red-500 antialiased">
                                    <TrendingDown className="h-3 w-3" />
                                    {stat.trendingValue}
                                </span>
                            )}
                            <span className="text-muted-foreground text-xs antialiased dark:text-gray-400">vs last week</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
const PreviousWorkout = () => {
    const workouts = useStats((state) => state.stats?.recentWorkouts ?? [])

    return (
        <div className="w-full rounded-xl bg-white p-5 dark:bg-neutral-900 dark:text-line-color">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <span className="text-mockup-text text-[11px] font-semibold tracking-widest uppercase dark:text-line-color">
                    Recent Workouts
                </span>
            </div>

            {/* List */}
            <div className="divide-line-color flex flex-col gap-0.5 divide-y dark:divide-gray-800">
                {workouts?.length ?
                    workouts.map((w) => (
                        <div key={w._id}>
                            <div className="group flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-[#f7f7f6] dark:hover:bg-neutral-800">
                                {/* Icon */}
                                <div
                                    className={`flex size-8.5 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[15px] dark:bg-line-color dark:text-near-black`}
                                >
                                    <IconCircleDotted className="h-4 w-4" />
                                </div>

                                {/* Info */}
                                <div className="min-w-0 flex-1">
                                    <p className="text-mockup-text truncate text-[13px] font-medium tracking-wide dark:text-line-color">
                                        {w.name}
                                    </p>
                                    <div className="mt-0.5 flex items-center gap-1.5">
                                        <span className="font-mono text-[11px] text-gray-400 dark:text-gray-400">{w.noOfSets} sets</span>
                                        <span className="h-0.5 w-0.5 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                                    </div>
                                </div>

                                {/* Time */}
                                <span className="shrink-0 text-[11px] whitespace-nowrap text-gray-300 dark:text-gray-500">
                                    {w?.timeAgo + " ago"}
                                </span>
                            </div>
                        </div>
                    )) : (
                        <div className="my-5 text-center text-sm text-gray-500 antialiased dark:text-gray-400">
                            No recents workouts
                        </div>
                    )}
            </div>
        </div>
    )
}
const DashboardPage = () => {
    return (
        <SideBarLayout>
            <div className="no-scrollbar transition-scroll flex h-dvh flex-col overflow-auto scroll-smooth pb-5 duration-300 ease-in-out dark:bg-near-black">
                <Greetings />
                <div className="flex flex-col gap-3 lg:flex-row">
                    <div className="no-scrollbar flex h-240 flex-col gap-6 overflow-hidden px-5 pb-10 md:h-[80vh] lg:h-screen lg:pl-10">
                        <Cards />
                        <div className="h-auto w-full rounded-2xl bg-neutral-500 md:h-80 dark:bg-neutral-800">
                            <ChartAreaInteractive />
                        </div>
                    </div>
                    <div className="flex h-screen flex-col gap-10 px-5 md:flex-row md:items-start lg:flex-col lg:px-0">
                        <div className="w-full shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 md:w-80 lg:w-120 dark:border-neutral-800 dark:bg-neutral-800 dark:text-line-color">
                            <Calendar size="md" className="w-full bg-white  rounded-2xl p-2 md:w-auto lg:w-full dark:bg-neutral-800 dark:text-line-color "/>
                        </div>
                        <div className="h-auto w-full rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-near-black dark:">
                            <PreviousWorkout />
                        </div>
                    </div>
                </div>
            </div>
        </SideBarLayout>
    )
}

export default DashboardPage
