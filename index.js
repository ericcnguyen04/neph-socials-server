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
import {register} from "./controllers/auth.js"
 
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

// Routes with Files
app.post("/auth/register", upload.single("picture"), register);

// mongoose setup //time stamp: 17:28  // to test, use- nodemon index.js
const PORT = process.env.PORT || 6001

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
})
.catch((error) => console.log(`${error} did not connect`))