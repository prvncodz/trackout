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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-screen mx-auto m-5">
            {/* Top row: avatar + info + button */}
            <div className="flex items-start justify-between gap-4">
                {/* Left: avatar + name + email */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                                {user.name?.charAt(0) ?? "U"}
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                            {user.name ?? "Unknown User"}
                        </h2>
                        {user.email && (
                            <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
                        )}
                    </div>
                </div>

                {/* Edit button — hidden on mobile, shown on sm+ */}
                <div className="hidden sm:block flex-shrink-0">
                    <Button variant="outline" size="sm">
                        Edit Profile
                    </Button>
                </div>
            </div>

            {/* Edit button on mobile — full width below avatar row */}
            <div className="mt-4 sm:hidden">
                <Button variant="outline" size="sm" className="w-full">
                    Edit Profile
                </Button>
            </div>

            {/* Stats row */}
            <div className="mt-5 grid grid-cols-4 divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                {stats.map(({ label, value }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center py-3 px-1 sm:px-3 bg-gray-50"
                    >
                        <span className="text-xs text-gray-400 text-center leading-tight">
                            {label}
                        </span>
                        <span className="mt-1 text-sm sm:text-base font-semibold text-gray-800">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
