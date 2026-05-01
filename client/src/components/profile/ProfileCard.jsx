import Button from "@/components/ui/Button.jsx";
import { useAuth } from "@/stores/user.store.js";
import { motion } from "motion/react"


export default function ProfileCard() {
    const { user } = useAuth();

    const stats = [
        { label: "Height", value: user.height ? `${user.height}cm` : "—" },
        { label: "Weight", value: user.weight ? `${user.weight}kg` : "—" },
        { label: "Workouts", value: user.totalWorkouts ?? "—" },
        { label: "Workout Streak", value: user.streak ? `${user.streak} Days` : "—" },
    ];

    return (
        <div className="w-full h-auto flex flex-col justify-start gap-10 items-center relative lg:flex-row  lg:mt-10 lg:mx-10">
            <div className="size-60 bg-gray-100">
                <img src={user?.avatar} />
            </div>
            <div>
                <h2 className="text-xl text-neutral-700 font-semibold text-center lg:text-left">{user.fullname ?? "User fullname"}</h2>
                <p className="text-base text-neutral-500 text-center lg:text-left">{user.email ?? "example@abc.com"}</p>
                <div className="flex gap-3 mt-8 w-screen overflow-auto px-4 py-2 lg:w-auto no-scrollbar ">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            drag="x"

                            className="flex flex-col justify-center shrink-0 items-center h-30 w-40 gap-3 bg-gray-50 rounded-2xl shadow-sm border inset-0 border-line-color ">
                            <h3 className="text-base text-gray-700">{stat.label}</h3>
                            <p className="text-base text-gray-600">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Button className="w-full relative lg:w-auto lg:absolute lg:right-25 lg:top-0 ">
                Edit Profile
            </Button>
        </div>
    );
}
