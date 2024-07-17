import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../config.js";

const imagesCollection = collection(db, "images");

export const createImage = async (req, res) => {
  try {
    const docRef = await addDoc(imagesCollection, req.body);
    res
      .status(201)
      .json({ message: "Image created successfully", id: docRef.id });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getImages = async (req, res) => {
  try {
    const querySnapshot = await getDocs(imagesCollection);
    const images = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getImage = async (req, res) => {
  try {
    const imageDoc = doc(imagesCollection, req.params.id);
    const imageSnapshot = await getDoc(imageDoc);
    if (!imageSnapshot.exists()) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ id: imageSnapshot.id, ...imageSnapshot.data() });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateImage = async (req, res) => {
  try {
    const imageDoc = doc(imagesCollection, req.params.id);
    if ((await getDoc(imageDoc)).exists()) {
      await updateDoc(imageDoc, req.body);
      res
        .status(200)
        .json({ message: "Image updated successfully", id: req.params.id });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteImage = async (req, res) => {
  try {
    const imageDoc = doc(imagesCollection, req.params.id);
    if ((await getDoc(imageDoc)).exists()) {
      await deleteDoc(imageDoc);
      res
        .status(200)
        .json({ message: "Image deleted successfully", id: req.params.id });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
