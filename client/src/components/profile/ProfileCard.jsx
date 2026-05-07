import Button from "@/components/ui/Button.jsx";
import { useAuth } from "@/stores/user.store.js";
import { motion } from "motion/react";

export default function ProfileCard() {
    const { user } = useAuth();

    const stats = [
        { label: "Height", value: user.height ? `${user.height}cm` : "—" },
        { label: "Weight", value: user.weight ? `${user.weight}kg` : "—" },
        { label: "Workouts", value: user.totalWorkouts ?? "—" },
        {
            label: "Workout Streak",
            value: user.streak ? `${user.streak} Days` : "—",
        },
    ];

    return (
        <div className="relative flex h-auto w-full flex-col items-center justify-start gap-10 lg:mt-10 lg:flex-row">
            <div className="shadow-standard size-60 bg-gray-100 rounded-2xl overflow-hidden">
                <img src={user?.avatar} className="cursor-default"/>
            </div>
            <div>
                <h2 className="text-center text-xl font-semibold text-neutral-700 cursor-default lg:text-left">
                    {user.fullname ?? "User fullname"}
                </h2>
                <p className="text-center text-base text-neutral-500 cursor-default  lg:text-left">
                    {user.email ?? "example@abc.com"}
                </p>
                <div className="no-scrollbar mt-8 flex w-screen gap-3 overflow-auto scroll-smooth px-4 py-2 lg:w-auto lg:px-0">
                    {stats.map((stat, index) => (
                        <div className="bg-gray-50 border border-line-color/50 rounded-xl p-6 flex flex-col gap-3 w-fit min-w-[200px] ">
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-default">
                                    {stat.label}
                                </p>

                            </div>

                            <div className="flex items-baseline gap-1 cursor-default">
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Button className="relative w-full lg:absolute lg:top-0 lg:right-25 lg:w-auto">
                Edit Profile
            </Button>
        </div>
    );
}
