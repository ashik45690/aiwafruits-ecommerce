import mongoose from "mongoose";

const Database = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(` Database Failed To Connect: ${error.message}`);
    process.exit(1);
  }
};

export default Database;