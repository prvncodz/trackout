import { useState } from "react";
import { Calendar } from "./Cncalendar";
import { useAuth } from "@/stores/user.store";

const CalenderComponent = ({ className = "", size = "md", ...props }) => {
    const ActiveDates = [];

    return (
        <div
            className={`border border-line-color/70 flex shrink-0 flex-col items-start justify-center gap-4 rounded-2xl  overflow-hidden bg-white p-5 size-auto shadow-standard  ${className}`}
            {...props}
        >
            {/* <h2 */}
            {/*     className={`text-mockup-text flex items-center justify-center  text-xl font-bold tracking-tight cursor-default   ${size === "md" ? "text-[0.98rem] mt-3 lg:mt-5 lg:ml-5 font-normal" : size === "lg" ? "text-[1.1rem] mt-3 lg:mt-5 lg:ml-5" : "text-[0.9rem] mt-3 lg:mt-5 lg:ml-5"}`} */}
            {/* > */}
            {/*     CONSISTENCY */}
            {/* </h2> */}
            <div className="flex h-auto w-full items-center justify-center">
                <Calendar
                    mode="single"
                    disabled={ActiveDates}
                    className="shadow-standard flex w-full rounded-lg bg-none"
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
