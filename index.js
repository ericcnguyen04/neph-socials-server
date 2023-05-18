import { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// configerations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
appuse(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extend: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extend: true}))
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets"); // users that upload content onto your web will be saved in folder 'public/assets'
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage});