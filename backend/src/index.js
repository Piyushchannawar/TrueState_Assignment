import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import morgan from "morgan";

dotenv.config();

import salesRoutes from './routes/sales.routes.js';


const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// Routes
app.use("/api/sales", salesRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Error:", err));


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});