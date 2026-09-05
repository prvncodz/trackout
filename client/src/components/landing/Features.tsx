import { IconTreadmill } from "@tabler/icons-react"
import { Calendar, Dumbbell, NotebookPen, TrendingUp } from "lucide-react"

const Features = () => {
    return (
        <section
            id="features"
            className="selection:bg-near-black selection:text-btn-color my-16 w-full px-5 md:my-24 lg:my-32 lg:px-0"
        >
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                <h2 className="text-near-black mb-3 text-center text-xl font-bold md:text-2xl ">Train Smarter. Stay Consistent</h2>
                <p className="max-w-xl text-sm leading-6 text-line-color0 md:text-base">
                    Everything you want, nothing you don&apos;t.
                </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-6">
                <FeaturesCard
                    Logo={<NotebookPen size={26} />}
                    title={"Log in seconds"}
                    description={
                        "Add exercises, sets, reps, and weight without fighting the interface during a workout."
                    }
                    className={"lg:col-span-2"}
                />
                <FeaturesCard
                    Logo={<TrendingUp size={26} />}
                    title={"Read your progress"}
                    description={"Spot strength trends and training volume changes with clean, practical feedback."}
                    className={"lg:col-span-2"}
                />
                <FeaturesCard
                    Logo={<Calendar size={26} />}
                    title={"Stay Consistent"}
                    description={
                        "Keep routines visible, build repeatable habits, and make every completed session count."
                    }
                    className={"lg:col-span-2"}
                />
                <FeaturesCard
                    Logo={<IconTreadmill size={27} />}
                    title={"Move through sessions"}
                    description={"A compact flow helps you start, update, and finish workouts with less tapping."}
                    className={"lg:col-span-3"}
                />
                <FeaturesCard
                    Logo={<Dumbbell size={27} />}
                    title={"Designed around the set, not the spreadsheet."}
                    description={" Trackout keeps the important numbers close, so you can focus on the next set instead of managing a complicated dashboard."}
                    className={"lg:col-span-3"}
                />

            </div>
        </section>
    )
}

interface FeatureCardProps {
    Logo: React.ReactNode;
    title: string;
    description: string;
    className: string;
}


const FeaturesCard = ({ Logo, title, description, className }: FeatureCardProps) => {
    return (
        <div
            className={`border-line-color flex min-h-56 flex-col items-start rounded-lg border bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${className}`}
        >
            <div className="text-near-black flex h-11 w-11 items-center justify-center rounded-md bg-gray-100">
                {Logo}
            </div>
            <h2 className="text-near-black mt-8 text-lg font-bold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-line-color0">{description}</p>
        </div>
    )
}

export default Features
