import Button from "../ui/Button"
import Logo from "../ui/Logo"

const Navbar = () => {
	return (
		<div className="w-full h-15 bg-neutral-50 flex justify-between items-center px-25 py-2 border-b border-gray-200">
			<Logo />
			<ul className="flex items-center gap-10">
				<li className="text-base text-gray-600 font-medium  cursor-pointer hover:text-gray-800 ease-in-out">Home</li>
				<li className="text-base text-gray-600 font-medium  cursor-pointer hover:text-gray-800 ease-in-out">Features</li>
				<li className="text-base text-gray-600 font-medium  cursor-pointer hover:text-gray-800 ease-in-out">How it works</li>
			</ul>
			<div className="flex gap-6">
				<button className="text-base text-gray-600 font-medium   hover:text-gray-800 cursor-pointer">Log in </button>
				<Button>
					Get started
				</Button>
			</div>
		</div>
	)
}

export default Navbar
