import {
  IconChartLine,
  IconHome2,
  IconMenu2,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { useAppStore } from "../../stores/app.store";
import { useAuth } from "../../stores/user.store";
import { useNavigate } from "react-router-dom";

const HamburgerButton = ({ className = "", ...props }) => {
  const setCurPage = useAppStore((s) => s.setCurPage);
  const userId = useAuth((s) => s.userId);
  const navigate = useNavigate();

  //Nav items
  const NAV_ITEMS = [
    { label: "Home", icon: IconHome2, path: "/", page: "home" },
    {
      label: "Dashboard",
      icon: IconChartLine,
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-gray-100 p-2 font-semibold transition-all hover:bg-neutral-100 ${className}`}
      {...props}
      onClick={() => setIsOpen(!isOpen)}
    >
      <IconMenu2 size={20} />
      {isOpen && (
        <nav className="space-y-0.8 absolute top-10 right-10 mt-10 ml-1 w-65 flex-1 rounded-lg bg-gray-100 px-3 py-4 shadow-md transition-all">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li
                key={item.page}
                onClick={() => handleNav(item)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-4 text-left text-lg font-medium transition-all duration-150 ${
                  isActive
                    ? "border-line-color border bg-gray-50 text-gray-800"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                } `}
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
      )}
    </button>
  );
};

export default HamburgerButton;
