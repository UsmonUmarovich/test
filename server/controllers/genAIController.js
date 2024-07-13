import { genModel } from "../model/genAIModel.js";

export const generateText = async (req, res) => {
  const prompt = req.body.prompt;

  const result = await genModel.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  res.status(200).json({ response: text });
};
