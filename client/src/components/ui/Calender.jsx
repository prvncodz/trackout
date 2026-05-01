
const Calender = ({  className = "", ...props }) => {
    return (
        <div className={` bg-neutral-100 rounded-2xl shrink-0 flex justify-center items-center p-5 border border-line-color ${className}`} {...props}>
            
        </div>
    )
}

export default Calender
