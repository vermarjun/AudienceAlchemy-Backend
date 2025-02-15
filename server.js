import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./util/DataBase.js";
import userRoutes from './Router/userRoute.js';
import analyseRoutes from './Router/analyseRoute.js';
import chatBotRoutes from "./Router/chatBotRoute.js"
import dotenv from "dotenv";

dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const corsOptions = {
//     origin: 'http://localhost:5173',
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type,Authorization',
//     credentials: true                
// };
// app.use(cors(corsOptions));
app.use(cors());

// Route
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    });
});

app.get("/api/home", (req, res) => {
    return res.status(200).json({
        message: "yes working",
        success: true
    });
});

app.use('/api/v1/users', userRoutes);  // Prefix for user-related routes

app.use('/api/v1/analyse', analyseRoutes);

app.use('/api/v1/chatbot', chatBotRoutes);

// Start the server
const PORT = 8000 || process.env.PORT;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running at port ${PORT}`);
});
