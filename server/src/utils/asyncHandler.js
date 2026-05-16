//higher order function to safely perform operation without breaking the application 
const asyncHandler = (fnc) =>
    async (req, res, next) => {
        try {
            return await fnc(req, res, next);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    };
export default asyncHandler;
