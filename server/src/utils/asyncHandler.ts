import { NextFunction, Request, Response } from "express";

//higher order function to safely perform operation without breaking the application
const asyncHandler = (fnc: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await fnc(req, res, next);
    } catch (err:any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
export default asyncHandler;
