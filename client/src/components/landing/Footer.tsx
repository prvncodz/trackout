import Logo from "../ui/Logo"
import { Link } from "react-scroll"

const Footer = () => {
    return (
        <footer className="border-line-color mt-24 w-full border-t px-5 py-8 md:mt-42 lg:px-0">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Logo />
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-line-color0">
                        Simple workout tracking for lifters who want clean logs and useful progress signals.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-line-color0">
                    <Link className="cursor-pointer hover:text-near-black" to="home" smooth={true} offset={-240} duration={300}>
                        Home
                    </Link>
                    <Link className="cursor-pointer hover:text-near-black" to="features" smooth={true} offset={-140} duration={300}>
                        Features
                    </Link>
                    <Link className="cursor-pointer hover:text-near-black" to="how-it-works" smooth={true} offset={-70} duration={300}>
                        How it works
                    </Link>
                </div>
            </div>
        </footer>
    )
}
export default Footer
