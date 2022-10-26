import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDatabase from "./config/Mongodb.js";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import ChatRoute from "./Routes/ChatRoute.js";
import MessageRoute from "./Routes/MessageRoute.js";
import NotifyRoute from "./Routes/NotifyRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

connectDatabase();

const PORT = process.env.PORT;
app.listen(PORT, console.log(`server run in port ${PORT}`));

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/messages", ChatRoute);
app.use("/chatbox", MessageRoute);
app.use("/notify", NotifyRoute);
