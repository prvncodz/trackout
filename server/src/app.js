import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,// some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}))
app.use(express.json({ limit: "30kb" }));
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true, limit: "30kb" }))
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import logRouter from "./routes/log.routes.js";
import exerciseRouter from "./routes/exercise.routes.js"
import setRouter from "./routes/set.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/log", logRouter)
app.use("/api/v1/exercise", exerciseRouter)
app.use("/api/v1/set", setRouter)
app.use("/api/v1/dashboard", dashboardRouter)

export default app;
