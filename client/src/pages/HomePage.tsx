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
    IconPencil,
    IconPencilPlus,
    IconPlaylistAdd,
    IconTrash,
} from "@tabler/icons-react"
import SideBarLayout from "../components/layout/SideBar"
import MyButton from "../components/ui/MyButton"
import { Button } from "../components/ui/button"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import BottomSheet from "@/components/ui/BottomSheet"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { motion } from "motion/react"
import axios from "../lib/axios"
import CreateSetSchema from "../schemas/set.schema"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../stores/user.store"
import useLogStore from "../stores/log.store"
import type { Log } from "../types/Log.types"
import type { Exercise } from "@/types/Exercise.types"
import type { Set } from "@/types/Set.types"
import { fetchAllLogs, useDeleteLog, useDuplicateLog, useEditLog } from "@/hooks/useLog"

interface PopupProps {
    log: Log;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Popup = ({ log, setIsOpen }: PopupProps) => {
    const [editing, setEditing] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const userId = useAuth((state) => state.user?._id)

    const { mutateAsync: duplicateLog, isPending: isDuplicating } = useDuplicateLog(log?._id, userId)
    const { mutateAsync: deleteLog, isPending: isDeleting } = useDeleteLog(log?._id, userId)
    const { mutateAsync: editLog, isPending: isEditing } = useEditLog(log?._id, userId)

    if (isDuplicating || isDeleting || isEditing) {
        setIsOpen(false)
        setEditing(false)
        setShowDeleteAlert(false)
    }



    return (
        <motion.ul
            className="menu dropdown-content shadow-euphonious absolute top-10 right-1 z-10 mt-0 w-44 rounded-2xl border border-neutral-200 bg-white p-2"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.15,
            }}
        >
            <Dialog open={editing} onOpenChange={setEditing}>
                <DialogTrigger asChild>
                    <button
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100"
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
                            Make changes to the log. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        const name: string = e.target.logName.value;
                        editLog(name);
                    }}>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="logName">Name</Label>
                                <Input id="logName" name="logName" defaultValue={log?.logName} />
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
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100"
                onClick={() => {
                    toast.promise(
                        () =>
                            duplicateLog(),
                        {
                            loading: "Duplicating log...",
                            success: () => `Log duplicated successfully`,
                            error: "Error while duplicating log",
                        }
                    )
                }}
            >
                <IconCopy size={18} />
                Duplicate log
            </button>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogTrigger asChild>
                    <button
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                        onClick={() => setShowDeleteAlert(true)}
                    >
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
                        <AlertDialogDescription>This will permanently delete this workout log.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={() => {
                            toast.promise(
                                () =>
                                    deleteLog(),
                                {
                                    loading: "Deleting log...",
                                    success: () => `Log deleted successfully`,
                                    error: "Error while deleted log",
                                }
                            )
                        }}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.ul >
    )
}

interface LogProps {
    log: Log;
    ActiveLog: string | null,
    setActiveLog: Dispatch<SetStateAction<string | null>>
}
const Log = ({ log, ActiveLog, setActiveLog }: LogProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div
            className={`border-line-color flex h-auto w-full cursor-pointer justify-between rounded-xl border bg-neutral-50 px-3 py-3 text-neutral-500 ${ActiveLog === log?._id ? " bg-neutral-100" : ""}`}
        >
            <IconLogs
                className="text-neutral-500"
                onClick={() => setActiveLog((p) => (p == null ? log._id : p == log?._id ? null : log._id))}
            />
            <h3
                className="ml-5 w-full truncate text-left text-base text-neutral-700"
                onClick={() => setActiveLog((p) => (p == null ? log._id : p == log?._id ? null : log._id))}
            >
                {log?.logName || "Log title"}{" "}
            </h3>
            <div className="relative">
                <IconDotsVertical onClick={() => setIsOpen(!isOpen)} />
                {isOpen ? <Popup log={log} setIsOpen={setIsOpen} /> : null}
            </div>
        </div>
    )
}

interface AllLogsProps {
    ActiveLog: string | null,
    setActiveLog: Dispatch<SetStateAction<string | null>>
}

const AllLogs = ({ ActiveLog, setActiveLog }: AllLogsProps) => {
    const [isCreating, setIsCreating] = useState(false)
    const logs = useLogStore((state) => state.logs)
    const addLog = useLogStore((state) => state.addLog)

    useEffect(() => {
    }, [logs])

    async function handleCreateLog(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const name = e.target.logName.value
        try {
            const res = await axios.post(`/log/create`, { logName: name })
            if (res.status === 201) {
                addLog(res.data?.data)
                setIsCreating(false)
                toast.success("Log created successfully")
            }
        } catch (err: any) {
            const message = err?.response?.data?.message || err?.message
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
                        <DialogDescription>Make a workout log. Click save when you&apos;re done.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => handleCreateLog(e)}>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="logName">Name</Label>
                                <Input id="logName" name="logName" defaultValue="" />
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="mt-7">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Confirm</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="flex h-auto w-full flex-col items-center justify-center gap-2 lg:mt-15">
                {logs.length ?
                    logs?.map((log) => (
                        <Log
                            key={log._id}
                            log={log}
                            ActiveLog={ActiveLog}
                            setActiveLog={setActiveLog}
                        />
                    )) : null}
            </div>
        </div>
    )
}



interface ExerciseCardProps {
    Curexercise: Exercise;
    logId: string
    setExercises: Dispatch<SetStateAction<Exercise[] | null>>
    className?: string
    completed?: boolean
}

const ExerciseCard = ({ Curexercise, logId, setExercises, className = "", completed }: ExerciseCardProps) => {
    const [editMode, setEditMode] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [exercise, setExercise] = useState(Curexercise)
    const [isCreating, setIsCreating] = useState(false)
    const [toBeUpdatedSets, setToBeUpdatedSets] = useState<Set[] | null>(null)
    const [isExerciseUpdated, setIsExerciseUpdated] = useState(false)

    async function toggleDone(id: string) {
        setExercise((prev) => ({
            ...prev,
            sets: prev.sets.map((set) => (set._id === id ? { ...set, completed: !set.completed } : set)),
        }))
        try {
            const res = await axios.patch(`/set/toggle-set-completed/${id}`, { isPr: false })
            toast.success(`Set ${res.data?.data?.completed ? "marked" : "unmarked"} as completed successfully`)
        } catch (err: any) {
            const message = err.response?.data.message || err.message
            toast.error(message)
        }
    }


    function updateSet(set: Set, id: string, field: string, value: number | string) {
        setExercise((prev) => ({
            ...prev,
            sets: prev.sets.map((set) => (set._id === id ? { ...set, [field]: value } : set)),
        }))
        const listed = toBeUpdatedSets?.some((obj: Set) => obj._id === id)
        if (!listed) {
            setToBeUpdatedSets((prev) => [...prev ?? [], { ...set, [field]: value }])
        } else {
            setToBeUpdatedSets((prev) => prev?.map((obj) => (obj._id === id ? { ...set ?? [], [field]: value } : obj)) ?? prev)
        }
    }

    async function handleUpdateExercise() {
        try {
            toBeUpdatedSets?.map(async (set: Set) => {
                await axios.patch(`/set/update/${set?._id}`, {
                    reps: set?.reps,
                    weight: set?.weight,
                    rest: set?.rest,
                })
            })
            if (isExerciseUpdated) {
                await axios.patch(`/exercise/update/${Curexercise?._id}`, {
                    note: exercise?.note,
                    name: exercise?.name,
                })
            }
            toast.success(exercise?.name + " updated successfully")
            setIsExerciseUpdated(false)
            setToBeUpdatedSets([])
            setEditMode(false)
            setIsOpen(false)
        } catch (err: any) {
            const message = err.response?.data.message || err.message
            toast.error(message)
        }
    }

    async function handleCreateSet(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target)) as Record<string, string | number>
        const setNo = Curexercise?.sets?.length + 1
        data.setNo = setNo

        try {
            CreateSetSchema.parse(data)
            const res = await axios.post(`/set/create/${Curexercise?._id}`, data)
            if (res.status === 201) {
                setExercise((prev) => ({
                    ...prev,
                    sets: [...prev.sets, res.data?.data],
                }))
                toast.success("Set created successfully")
                setIsCreating(false)
                setIsOpen(false)
            }
        } catch (err: any) {
            const message = err?.response?.data?.message || err?.message
            toast.error(message)
        }
    }

    async function handleDeleteSet(id: string) {
        try {
            await axios.delete(`/set/delete/${id}/${Curexercise?._id}`)
            setExercise((prev) => ({
                ...prev,
                sets: prev.sets.filter((set) => set._id !== id),
            }))
            toast.success("Set deleted successfully")
        } catch (err: any) {
            const message = err.response?.data.message || err.message
            toast.error(message)
        }
    }

    async function handleDeleteExercise() {
        try {
            await axios.delete(`/exercise/delete/${logId}/${Curexercise?._id}`)
            setExercises((prev) => prev?.filter((ex) => ex._id !== Curexercise?._id) ?? prev)
            toast.success("Exercise deleted successfully")
        } catch (err: any) {
            const message = err.response?.data.message || err.message
            toast.error(message)
        }
    }

    return (
        <div className={`w-full max-w-3xl bg-neutral-50 p-5 ${className}`}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col items-start">
                    {editMode ? (
                        <input
                            value={exercise?.name}
                            onChange={(e) => {
                                setExercise({ ...exercise, name: e.target.value })
                                setIsExerciseUpdated(true)
                            }}
                            className="border-b border-neutral-300 text-lg font-semibold outline-none"
                        />
                    ) : (
                        <h2 className="text-lg font-semibold text-neutral-900">{exercise?.name}</h2>
                    )}

                    {editMode ? (
                        <div className="flex items-center justify-center gap-2">
                            <IconClipboardText size={18} />
                            <input
                                value={exercise?.note}
                                onChange={(e) => {
                                    setExercise({ ...exercise, note: e.target.value })
                                    setIsExerciseUpdated(true)
                                }}
                                className="mt-1 border-b border-neutral-300 text-sm text-neutral-500 outline-none"
                            />
                        </div>
                    ) : (
                        <p className="mt-1 flex items-center justify-center gap-2 text-sm text-neutral-500">
                            <IconClipboardText size={18} /> {exercise?.note || ""}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {editMode && <MyButton onClick={handleUpdateExercise}>save</MyButton>}
                    {/* Menu */}
                    <div className="dropdown dropdown-end relative">
                        {!completed && (
                            <button
                                className="relative flex size-10 cursor-pointer items-center justify-center rounded-xl bg-gray-50 p-2 transition"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <IconDots size={20} />
                            </button>
                        )}
                        {isOpen && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                tabIndex={0}
                                className="menu dropdown-content absolute top-10 right-1 z-10 mt-2 w-44 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl"
                            >
                                <button
                                    onClick={() => {
                                        setEditMode(!editMode)
                                        setIsOpen(false)
                                    }}
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100"
                                >
                                    <IconPencil size={18} />
                                    {editMode ? "Disable edit" : "Edit exercise"}
                                </button>

                                <Dialog open={isCreating} onOpenChange={setIsCreating}>
                                    <DialogTrigger asChild>
                                        <button
                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100"
                                            onClick={() => setIsCreating(true)}
                                        >
                                            <IconPlaylistAdd size={18} />
                                            Create set
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm">
                                        <DialogHeader>
                                            <DialogTitle>Create Set</DialogTitle>
                                            <DialogDescription>
                                                Create new set. Click save when you&apos;re done.
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
                                                <Button type="submit">Confirm</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50">
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
                                            <AlertDialogAction variant="destructive" onClick={handleDeleteExercise}>
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </motion.div>
                        )}
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
                    {!editMode && (
                        <span className="flex justify-center">
                            <IconCheck size={18} />
                        </span>
                    )}
                </div>

                {/* Rows */}
                {exercise?.sets?.length ? (
                    exercise?.sets?.map((set) => (
                        <div
                            key={set?._id}
                            className="grid grid-cols-5 items-center border-b border-neutral-100 px-4 py-4 last:border-none"
                        >
                            <span className="font-medium text-neutral-700">{String(set?.setNo).padStart(2, "0")}</span>

                            {/* Reps */}
                            {editMode ? (
                                <input
                                    type="number"
                                    value={set.reps}
                                    onChange={(e) => updateSet(set, set._id, "reps", Number(e.target.value))}
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
                                    onChange={(e) => updateSet(set, set._id, "weight", Number(e.target.value))}
                                    className="w-14 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none"
                                />
                            ) : (
                                <span>{set?.weight}</span>
                            )}

                            {/* Rest */}
                            {editMode ? (
                                <input
                                    value={set.rest}
                                    onChange={(e) => updateSet(set, set._id, "rest", e.target.value)}
                                    className="w-16 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none"
                                />
                            ) : (
                                <span>{set.rest}</span>
                            )}

                            {editMode ? (
                                <div onClick={() => handleDeleteSet(set._id)}>
                                    <IconTrash
                                        size={18}
                                        className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50"
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => toggleDone(set._id)}
                                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${set.completed ? "border-black bg-black text-white" : "border-neutral-300"
                                            }`}
                                    >
                                        {set.completed && <IconCheck size={14} />}
                                    </button>
                                </div>
                            )
                            }
                        </div>
                    ))) : null}
            </div>
        </div>
    )
}
async function getlogById(id: string | null) {
    if (!id) return
    const res = await axios.get(`/log/${id}`)
    return res?.data?.data
}

interface ShowLogProps {
    logId: string,
    isActive: boolean,
    setActiveLog: Dispatch<SetStateAction<string | null>>
    ActiveLog: string | null;
    className?: string;
}

const ShowLog = ({ logId, isActive, setActiveLog, ActiveLog, className = "" }: ShowLogProps) => {
    const [log, setLog] = useState<Log | null>(null)
    const [exercises, setExercises] = useState<Exercise[] | null>(null)
    const [addingExercise, setAddingExercise] = useState(false)
    const { data, status, error } = useQuery({ queryKey: ['log', ActiveLog], queryFn: () => getlogById(ActiveLog) })

    useEffect(() => {
        if (status === "success") {
            setLog(data)
            setExercises(data?.exercises)
        } else if (status === "error") {
            toast.error(error?.message)
        }
    }, [status, ActiveLog])


    async function handleCreateExercise(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const name = e.target.logName.value
        const muscleGroup = e.target.muscleGroup.value

        try {
            const res = await axios.post(`/exercise/create/${logId}`, { name, muscleGroup })
            setExercises((prev) => [...prev ?? [], res.data?.data])
            setAddingExercise(false)
            toast.success("Exercise created successfully")
        } catch (err: any) {
            const message = err?.response?.data?.message || err?.message
            toast.error(message)
        }
    }

    async function handleMarkLogCompleted() {
        try {
            const res = await axios.patch(`/log/mark-completed/${logId}`)
            setLog(res.data?.data)
            toast.success("Log marked as completed successfully")
        } catch (err: any) {
            const message = err?.response?.data?.message || err?.message
            toast.error(message)
        }
    }

    if (status === "pending") return <div className="h-dvh w-dvw flex items-center justify-center"><Spinner /></div>

    return (
        <div className="w-full">
            <div className={`h-screen w-full flex-1 overflow-auto ${isActive ? "flex" : "hidden"} hidden lg:flex`}>
                <div className={`h-screen flex-col overflow-auto bg-neutral-50 p-10 ${className} no-scrollbar w-full`}>
                    <div className="flex w-full flex-col">
                        {exercises?.length ?
                            exercises?.map((exercise) => (
                                <ExerciseCard
                                    Curexercise={exercise}
                                    logId={logId}
                                    setExercises={setExercises}
                                    key={exercise._id}
                                    completed={log?.completedAt ? true : false}
                                />
                            )) :
                            null
                        }
                        <div className="flex gap-3 justify-end">
                            {!log?.completedAt && (
                                <Dialog open={addingExercise} onOpenChange={setAddingExercise}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            <IconCircleDashedPlus size={18} /> Add Exercise
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm">
                                        <DialogHeader>
                                            <DialogTitle>Add Exercise</DialogTitle>
                                            <DialogDescription>
                                                Add a new Exercise to log. Click save when you&apos;re done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleCreateExercise}>
                                            <FieldGroup>
                                                <Field>
                                                    <Label htmlFor="logName">Name</Label>
                                                    <Input id="logName" name="logName" defaultValue="" />
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
                            )}
                            {log?.exercises?.length ? (
                                <Button variant="outline" disabled={log?.completedAt ? true : false} onClick={handleMarkLogCompleted}>
                                    <IconCircleDashedCheck size={18} />{" "}
                                    {log?.completedAt ? "Completed" : "Mark as Completed"}
                                </Button>
                            ) : null}
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
                    <h1 className="mt-5 ml-5 text-left text-xl font-bold tracking-wide antialiased">{log?.logName}</h1>
                    <div className="my-10">
                        {exercises?.length ?
                            exercises?.map((exercise) => (
                                <ExerciseCard
                                    Curexercise={exercise}
                                    logId={logId}
                                    setExercises={setExercises}
                                    key={exercise._id}
                                    completed={log?.completedAt ? true : false}
                                />
                            )) : null}

                        <div className="flex gap-3 justify-end pr-3">
                            {!log?.completedAt && (
                                <Dialog open={addingExercise} onOpenChange={setAddingExercise}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            <IconCircleDashedPlus size={18} /> Add Exercise
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm">
                                        <DialogHeader>
                                            <DialogTitle>Add Exercise</DialogTitle>
                                            <DialogDescription>
                                                Add a new Exercise to log. Click save when you&apos;re done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleCreateExercise}>
                                            <FieldGroup>
                                                <Field>
                                                    <Label htmlFor="logName">Name</Label>
                                                    <Input id="logName" name="logName" defaultValue="" />
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
                            )}
                            {log?.exercises?.length ? (
                                <Button variant="outline" disabled={log?.completedAt ? true : false}>
                                    <IconCircleDashedCheck size={18} />{" "}
                                    {log?.completedAt ? "Completed" : "Mark as Completed"}
                                </Button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </BottomSheet>
        </div>
    )
}


const HomePageContent = () => {
    const [ActiveLog, setActiveLog] = useState<string | null>(null)
    const userId = useAuth((state) => state.user?._id)
    const { data, status, isLoading } = useQuery(
        {
            queryKey: ['logs', userId],
            queryFn: fetchAllLogs
        })

    const setAllLogs = useLogStore((state) => state.setLogs)

    useEffect(() => {
        if (status === "success") {
            setAllLogs(data)
        }
    }, [status, data])

    if (isLoading) return <div className="h-dvh w-dvw flex items-center justify-center"><Spinner /></div>

    return (
        <div className="flex h-screen w-full flex-col items-start justify-start lg:flex-row">
            <AllLogs ActiveLog={ActiveLog} setActiveLog={setActiveLog} />
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
    )
}
const HomePage = () => {
    return (
        <SideBarLayout>
            <HomePageContent />
        </SideBarLayout>
    )
}

function Spinner() {
    return (
        <svg className="h-10 w-10 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    )
}
export default HomePage
