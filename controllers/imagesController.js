import db from "../config.js";

export const createImage = async (req, res) => {
  try {
    const newImage = req.body;
    const docRef = await db.collection("images").add(newImage);
    res
      .status(201)
      .json({ message: "Image uploaded successfully", docId: docRef.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const docRef = db.collection("images").doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).json({ message: "No image found" });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    res.status(400).send(`Error getting image: ${error.message}`);
  }
};

export const getImages = async (req, res) => {
  try {
    const snapshot = await db.collection("images").get();
    if (snapshot.empty) {
      res.status(404).json({ message: "No images found" });
      return;
    } else {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(items);
    }
  } catch (error) {
    res.status(400).send(`Error getting items: ${error.message}`);
  }
};

export const updateImage = async (req, res) => {
  try {
    const docRef = db.collection("images").doc(req.params.id);
    const updatedImage = req.body;
    if ((await docRef.get()).exists) {
      await docRef.update(updatedImage);
      res.status(200).json({ message: "Image updated successfully" });
    } else {
      res.status(404).json({ message: "No image found to update" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const docRef = db.collection("images").doc(req.params.id);
    if ((await docRef.get()).exists) {
      await docRef.delete();
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ message: "No image found to delete" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
