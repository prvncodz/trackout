import Calendar from "../components/ui/Calender.jsx";
import SideBarLayout from "../components/layout/SideBar";
import { useAuth } from "@/stores/user.store";

const Greetings = () => {
    const fullname = useAuth((s) => s.user.fullname);
    return (
        <div className="flex flex-col justify-center items-center gap-3 p-10 lg:p-0 lg:my-10 lg:justify-start lg:items-start lg:pl-20">
            <h1 className="text-xl text-gray-700 text-center lg:text-left">Welcome again {fullname}</h1>
            <p className="text-neutral-500 text-sm text-center lg:text-left ">A surgical-grade interface for serious training. No bloat, no friction — just pure data to drive your physical evolution.</p>
        </div>
    );
}
const Cards = () => {
    const user = useAuth((s) => s.user);
    const stats = [
        { label: "Total Volume", value: user.height ? `${user.height}cm` : "—" },
        { label: "Current streak", value: user.weight ? `${user.weight}kg` : "—" },
        { label: "Total PRs", value: user.totalWorkouts ?? "—" },
        { label: "Total Workouts", value: user.totalWorkouts ?? "—" },
    ];

    return (
        <div className="no-scrollbar flex w-screen gap-5 overflow-x-auto overflow-y-hidden scroll-smooth px-4 py-4 p-10 lg:w-auto lg:px-0 ">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="shadow-standard border-line-color inset-0 flex h-40 w-50 rink-0 flex-col items-center justify-start gap-8 rounded-2xl border bg-gray-50"
                >
                    <h3 className="text-base text-gray-500 mt-10">{stat.label}</h3>
                    <p className="text-base text-gray-600 font-semibold">{stat.value}</p>
                </div>
            ))}
        </div>

    )
}

const DashboardPage = () => {
    return (
        <div>
            <SideBarLayout>
                <div className="flex flex-col overflow-auto no-scrollbar pb-25">
                    <Greetings />
                    <div className="flex gap-3 lg:flex-col">
                        <div className="flex flex-col h-screen overflow-auto gap-6 lg:pl-15 ">
                            <Cards />
                            <div className="bg-neutral-50 border border-line-color h-120 rounded-2xl  "></div>
                        </div>
                        <div className="flex flex-col gap-10 h-screen px-5">
                            <Calendar size={"sm"} />
                            <div className="bg-neutral-50 border border-line-color h-120 w-full rounded-2xl  "></div>
                        </div>
                    </div>
                </div>
            </SideBarLayout>
        </div>
    );
};

export default DashboardPage;
