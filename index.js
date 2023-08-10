import express from "express";
import { dbConnect } from "./dbConnection.js";
import { router as studentRoutes } from "./student/student.route.js";

const app = express();
//to make app understand json
//api which uses json are called RESTful API

app.use(express.json());

dbConnect();

app.use(studentRoutes);

const port = 5757;

app.listen(port, () => {
  console.log(`App is listening in port ${port}`);
});
