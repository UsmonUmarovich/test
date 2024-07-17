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

const usersCollection = collection(db, "users");

export const createUser = async (req, res) => {
  try {
    const docRef = await addDoc(usersCollection, req.body);
    res
      .status(201)
      .json({ message: "User created successfully", id: docRef.id });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const userDoc = doc(usersCollection, req.params.id);
    const userSnapshot = await getDoc(userDoc);
    if (!userSnapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ id: userSnapshot.id, ...userSnapshot.data() });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const querySnapshot = await getDocs(usersCollection);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const userDoc = doc(usersCollection, req.params.id);
    if ((await getDoc(userDoc)).exists()) {
      await updateDoc(userDoc, req.body);
      res
        .status(200)
        .json({ message: "User updated successfully", id: req.params.id });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userDoc = doc(usersCollection, req.params.id);
    if ((await getDoc(userDoc)).exists()) {
      await deleteDoc(userDoc);
      res
        .status(200)
        .json({ message: "User deleted successfully", id: req.params.id });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
