import { useNavigate } from "react-router-dom";
import Button from "../ui/Button"
import Logo from "../ui/Logo"
import { Link } from "react-scroll"

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-20 w-full h-18 bg-neutral-50/60 flex justify-between items-center px-40 py-2 border-b border-gray-200 backdrop-blur-lg transparent">
            <Logo />
            <ul className="flex items-center gap-10">
                <Link
                    className="text-base text-gray-600   cursor-pointer hover:text-gray-800 active:text-gray-900 ease-in-out transition-colors"
                    to="home"
                    smooth={true}
                    offset={-240} duration={500} activeClass="active"
                >
                    Home
                </Link>
                <Link
                    className="text-base text-gray-600 cursor-pointer hover:text-gray-800 active:text-gray-900 ease-in-out transition-colors"
                    to="features"
                    smooth={true}
                    offset={-140} duration={500} activeClass="active"
                >
                    Features
                </Link>
                <Link
                    className="text-base text-gray-600   cursor-pointer hover:text-gray-800 active:text-gray-900 ease-in-out transition-colors"
                    to="how-it-works"
                    smooth={true}
                    offset={-70} duration={500} activeClass="active"
                >
                    How it works
                </Link>
            </ul>
            <div className="flex gap-6">
                <button className="text-base text-gray-600   hover:text-gray-800 cursor-pointer">Log in </button>
                <Button onClick={() => navigate("/signin ")}>
                    Get started
                </Button>
            </div>
        </nav>
    )
}

export default Navbar
