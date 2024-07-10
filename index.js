import express from "express";
import cors from "cors";
import router from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(7070, () => {
  console.log("Server is running on port 7070");
});