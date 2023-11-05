// yarn add cookie-parser cors dotenv express express-async-handler express-oauth2-jwt-bearer nodemon prisma @prisma/client
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import morgan from "morgan";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
// app.use(cors({credentials: true, origin: 'http://localhost:8081'}));
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
