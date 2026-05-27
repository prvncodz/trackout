import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import SideBarLayout from "../components/layout/SideBar.jsx";
import MyButton from "../components/ui/Button.jsx";
import { Button } from "../components/ui/button.jsx";
import { useCallback, useEffect, useState } from "react";
import BottomSheet from "@/components/ui/BottomSheet.jsx";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react"
import { ToastContainer, useToast } from "../components/ui/Toast.jsx";

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
];


const Popup = ({ log, setAllLogs }) => {
    function handleDuplicateLog() {
        setAllLogs(prev => [...prev, log]);
    }
    return (
        <motion.ul
            className="menu dropdown-content z-10 mt-0 w-44 rounded-2xl border border-neutral-200 bg-white p-2 shadow-euphonious absolute top-10 right-1"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                duration: 100
            }}
            exit={{
                opacity: 0,
                duration: 100
            }}
        >

            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <button
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 w-full"
                        >
                            <IconPencil size={18} />
                            Edit Log
                        </button>

                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Edit Log</DialogTitle>
                            <DialogDescription>
                                Make changes to the log. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" name="name" defaultValue={log?.name} />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
            <button
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 w-full"
                onClick={handleDuplicateLog}
            >
                <IconCopy size={18} />
                Duplicate Log
            </button>


            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-2 rounded-xl px-3 py-2 w-full text-sm text-red-500 hover:bg-red-50">
                        <IconTrash size={18} />
                        Delete Log
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <IconTrash />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Delete log?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this workout log.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.ul>
    );
};

const Log = ({ log, ActiveLog, setActiveLog, setAllLogs }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className={`border-line-color flex h-auto w-full cursor-pointer justify-between rounded-xl border bg-neutral-50 px-3 py-3 text-neutral-500 ${ActiveLog === log?._id ? " bg-neutral-100" : ""}`}
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
                {isOpen && <Popup log={log} setAllLogs={setAllLogs} />}
            </div>
        </div>
    );
};


const AllLogs = ({ ActiveLog, setActiveLog }) => {
    const [AllLogs, setAllLogs] = useState(allLogs);
    useEffect(() => {
        async function createDefaultLogs() {
            try {

            } catch (err) {

            }
        }
    }, [])
    async function handleCreateLog() {
        try {

        } catch (err) {

        }
    }
    return (
        <div className="border-line-color relative flex h-screen w-full shrink-0 flex-col items-end justify-start gap-3 overflow-auto border-r bg-neutral-50 px-5 py-10 lg:w-180">
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <MyButton className="hidden lg:flex">
                            Create
                            <span>
                                <IconPencilPlus size={18} className="ml-2" />
                            </span>
                        </MyButton>

                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Create Log</DialogTitle>
                            <DialogDescription>
                                Make a workout log. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" name="name" defaultValue="" />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" onSubmit={handleCreateLog}>Confirm</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
            <div className="flex h-auto w-full flex-col items-center justify-center gap-2 lg:mt-15">
                {AllLogs.map((log) => (
                    <Log
                        key={log._id}
                        log={log}
                        ActiveLog={ActiveLog}
                        setActiveLog={setActiveLog}
                        setAllLogs={setAllLogs}
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
        <div className={`w-full max-w-3xl  bg-neutral-50 p-5  ${className}`}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    {editMode ? (
                        <input
                            value={exercise.name}
                            onChange={(e) =>
                                setExercise({ ...exercise, name: e.target.value })
                            }
                            className="text-lg font-semibold outline-none border-b border-neutral-300"
                        />
                    ) : (
                        <h2 className="text-lg font-semibold text-neutral-900">
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
                        <motion.div

                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                duration: 100
                            }}
                            exit={{
                                opacity: 0,
                                duration: 100
                            }}
                            tabIndex={0}
                            className="menu dropdown-content z-10 mt-2 w-44 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl absolute top-10 right-1"
                        >
                            <button
                                onClick={() => setEditMode(!editMode)}
                                className="flex items-center gap-2 rounded-xl px-3 w-full py-2 text-sm hover:bg-neutral-100"
                            >
                                <IconPencil size={18} />
                                {editMode ? "Disable Edit" : "Edit Exercise"}
                            </button>


                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="flex items-center gap-2 rounded-xl px-3 w-full py-2 text-sm text-red-500 hover:bg-red-50">
                                        <IconTrash size={18} />
                                        Delete Exercise
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent size="sm">
                                    <AlertDialogHeader>
                                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                            <IconTrash />
                                        </AlertDialogMedia>
                                        <AlertDialogTitle>Delete Exercise?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete this exercise log.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                                        <AlertDialogAction variant="destructive" onClick={() => setExercises(prev => prev.filter(e => e.id !== exercise.id))}>Delete</AlertDialogAction>

                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </motion.div>
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
                className={`h-screen w-full flex-1 overflow-auto ${isActive ? "flex" : "hidden"}  hidden lg:flex `}
            >
                <div className={`flex-col h-screen bg-neutral-50 overflow-auto p-10 ${className} w-full no-scrollbar`}>
                    <div className=" flex flex-col w-full">
                        {
                            exercises.length > 0 &&
                            exercises.map((exercise) => (
                                <ExerciseCard Curexercise={exercise} setExercises={setExercises} key={exercise.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* show logs in mobile as a bottom sheet*/}
            <BottomSheet
                onClose={() => setActiveLog(null)}
                className="lg:hidden"
                setOpen={setActiveLog}
                open={isActive}
            >
                <div className={`mt-0 h-screen overflow-auto ${className}`}>
                    <h1 className="text-xl font-bold antialiased text-left ml-5 mt-5 tracking-wide">{log?.name}</h1>
                    <div className="my-10">
                        {
                            exercises.length > 0 &&
                            exercises.map((exercise) => (
                                <ExerciseCard exercise={exercise} setExercises={setExercises} key={exercise.id} />
                            ))
                        }
                    </div>

                </div>

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
    const { toasts, addToast, removeToast } = useToast();
    return (
        <SideBarLayout>
            <HomePageContent addToast={addToast} />
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </SideBarLayout>
    );
};

export default HomePage;
