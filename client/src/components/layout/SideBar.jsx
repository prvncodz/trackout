import { useNavigate, useLocation } from "react-router-dom";
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
import { useAppStore } from "../../stores/app.store.js";
import Logo from "../ui/Logo";
import {
    IconBrandTabler,
    IconDotsVertical,
    IconLogout,
    IconPencilPlus,
    IconTrash,
    IconUser,
} from "@tabler/icons-react";
import Navbar from "./Navbar.jsx";
import MyButton from "../ui/Button.jsx";
import { Button } from "../ui/button.jsx";
import HamburgerButton from "../ui/HamburgerButton.jsx";
import { motion } from "motion/react"
import { Dumbbell, LogOutIcon } from "lucide-react";
import { useToast } from "../ui/Toast.jsx";
import { useState } from "react";
import { useAuth, useStats } from "../../stores/user.store.js";
import axios from "../../lib/axios.js";

const Popup = ({ setIsOpen }) => {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showLogoutDailogue, setShowLogoutDailogue,] = useState(false);
    const setUser = useAuth(state => state.setUser)
    const setIsUserLogged = useAuth(state => state.setIsUserLogged)
    const setActiveDates = useAuth(state => state.setActiveDates)
    const setCurPage = useAppStore(state => state.setCurPage)
    const setStats = useStats(state => state.setStats)

    async function handleLogout() {
        try {
            await axios.post("/user/logout")
            setUser({})
            setIsOpen(false)
            setIsUserLogged(false)
            setActiveDates([])
            setCurPage("home")
            setStats({})
        } catch (err) {
            const message = err.response?.data.message || err.response?.data.error || err.message || "Something went wrong. Please try again."
            // addToast(message, "error");
            console.log(err)
        }
    }

    async function handleDeleteUser() {
        try {
            await axios.delete("/user/delete-user")
            setUser({})
            setIsOpen(false)
            setIsUserLogged(false)
            setActiveDates([])
            setCurPage("home")
            setStats({})
        } catch (err) {
            const message = err.response?.data.message || err.response?.data.error || err.message || "Something went wrong. Please try again."
            // addToast(message, "error");
            console.log(err)
        }
    }

    return (
        <motion.ul
            className="menu dropdown-content z-10 mt-0 w-44 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg absolute bottom-10 right-1"
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

            <Dialog open={showLogoutDailogue} onOpenChange={setShowLogoutDailogue}>
                <DialogTrigger asChild>
                    <button
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 w-full"
                    >
                        <IconLogout size={18} className="text-gray-700" />
                        Logout user
                    </button>

                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Logout user</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to logout?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="button" onClick={handleLogout}>Logout</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-2 rounded-xl px-3 py-2 w-full text-sm text-red-500 hover:bg-red-50">
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
                    <AlertDialogFooter >
                        <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={handleDeleteUser}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.ul >
    );
};

// UserInfo component  — receives avatarUrl + fullName from parent

const UserInfo = ({ avatarUrl, fullName }) => {
    const { addToast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    return <div className="border-t border-gray-100 px-3 py-4 flex justify-between items-center" >
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
            <motion.span className="truncate text-sm font-medium text-gray-700 antialiased"
                whileHover={{
                    x: 5
                }}
            >
                {fullName ?? "Username"}
            </motion.span>
        </div>
        <div className="relative">
            <IconDotsVertical onClick={() => setIsOpen(!isOpen)} />
            {isOpen && <Popup setIsOpen={setIsOpen} />}
        </div>

    </div >
};

const Sidebar = ({ avatarUrl, fullName, className = "" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const setCurPage = useAppStore((s) => s.setCurPage); // zustand
    const userId = useAuth((s) => s.user?._id);

    //Nav items
    const NAV_ITEMS = [
        { label: "Home", icon: Dumbbell, path: "/", page: "home" },
        {
            label: "Dashboard",
            icon: IconBrandTabler,
            path: `/dashboard/${userId}`,
            page: "dashboard",
        },
        {
            label: "Profile",
            icon: IconUser,
            path: `/profile/${userId}`,
            page: "profile",
        },
    ];

    const handleNav = (item) => {
        setCurPage(item.page);
        navigate(item.path);
    };

    return (
        <div
            className={`border-line-color flex h-screen w-90 shrink-0 flex-col border-r bg-white p-3 ${className}`}
        >
            <div className="flex-start mt-3 ml-0 flex w-full px-4">
                <Logo className={"text-xl font-extrabold text-gray-800 antialiased"} />
            </div>

            {/* Nav */}
            <nav className="space-y-0.9 mt-10 ml-1 flex-1 px-3 pt-1 gap-3">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.page}
                            onClick={() => handleNav(item)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3.5 text-left text-lg font-medium transition-all duration-200 cursor-pointer ${isActive
                                ? "border-line-color border bg-gray-50 text-gray-800"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                } `}
                        >
                            <Icon
                                size={23}
                                strokeWidth={isActive ? 2 : 1}
                                className={isActive ? "text-gray-700 antialiased" : " antialiased text-gray-400"}
                            />
                            <motion.div
                                whileHover={{
                                    x: 5
                                }}
                                className="w-full subpixel-antialiased"
                            >
                                {item.label}
                            </motion.div>
                        </button>
                    );
                })}
            </nav>

            {/* User info pinned to bottom */}
            <UserInfo avatarUrl={avatarUrl} fullName={fullName} />
        </div>
    );
};

const NavbarForMobile = ({ className }) => {
    const curPage = useAppStore((s) => s.curPage);
    return (
        <Navbar className={`${className} relative w-full`}>
            {/*for mobile & tablets view */}
            <div className="flex items-center justify-between gap-3">
                {curPage === "home" && (
                    <Dialog>
                        <form>
                            <DialogTrigger asChild>
                                <MyButton>
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
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" name="name" defaultValue="" />
                                    </Field>
                                </FieldGroup>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                )}
                <HamburgerButton className="text-gray-700" />
            </div>
        </Navbar>
    );
};

const SideBarLayout = ({ children }) => {
    const user = useAuth((s) => s.user);

    return (
        <motion.div
            className="flex h-screen w-full overflow-hidden flex-col bg-neutral-50 lg:flex-row"
            exit={{
                opacity: 0,
                duration: 0.3
            }}
        >
            <Sidebar
                avatarUrl={user?.avatar?.url}
                fullName={user?.fullname}
                className={"hidden lg:flex"}
            />
            {/*for desktop view */}
            <NavbarForMobile className={"lg:hidden"} />
            {/*for mobile view */}

            <div className="flex w-full no-scrollbar overflow-hidden">{children}</div>
        </motion.div>
    );
};

export default SideBarLayout;
