const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { emailAddress, identityNumber } = req.body;

  try {
    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const isMatch = identityNumber == user.identityNumber ? true : false;
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Kombinasi email dan nomor identitas tidak valid" });
    }

    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat proses login" });
  }
});

module.exports = router;
