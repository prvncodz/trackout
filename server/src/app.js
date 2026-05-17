import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"

const app = express();
app.use(express.json({ limit: "30kb" }));
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true, limit: "30kb" }))
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,// some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}))
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import logRouter from "./routes/log.routes.js";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/log",logRouter)

export default app;
