import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../../stores/app.store.js";
import Logo from "../ui/Logo";
import { IconChartLine, IconHome2, IconUser } from "@tabler/icons-react";
import gymimage from "../../assets/gym-hero.jpg"

//Nav items
const NAV_ITEMS = [
    { label: "Home", icon: IconHome2, path: "/", page: "home" },
    { label: "Dashboard", icon: IconChartLine, path: "/dashboard", page: "dashboard" },
    { label: "Profile", icon: IconUser, path: "/profile", page: "profile" },
];

// UserInfo component  — receives avatarUrl + fullName from parent

const UserInfo = ({ avatarUrl, fullName }) => (
    <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={fullName}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-200 shrink-0"
                />
            ) : (
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
                    {fullName?.[0]?.toUpperCase() ?? "U"}
                </div>
            )}
            <span className="text-[13px] font-medium text-gray-700 truncate">
                {fullName ?? "User"}
            </span>
        </div>
    </div>
);

const Sidebar = ({ avatarUrl, fullName }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const setCurPage = useAppStore((s) => s.setCurPage); // zustand

    const handleNav = (item) => {
        setCurPage(item.page);
        navigate(item.path);
    };

    return (
        <div className="w-85 h-screen flex flex-col bg-white border-r border-line-color  ">
            <div className="mt-5 ml-0 w-full flex flex-start px-4">
                <Logo className={"text-gray-800 font-extrabold text-xl"} />
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 pt-1 space-y-0.8 mt-10 ml-1 ">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.page}
                            onClick={() => handleNav(item)}
                            className={`
                w-full flex items-center gap-3 px-3 py-4 rounded-lg text-left
                text-lg font-medium transition-all duration-150
                ${isActive
                                    ? "bg-gray-50 text-gray-800 border border-line-color"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                }
              `}
                        >
                            <Icon
                                size={24}
                                strokeWidth={isActive ? 2 : 1}
                                className={isActive ? "text-gray-700" : "text-gray-400"}
                            />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* User info pinned to bottom */}
            <UserInfo avatarUrl={avatarUrl} fullName={fullName} />
        </div>
    );
};

const SideBarLayout = ({ children }) => {
    return (
        <div className="bg-neutral-50 h-screen w-screen flex overflow-hidden ">
            <Sidebar avatarUrl={gymimage} fullName={"praveen pradhan"} />
            <div>
                {children}
            </div>
        </div>
    )
}

export default SideBarLayout
