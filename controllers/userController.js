// controllers/userController.js

const User = require("../models/user.model");

// Create User
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.accountNumber === 1) {
      res.status(400).json({ message: "Nomor akun sudah ada di database." });
    } else if (err.code === 11000 && err.keyPattern.emailAddress === 1) {
      res.status(400).json({ message: "Alamat email sudah ada di database." });
    } else if (err.code === 11000 && err.keyPattern.identityNumber === 1) {
      res
        .status(400)
        .json({ message: "Nomor identitas sudah ada di database." });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update User by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.json({ message: "Data berhasil diupdate", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.accountNumber === 1) {
      res.status(400).json({ message: "Nomor akun sudah ada di database." });
    } else if (err.code === 11000 && err.keyPattern.emailAddress === 1) {
      res.status(400).json({ message: "Alamat email sudah ada di database." });
    } else if (err.code === 11000 && err.keyPattern.identityNumber === 1) {
      res
        .status(400)
        .json({ message: "Nomor identitas sudah ada di database." });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

// Delete User by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
