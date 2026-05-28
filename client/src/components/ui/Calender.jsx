import { useEffect, useState } from "react";
import { Calendar } from "./Cncalendar";
import { useAuth } from "@/stores/user.store";

const CalenderComponent = ({ ...props }) => {
    const ActiveDates = useAuth(s => s.activeDates)
    console.log(ActiveDates)
    ActiveDates.map(date => console.log(typeof date))

    return (
        <div
            className={`flex  flex-col items-center justify-center overflow-hidden rounded-2xl p-5 size-auto shadow-standard`}
            {...props}
        >
            <div className="flex items-center justify-center shadow-none">
                <Calendar
                    mode="single"
                    disabled={ActiveDates}
                    className={`w-full bg-neutral-50 shadow-none`}
                    modifiers={{
                        active: ActiveDates,
                    }}
                    {...props}
                />
            </div>
        </div>
    );
};

export default CalenderComponent;
