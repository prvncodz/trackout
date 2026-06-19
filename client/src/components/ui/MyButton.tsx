import { HTMLMotionProps, motion } from "motion/react"

type ButtonProps = {
    children: React.ReactNode,
    className?: string,
} & Omit<HTMLMotionProps<"button">, "ref">

const MyButton = ({ children, className = "", ...props }: ButtonProps) => {
    return (
        <motion.button
            whileHover={{ y: -1 }}
            className={`bg-near-black flex h-10 w-auto cursor-pointer items-center justify-center rounded-md p-2 px-4 font-semibold text-gray-200 hover:bg-black/80 hover:text-neutral-100 hover:shadow-lg active:scale-98 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-near-black ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export default MyButton
