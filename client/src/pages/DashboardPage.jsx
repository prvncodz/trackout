import SideBarLayout from "../components/layout/SideBar";
import { useAuth } from "@/stores/user.store";

const Greetings = () => {
    const fullname = useAuth((s) => s.user.fullname);
    return (
        <div className="flex flex-col justify-center items-center gap-3 p-10 lg:p-0 lg:my-10 lg:justify-start lg:items-start">
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
    ];

    return (
        <div className="no-scrollbar mt-8 flex w-screen gap-3 overflow-auto scroll-smooth px-4 py-2 p-10 lg:w-auto lg:px-0">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="shadow-standard border-line-color inset-0 flex h-30 w-40 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border bg-gray-50"
                >
                    <h3 className="text-sm text-gray-800">{stat.label}</h3>
                    <p className="text-sm text-gray-600 font-semibold">{stat.value}</p>
                </div>
            ))}
        </div>

    )
}

const DashboardPage = () => {
    return (
        <div>
            <SideBarLayout>
                <div className="flex flex-col h-screen lg:pl-20">
                    <Greetings />
                    <Cards />
                </div>
            </SideBarLayout>
        </div>
    );
};

export default DashboardPage;
