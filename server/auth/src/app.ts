import express, {Request, Response} from "express";
import authRoutes from "./routes/auth.routes"
import dotenv from "dotenv";
import db from "./services/database.service";
import cors from "cors"

//Connect with database 
db
//Dotenv config to use .env file with environment variables

dotenv.config();

const app = express();
//App config
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api", authRoutes);
app.get("/api", (req: Request , res: Response) => {
  res.json("Hello");
});
app.use((req: Request , res: Response) => {
  res.status(404).send('404')})

export default app