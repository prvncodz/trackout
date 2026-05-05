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
                <img src={user?.avatar} />
            </div>
            <div>
                <h2 className="text-center text-xl font-semibold text-neutral-700 lg:text-left">
                    {user.fullname ?? "User fullname"}
                </h2>
                <p className="text-center text-base text-neutral-500 lg:text-left">
                    {user.email ?? "example@abc.com"}
                </p>
                <div className="no-scrollbar mt-8 flex w-screen gap-3 overflow-auto scroll-smooth px-4 py-2 lg:w-auto lg:px-0">
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
            </div>
            <Button className="relative w-full lg:absolute lg:top-0 lg:right-25 lg:w-auto">
                Edit Profile
            </Button>
        </div>
    );
}
