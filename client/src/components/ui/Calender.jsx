import { useState } from "react";
import { Calendar } from "./Cncalendar";
import { useAuth } from "@/stores/user.store";

const CalenderComponent = ({ ...props }) => {
    const ActiveDates = useAuth(s => s.user.activeDates);

    return (
        <div
            className={`flex  flex-col items-center justify-center overflow-hidden rounded-2xl p-5 size-auto shadow-standard`}
            {...props}
        >
            <div className="flex items-center justify-center">
                <Calendar
                    mode="single"
                    disabled={ActiveDates}
                    className={`flex w-auto rounded-lg justify-center items-center`}
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
