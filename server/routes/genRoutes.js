import { Router } from "express";
import { generateText } from "../controllers/genAIController.js";

const genRoutes = Router();

genRoutes.post("/generateText", generateText);

export default genRoutes;