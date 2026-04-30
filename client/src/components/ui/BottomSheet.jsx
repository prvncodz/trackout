import { motion } from "motion/react"

const BottomSheet = ({ className = "", children, onClose, open, setOpen, ...props }) => {
    return (
        <div className="flex flex-col lg:hidden relative ">
            <div className="fixed inset-0 z-10 bg-black/10 " onClick={onClose} />
            <motion.div
                className="bg-neutral-50 rounded-t-3xl fixed bottom-0 left-0 z-20 w-full h-screen"
                drag="y"
                dragConstraints={{ top: 0, bottom: 600 }}
                onDragEnd={(e, info) => {
                    if (info.offset.y > 500) {
                        setOpen(null);
                    }
                }
                }
                initial={{ y: "100%" }}
                animate={{ y: open ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                {...props}
            >
                <div className="w-20 h-2.5 bg-line-color rounded-full mx-auto my-5 " />
                <div className="overflow-hidden text-wrap">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}

export default BottomSheet
