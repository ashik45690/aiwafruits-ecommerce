import mongoose from "mongoose";

const Database = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined");
    }

    await mongoose.connect(mongoUrl);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Failed To Connect:", error.message);
    process.exit(1);
  }
};

export default Database;