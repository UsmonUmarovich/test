import firebase from "../config.js";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import User from "../model/UserModel.js";

const db = getFirestore(firebase);

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    await addDoc(collection(db, "users"), data);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getDocs(collection(db, "users"));
    const userArray = [];

    if (users.empty) {
      res.status(400).json({ message: "No users found" });
    } else {
      users.forEach((doc) => {
        const user = new User(doc.id, doc.data().email, doc.data().password);
        userArray.push(user);
      });

      res.status(200).json(userArray);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = doc(db, "users", id);
    const data = await getDoc(user);
    if (data.exists()) {
      res.status(200).json(data.data());
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update user (with id)

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = doc(db, "users", id);
    const data = getDoc(user);
    if (!(await data).exists()) {
      res.status(404).json({ message: "User not found" });
    } else {
      await updateDoc(user, req.body);
      res.status(200).json({ message: "User updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete user (with id)

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = doc(db, "users", id);
    const data = getDoc(user);
    if (!(await data).exists()) {
      res.status(404).json({ message: "User not found" });
    } else {
      await deleteDoc(user);
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
