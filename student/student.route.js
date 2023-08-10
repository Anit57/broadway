import express from "express";
import { Student } from "./student.model.js";
import mongoose from "mongoose";
import { checkMongIdValidity } from "../utils/utils.js";

const router = express.Router();

//?add student

router.post("/student/add", async (req, res) => {
  try {
    const newStudent = req.body;
    await Student.create(newStudent);
    return res.status(201).send({ message: "Student added Successfully." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//?get user details by id

router.get("/student/details/:id", async (req, res) => {
  //extract id from params
  const studentId = req.params.id;
  // check mongoId validity
  const isValidStudentId = checkMongIdValidity(studentId);

  //if not valid mongoIdm throw error
  if (!isValidStudentId) {
    return res.status(400).send({ message: "Invalid Mongo Id." });
  }

  //check if student, with the id exists
  const studentDetails = await Student.findOne({ _id: studentId });

  //if not student, throw error
  if (!studentDetails) {
    return res.status(404).send({ message: "Student does not exists." });
  }
  return res.status(200).send(studentDetails);
});

//? delete a student

router.delete("/student/delete/:id", async (req, res) => {
  //extract id from params
  const studentId = req.params.id;
  //check validity of id
  const isValidStudentId = checkMongIdValidity(studentId);
  //if not valid mongoId, throw error
  if (!isValidStudentId) {
    return res.status(400).send({ message: "ERROR" });
  }
  //find if user exists
  const student = await Student.findOne({ _id: studentId });
  //if not user, throw error
  if (!student) {
    return res.status(404).send({ message: "Student does not exist." });
  }
  //delete user
  await Student.deleteOne({ _id: studentId });
  //send appropriate response
  return res.status(200).send({ message: "Student Deleted." });
});

//?edit a student

router.put("/student/edit/:id", async (req, res) => {
  //extract id from params
  const studentId = req.params.id;
  //validate id so that it is valid mongoId
  const isValidMongoId = checkMongIdValidity(studentId);
  //
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid Mongo Id" });
  }

  //check if user exists of that id
  const student = await Student.findOne({ _id: studentId });

  //if not user, throw error
  if (!student) {
    return res.status(404).send({ message: "Student does not exists." });
  }

  //edit user with data from req.body

  const newData = req.body;
  await Student.updateOne(
    { _id: studentId },
    {
      name: newData.name,
      age: newData.age,
      gender: newData.gender,
      location: newData.location,
    }
  );
  return res.status(200).send({ message: "Student is updated Successfully." });
});

//? get all Students

router.get("/students", (req, res) => {
  return res.status(200).send("Getting all students...");
});

export { router };
