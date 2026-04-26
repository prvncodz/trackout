import { IconCopy, IconDots, IconDotsVertical, IconNotes, IconPencil, IconPencilPlus, IconTrash } from "@tabler/icons-react"
import SideBarLayout from "../components/layout/SideBar"
import Button from "../components/ui/Button"
import { useState } from "react";

const allLogs = [
    {
        _id: "log_001_abc123",
        Owner: "admin@system.io",
        content: "Server initialized successfully on port 3000",
        name: "System Boot",
        createdAt: new Date("2024-04-01T08:00:00.000Z"),
        updatedAt: new Date("2024-04-01T08:00:00.000Z"),
    },
    {
        _id: "log_002_def456",
        Owner: "security@system.io",
        content: "Failed login attempt from IP 192.168.1.42",
        name: "Auth Failure",
        createdAt: new Date("2024-04-02T10:15:30.000Z"),
        updatedAt: new Date("2024-04-02T10:16:00.000Z"),
    },
    {
        _id: "log_003_ghi789",
        Owner: "db@system.io",
        content: "Query on users collection took 3200ms — needs index",
        name: "DB Query Slow",
        createdAt: new Date("2024-04-03T14:22:10.000Z"),
        updatedAt: new Date("2024-04-04T09:00:00.000Z"),
    },
    {
        _id: "log_004_jkl012",
        Owner: "user_7729@app.io",
        content: "User uploaded profile_photo.png — 2.4MB",
        name: "File Upload",
        createdAt: new Date("2024-04-05T17:45:00.000Z"),
        updatedAt: new Date("2024-04-05T17:45:00.000Z"),
    },
    {
        _id: "log_005_mno345",
        Owner: "billing@system.io",
        content: "Stripe payment of $49.99 confirmed — txn_8821xz",
        name: "Payment Processed",
        createdAt: new Date("2024-04-06T20:10:05.000Z"),
        updatedAt: new Date("2024-04-06T20:12:00.000Z"),
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
        <div className={`h-auto px-3 py-3 w-full border border-line-color bg-neutral-50 flex justify-between text-neutral-500 rounded-xl cursor-pointer ${ActiveLog === log?._id ? " bg-neutral-100" : ""}`} >
            <IconNotes className="text-neutral-500" onClick={() => setActiveLog(log?._id)} />
            <h3 className="w-full ml-5 truncate text-neutral-700" onClick={() => setActiveLog(p => p == null ? log._id : null)}>{log?.name || "Log title"} </h3>
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
        <div className="bg-neutral-50 w-220 shrink-0 relative h-screen overflow-auto mx-auto flex flex-col justify-start items-end gap-3 border-r border-line-color px-5 py-10">
            <Button className="hidden  lg:flex">
                Create
                <span><IconPencilPlus size={18} className="ml-2" /></span>
            </Button>
            <div className=" w-full h-auto flex flex-col justify-center items-center gap-3 mt-20">
                {allLogs.map((log) => <Log key={log._id} log={log} ActiveLog={ActiveLog} setActiveLog={setActiveLog} />)
                }
            </div>
        </div>
    )
}

const ShowLog = ({ log, isActive }) => {
    return (
        <div className=" h-screen flex flex-1 overflow-hidden">
            <button className={` ${isActive ? "flex" : "hidden"} bg-neutral-100 text-near-black  h-10 w-auto p-2 px-4 rounded-md  justify-center items-center cursor-pointer font-semibold active:scale-98 transition-all absolute top-5 right-5 hover:bg-gray-100 hover:text-gray-800`}>
                <IconDots />
            </button>
            <div className="flex flex-col gap-7 mt-20 px-4">
                <h1>{log?.name}</h1>
                <p>{log?.content}</p>
            </div>
        </div>
    )
}

const HomePageContent = () => {
    const [ActiveLog, setActiveLog] = useState(null);
    return (
        <div className="flex justify-start items-start h-screen w-full">
            <AllLogs ActiveLog={ActiveLog} setActiveLog={setActiveLog} />
            <ShowLog
                log={allLogs.find(log => log._id === ActiveLog)}
                isActive={ActiveLog !== null}
            />
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
