
const Workflow = () => {
    return (
        <section id="how-it-works" className="my-20 md:my-40">
            <h2 className="text-near-black mb-3 text-center text-xl font-bold md:text-2xl ">Application Workflow</h2>
            <div className="relative my-15 flex w-full flex-col justify-between md:flex-row">
                <WorkflowCard
                    no={1}
                    title={"Initialize Session"}
                    description={"Select your program or start an empty log. Trackout your routine instantly."}
                />
                <WorkflowCard
                    no={2}
                    title={"Log Your Sets"}
                    description={"Add exercises, sets, reps, and weight as you go. Fast input, zero friction."}
                />
                <WorkflowCard
                    no={3}
                    title={"Track Your Gains"}
                    description={"See your volume, streaks, and PRs update in real time after every session."}
                />
            </div>
        </section>
    )
}

interface WorkflowCardProps {
    no: number;
    title: string;
    description: string;
}

const WorkflowCard = ({ no, title, description }: WorkflowCardProps) => {
    return (
        <div className="flex-start my-4 flex w-auto items-center justify-center px-8 text-center md:flex-col">
            <div className="text-near-black flex h-15 w-15 items-center justify-center rounded-full bg-gray-100 p-2 font-serif font-bold">
                {no}
            </div>
            <div className="ml-5 flex flex-col">
                <h2 className="text-near-black mt-5 text-left text-lg font-bold md:text-center">{title}</h2>
                <p className="mt-1 w-full max-w-80 text-left text-sm text-neutral-600 md:text-center">{description}</p>
            </div>
        </div>
    )
}
export default Workflow
