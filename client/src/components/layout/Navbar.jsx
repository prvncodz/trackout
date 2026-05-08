import Logo from "../ui/Logo";
import "../../index.css";

const Navbar = ({ children, className = "", ...props }) => {
    return (
        <nav
            className={`sticky top-0 z-20 flex h-16 w-full shrink-0 items-center overflow-x-hidden justify-between border-b border-gray-200 bg-neutral-50/60 px-4 py-2 backdrop-blur-lg md:h-18 lg:px-50 ${className}`}
            {...props}
        >
            <Logo />
            {children}
        </nav>
    );
};

export default Navbar;
