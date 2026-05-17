import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Log from "../models/log.model.js";


const CreateLog = asyncHandler(async (req, res) => {
    const { logName } = req.body
    if(!logName) {
        throw new ApiError(400, "log name is required")
    }
    const log = await Log.create({
        logName,
        owner: req.user?._id
    })
    if(!log) {
        throw new ApiError(400, "failed to create log")
    }

    return res
    .status(201)
    .json(new ApiResponse(201, log, "log created successfully"))
});

const GetAllLogs = asyncHandler(async (req, res) => {
    const {  userId } = req.params
    const {page=1,limit=10} = req.query
    const pageNum = Number(page) ||1 ;
    const limitNum = Number(limit) || 10;
    const skipNum = (pageNum - 1) * limitNum

    const logs = await Log
    .find({ owner: userId })
    .skip(skipNum)
    .limit(limitNum)

    
    if(!logs) {
        throw new ApiError(400, "failed to get all logs")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, logs, "logs fetched successfully"))
});

export { CreateLog, GetAllLogs }