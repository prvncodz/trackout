const Calender = ({ className = "", size = "md", ...props }) => {
  return (
    <div
      className={`border-line-color flex shrink-0 flex-col justify-center rounded-2xl border bg-neutral-100 p-5 ${size === "md" ? "size-110" : size === "lg" ? "size-130" : "size-100"} ${className}`}
      {...props}
    >
      <h1
        className={`text-mockup-text flex items-center justify-center text-2xl font-semibold`}
      >
        Calender
      </h1>
      <div className="h-full w-full">hello</div>
    </div>
  );
};

export default Calender;
