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
// <button className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
//   Favourite
// </button>
export default Button;
