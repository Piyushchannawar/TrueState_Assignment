import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Sales from "./models/sales.model.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

let counter = 0;

const stream = fs.createReadStream("src/sales.csv").pipe(csv());

stream.on("data", async (row) => {
  stream.pause();

  const doc = {
    customerId: row["Customer ID"],
    customerName: row["Customer Name"],
    phoneNumber: row["Phone Number"],
    gender: row["Gender"],
    age: Number(row["Age"]),
    customerRegion: row["Customer Region"],
    customerType: row["Customer Type"],

    productId: row["Product ID"],
    productName: row["Product Name"],
    brand: row["Brand"],
    productCategory: row["Product Category"],
    tags: row["Tags"] ? row["Tags"].split(",").map((t) => t.trim()) : [],

    quantity: Number(row["Quantity"]),
    pricePerUnit: Number(row["Price per Unit"]),
    discountPercentage: Number(row["Discount Percentage"]),
    totalAmount: Number(row["Total Amount"]),
    finalAmount: Number(row["Final Amount"]),

    date: new Date(row["Date"]),
    paymentMethod: row["Payment Method"],
    orderStatus: row["Order Status"],
    deliveryType: row["Delivery Type"],
    storeId: row["Store ID"],
    storeLocation: row["Store Location"],
    salespersonId: row["Salesperson ID"],
    employeeName: row["Employee Name"],
  };

  try {
    await Sales.create(doc);
    counter++;

    if (counter % 100 === 0) {
      console.log(`Inserted ${counter} records...`);
    }
  } catch (err) {
    console.error("Insert error:", err);
  }

  stream.resume();
});

stream.on("end", () => {
  console.log(`✔ Import complete. Total records inserted: ${counter}`);
  mongoose.connection.close();
});

stream.on("error", (err) => {
  console.error("CSV read error:", err);
});
