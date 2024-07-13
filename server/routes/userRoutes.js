import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
