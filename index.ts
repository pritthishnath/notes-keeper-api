import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import db from "./db";
import router from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3110;

app.use(
  morgan(
    `${port}|KEEPER-V2-API :method :url :status :response-time ms - :res[content-length]`
  )
);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connectMongoose();

app.use("/", router);

app.listen(port);
