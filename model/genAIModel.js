import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const API_KEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export const genModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });