import { Dumbbell, LucideProps } from "lucide-react"
import Logo from "../ui/Logo"
import { IconBrandTabler, IconUser } from "@tabler/icons-react"
import { UserInfo } from "../layout/SideBar"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { motion } from "motion/react"

const DashboardMockup = () => {
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
        console.log("item:", item)
    }

    return (
        <div className="my-20 ml-15 flex h-150 w-300 cursor-default items-center overflow-hidden rounded-lg select-none lg:ml-0 lg:w-auto bg-neutral-200">
            <div className={`border-line-color flex h-full w-90 shrink-0 flex-col border-r bg-white p-3 dark:bg-near-black dark:border-gray-800`}>
                <div className="flex-start mt-3 ml-0 flex w-full px-4">
                    <Logo className={"text-[13px] font-extrabold text-gray-800 antialiased"} size={"sm"} />
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
                <UserInfo avatarUrl={"/mock-user-pfp"} fullName={"Bruce wayne"} />
            </div>

        </div>
    )
}

export default DashboardMockup
