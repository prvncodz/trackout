import Button from "@/components/ui/Button.jsx";
import { useAuth } from "@/stores/user.store.js";

export default function ProfileCard() {
    const { user } = useAuth();

    const stats = [
        { label: "Height", value: user.height ? `${user.height}cm` : "—" },
        { label: "Weight", value: user.weight ? `${user.weight}kg` : "—" },
        { label: "Workouts", value: user.totalWorkouts ?? "—" },
        { label: "Workout Streak", value: user.streak ? `${user.streak} Days` : "—" },
    ];

    return (
        <div className="w-full h-auto flex flex-col justify-center gap-10 items-center relative lg:flex-row  lg:mt-10">
            <div className="size-60 bg-gray-100">
                <img src={user?.avatar} />
            </div>
            <div>
                <h2 className="text-xl text-neutral-700 font-semibold text-center lg:text-left">{user.fullname ?? "User fullname"}</h2>
                <p className="text-base text-neutral-500 text-center lg:text-left">{user.email ?? "example@abc.com"}</p>
                <div className="flex gap-3 mt-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col justify-center items-center h-30 w-40 gap-3 bg-gray-50 rounded-2xl shadow-sm ">
                            <h3 className="text-base text-gray-700">{stat.label}</h3>
                            <p className="text-base text-gray-600">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Button className="w-full relative lg:w-auto lg:absolute lg:right-35 lg:top-0 ">
                Edit Profile
            </Button>
        </div>
    );
}
