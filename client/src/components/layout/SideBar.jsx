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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore } from "../../stores/app.store.js";
import Logo from "../ui/Logo";
import {
    IconBrandTabler,
    IconPencilPlus,
    IconUser,
} from "@tabler/icons-react";
import { useAuth } from "../../stores/user.store.js";
import Navbar from "./Navbar.jsx";
import MyButton from "../ui/Button.jsx";
import { Button } from "../ui/button.jsx";
import HamburgerButton from "../ui/HamburgerButton.jsx";
import { motion } from "motion/react"
import { Dumbbell, LogOutIcon } from "lucide-react";
import { useToast } from "../ui/Toast.jsx";

// UserInfo component  — receives avatarUrl + fullName from parent

const UserInfo = ({ avatarUrl, fullName }) => {
    const { addToast } = useToast();
    async function handleLogout() {
        try {
            await axios.post("/user/logout")
        } catch (err) {
            const message = err.response?.data.message || err.response?.data.error || err.message || "Something went wrong. Please try again."
            addToast(message, "error");
            console.log(err)
        }
    }
    return <div className="border-t border-gray-100 px-3 py-4" >
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
        <div onClick={handleLogout}>
            <LogOutIcon />
        </div>
    </div >
};

const Sidebar = ({ avatarUrl, fullName, className = "" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const setCurPage = useAppStore((s) => s.setCurPage); // zustand
    const userId = useAuth((s) => s.userId);

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
