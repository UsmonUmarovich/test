import { Router } from "express";
import {
  createImage,
  deleteImage,
  getImage,
  getImages,
  updateImage,
} from "../controllers/imagesController.js";

const imagesRoutes = Router();

imagesRoutes.post("/images", createImage);
imagesRoutes.get("/images", getImages);
imagesRoutes.get("/images/:id", getImage);
imagesRoutes.put("/images/:id", updateImage);
imagesRoutes.delete("/images/:id", deleteImage);

export default imagesRoutes;
