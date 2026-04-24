import { useNavigate } from "react-router-dom";
import Logo from "../ui/Logo"
import "../../index.css"

const Navbar = ({ children }) => {


    return (
        <nav className="sticky top-0 z-20 w-full h-16 bg-neutral-50/60 flex justify-between items-center  px-4 md:h-18 lg:px-40 py-2 border-b border-gray-200 backdrop-blur-lg">
            <Logo />
            {children}
        </nav>
    )
}

export default Navbar
