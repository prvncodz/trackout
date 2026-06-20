import { Calendar } from "./Cncalendar"
import { useAuth } from "@/stores/user.store"
import { cn } from "@/lib/utils"

const CalenderComponent = ({ size = "lg", className="", ...props }) => {
    const ActiveDates = useAuth((s) => s.activeDates)

    return (
        <div
            className={cn(
                className,
                "flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white md:w-auto dark:bg-neutral-900 dark:text-line-color dark:shadow-none"
            )}
            {...props}
        >
            <div className="flex items-center justify-center shadow-none w-full md:w-auto">
                <Calendar
                    mode="single"
                    disabled={ActiveDates}
                    className={`w-full bg-white shadow-none dark:bg-neutral-900 dark:text-line-color ${size === "lg" ? "[--cell-radius:--spacing(10)] md:[--cell-size:--spacing(10)] lg:[--cell-size:--spacing(12)]" : " [--cell-radius:--spacing(9)] md:[--cell-size:--spacing(10)] lg:[--cell-size:--spacing(12)]"}`}
                    modifiers={{
                        active: ActiveDates,
                    }}
                    {...props}
                />
            </div>
        </div>
    )
}

export default CalenderComponent
