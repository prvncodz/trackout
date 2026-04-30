const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`h-10 w-auto p-2 px-4 bg-near-black text-gray-200 rounded-md flex justify-center items-center cursor-pointer font-semibold hover:bg-gray-900 hover:text-neutral-100 active:scale-98 transition-all ${className}`} {...props} >
            {children}
        </button>
    )
}

export default Button
