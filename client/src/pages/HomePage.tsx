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
    IconTrash,
} from "@tabler/icons-react"
import SideBarLayout from "../components/layout/SideBar"
import MyButton from "../components/ui/MyButton"
import { Button } from "../components/ui/button"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
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
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../stores/user.store"
import useLogStore from "../stores/log.store"
import type { Log } from "../types/Log.types"
import type { Exercise } from "@/types/Exercise.types"
import type { Set } from "@/types/Set.types"
import { fetchAllLogs, useCreateLog, useDeleteLog, useDuplicateLog, useEditLog, useGetlogById, useMarkLogCompleted } from "@/hooks/useLog"
import { useCreateExercise, useDeleteExercise, useUpdateExercise } from "@/hooks/useExercise"
import { useCreateSet, useDeleteSet, useToggleSetDone, useUpdateSet } from "@/hooks/useSet"
import { CreateSetInput } from "@/schemas/set.schema"

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
    const { mutate: editLog, isPending: isEditing } = useEditLog(log?._id, userId)

    useEffect(() => {
        if (isDuplicating || isDeleting || isEditing) {
            setIsOpen(false)
            setEditing(false)
            setShowDeleteAlert(false)
        }
    }, [isDuplicating, isDeleting, isEditing])


    return (
        <motion.ul
            className="menu dropdown-content shadow-euphonious absolute top-10 right-1 z-10 mt-0 w-44 rounded-2xl border border-neutral-200 bg-white p-2 dark:border-gray-800 dark:bg-neutral-900 dark:text-line-color dark:shadow-none"
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
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
                        if (isEditing) return
                        const name: string = e.currentTarget.logName.value;
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
                            <Button type="submit" disabled={isEditing}>Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <button
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => {
                    if (isDuplicating) return
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
                disabled={isDuplicating}
            >
                <IconCopy size={18} />
                Duplicate log
            </button>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogTrigger asChild>
                    <button
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
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
                        <AlertDialogAction variant="destructive" disabled={isDeleting} onClick={() => {
                            if (isDeleting) return
                            toast.promise(
                                () =>
                                    deleteLog(),
                                {
                                    loading: "Deleting log...",
                                    success: () => `Log deleted successfully`,
                                    error: "Error while deleting log",
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
}
const Log = ({ log }: LogProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const activeLog = useLogStore((state) => state.activeLog)
    const setActiveLog = useLogStore((state) => state.setActiveLog)

    return (
        <div
            className={`border-line-color flex h-auto w-full cursor-pointer justify-between rounded-xl border bg-neutral-50 px-3 py-3 text-neutral-500 dark:border-gray-800 dark:bg-near-black dark:text-line-color ${activeLog === log?._id ? " bg-neutral-100 dark:bg-neutral-900" : ""}`}
        >
            <IconNotes
                className="text-neutral-500 dark:text-line-color"
                onClick={() => setActiveLog(activeLog === null ? log._id : activeLog == log?._id ? null : log?._id)}
            />
            <h3
                className="ml-5 w-full truncate text-left text-base text-neutral-700 dark:text-line-color"
                onClick={() => setActiveLog(activeLog === null ? log._id : activeLog == log?._id ? null : log?._id)}
            >
                {log?.logName || "Log title"} {" "}
            </h3>
            <div className="relative">
                <IconDotsVertical onClick={() => setIsOpen(!isOpen)} />
                {isOpen ? <Popup log={log} setIsOpen={setIsOpen} /> : null}
            </div>
        </div>
    )
}


const AllLogs = () => {
    const [isCreating, setIsCreating] = useState(false)
    const [logName, setLogName] = useState("")
    const logs = useLogStore((state) => state.logs)
    const userId = useAuth((state) => state.user?._id)
    const { mutate: createLog, isPending: isCreatingLog } = useCreateLog(userId, {
        onSuccess: () => setIsCreating(false),
        onError: () => setIsCreating(false),
    })


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

    if (isLoading) return <div className="h-dvh w-dvw flex items-center justify-center dark:bg-near-black dark:text-line-color"><Spinner /></div>

    return (
        <div className="border-line-color relative flex h-screen w-full shrink-0 flex-col items-end justify-start gap-3 overflow-auto border-r bg-neutral-50 px-5 pt-10 pb-20 no-scrollbar lg:w-180 lg:pb-10 dark:bg-near-black dark:border-gray-800 ">
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogTrigger asChild>
                    <MyButton className="hidden lg:flex dark:bg-line-color">
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
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (isCreatingLog) return
                        createLog(logName);
                    }}>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="logName">Name</Label>
                                <Input id="logName" value={logName} onChange={(e) => setLogName(e.target.value)} />
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="mt-7">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isCreatingLog}>Confirm</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="flex h-screen w-full flex-col items-center justify-start gap-2 lg:mt-15">
                {logs.length ?
                    logs?.map((log) => (
                        <Log
                            key={log._id}
                            log={log}
                        />
                    )) : (
                        <div className="antialiased text-gray-600 dark:text-gray-400">
                            No logs yet created by user.
                        </div>
                    )}
            </div>
        </div >
    )
}



interface ExerciseCardProps {
    exercise: Exercise;
    logId: string;
    className?: string;
    completed?: boolean;
}

const ExerciseCard = ({ exercise, logId, className = "", completed }: ExerciseCardProps) => {
    const [editMode, setEditMode] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [toBeUpdatedSets, setToBeUpdatedSets] = useState<Set[] | null>(null)
    const [isExerciseUpdated, setIsExerciseUpdated] = useState(false)
    const [exerciseInfo, setExerciseInfo] = useState<{ note?: string, name: string }>({ note: exercise.note, name: exercise.name })
    const activeLog = useLogStore((state) => state.activeLog)


    const { mutateAsync: deleteExercise, isPending: isDeletingExercise } = useDeleteExercise(logId, activeLog)
    const { mutate: updateExercise, isPending: isUpdatingExercise } = useUpdateExercise(activeLog, exercise._id)
    const { mutate: updateSet, isPending: isUpdatingSet } = useUpdateSet(activeLog, exercise._id)
    const { mutate: toggleSetMarked, isPending: isTogglingSet } = useToggleSetDone(activeLog, exercise?._id)
    const { mutate: createSet, isPending: isCreatingSet } = useCreateSet(exercise?._id, activeLog, {
        onSuccess: () => {
            setIsCreating(false)
            setIsOpen(false)
        },
        onError: () => {
            setIsCreating(false)
            setIsOpen(false)
        },
    })
    const { mutate: deleteSet, isPending: isDeletingSet } = useDeleteSet(exercise?._id, activeLog)

    function handleUpdateExercise() {
        if (isUpdatingExercise || isUpdatingSet) return
        if (isExerciseUpdated) {
            updateExercise(exerciseInfo)
        }
        if (toBeUpdatedSets?.length) {
            toBeUpdatedSets?.map(set => {
                updateSet({ setId: set._id, reps: set.reps, weight: set.weight, rest: set.rest })
            })
        }
        setEditMode(false)
    }

    function handleAddSetToBeChanged(set: Set, id: string, field: string, value: number | string) {
        const listed = toBeUpdatedSets?.some((obj: Set) => obj._id === id)
        if (!listed) {
            setToBeUpdatedSets((prev) => [...prev ?? [], { ...set, [field]: value }])
        } else {
            setToBeUpdatedSets((prev) => prev?.map((obj) => (obj._id === id ? { ...set ?? [], [field]: value } : obj)) ?? prev)
        }
    }

    return (
        <div className={`w-full max-w-3xl bg-neutral-50 p-5 dark:bg-near-black dark:text-line-color ${className}`}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col items-start">
                    {editMode ? (
                        <input
                            value={exerciseInfo.name}
                            onChange={(e) => {
                                setIsExerciseUpdated(true)
                                setExerciseInfo({ ...exerciseInfo, name: e.target.value })
                            }}
                            className="border-b border-neutral-300 text-lg font-semibold outline-none dark:border-gray-700 dark:bg-near-black dark:text-line-color"
                        />
                    ) : (
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-line-color">{exercise?.name}</h2>
                    )}

                    {editMode ? (
                        <div className="flex items-center justify-center gap-2">
                            <IconClipboardText size={18} />
                            <input
                                value={exerciseInfo.note}
                                onChange={(e) => {
                                    setIsExerciseUpdated(true)
                                    setExerciseInfo({ ...exerciseInfo, note: e.target.value })
                                }}
                                className="mt-1 border-b border-neutral-300 text-sm text-neutral-500 outline-none dark:border-gray-700 dark:bg-near-black dark:text-line-color"
                            />
                        </div>
                    ) : (
                        <p className="mt-1 flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-line-color">
                            <IconClipboardText size={18} />
                            <span>
                                {exercise?.note || ""}
                            </span>
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {editMode && <MyButton onClick={handleUpdateExercise} disabled={isUpdatingExercise || isUpdatingSet}>save</MyButton>}
                    {/* Menu */}
                    <div className="dropdown dropdown-end relative">
                        {!completed && (
                            <button
                                className="relative flex size-10 cursor-pointer items-center justify-center rounded-xl bg-gray-50 p-2 transition dark:bg-neutral-900 dark:text-line-color"
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
                                className="menu dropdown-content absolute top-10 right-1 z-10 mt-2 w-44 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl dark:border-gray-800 dark:bg-neutral-900 dark:text-line-color dark:shadow-none"
                            >
                                <button
                                    onClick={() => {
                                        setEditMode(!editMode)
                                        setIsOpen(false)
                                    }}
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                >
                                    <IconPencil size={18} />
                                    {editMode ? "Disable edit" : "Edit exercise"}
                                </button>

                                <Dialog open={isCreating} onOpenChange={setIsCreating}>
                                    <DialogTrigger asChild>
                                        <button
                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            if (isCreatingSet) return
                                            const data = Object.fromEntries(new FormData(e.currentTarget)) as any
                                            const setNo = exercise?.sets?.length + 1
                                            data.setNo = setNo
                                            createSet(data as CreateSetInput)
                                        }}>
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
                                                <Button type="submit" disabled={isCreatingSet}>Confirm</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
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
                                            <AlertDialogAction variant="destructive" disabled={isDeletingExercise} onClick={() => {
                                                if (isDeletingExercise) return
                                                toast.promise(
                                                    deleteExercise(exercise._id),
                                                    {
                                                        loading: "Deleting exercise...",
                                                        success: () => `exercise deleted successfully`,
                                                        error: "Error while deleting exercise",
                                                    }
                                                )
                                            }}>
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
            <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-100 dark:border-gray-800">
                {/* Header */}
                <div className="grid grid-cols-5 border-b border-neutral-100 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-500 dark:border-gray-800 dark:bg-neutral-900 dark:text-gray-300">
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
                    exercise?.sets?.map((set: Set) => (
                        <div
                            key={set?._id}
                            className="grid grid-cols-5 items-center border-b border-neutral-100 px-4 py-4 last:border-none dark:border-gray-800"
                        >
                            <span className="font-medium text-neutral-700 dark:text-line-color">{String(set?.setNo).padStart(2, "0")}</span>

                            {/* Reps */}
                            {editMode ? (
                                <input
                                    type="number"
                                    defaultValue={set.reps}
                                    onChange={(e) => handleAddSetToBeChanged(set, set._id, "reps", Number(e.target.value))}
                                    className="w-14 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none dark:border-gray-700 dark:bg-neutral-900 dark:text-line-color"
                                />
                            ) : (
                                <span>{set?.reps}</span>
                            )}

                            {/* KG */}
                            {editMode ? (
                                <input
                                    type="number"
                                    defaultValue={set.weight}
                                    onChange={(e) => handleAddSetToBeChanged(set, set._id, "weight", Number(e.target.value))}
                                    className="w-14 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none dark:border-gray-700 dark:bg-neutral-900 dark:text-line-color"
                                />
                            ) : (
                                <span>{set?.weight}</span>
                            )}

                            {/* Rest */}
                            {editMode ? (
                                <input
                                    defaultValue={set.rest}
                                    onChange={(e) => handleAddSetToBeChanged(set, set._id, "rest", e.target.value)}
                                    className="w-16 rounded-lg border border-neutral-200 px-2 py-1 text-sm outline-none dark:border-gray-700 dark:bg-neutral-900 dark:text-line-color"
                                />
                            ) : (
                                <span>{set.rest}</span>
                            )}

                            {editMode ? (
                                <div onClick={() => {
                                    if (isDeletingSet) return
                                    deleteSet(set._id)
                                }}>
                                    <IconTrash
                                        size={18}
                                        className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => {
                                            if (isTogglingSet) return
                                            toggleSetMarked(set._id)
                                        }}
                                        disabled={isTogglingSet}
                                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${set.completed ? "border-black bg-black text-white dark:border-line-color dark:bg-line-color dark:text-near-black" : "border-neutral-300 dark:border-gray-600"
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


interface ShowLogProps {
    logId: string,
    isActive: boolean,
    className?: string;
}

const ShowLog = ({ logId, isActive, className = "" }: ShowLogProps) => {
    const activeLog = useLogStore((state) => state.activeLog)
    const setActiveLog = useLogStore((state) => state.setActiveLog)
    const [addingExercise, setAddingExercise] = useState(false)
    const { data, status } = useQuery({ queryKey: ['log', activeLog], queryFn: () => useGetlogById(activeLog) })
    const { mutate: createExercise, isPending: isCreatingExercise } = useCreateExercise(logId, activeLog, {
        onSuccess: () => setAddingExercise(false),
        onError: () => {
            setAddingExercise(false)
        }
    })
    const { mutateAsync: markLogCompleted, isPending: isMarkingCompleted } = useMarkLogCompleted(logId, activeLog)

    useEffect(() => {
    }, [data, activeLog])


    if (status === "pending") return <div className="h-dvh w-dvw flex items-center justify-center dark:bg-near-black dark:text-line-color"><Spinner /></div>

    return (
        <div className="w-full h-dvh dark:bg-near-black">
            <div className={`h-screen w-full flex-1 overflow-auto ${isActive ? "flex" : "hidden"} hidden lg:flex`}>
                <div className={`h-screen flex-col overflow-auto bg-neutral-50 p-10 ${className} no-scrollbar w-full dark:bg-near-black`}>
                    <div className="flex w-full flex-col">
                        {data?.exercises?.length ?
                            data?.exercises?.map((exercise: Exercise) => (
                                <ExerciseCard
                                    exercise={exercise}
                                    logId={logId}
                                    key={exercise._id}
                                    completed={data?.completedAt ? true : false}
                                />
                            )) :
                            null
                        }
                        <div className="flex gap-3 justify-end">
                            {!data?.completedAt && (
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
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            if (isCreatingExercise) return
                                            const name = e.currentTarget.logName.value,
                                                muscleGroup = e.currentTarget.muscleGroup.value;
                                            createExercise({ name, muscleGroup })
                                        }}>
                                            <FieldGroup>
                                                <Field>
                                                    <Label htmlFor="logName">Name</Label>
                                                    <Input id="logName" name="logName" defaultValue="" required />
                                                </Field>
                                                <Field>
                                                    <Label htmlFor="muscleGroup">MuscleGroup</Label>
                                                    <Input id="muscleGroup" name="muscleGroup" defaultValue="" required />
                                                </Field>
                                            </FieldGroup>
                                            <DialogFooter className="mt-7">
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button type="submit" disabled={isCreatingExercise}>Save Changes</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            )}
                            {data?.exercises?.length ? (
                                <Button variant="outline" disabled={data?.completedAt ? true : isMarkingCompleted} onClick={() => {
                                    if (isMarkingCompleted) return
                                    toast.promise(
                                        markLogCompleted(),
                                        {
                                            loading: "Marking log as completed...",
                                            success: () => `Log marked as completed`,
                                            error: "Error while marking log completed",
                                        }
                                    )
                                }}>
                                    <IconCircleDashedCheck size={18} />{" "}
                                    {data?.completedAt ? "Completed" : "Mark as Completed"}
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
                <div className={`mt-0 h-dvh overflow-auto pb-5 dark:bg-near-black dark:text-line-color ${className}`}>
                    <h1 className="mt-5 ml-5 text-left text-xl font-bold tracking-wide antialiased dark:text-line-color">{data?.logName}</h1>
                    <div className="my-10">
                        {data?.exercises?.length ?
                            data?.exercises?.map((exercise: Exercise) => (
                                <ExerciseCard
                                    exercise={exercise}
                                    logId={logId}
                                    key={exercise._id}
                                    completed={data?.completedAt ? true : false}
                                />
                            )) : null}

                        <div className="flex gap-3 justify-end pr-3">
                            {!data?.completedAt && (
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
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            if (isCreatingExercise) return
                                            const name = e.currentTarget.logName.value,
                                                muscleGroup = e.currentTarget.muscleGroup.value;
                                            createExercise({ name, muscleGroup })
                                        }}>

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
                                                <Button type="submit" disabled={isCreatingExercise}>Save Changes</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            )}
                            {data?.exercises?.length ? (
                                <Button variant="outline" disabled={data?.completedAt ? true : isMarkingCompleted} onClick={() => {
                                    if (isMarkingCompleted) return
                                    toast.promise(
                                        markLogCompleted(),
                                        {
                                            loading: "Marking log as completed...",
                                            success: () => `Log marked as completed`,
                                            error: "Error while marking log completed",
                                        }
                                    )

                                }}>
                                    <IconCircleDashedCheck size={18} />{" "}
                                    {data?.completedAt ? "Completed" : "Mark as Completed"}
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
    const activeLog = useLogStore((state) => state.activeLog)
    return (
        <div className="flex h-screen w-full flex-col items-start justify-start lg:flex-row dark:bg-near-black">
            <AllLogs />
            {activeLog && (
                <>
                    <ShowLog
                        logId={activeLog}
                        isActive={activeLog !== null}
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
