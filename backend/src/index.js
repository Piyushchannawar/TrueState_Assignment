import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();

const app = express();

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