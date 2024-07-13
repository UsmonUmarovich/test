import db from "../config.js";

export const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const docRef = await db.collection("users").add(newUser);
    res
      .status(201)
      .json({ message: "User created successfully", docId: docRef.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const docRef = db.collection("users").doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).json({ message: "No user found" });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    res.status(400).send(`Error getting user: ${error.message}`);
  }
};

export const getUsers = async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    if (snapshot.empty) {
      res.status(404).json({ message: "No users found" });
      return;
    } else {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(items);
    }
  } catch (error) {
    res.status(400).send(`Error getting items: ${error.message}`);
  }
};

export const updateUser = async (req, res) => {
  try {
    const docRef = db.collection("users").doc(req.params.id);
    const updatedUser = req.body;
    if ((await docRef.get()).exists) {
      await docRef.update(updatedUser);
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "No user found to update" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const docRef = db.collection("users").doc(req.params.id);
    if ((await docRef.get()).exists) {
      await docRef.delete();
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "No user found to delete" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
