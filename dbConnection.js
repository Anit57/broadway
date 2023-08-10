import mongoose from "mongoose";

//db connection

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anit57:okchata@cluster0.3ubo9ie.mongodb.net/broadway?retryWrites=true&w=majority"
    );
    console.log("Database Connected.");
  } catch (error) {
    console.log("Database connection failed");
    console.log(error.message);
  }
};
