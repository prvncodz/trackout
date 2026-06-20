import { Calendar } from "./Cncalendar"
import { useAuth } from "@/stores/user.store"

const CalenderComponent = ({ size = "lg", ...props }) => {
    const ActiveDates = useAuth((s) => s.activeDates)

    return (
        <div
            className={`shadow-sm shadow-gray-800 flex  flex-col items-center justify-center overflow-hidden rounded-2xl p-5 w-full md:w-auto border dark:bg-near-black dark:text-line-color dark:shadow-gray-50`}
            {...props}
        >
            <div className="flex items-center justify-center shadow-none w-full md:w-auto">
                <Calendar
                    mode="single"
                    disabled={ActiveDates}
                    className={`w-full  bg-neutral-50 shadow-none ${size === "lg" ? "[--cell-radius:--spacing(10)] md:[--cell-size:--spacing(10)] lg:[--cell-size:--spacing(12)]" : " [--cell-radius:--spacing(9)] md:[--cell-size:--spacing(10)] lg:[--cell-size:--spacing(12)]"}`}
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
