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
        <div className="w-full flex-1 max-h-screen h-screen p-5">
            <div className="">

            </div>
        </div>
    );
}
