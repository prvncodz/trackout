import Logo from "../ui/Logo"
import "../../index.css"
import React from "react";

type NavbarProps =  {
    className?: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>

const Navbar = ({ children, className = "", ...props }:NavbarProps) => {
    return (
        <nav
            className={`sticky top-0 z-20 flex h-16 w-full shrink-0 items-center justify-between border-b border-gray-200 bg-neutral-50/60 px-4 py-2 backdrop-blur-lg md:h-18 lg:overflow-x-hidden lg:px-50 dark:bg-near-black dark:border-gray-800 ${className}`}
            {...props}
        >
            <Logo />
            {children}
        </nav>
    )
}

export default Navbar
