import { IconCopy, IconDots, IconDotsVertical, IconNotes, IconPencil, IconPencilPlus, IconTrash } from "@tabler/icons-react"
import SideBarLayout from "../components/layout/SideBar"
import Button from "../components/ui/Button"
import { useCallback, useEffect, useState } from "react";
import { SimpleEditor } from "../components/tiptap-templates/simple/simple-editor";
import BottomSheet from "@/components/ui/BottomSheet";
import axios from "@/utils/axios.js";

const allLogs = [
    {
        _id: "log_001_abc123",
        Owner: "trainer@fitness.io",
        content: "Workout session started — Push Day (Chest, Shoulders, Triceps)",
        name: "Session Start",
        createdAt: new Date("2024-04-01T06:00:00.000Z"),
        updatedAt: new Date("2024-04-01T06:00:00.000Z"),
    },
    {
        _id: "log_002_def456",
        Owner: "user_7729@fitness.io",
        content: "Bench Press — 80kg x 8 reps x 3 sets completed",
        name: "Exercise Log",
        createdAt: new Date("2024-04-02T06:30:00.000Z"),
        updatedAt: new Date("2024-04-02T06:35:00.000Z"),
    },
    {
        _id: "log_003_ghi789",
        Owner: "user_7729@fitness.io",
        content: "Workout duration exceeded 90 mins — consider reducing volume",
        name: "Performance Warning",
        createdAt: new Date("2024-04-03T07:45:00.000Z"),
        updatedAt: new Date("2024-04-03T08:00:00.000Z"),
    },
    {
        _id: "log_004_jkl012",
        Owner: "user_7729@fitness.io",
        content: "Bodyweight recorded — 72.5kg",
        name: "Weight Log",
        createdAt: new Date("2024-04-05T06:10:00.000Z"),
        updatedAt: new Date("2024-04-05T06:10:00.000Z"),
    },
    {
        _id: "log_005_mno345",
        Owner: "trainer@fitness.io",
        content: "Workout session completed — total calories burned: 540 kcal",
        name: "Session Complete",
        createdAt: new Date("2024-04-06T07:15:00.000Z"),
        updatedAt: new Date("2024-04-06T07:20:00.000Z"),
    },
];

const Popup = () => {
    return (
        <ul className=" absolute top-10 right-0 z-10 w-50 bg-neutral-50 text-neutral-500 flex flex-col gap-5 border border-line-color p-5 shadow-md  rounded-xl">
            <li className="flex ">
                <span>
                    <IconPencil size={24} />
                </span>
                <h3 className="ml-3"> Edit Log</h3>
            </li>
            <li className="flex ">
                <span>
                    <IconCopy size={24} />
                </span>
                <h3 className="ml-3"> Duplicate Log</h3>

            </li>
            <li className="flex ">
                <span>
                    <IconTrash size={24} />
                </span>
                <h3 className="ml-3"> Delete Log</h3>

            </li>
        </ul>
    )
}

const Log = ({ log, ActiveLog, setActiveLog }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`h-auto px-2.5 py-2.5 w-full border border-line-color bg-neutral-50 flex justify-between text-neutral-500 rounded-xl cursor-pointer ${ActiveLog === log?._id ? " bg-neutral-100" : ""}`} >
            <IconNotes className="text-neutral-500" onClick={() => setActiveLog(p => p == null ? log._id : p == log?._id ? null : log._id)} />
            <h3 className="w-full ml-5 truncate text-neutral-700 text-base text-left" onClick={() => setActiveLog(p => p == null ? log._id : p == log?._id ? null : log._id)}>{log?.name || "Log title"} </h3>
            <div className="relative">
                <IconDotsVertical onClick={() => setIsOpen(!isOpen)} />
                {isOpen &&
                    <Popup />
                }
            </div>
        </div>
    )
}




const AllLogs = ({ ActiveLog, setActiveLog }) => {
    return (
        <div className="bg-neutral-50 w-full lg:w-180 shrink-0 relative h-screen overflow-auto mx-auto flex flex-col justify-start items-end gap-3 border-r border-line-color px-5 py-10">

            <Button className="hidden  lg:flex">
                Create
                <span><IconPencilPlus size={18} className="ml-2" /></span>
            </Button>
            <div className=" w-full h-auto flex flex-col justify-center items-center gap-3  lg:mt-15">
                {allLogs.map((log) => <Log key={log._id} log={log} ActiveLog={ActiveLog} setActiveLog={setActiveLog} />)
                }
            </div>
        </div>
    )
}

function debounce(fn, delay) {
    let id
    return (...args) => {
        clearTimeout(id)
        id = setTimeout(() => fn(...args), delay)
    }
}


const ShowLog = ({ log, isActive, setActiveLog, className = "" }) => {


    async function handleSaveLog(content) {
        try {
            console.log("content", content);
            const res = await axios.post(`/log/update/${log._id}`, { content });
            if (res.status === 200) {
                console.log("toast gets popped up");
            }
        } catch (err) {
            console.log("error")
        }
    }

    const handleUpdate = useCallback(debounce((newContent) => handleSaveLog(newContent), 3000), [log?.id]);

    return (
        <div>
            <div className={` h-screen flex-1 overflow-hidden ${isActive ? "flex" : "hidden"} relative hidden lg:flex`}>
                <div className={` flex-col gap-7 mt-20`}>
                    <SimpleEditor key={log?._id} content={log?.content} onUpdate={handleUpdate} />
                </div>
                <div className=" absolute top-5 right-1 flex  gap-4 w-45 justify-end items-center">
                    <button className={` bg-white text-near-black  h-10 w-10 p-2 rounded-full  justify-center items-center cursor-pointer font-semibold active:scale-98 transition-all hover:bg-gray-100 hover:text-gray-800`}>
                        <IconDots />
                    </button>
                </div>
            </div>
            {/* show logs in mobile as a bottom sheet*/}
            <BottomSheet onClose={() => setActiveLog(null)} className="lg:hidden" setOpen={setActiveLog} open={isActive}>
                <div className={` mt-20`}>
                    <SimpleEditor key={log?._id} content={log?.content} onUpdate={handleUpdate} />
                </div>
                <button className={` bg-gray-100 text-near-black  h-10 w-10 p-2 rounded-full  justify-center items-center cursor-pointer font-semibold active:scale-98 transition-all absolute top-15 right-5 hover:bg-gray-100 hover:text-gray-800`}>
                    <IconDots />
                </button>
            </BottomSheet>

        </div>
    )
}
const HomePageContent = () => {
    const [ActiveLog, setActiveLog] = useState(null);

    return (
        <div className="flex flex-col justify-start items-start h-screen w-full lg:flex-row">
            <AllLogs ActiveLog={ActiveLog} setActiveLog={setActiveLog} />
            {ActiveLog &&
                <>
                    <ShowLog
                        log={allLogs.find(log => log._id === ActiveLog)}
                        isActive={ActiveLog !== null}
                        setActiveLog={setActiveLog}
                    />
                </>
            }
        </div>
    )
}
const HomePage = () => {
    return (
        <SideBarLayout>
            <HomePageContent />
        </SideBarLayout>
    )
}

export default HomePage
