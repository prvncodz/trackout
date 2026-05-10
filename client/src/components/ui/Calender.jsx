import { useState } from "react";
import { Calendar } from "./Cncalendar";
import { useAuth } from "@/stores/user.store";

const CalenderComponent = ({ className = "", size = "lg", ...props }) => {
    const ActiveDates = [];

    return (
        <div
            className={`flex  flex-col items-start justify-center  rounded-2xl  overflow-hidden p-5 size-auto shadow-standard  ${className}`}
            {...props}
        >
            <div className="flex items-center justify-center">
                <Calendar
                    mode="single"
                    disabled={ActiveDates}
                    className={`flex w-auto rounded-lg bg-none ${className}`}
                    modifiers={{
                        active: ActiveDates,
                    }}
                    size={size}
                />
            </div>
        </div>
    );
};

export default CalenderComponent;
