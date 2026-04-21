import Button from "../ui/Button"
import Logo from "../ui/Logo"

const Navbar = () => {
	return (
		<div className="sticky top-0 z-2 w-full h-18 bg-neutral-50/60 flex justify-between items-center px-30 py-2 border-b border-gray-200 backdrop-blur-lg transparent">
			
			<Logo />
			<ul className="flex items-center gap-10">
				<li className="text-base text-gray-600   cursor-pointer hover:text-gray-800 ease-in-out">Home</li>
				<li className="text-base text-gray-600 cursor-pointer hover:text-gray-800 ease-in-out">Features</li>
				<li className="text-base text-gray-600   cursor-pointer hover:text-gray-800 ease-in-out">How it works</li>
			</ul>
			<div className="flex gap-6">
				<button className="text-base text-gray-600   hover:text-gray-800 cursor-pointer">Log in </button>
				<Button>
					Get started
				</Button>
			</div>
		</div>
	)
}

export default Navbar
