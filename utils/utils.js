import mongoose from "mongoose";

export const checkMongIdValidity = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  return isValid;
};
