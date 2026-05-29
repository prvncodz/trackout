import { motion } from "motion/react"

const BottomSheet = ({ className = "", children, onClose, open, setOpen, ...props }) => {
  return (
    <div className="relative flex flex-col lg:hidden">
      <div className="fixed inset-0 z-10 bg-black/10" onClick={onClose} />
      <motion.div
        className="fixed bottom-0 left-0 z-20 h-screen w-full rounded-t-3xl bg-neutral-50"
        drag="y"
        dragConstraints={{ top: 0, bottom: 600 }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 500) {
            setOpen(null)
          }
        }}
        initial={{ y: "100%" }}
        animate={{ y: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        {...props}
      >
        <div className="bg-line-color mx-auto my-5 h-2 w-15 rounded-full" />
        <div className="overflow-hidden text-wrap">{children}</div>
      </motion.div>
    </div>
  )
}

export default BottomSheet
