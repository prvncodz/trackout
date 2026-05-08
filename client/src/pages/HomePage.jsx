import {
    IconCheck,
    IconCopy,
    IconDots,
    IconDotsVertical,
    IconNotebook,
    IconNotes,
    IconPencil,
    IconPencilPlus,
    IconTrash,
    IconTrophy,
} from "@tabler/icons-react";
import SideBarLayout from "../components/layout/SideBar";
import Button from "../components/ui/Button";
import { useCallback, useEffect, useState } from "react";
import BottomSheet from "@/components/ui/BottomSheet";
import axios from "@/utils/axios.js";

const allLogs = [
    {
        _id: "log_001",
        owner: "u_123",
        name: "Push Day — Chest & Triceps",
        createdAt: "2024-09-02T07:30:00.000Z",
        updatedAt: "2024-09-02T08:45:00.000Z",
        content: `<h2>Push Day — Chest &amp; Triceps</h2><p>Felt strong today. Slept 8 hours and nutrition was on point. PR on bench press.</p><h3>Bench Press</h3><ul><li>60kg x 12 (warm-up)</li><li>80kg x 8</li><li>90kg x 6</li><li>95kg x 4 <strong>(PR)</strong></li></ul><h3>Incline Dumbbell Press</h3><ul><li>30kg x 10</li><li>32kg x 8</li><li>32kg x 8</li></ul><h3>Cable Chest Fly</h3><ul><li>15kg x 15</li><li>15kg x 12</li><li>17.5kg x 10</li></ul><h3>Tricep Pushdown</h3><ul><li>20kg x 15</li><li>25kg x 12</li><li>25kg x 10</li></ul><h3>Overhead Tricep Extension</h3><ul><li>22.5kg x 12</li><li>22.5kg x 10</li></ul><p><em>Notes: Left shoulder felt slightly tight on incline. Stretch more next time.</em></p>`,
    },
    {
        _id: "log_002",
        owner: "u_123",
        name: "Pull Day — Back & Biceps",
        createdAt: "2024-09-04T08:00:00.000Z",
        updatedAt: "2024-09-04T09:20:00.000Z",
        content: `<h2>Pull Day — Back &amp; Biceps</h2><p>Decent session. Lower back was a little stiff from deadlifts last week so kept it controlled.</p><h3>Deadlift</h3><ul><li>80kg x 5 (warm-up)</li><li>100kg x 5</li><li>110kg x 3</li><li>115kg x 3</li></ul><h3>Barbell Row</h3><ul><li>60kg x 10</li><li>70kg x 8</li><li>70kg x 8</li></ul><h3>Lat Pulldown</h3><ul><li>55kg x 12</li><li>60kg x 10</li><li>60kg x 8</li></ul><h3>Seated Cable Row</h3><ul><li>50kg x 12</li><li>55kg x 10</li><li>55kg x 10</li></ul><h3>Barbell Curl</h3><ul><li>30kg x 12</li><li>35kg x 8</li><li>35kg x 8</li></ul><h3>Hammer Curl</h3><ul><li>14kg x 12</li><li>14kg x 12</li></ul><p><em>Notes: Focus on mind-muscle connection on lat pulldown next session.</em></p>`,
    },
    {
        _id: "log_003",
        owner: "u_123",
        name: "Leg Day — Quads & Hamstrings",
        createdAt: "2024-09-06T09:00:00.000Z",
        updatedAt: "2024-09-06T10:30:00.000Z",
        content: `<h2>Leg Day — Quads &amp; Hamstrings</h2><p>Brutal session. Legs were shaking by the end. Exactly how it should be.</p><h3>Squat</h3><ul><li>60kg x 10 (warm-up)</li><li>90kg x 8</li><li>100kg x 6</li><li>105kg x 5</li><li>105kg x 4</li></ul><h3>Romanian Deadlift</h3><ul><li>70kg x 10</li><li>80kg x 8</li><li>80kg x 8</li></ul><h3>Leg Press</h3><ul><li>120kg x 15</li><li>140kg x 12</li><li>150kg x 10</li></ul><h3>Leg Curl</h3><ul><li>40kg x 12</li><li>45kg x 10</li><li>45kg x 10</li></ul><h3>Walking Lunges</h3><ul><li>20kg x 20 steps</li><li>20kg x 20 steps</li></ul><h3>Calf Raises</h3><ul><li>60kg x 20</li><li>60kg x 20</li><li>60kg x 20</li></ul><p><em>Notes: Knees tracked well. Depth is improving. Keep pushing.</em></p>`,
    },
    {
        _id: "log_004",
        owner: "u_123",
        name: "Shoulder & Abs Day",
        createdAt: "2024-09-08T07:00:00.000Z",
        updatedAt: "2024-09-08T08:10:00.000Z",
        content: `<h2>Shoulder &amp; Abs Day</h2><p>Clean session. Focused on form over weight. Shoulders are lagging so adding extra volume.</p><h3>Overhead Press (Barbell)</h3><ul><li>40kg x 10 (warm-up)</li><li>55kg x 8</li><li>60kg x 6</li><li>60kg x 5</li></ul><h3>Dumbbell Lateral Raise</h3><ul><li>10kg x 15</li><li>12kg x 12</li><li>12kg x 12</li><li>10kg x 15 (drop set)</li></ul><h3>Face Pulls</h3><ul><li>20kg x 15</li><li>20kg x 15</li><li>20kg x 15</li></ul><h3>Front Raise</h3><ul><li>10kg x 12</li><li>10kg x 12</li></ul><h3>Abs Circuit (3 rounds)</h3><ul><li>Hanging leg raises x 15</li><li>Cable crunch x 20</li><li>Plank — 60 seconds</li></ul><p><em>Notes: Lateral raises are the key. Don't skip them. Ever.</em></p>`,
    },
    {
        _id: "log_005",
        owner: "u_123",
        name: "Upper Body Hypertrophy",
        createdAt: "2024-09-10T08:30:00.000Z",
        updatedAt: "2024-09-10T10:00:00.000Z",
        content: `<h2>Upper Body Hypertrophy</h2><p>High volume day. Pump was insane. This is what consistent training feels like.</p><h3>Incline Bench Press</h3><ul><li>70kg x 10</li><li>75kg x 8</li><li>75kg x 8</li></ul><h3>Dumbbell Row (Single Arm)</h3><ul><li>36kg x 10 each</li><li>40kg x 8 each</li><li>40kg x 8 each</li></ul><h3>Chest Dips (Weighted)</h3><ul><li>+10kg x 12</li><li>+15kg x 10</li><li>+15kg x 8</li></ul><h3>Pull-ups (Weighted)</h3><ul><li>BW x 10</li><li>+5kg x 8</li><li>+5kg x 7</li></ul><h3>Pec Deck</h3><ul><li>50kg x 15</li><li>55kg x 12</li></ul><h3>EZ Bar Curl</h3><ul><li>35kg x 10</li><li>35kg x 10</li><li>35kg x 8</li></ul><p><em>Notes: Keep rest periods at 90 seconds max on hypertrophy work.</em></p>`,
    },
    {
        _id: "log_006",
        owner: "u_123",
        name: "Leg Day — Glutes & Posterior Chain",
        createdAt: "2024-09-12T09:30:00.000Z",
        updatedAt: "2024-09-12T10:45:00.000Z",
        content: `<h2>Leg Day — Glutes &amp; Posterior Chain</h2><p>Focused entirely on posterior chain today. Hip hinge pattern was dialed in.</p><h3>Sumo Deadlift</h3><ul><li>80kg x 5</li><li>100kg x 4</li><li>110kg x 3</li><li>120kg x 2</li></ul><h3>Hip Thrust (Barbell)</h3><ul><li>80kg x 15</li><li>100kg x 12</li><li>110kg x 10</li><li>110kg x 10</li></ul><h3>Bulgarian Split Squat</h3><ul><li>20kg x 10 each</li><li>24kg x 8 each</li><li>24kg x 8 each</li></ul><h3>Seated Leg Curl</h3><ul><li>45kg x 12</li><li>50kg x 10</li><li>50kg x 10</li></ul><h3>Glute Kickback (Cable)</h3><ul><li>15kg x 15 each</li><li>15kg x 15 each</li></ul><p><em>Notes: Hip thrusts are the GOAT for glute activation. Load them heavy.</em></p>`,
    },
    {
        _id: "log_007",
        owner: "u_123",
        name: "Full Body Strength",
        createdAt: "2024-09-14T07:00:00.000Z",
        updatedAt: "2024-09-14T08:30:00.000Z",
        content: `<h2>Full Body Strength</h2><p>Low rep, high intensity. CNS was fired up. Every set felt like a battle — good battle.</p><h3>Squat</h3><ul><li>100kg x 5</li><li>110kg x 3</li><li>115kg x 2</li></ul><h3>Bench Press</h3><ul><li>85kg x 5</li><li>90kg x 3</li><li>95kg x 2</li></ul><h3>Deadlift</h3><ul><li>110kg x 4</li><li>120kg x 3</li><li>125kg x 2</li></ul><h3>Overhead Press</h3><ul><li>55kg x 5</li><li>60kg x 3</li><li>62.5kg x 2</li></ul><h3>Weighted Pull-ups</h3><ul><li>+10kg x 5</li><li>+12.5kg x 4</li><li>+12.5kg x 3</li></ul><p><em>Notes: Strength is going up. Stay consistent. Don't overthink the programming.</em></p>`,
    },
    {
        _id: "log_008",
        owner: "u_123",
        name: "Active Recovery — Mobility & Core",
        createdAt: "2024-09-16T08:00:00.000Z",
        updatedAt: "2024-09-16T08:50:00.000Z",
        content: `<h2>Active Recovery — Mobility &amp; Core</h2><p>Body needed this. Not every day is a war. Some days you sharpen the blade.</p><h3>Foam Rolling (15 min)</h3><ul><li>IT band</li><li>Thoracic spine</li><li>Calves &amp; hamstrings</li></ul><h3>Hip Mobility Circuit (3 rounds)</h3><ul><li>90/90 stretch — 60 sec each side</li><li>Pigeon pose — 60 sec each side</li><li>World's greatest stretch — 10 reps each</li></ul><h3>Core Work</h3><ul><li>Dead bug — 3 x 10 each side</li><li>Pallof press — 3 x 12 each side</li><li>Ab wheel rollout — 3 x 10</li><li>Side plank — 3 x 45 sec each</li></ul><h3>Shoulder CARs</h3><ul><li>Controlled articular rotations — 2 x 5 each direction</li></ul><p><em>Notes: Hips are noticeably tighter on the left. Prioritize this every recovery day.</em></p>`,
    },
    {
        _id: "log_009",
        owner: "u_123",
        name: "Push Day — Dumbbell Focus",
        createdAt: "2024-09-18T09:00:00.000Z",
        updatedAt: "2024-09-18T10:15:00.000Z",
        content: `<h2>Push Day — Dumbbell Focus</h2><p>Switched to dumbbells today to fix muscle imbalances. Right side is clearly stronger. Need to fix this.</p><h3>Dumbbell Bench Press</h3><ul><li>28kg x 12</li><li>32kg x 10</li><li>34kg x 8</li><li>34kg x 8</li></ul><h3>Incline Dumbbell Fly</h3><ul><li>14kg x 15</li><li>16kg x 12</li><li>16kg x 12</li></ul><h3>Arnold Press</h3><ul><li>18kg x 12</li><li>20kg x 10</li><li>20kg x 10</li></ul><h3>Lateral Raise (Cable)</h3><ul><li>8kg x 15 each</li><li>8kg x 15 each</li><li>8kg x 15 each</li></ul><h3>Skull Crushers</h3><ul><li>30kg x 12</li><li>35kg x 10</li><li>35kg x 8</li></ul><h3>Tricep Dips (BW)</h3><ul><li>x 15</li><li>x 15</li><li>x 12</li></ul><p><em>Notes: Let the weaker side lead. Don't compensate with the stronger one.</em></p>`,
    },
    {
        _id: "log_010",
        owner: "u_123",
        name: "Pull Day — Deadlift Heavy",
        createdAt: "2024-09-20T07:30:00.000Z",
        updatedAt: "2024-09-20T09:00:00.000Z",
        content: `<h2>Pull Day — Deadlift Heavy</h2><p>Came in for one reason: pull heavy. Everything else was accessory. Mindset was locked.</p><h3>Conventional Deadlift</h3><ul><li>80kg x 5 (warm-up)</li><li>100kg x 3</li><li>115kg x 2</li><li>125kg x 1</li><li>130kg x 1 <strong>(PR)</strong></li></ul><h3>T-Bar Row</h3><ul><li>50kg x 10</li><li>60kg x 8</li><li>65kg x 8</li></ul><h3>Wide Grip Pulldown</h3><ul><li>55kg x 12</li><li>60kg x 10</li><li>65kg x 8</li></ul><h3>Chest-Supported Row</h3><ul><li>40kg x 12</li><li>45kg x 10</li><li>45kg x 10</li></ul><h3>Incline Dumbbell Curl</h3><ul><li>14kg x 12</li><li>16kg x 10</li><li>16kg x 10</li></ul><h3>Reverse Curl</h3><ul><li>20kg x 15</li><li>20kg x 12</li></ul><p><em>Notes: 130kg deadlift PR. Back is getting stronger. Don't stop now.</em></p>`,
    },
];


const Popup = () => {
    return (
        <ul className="border-line-color absolute top-10 right-0 z-10 flex w-50 flex-col gap-5 rounded-xl border bg-neutral-50 p-5 text-neutral-500 shadow-md">
            <li className="flex">
                <span>
                    <IconPencil size={24} />
                </span>
                <h3 className="ml-3"> Edit Log</h3>
            </li>
            <li className="flex">
                <span>
                    <IconCopy size={24} />
                </span>
                <h3 className="ml-3"> Duplicate Log</h3>
            </li>
            <li className="flex">
                <span>
                    <IconTrash size={24} />
                </span>
                <h3 className="ml-3"> Delete Log</h3>
            </li>
        </ul>
    );
};

const Log = ({ log, ActiveLog, setActiveLog }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className={`border-line-color flex h-auto w-full cursor-pointer justify-between rounded-xl border bg-white px-3 py-3 text-neutral-500 ${ActiveLog === log?._id ? " bg-neutral-100" : ""}`}
        >
            <IconNotebook
                className="text-neutral-500"
                onClick={() =>
                    setActiveLog((p) =>
                        p == null ? log._id : p == log?._id ? null : log._id,
                    )
                }
            />
            <h3
                className="ml-5 w-full truncate text-left text-base text-neutral-700"
                onClick={() =>
                    setActiveLog((p) =>
                        p == null ? log._id : p == log?._id ? null : log._id,
                    )
                }
            >
                {log?.name || "Log title"}{" "}
            </h3>
            <div className="relative">
                <IconDotsVertical onClick={() => setIsOpen(!isOpen)} />
                {isOpen && <Popup />}
            </div>
        </div>
    );
};

const AllLogs = ({ ActiveLog, setActiveLog }) => {
    return (
        <div className="border-line-color relative flex h-screen w-full shrink-0 flex-col items-end justify-start gap-3 overflow-auto border-r bg-neutral-50 px-5 py-10 lg:w-180">
            <Button className="hidden lg:flex">
                Create
                <span>
                    <IconPencilPlus size={18} className="ml-2" />
                </span>
            </Button>
            <div className="flex h-auto w-full flex-col items-center justify-center gap-2 lg:mt-15">
                {allLogs.map((log) => (
                    <Log
                        key={log._id}
                        log={log}
                        ActiveLog={ActiveLog}
                        setActiveLog={setActiveLog}
                    />
                ))}
            </div>
        </div>
    );
};

function debounce(fn, delay) {
    let id;
    return (...args) => {
        clearTimeout(id);
        id = setTimeout(() => fn(...args), delay);
    };
}

const ExerciseCard = ({ Curexercise, setExercises, className = "" }) => {
    const [editMode, setEditMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [exercise, setExercise] = useState(Curexercise || {

        id: 1,
        name: "45 Degree Leg Press",
        category: "Legs",
        pb: "120kg",
        sets: [
            { id: 1, reps: 20, kg: 5, rest: "00:30", done: false },
            { id: 2, reps: 20, kg: 5, rest: "00:30", done: false },
            { id: 3, reps: 20, kg: 5, rest: "00:30", done: false },
        ],
    }

    );

    const toggleDone = (id) => {
        setExercise((prev) => ({
            ...prev,
            sets: prev.sets.map((set) =>
                set.id === id ? { ...set, done: !set.done } : set
            ),
        }));
    };

    const updateSet = (id, field, value) => {
        setExercise((prev) => ({
            ...prev,
            sets: prev.sets.map((set) =>
                set.id === id ? { ...set, [field]: value } : set
            ),
        }));
    };

    return (
        <div className={`w-full max-w-3xl  bg-white p-5 shadow-sm ${className}`}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    {editMode ? (
                        <input
                            value={exercise.name}
                            onChange={(e) =>
                                setExercise({ ...exercise, name: e.target.value })
                            }
                            className="text-xl font-semibold outline-none border-b border-neutral-300"
                        />
                    ) : (
                        <h2 className="text-xl font-semibold text-neutral-900">
                            {exercise.name}
                        </h2>
                    )}

                    {editMode ? (
                        <input
                            value={exercise.category}
                            onChange={(e) =>
                                setExercise({ ...exercise, category: e.target.value })
                            }
                            className="mt-1 text-sm text-neutral-500 outline-none border-b border-neutral-300"
                        />
                    ) : (
                        <p className="mt-1 text-sm text-neutral-500">
                            {exercise.category}
                        </p>
                    )}
                </div>

                {/* Menu */}
                <div className="dropdown dropdown-end relative ">
                    <button
                        className="cursor-pointer rounded-xl p-2 transition bg-gray-50 size-10 flex justify-center items-center relative"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <IconDots size={20} />
                    </button>
                    {isOpen &&
                        <div
                            tabIndex={0}
                            className="menu dropdown-content z-10 mt-2 w-44 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl absolute top-10 right-1"
                        >
                            <button
                                onClick={() => setEditMode(!editMode)}
                                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100"
                            >
                                <IconPencil size={18} />
                                {editMode ? "Disable Edit" : "Edit Exercise"}
                            </button>

                            <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50" onClick={function () {
                                setExercises(prev => prev.filter(e => e.id !== exercise.id));
                            }}>
                                <IconTrash size={18} />
                                Delete
                            </button>
                        </div>
                    }
                </div>
            </div>

            {/* PB */}
            <div className="mt-5 flex items-center gap-2 text-sm text-neutral-700">
                <IconNotes size={18} className="text-neutral-500" />
                <span>
                    {exercise.pb} is your PB
                </span>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-100">
                {/* Header */}
                <div className="grid grid-cols-5 border-b border-neutral-100 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-500">
                    <span>sets</span>
                    <span>Reps</span>
                    <span>Kg</span>
                    <span>Rest</span>
                    <span className="flex justify-center">
                        <IconCheck size={18} />
                    </span>
                </div>

                {/* Rows */}
                {exercise.sets.map((set, index) => (
                    <div
                        key={set.id}
                        className="grid grid-cols-5 items-center border-b border-neutral-100 px-4 py-4 last:border-none"
                    >
                        <span className="font-medium text-neutral-700">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Reps */}
                        {editMode ? (
                            <input
                                type="number"
                                value={set.reps}
                                onChange={(e) =>
                                    updateSet(set.id, "reps", Number(e.target.value))
                                }
                                className="w-14 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none"
                            />
                        ) : (
                            <span>{set.reps}</span>
                        )}

                        {/* KG */}
                        {editMode ? (
                            <input
                                type="number"
                                value={set.kg}
                                onChange={(e) =>
                                    updateSet(set.id, "kg", Number(e.target.value))
                                }
                                className="w-14 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none"
                            />
                        ) : (
                            <span>{set.kg}</span>
                        )}

                        {/* Rest */}
                        {editMode ? (
                            <input
                                value={set.rest}
                                onChange={(e) =>
                                    updateSet(set.id, "rest", e.target.value)
                                }
                                className="w-16 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none"
                            />
                        ) : (
                            <span>{set.rest}</span>
                        )}

                        {/* Done */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => toggleDone(set.id)}
                                className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${set.done
                                    ? "border-black bg-black text-white"
                                    : "border-neutral-300"
                                    }`}
                            >
                                {set.done && <IconCheck size={14} />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



const ShowLog = ({ log, isActive, setActiveLog, className = "" }) => {
    const [exercises, setExercises] = useState([
        {
            id: 1,
            name: "45 Degree Leg Press",
            category: "Legs",
            pb: "120kg",
            sets: [
                { id: 1, reps: 20, kg: 5, rest: "00:30", done: false },
                { id: 2, reps: 20, kg: 5, rest: "00:30", done: false },
                { id: 3, reps: 20, kg: 5, rest: "00:30", done: false },
            ],
        },
        {
            id: 2,
            name: "Leg Extension",
            category: "Legs",
            pb: "120kg",
            sets: [
                { id: 1, reps: 20, kg: 5, rest: "00:30", done: false },
                { id: 2, reps: 20, kg: 5, rest: "00:30", done: false },
                { id: 3, reps: 20, kg: 5, rest: "00:30", done: false },
            ],
        },
        {
            id: 3,
            name: "Lying Hamstring Curls",
            category: "Legs",
            pb: "120kg",
            sets: [
                { id: 1, reps: 20, kg: 5, rest: "00:30", done: false },
                { id: 2, reps: 20, kg: 5, rest: "00:30", done: false },
                { id: 3, reps: 20, kg: 5, rest: "00:30", done: false },
            ],
        }

    ]);

    // async function handleSaveLog(content) {
    //     try {
    //         console.log("content", content);
    //         const res = await axios.post(`/log/update/${log._id}`, { content });
    //         if (res.status === 200) {
    //             console.log("toast gets popped up");
    //         }
    //     } catch (err) {
    //         console.log("error")
    //     }
    // }
    //
    // const handleUpdate = useCallback(debounce((newContent) => handleSaveLog(newContent), 3000), [log?.id]);
    //


    return (
        <div className="w-full">
            <div
                className={`h-screen w-full flex-1 overflow-auto ${isActive ? "flex" : "hidden"} relative hidden lg:flex `}
            >
                <div className={`flex-col h-screen overflow-auto p-10 ${className} w-full no-scrollbar`}>
                    <h1 className="text-xl font-bold antialiased text-left ml-2">{log?.name}</h1>
                    <div className="my-15 flex flex-col w-full">
                        {
                            exercises.length > 0 &&
                            exercises.map((exercise, index) => (
                                <ExerciseCard Curexercise={exercise} setExercises={setExercises} key={exercise.id} className={index === 0 ? "rounded-t-4xl" : "rounded-none"} />
                            ))
                        }
                    </div>
                </div>
                {/* <div className=" absolute top-5 right-1 flex  gap-4 w-45 justify-end items-center"> */}
                {/*     <button className={` bg-gray-50 text-near-black  h-10 w-10 p-2 rounded-full  justify-center items-center cursor-pointer font-semibold active:scale-98 transition-all hover:bg-gray-100 hover:text-gray-800 z-20`}> */}
                {/*         <IconDots /> */}
                {/*     </button> */}
                {/* </div> */}
            </div>
            {/* show logs in mobile as a bottom sheet*/}
            <BottomSheet
                onClose={() => setActiveLog(null)}
                className="lg:hidden"
                setOpen={setActiveLog}
                open={isActive}
            >
                <div className={`mt-0 ${className}`}>
                    <h1 className="text-xl font-bold antialiased text-left">{log?.name}</h1>
                    <div className="my-15">
                        {
                            exercises.length > 0 &&
                            exercises.map((exercise) => (
                                <ExerciseCard exercise={exercise} setExercises={setExercises} key={exercise.id} />
                            ))
                        }
                    </div>

                </div>
                {/* <button className={` bg-gray-100 text-near-black  h-10 w-10 p-2 rounded-full  justify-center items-center cursor-pointer font-semibold active:scale-98 transition-all absolute top-15 right-5 hover:bg-gray-100 hover:text-gray-800`}> */}
                {/*     <IconDots /> */}
                {/* </button> */}
            </BottomSheet>
        </div>
    );
};



const HomePageContent = () => {
    const [ActiveLog, setActiveLog] = useState(null);

    return (
        <div className="flex h-screen w-full flex-col items-start justify-start lg:flex-row">
            <AllLogs ActiveLog={ActiveLog} setActiveLog={setActiveLog} />
            {ActiveLog && (
                <>
                    <ShowLog
                        log={allLogs.find((log) => log._id === ActiveLog)}
                        isActive={ActiveLog !== null}
                        setActiveLog={setActiveLog}
                    />
                </>
            )}
        </div>
    );
};
const HomePage = () => {
    return (
        <SideBarLayout>
            <HomePageContent />
        </SideBarLayout>
    );
};

export default HomePage;
