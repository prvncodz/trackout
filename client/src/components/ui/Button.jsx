const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`bg-near-black flex h-10 w-auto cursor-pointer items-center justify-center rounded-md p-2 px-4 font-semibold text-gray-200 transition-all hover:bg-black/80 hover:text-neutral-100 hover:shadow-lg active:scale-98 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
