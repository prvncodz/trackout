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
    IconCircleDashedCheck,
    IconCircleDashedPlus,
    IconClipboardText,
    IconCopy,
    IconDots,
    IconDotsVertical,
    IconLogs,
    IconNotebook,
    IconNotes,
    IconPencil,
    IconPencilPlus,
    IconPlaylistAdd,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import SideBarLayout from "../components/layout/SideBar.jsx";
import MyButton from "../components/ui/Button.jsx";
import { Button } from "../components/ui/button.jsx";
import { useEffect, useState } from "react";
import BottomSheet from "@/components/ui/BottomSheet.jsx";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react"
import axios from "../lib/axios.js";
import CreateSetSchema from "../../../server/src/schemas/set.schema.js";
import { toast } from "sonner";

function debounce(fn, delay) {
    let id;
    return (...args) => {
        clearTimeout(id);
        id = setTimeout(() => fn(...args), delay);
    };
}


const Popup = ({ log, setIsOpen, setAllLogs }) => {
    const [editing, setEditing] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    async function handleDuplicateLog() {
        try {
            const res = await axios.post(`/log/duplicate/${log._id}`)
            setAllLogs(prev => [...prev, res?.data?.data])
            setIsOpen(false)
            toast.success("Log duplicated successfully")
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message
            toast.error(message)
        }
    }

    async function HandleDeleteLog() {
        try {
            await axios.delete(`/log/delete/${log._id}`)
            setAllLogs(prev => prev.filter((l) => l._id !== log._id))
            setShowDeleteAlert(false)
            setIsOpen(false)
            toast.success("Log deleted successfully")
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message
            toast.error(message)
        }
    }
    async function handleEditLog(e) {
        e.preventDefault();
        const name = e.target.name.value
        try {
            const res = await axios.patch(`/log/update/${log._id}`, { logName: name })
            if (res.status === 200) {
                setAllLogs(prev => prev.map(obj => obj._id === log._id ? { ...obj, logName: name } : obj))
                setEditing(false)
                setIsOpen(false)
                toast.success("Log updated successfully")
            }
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message
            toast.error(message)
        }
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

            <Dialog open={editing} onOpenChange={setEditing}>
                <DialogTrigger asChild>
                    <button
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 w-full"
                        onClick={() => setEditing(true)}
                    >
                        <IconPencil size={18} />
                        Edit log
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
                    <form onSubmit={handleEditLog}>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" defaultValue={log?.logName} />
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="mt-7">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <button
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 w-full"
                onClick={handleDuplicateLog}
            >
                <IconCopy size={18} />
                Duplicate log
            </button>


            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-2 rounded-xl px-3 py-2 w-full text-sm text-red-500 hover:bg-red-50" onClick={() => setShowDeleteAlert(true)}>
                        <IconTrash size={18} />
                        Delete log
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
                    <AlertDialogFooter >
                        <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={HandleDeleteLog}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.ul >
    );
};

const Log = ({ log, ActiveLog, setActiveLog, setAllLogs }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className={`border-line-color flex h-auto w-full cursor-pointer justify-between rounded-xl border bg-neutral-50 px-3 py-3 text-neutral-500 ${ActiveLog === log?._id ? " bg-neutral-100" : ""}`}
        >
            <IconLogs
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
                {log?.logName || "Log title"}{" "}
            </h3>
            <div className="relative">
                <IconDotsVertical onClick={() => setIsOpen(!isOpen)} />
                {isOpen && <Popup log={log} setIsOpen={setIsOpen} setAllLogs={setAllLogs} />}
            </div>
        </div>
    );
};


const AllLogs = ({ logs, setAllLogs, ActiveLog, setActiveLog }) => {
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => { }, [logs])

    async function handleCreateLog(e) {
        e.preventDefault();
        const name = e.target.name.value
        try {
            const res = await axios.post(`/log/create`, { logName: name })
            if (res.status === 201) {
                setAllLogs(prev => [...prev, res.data?.data])
                setIsCreating(false)
                toast.success("Log created successfully")
            }
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message
            toast.error(message)
        }
    }
    return (
        <div className="border-line-color relative flex h-screen w-full shrink-0 flex-col items-end justify-start gap-3 overflow-auto border-r bg-neutral-50 px-5 py-10 lg:w-180">
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
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
                    <form onSubmit={(e) => handleCreateLog(e)}>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" name="name" defaultValue="" />
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="mt-7">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" >Confirm</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="flex h-auto w-full flex-col items-center justify-center gap-2 lg:mt-15">
                {logs?.map((log) => (
                    <Log
                        key={log._id}
                        log={log}
                        ActiveLog={ActiveLog}
                        setActiveLog={setActiveLog}
                        setAllLogs={setAllLogs}
                    />
                ))}
            </div>
        </div >
    );
};


const ExerciseCard = ({ Curexercise, logId, setExercises, className = "", completed }) => {
    const [editMode, setEditMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [exercise, setExercise] = useState(Curexercise)
    const [isCreating, setIsCreating] = useState(false)
    const [toBeUpdatedSets, setToBeUpdatedSets] = useState([])
    const [isExerciseUpdated, setIsExerciseUpdated] = useState(false)

    async function toggleDone(id) {
        setExercise((prev) => ({
            ...prev,
            sets: prev.sets.map((set) =>
                set._id === id ? { ...set, completed: !set.completed } : set
            ),
        }));
        try {
            const res = await axios.patch(`/set/toggle-set-completed/${id}`, { isPr: false })
            toast.success(`Set ${res.data?.data?.completed ? "marked" : "unmarked"} as completed successfully`)
        } catch (err) {
            const message = err.response?.data.message || err.message
            toast.error(message)
        }
    };

    function updateSet(set, id, field, value) {
        setExercise((prev) => ({
            ...prev,
            sets: prev.sets.map((set) =>
                set._id === id ? { ...set, [field]: value } : set
            ),
        }));
        const listed = toBeUpdatedSets.some(obj => obj._id === id)
        if (!listed) {
            setToBeUpdatedSets(prev => [...prev, { ...set, [field]: value }])
        } else {
            setToBeUpdatedSets(prev => prev.map(obj => obj._id === id ? { ...set, [field]: value } : obj))
        }
    };

    async function handleUpdateExercise() {
        try {
            toBeUpdatedSets?.map(async (set) => {
                await axios.patch(`/set/update/${set?._id}`, {
                    reps: set?.reps,
                    weight: set?.weight,
                    rest: set?.rest,
                })
            })
            if (isExerciseUpdated) {
                await axios.patch(`/exercise/update/${Curexercise?._id}`, {
                    note: exercise?.note,
                    name: exercise?.name
                })
            }
            toast.success(exercise?.name + " updated successfully")
            setIsExerciseUpdated(false)
            setToBeUpdatedSets([])
            setEditMode(false)
            setIsOpen(false)
        } catch (err) {
            const message = err.response?.data.message || err.message
            toast.error(message)
        }
    }


    async function handleCreateSet(e) {

        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target))
        const setNo = Curexercise?.sets?.length + 1
        data.setNo = setNo

        try {
            CreateSetSchema.parse(data)
            const res = await axios.post(`/set/create/${Curexercise?._id}`, data)
            if (res.status === 201) {
                setExercise(prev => ({
                    ...prev,
                    sets: [...prev.sets, res.data?.data]
                }))
                toast.success("Set created successfully")
                setIsCreating(false)
                setIsOpen(false)
            }
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message
            toast.error(message)
        }

    }

    async function handleDeleteSet(id) {
        try {
            await axios.delete(`/set/delete/${id}/${Curexercise?._id}`)
            setExercise((prev) => ({
                ...prev,
                sets: prev.sets.filter((set) => set._id !== id),
            }));
            toast.success("Set deleted successfully")
        } catch (err) {
            const message = err.response?.data.message || err.message
            toast.error(message)
        }
    }

    async function handleDeleteExercise() {
        try {
            await axios.delete(`/exercise/delete/${logId}/${Curexercise?._id}`)
            setExercises((prev) => prev.filter((ex) => ex._id !== Curexercise?._id));
            toast.success("Exercise deleted successfully")
        } catch (err) {
            const message = err.response?.data.message || err.message
            toast.error(message)
        }
    }

    return (
        <div className={`w-full max-w-3xl  bg-neutral-50 p-5  ${className}`}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col items-start">
                    {editMode ? (
                        <input
                            value={exercise?.name}
                            onChange={(e) => {
                                setExercise({ ...exercise, name: e.target.value })
                                setIsExerciseUpdated(true)
                            }
                            }
                            className="text-lg font-semibold outline-none border-b border-neutral-300"
                        />
                    ) : (
                        <h2 className="text-lg font-semibold text-neutral-900">
                            {exercise?.name}
                        </h2>
                    )}


                    {editMode ? (
                        <div className="flex gap-2 items-center justify-center">
                            <IconClipboardText size={18} />
                            <input
                                value={exercise?.note}
                                onChange={(e) => {
                                    setExercise({ ...exercise, note: e.target.value })
                                    setIsExerciseUpdated(true)
                                }
                                }
                                className="mt-1 text-sm text-neutral-500 outline-none border-b border-neutral-300"
                            />
                        </div>
                    ) : (
                        <p className="mt-1 text-sm text-neutral-500 flex gap-2 items-center justify-center">
                            <IconClipboardText size={18} /> {exercise?.note || ""}
                        </p>
                    )}

                </div>

                <div className="flex items-center gap-2">
                    {editMode &&
                        <MyButton onClick={handleUpdateExercise}>
                            save
                        </MyButton>
                    }
                    {/* Menu */}
                    <div className="dropdown dropdown-end relative ">
                        {!completed &&
                            <button
                                className="cursor-pointer rounded-xl p-2 transition bg-gray-50 size-10 flex justify-center items-center relative"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <IconDots size={20} />
                            </button>
                        }
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
                                    onClick={() => {
                                        setEditMode(!editMode);
                                        setIsOpen(false)
                                    }}
                                    className="flex items-center gap-2 rounded-xl px-3 w-full py-2 text-sm hover:bg-neutral-100"
                                >
                                    <IconPencil size={18} />
                                    {editMode ? "Disable edit" : "Edit exercise"}
                                </button>

                                <Dialog open={isCreating} onOpenChange={setIsCreating}>
                                    <DialogTrigger asChild>
                                        <button className="flex items-center gap-2 rounded-xl px-3 w-full py-2 text-sm hover:bg-neutral-100" onClick={() => setIsCreating(true)}>
                                            <IconPlaylistAdd size={18} />
                                            Create set
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm">
                                        <DialogHeader>
                                            <DialogTitle>Create Set</DialogTitle>
                                            <DialogDescription>
                                                Create new set. Click save when you&apos;re
                                                done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={(e) => handleCreateSet(e)}>
                                            <FieldGroup>
                                                <Field>
                                                    <Label htmlFor="weight">Weight (kg)*</Label>
                                                    <Input
                                                        id="weight"
                                                        name="weight"
                                                        type="number"
                                                        min={0}
                                                        step={0.5}
                                                        defaultValue=""
                                                        placeholder="0"
                                                    />
                                                </Field>

                                                <Field>
                                                    <Label htmlFor="reps">Reps*</Label>
                                                    <Input
                                                        id="reps"
                                                        name="reps"
                                                        type="number"
                                                        min={0}
                                                        step={1}
                                                        defaultValue=""
                                                        placeholder="0"
                                                    />
                                                </Field>

                                                <Field>
                                                    <Label htmlFor="rest">Rest (sec)</Label>
                                                    <Input
                                                        id="rest"
                                                        name="rest"
                                                        type="number"
                                                        min={0}
                                                        step={5}
                                                        defaultValue=""
                                                        placeholder="60"
                                                    />
                                                </Field>
                                            </FieldGroup>
                                            <DialogFooter className="mt-7">
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button type="submit" >Confirm</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="flex items-center gap-2 rounded-xl px-3 w-full py-2 text-sm text-red-500 hover:bg-red-50">
                                            <IconTrash size={18} />
                                            Delete exercise
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
                                            <AlertDialogAction variant="destructive" onClick={handleDeleteExercise}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </motion.div>
                        }
                    </div>
                </div>
            </div>


            {/* Table */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-100">
                {/* Header */}
                <div className="grid grid-cols-5 border-b border-neutral-100 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-500">
                    <span>Sets</span>
                    <span>Reps</span>
                    <span>Kg</span>
                    <span>Rest</span>
                    {!editMode &&
                        <span className="flex justify-center">
                            <IconCheck size={18} />
                        </span>
                    }
                </div>

                {/* Rows */}
                {exercise?.sets?.map((set) => (
                    <div
                        key={set?._id}
                        className="grid grid-cols-5 items-center border-b border-neutral-100 px-4 py-4 last:border-none"
                    >
                        <span className="font-medium text-neutral-700">
                            {String(set?.setNo).padStart(2, "0")}
                        </span>

                        {/* Reps */}
                        {editMode ? (
                            <input
                                type="number"
                                value={set.reps}
                                onChange={(e) =>
                                    updateSet(set, set._id, "reps", Number(e.target.value))
                                }
                                className="w-14 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none"
                            />
                        ) : (
                            <span>{set?.reps}</span>
                        )}

                        {/* KG */}
                        {editMode ? (
                            <input
                                type="number"
                                value={set.weight}
                                onChange={(e) =>
                                    updateSet(set, set._id, "weight", Number(e.target.value))
                                }
                                className="w-14 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none"
                            />
                        ) : (
                            <span>{set?.weight}</span>
                        )}

                        {/* Rest */}
                        {editMode ? (
                            <input
                                value={set.rest}
                                onChange={(e) =>
                                    updateSet(set, set._id, "rest", e.target.value)
                                }
                                className="w-16 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none"
                            />
                        ) : (
                            <span>{set.rest}</span>
                        )}

                        {editMode ?
                            <div onClick={() => handleDeleteSet(set._id)}>
                                <IconTrash size={18} className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50" />
                            </div>
                            :
                            <div className="flex justify-center">
                                <button
                                    onClick={() => toggleDone(set._id)}
                                    className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${set.completed
                                        ? "border-black bg-black text-white"
                                        : "border-neutral-300"
                                        }`}
                                >
                                    {set.completed && <IconCheck size={14} />}
                                </button>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}



const ShowLog = ({ logId, isActive, setActiveLog, ActiveLog, className = "" }) => {
    const [log, setLog] = useState(null);
    const [exercises, setExercises] = useState(null)
    const [addingExercise, setAddingExercise] = useState(false)


    useEffect(() => {
        async function getLogById() {
            try {
                const res = await axios.get(`/log/${logId}`)
                if (res.status === 200) {
                    setLog(res?.data?.data);
                    setExercises(res?.data?.data?.exercises)
                }
            } catch (err) {
                toast.error(err?.response?.data?.message || err?.message)
            }
        }
        getLogById()
    }, [isActive, ActiveLog])

    async function handleCreateExercise(e) {
        e.preventDefault();
        const name = e.target.name.value
        const muscleGroup = e.target.muscleGroup.value

        try {
            const res = await axios.post(`/exercise/create/${logId}`, { name, muscleGroup })
            setExercises(prev => [...prev, res.data?.data])
            setAddingExercise(false)
            toast.success("Exercise created successfully")
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message
            toast.error(message)
        }
    }

    async function handleMarkLogCompleted() {
        try {
            const res = await axios.patch(`/log/mark-completed/${log._id}`);
            setLog(prev => ({ ...prev, completedAt: res.data?.data?.completedAt }))
            toast.success("Log marked as completed successfully")
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message
            toast.error(message)

        }
    }




    return (
        <div className="w-full">
            <div
                className={`h-screen w-full flex-1 overflow-auto ${isActive ? "flex" : "hidden"}  hidden lg:flex `}
            >
                <div className={`flex-col h-screen bg-neutral-50 overflow-auto p-10 ${className} w-full no-scrollbar`}>
                    <div className=" flex flex-col w-full">
                        {
                            exercises?.length > 0 &&
                            exercises?.map((exercise) => (
                                <ExerciseCard
                                    Curexercise={exercise}
                                    logId={log?._id}
                                    setExercises={setExercises}
                                    key={exercise._id}
                                    completed={log?.completedAt}
                                />
                            ))
                        }
                        <div className="flex gap-3">

                            {!log?.completedAt &&
                                <Dialog open={addingExercise} onOpenChange={setAddingExercise}>
                                    <DialogTrigger asChild>

                                        <Button variant="outline"><IconCircleDashedPlus size={18} /> Add Exercise</Button>

                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm">
                                        <DialogHeader>
                                            <DialogTitle>Add Exercise</DialogTitle>
                                            <DialogDescription>
                                                Add a new Exercise to log. Click save when you&apos;re
                                                done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleCreateExercise}>
                                            <FieldGroup>
                                                <Field>
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input id="name" name="name" defaultValue="" />
                                                </Field>
                                                <Field>
                                                    <Label htmlFor="muscleGroup">MuscleGroup</Label>
                                                    <Input id="muscleGroup" name="muscleGroup" defaultValue="" />
                                                </Field>
                                            </FieldGroup>
                                            <DialogFooter className="mt-7">
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button type="submit">Save Changes</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            }
                            {log?.exercises?.length > 0 &&
                                <Button variant="outline" disabled={log?.completedAt} onClick={handleMarkLogCompleted}><IconCircleDashedCheck size={18} /> {log?.completedAt ? "Completed" : "Mark as Completed"}</Button>
                            }
                        </div>
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
                            exercises?.length > 0 &&
                            exercises?.map((exercise) => (
                                <ExerciseCard
                                    Curexercise={exercise}
                                    logId={log?._id}
                                    setExercises={setExercises}
                                    key={exercise._id}
                                    completed={log?.completedAt}
                                />
                            ))
                        }

                        <div className="flex gap-3">

                            {!log?.completedAt &&
                                <Dialog open={addingExercise} onOpenChange={setAddingExercise}>
                                    <DialogTrigger asChild>

                                        <Button variant="outline"><IconCircleDashedPlus size={18} /> Add Exercise</Button>

                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm">
                                        <DialogHeader>
                                            <DialogTitle>Add Exercise</DialogTitle>
                                            <DialogDescription>
                                                Add a new Exercise to log. Click save when you&apos;re
                                                done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleCreateExercise}>
                                            <FieldGroup>
                                                <Field>
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input id="name" name="name" defaultValue="" />
                                                </Field>
                                                <Field>
                                                    <Label htmlFor="muscleGroup">MuscleGroup</Label>
                                                    <Input id="muscleGroup" name="muscleGroup" defaultValue="" />
                                                </Field>
                                            </FieldGroup>
                                            <DialogFooter className="mt-7">
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button type="submit">Save Changes</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            }
                            {log?.exercises?.length > 0 &&
                                <Button variant="outline" disabled={log?.completedAt}><IconCircleDashedCheck size={18} /> {log?.completedAt ? "Completed" : "Mark as Completed"}</Button>
                            }
                        </div>
                    </div>

                </div>

            </BottomSheet>
        </div>
    );
};



const HomePageContent = () => {
    const [ActiveLog, setActiveLog] = useState(null);
    const [allLogs, setAllLogs] = useState([]);

    useEffect(() => {
        async function fetchLogs() {
            try {
                const res = await axios.get("/log/all-logs")
                if (res.status === 200) {
                    setAllLogs(res.data?.data)
                }
            } catch (err) {
                const message =
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    err?.message
            }
        }
        fetchLogs()
    }, [])

    return (
        <div className="flex h-screen w-full flex-col items-start justify-start lg:flex-row">
            <AllLogs logs={allLogs} setAllLogs={setAllLogs} ActiveLog={ActiveLog} setActiveLog={setActiveLog} />
            {ActiveLog && (
                <>
                    <ShowLog
                        logId={ActiveLog}
                        isActive={ActiveLog !== null}
                        ActiveLog={ActiveLog}
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
