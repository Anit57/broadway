import mongoose from "mongoose";

//set rule(schema)
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  location: String,
});

//create table(model)
export const Student = mongoose.model("Student", studentSchema);
