import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express"
import cors from "cors"

const app: Application = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,// some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}))
app.use(express.json({ limit: "30kb" }));
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true, limit: "30kb" }))
app.use(cookieParser());

import userRouter from "./routes/user.routes";
import logRouter from "./routes/log.routes";
import exerciseRouter from "./routes/exercise.routes";
import setRouter from "./routes/set.routes";
import dashboardRouter from "./routes/dashboard.routes";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/log", logRouter)
app.use("/api/v1/exercise", exerciseRouter)
app.use("/api/v1/set", setRouter)
app.use("/api/v1/dashboard", dashboardRouter)
app.get('/health', (req: Request, res: Response) => res.sendStatus(200));

export default app;
