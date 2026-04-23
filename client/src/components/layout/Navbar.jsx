import { useNavigate } from "react-router-dom";
import Button from "../ui/Button"
import Logo from "../ui/Logo"
import { Link } from "react-scroll"
import "../../index.css"

const Navbar = () => {
    const navigate = useNavigate();


    return (
        <nav className="sticky top-0 z-20 w-full h-16 bg-neutral-50/60 flex justify-between items-center  px-4 md:h-18 lg:px-40 py-2 border-b border-gray-200 backdrop-blur-lg transparent">
            <Logo />
            <ul className="hidden  md:flex items-center gap-10">
                <Link
                    className="text-base text-neutral-500   cursor-pointer hover:text-gray-800 active:text-gray-900 ease-in-out transition-colors"
                    to="home"
                    smooth={true}
                    offset={-240}
                    duration={300}
                    activeClass="active"
                    spy={true}
                >
                    Home
                </Link>
                <Link
                    className="text-base text-neutral-500  cursor-pointer hover:text-gray-800 active:text-gray-900 ease-in-out transition-colors"
                    to="features"
                    smooth={true}
                    offset={-140} duration={300} activeClass="active"
                    spy={true}
                >
                    Features
                </Link>
                <Link
                    className="text-base text-neutral-500 ext-gray-600   cursor-pointer hover:text-gray-800 active:text-gray-900 ease-in-out transition-colors"
                    to="how-it-works"
                    smooth={true}
                    offset={-70} duration={300} activeClass="active"
                    spy={true}
                >
                    How it works
                </Link>
            </ul>
            <div className="flex justify-center items-center gap-2 md:gap-6">
                <button className="h-9 w-auto p-2 px-4 bg-near-black text-gray-200 rounded-md flex justify-center items-center  font-semibold  md:text-neutral-500 md:bg-neutral-50 md:font-normal hover:text-gray-800 cursor-pointer" onClick={() => navigate("/signin")}>Log in </button>
                <Button onClick={() => navigate("/signin")} className="hidden md:block">
                    Get started
                </Button>
            </div>
        </nav>
    )
}

export default Navbar
