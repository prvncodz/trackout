//make a reusable button component that can be used throughout the application. It should accept props for the button text, onClick handler, and any additional styling.
const Button = ({children}) => {
	return (
		<div className="h-10 w-auto p-2 px-4 bg-near-black text-gray-200 rounded-md flex justify-center items-center cursor-pointer font-semibold">
		{children}
		</div>
	)
}

export default Button
