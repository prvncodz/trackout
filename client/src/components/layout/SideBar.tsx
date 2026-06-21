import { useNavigate, useLocation } from "react-router-dom"
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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore, useThemeStore } from "../../stores/app.store"
import Logo from "../ui/Logo"
import {
    IconBrandTabler,
    IconLogout,
    IconMoon,
    IconPencilPlus,
    IconSettings,
    IconSun,
    IconTrash,
    IconUser,
} from "@tabler/icons-react"
import Navbar from "./Navbar"
import MyButton from "../ui/MyButton"
import { Button } from "../ui/button"
import HamburgerButton from "../ui/HamburgerButton"
import { motion } from "motion/react"
import { Dumbbell, LucideProps } from "lucide-react"
import { Dispatch, ForwardRefExoticComponent, RefAttributes, SetStateAction, useEffect, useState } from "react"
import { useAuth, useStats } from "../../stores/user.store"
import axios from "../../lib/axios"
import { toast } from "sonner"
import { useCreateLog } from "@/hooks/useLog"

function Spinner() {
    return (
        <svg className="h-10 w-10 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    )
}
const Popup = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [showLogoutDailogue, setShowLogoutDailogue] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [isDeletingUser, setIsDeletingUser] = useState(false)
    const setUser = useAuth((state) => state.setUser)
    const setIsUserLogged = useAuth((state) => state.setIsUserLogged)
    const setActiveDates = useAuth((state) => state.setActiveDates)
    const setCurPage = useAppStore((state) => state.setCurPage)
    const theme = useThemeStore((state) => state.theme)
    const setTheme = useThemeStore((state) => state.setTheme)
    const setStats = useStats((state) => state.setStats)
    const setLoading = useAppStore((state) => state.setLoading);
    const navigate = useNavigate()
    const nextTheme = theme === "dark" ? "light" : "dark"

    async function handleLogout() {
        if (isLoggingOut) return
        setIsLoggingOut(true)
        try {
            await axios.post("/user/logout")
            setUser(null)
            useAuth.persist.clearStorage()
            setIsOpen(false)
            setIsUserLogged(false)
            setActiveDates([])
            toast.success("Logged out successfully")
            setStats(null)
            setLoading(true)
            setTimeout(() => {
                setCurPage("home")
                navigate("/")
                setLoading(false)
            }, 200)
        } catch (err: any) {
            const message = err.response?.data.message || err.message || "Something went wrong. Please try again."
            toast.error(message)
            setIsLoggingOut(false)
        }
    }

    async function handleDeleteUser() {
        if (isDeletingUser) return
        setIsDeletingUser(true)
        try {
            await axios.delete("/user/delete-user")
            setUser(null)
            setIsOpen(false)
            setIsUserLogged(false)
            setActiveDates([])
            useAuth.persist.clearStorage()
            setCurPage("home")
            setStats(null)
            toast.success("User deleted successfully")
            setLoading(true)
            setTimeout(() => {
                setCurPage("home")
                navigate("/")
                setLoading(false)
            }, 200)
        } catch (err: any) {
            const message = err.response?.data.message || err.message || "Something went wrong. Please try again."
            toast.error(message)
            setIsDeletingUser(false)
        }
    }


    return (
        <motion.ul
            className="menu dropdown-content absolute top-10 right-1 md:-top-35 z-10 mt-0 w-44 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-neutral-900 dark:text-line-color dark:shadow-none"
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
                duration: 0.3
            }}
        >
            <button
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100  dark:hover:bg-neutral-800 dark:text-line-color"
                onClick={() => setTheme(nextTheme)}
            >
                {theme === "dark" ? (
                    <IconSun size={18} className="text-gray-700 dark:text-line-color" />
                ) : (
                    <IconMoon size={18} className="text-gray-700 dark:text-line-color" />
                )}
                {theme === "dark" ? "Light theme" : "Dark theme"}
            </button>

            <Dialog open={showLogoutDailogue} onOpenChange={setShowLogoutDailogue}>
                <DialogTrigger asChild>
                    <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100  dark:hover:bg-neutral-800 dark:text-line-color">
                        <IconLogout size={18} className="text-gray-700 dark:text-line-color" />
                        Logout user
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Logout user</DialogTitle>
                        <DialogDescription>Are you sure you want to logout?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="button" onClick={handleLogout} disabled={isLoggingOut}>
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogTrigger asChild>
                    <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30">
                        <IconTrash size={18} />
                        Delete user
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <IconTrash />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Delete user?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete your account and progress.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleDeleteUser} disabled={isDeletingUser}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.ul>
    )
}

// UserInfo component  — receives avatarUrl + fullName from parent

interface UserInfoProps {
    avatarUrl?: string;
    fullName?: string;
}

const UserInfo = ({ avatarUrl, fullName }: UserInfoProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="flex items-center justify-between border-t border-gray-100 px-3 py-4 dark:border-gray-800">
            <div className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-gray-50">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={fullName}
                        className="size-9 shrink-0 rounded-full object-cover ring-1 ring-gray-200"
                    />
                ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                        {fullName?.[0]?.toUpperCase() ?? "U"}
                    </div>
                )}
                <motion.span
                    className="truncate text-sm font-medium text-gray-700 antialiased dark:text-line-color"
                    whileHover={{
                        x: 5,
                    }}
                >
                    {fullName ?? "Username"}
                </motion.span>
            </div>
            <div className="relative">
                <IconSettings onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-line-color" />
                {isOpen && <Popup setIsOpen={setIsOpen} />}
            </div>
        </div>
    )
}

interface SidebarProps {
    avatarUrl?: string;
    fullName?: string;
    className?: string;
}

const Sidebar = ({ avatarUrl, fullName, className = "" }: SidebarProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const setCurPage = useAppStore((s) => s.setCurPage) // zustand
    //Nav items
    const NAV_ITEMS = [
        { label: "Home", icon: Dumbbell, path: "/", page: "home" },
        {
            label: "Dashboard",
            icon: IconBrandTabler,
            path: `/dashboard`,
            page: "dashboard",
        },
        {
            label: "Profile",
            icon: IconUser,
            path: `/profile`,
            page: "profile",
        },
    ]

    const handleNav = (item: {
        label: string,
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
        path: string,
        page: string,
    }) => {
        setCurPage(item.page)
        navigate(item.path)
    }

    return (
        <div className={`border-line-color flex h-screen w-90 shrink-0 flex-col border-r bg-white p-3 dark:bg-near-black dark:border-gray-800 ${className}`}>
            <div className="flex-start mt-3 ml-0 flex w-full px-4">
                <Logo className={"text-xl font-extrabold text-gray-800 antialiased"} />
            </div>

            {/* Nav */}
            <nav className="space-y-0.9 mt-10 ml-1 flex-1 gap-3 px-3 pt-1">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path

                    return (
                        <button
                            key={item.page}
                            onClick={() => handleNav(item)}
                            className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-3.5 text-left text-lg font-medium transition-all duration-200 ${isActive
                                ? "border-line-color border bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-near-black dark:text-line-color"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:hover:bg-neutral-800 dark:hover:text-line-color"
                                } `}
                        >
                            <Icon
                                size={23}
                                strokeWidth={isActive ? 2 : 1}
                                className={isActive ? "text-gray-700 antialiased dark:text-line-color" : "text-gray-400 antialiased"}
                            />
                            <motion.div
                                whileHover={{
                                    x: 5,
                                }}
                                className="w-full subpixel-antialiased"
                            >
                                {item.label}
                            </motion.div>
                        </button>
                    )
                })}
            </nav>

            {/* User info pinned to bottom */}
            <UserInfo avatarUrl={avatarUrl} fullName={fullName} />
        </div>
    )
}



const NavbarForMobile = ({ className = "" }) => {
    const curPage = useAppStore((state) => state.curPage)
    const userId = useAuth((state) => state.user?._id)
    const [isCreating, setIsCreating] = useState(false)
    const [logName, setLogName] = useState("")
    const [isOpen,setIsOpen] = useState(false)

    const { mutate: createLog, isPending: isCreatingLog, isSuccess: isCreated, isError } = useCreateLog(userId, {
        onSuccess: () => setIsCreating(false),
        onError: () => setIsCreating(false),
    })

    useEffect(() => {
        if (isCreated || isError) setIsCreating(false)
    }, [isCreated, isError])



    return (
        <Navbar className={`${className} relative w-full`}>
            {/*for mobile & tablets view */}
            <div className="flex items-center justify-between gap-3">
                {curPage === "home" && (
                    <Dialog open={isCreating} onOpenChange={setIsCreating}>
                        <DialogTrigger asChild>
                            <MyButton className="dark:bg-line-color">
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
                                    Make a workout log. Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                if (isCreatingLog) return
                                createLog(logName);
                            }}>
                                <FieldGroup>
                                    <Field>
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" value={logName} onChange={(e) => setLogName(e.target.value)} />
                                    </Field>
                                </FieldGroup>
                                <DialogFooter className="mt-7">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={isCreatingLog}>Save changes</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                )}

                <div className="relative">
                    <IconSettings onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-line-color" />
                    {isOpen && <Popup setIsOpen={setIsOpen} />}
                </div>
                <HamburgerButton className="text-gray-700 dark:bg-line-color" />
            </div>
        </Navbar >
    )
}

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
    const user = useAuth((state) => state.user)
    const loading = useAppStore((state) => state.loading)

    if (loading) return <div className="h-dvh w-dvw flex items-center justify-center">
        <Spinner />
    </div>

    return (
        <motion.div
            className="flex h-screen w-full flex-col overflow-hidden bg-neutral-50 lg:flex-row dark:bg-near-black"
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.3,
            }}
        >
            <Sidebar avatarUrl={user?.avatar?.url} fullName={user?.fullname} className={"hidden lg:flex"} />
            {/*for desktop view */}
            <NavbarForMobile className={"lg:hidden"} />
            {/*for mobile view */}

            <div className="no-scrollbar flex w-full overflow-hidden">{children}</div>
        </motion.div>
    )
}

export default SideBarLayout
