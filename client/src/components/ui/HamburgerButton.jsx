import { IconChartLine, IconHome2, IconMenu2, IconUser } from "@tabler/icons-react"
import { useState } from "react";
import { useAppStore } from "../../stores/app.store";
import { useAuth } from "../../stores/user.store";
import { useNavigate } from "react-router-dom";

const HamburgerButton = ({ className = "", ...props }) => {
    const setCurPage = useAppStore((s) => s.setCurPage);
    const userId = useAuth(s => s.userId);
    const navigate = useNavigate();

    //Nav items
    const NAV_ITEMS = [
        { label: "Home", icon: IconHome2, path: "/", page: "home" },
        { label: "Dashboard", icon: IconChartLine, path: `/dashboard/${userId}`, page: "dashboard" },
        { label: "Profile", icon: IconUser, path: `/profile/${userId}`, page: "profile" },
    ];

    const handleNav = (item) => {
        setCurPage(item.page);
        navigate(item.path);
    };
    const [isOpen, setIsOpen] = useState(false);
    return (
        <button className={`h-10 w-10 p-2  bg-gray-100 rounded-md flex justify-center items-center cursor-pointer font-semibold hover:bg-neutral-100  transition-all ${className}`} {...props} onClick={() => setIsOpen(!isOpen)}>
            <IconMenu2 size={20} />
            {isOpen &&

                <nav className="flex-1 absolute w-65 shadow-md top-10 right-10 rounded-lg px-3 py-4 space-y-0.8 mt-10 ml-1 bg-gray-100 transition-all">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <li
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
                            </li>
                        );
                    })}
                </nav>
            }

        </button>
    )
}

export default HamburgerButton
