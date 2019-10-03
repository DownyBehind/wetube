import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet()); // secure module
app.set("view engine", "pug");
app.use(cookieParser()); // if we use cookie Parser, we can handle userinfo because just for session change
app.use(bodyParser.json()); // bodyParser means that we can see the information in the body, for example any person who want to send he's information to our website for login, if we use body-parser, we can see that information
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // print log data
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
