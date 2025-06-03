import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
    });
    connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
      process.exit();
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
