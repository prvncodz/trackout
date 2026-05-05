import { Calendar } from "./Cncalendar";

const CalenderComponent = ({ className = "", size = "md", ...props }) => {
    return (
        <div
            className={`border-line-color flex shrink-0 flex-col items-start justify-center gap-4 rounded-2xl border overflow-hidden bg-neutral-50 p-5  ${size === "md" ? "size-110" : size === "lg" ? "size-auto" : "size-100"} ${className}`}
            {...props}
        >
            <h2
                className={`text-mockup-text flex items-center justify-center text-left text-xl font-semibold  ${size === "md" ? "text-2xl mt-5" : size === "lg" ? "text-3xl mt-6 ml-5" : "text-2xl"}`}
            >
                Consistency
            </h2>
            <div className="flex h-auto w-full items-center justify-center">
                <Calendar
                    mode="single"
                    className="shadow-standard flex w-full rounded-lg bg-neutral-50"
                />
            </div>
        </div>
    );
};

export default CalenderComponent;
