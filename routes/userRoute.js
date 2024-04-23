const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const authenticateToken = require("../middlewares/authenticateToken");
const {
  getAllUsersFromCache,
  saveAllUsersToCache,
} = require("../middlewares/cacheMiddleware");

// Middleware untuk memeriksa JWT pada semua rute pengguna
router.use(authenticateToken);

// Rute untuk menangani permintaan pengguna
router.get("/", getAllUsersFromCache, async (req, res) => {
  try {
    const users = await userController.getAllUsers(); // Memanggil fungsi getAllUsers dari controller
    if (users.length > 0) {
      saveAllUsersToCache(users);
      res.json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

// Middleware untuk menangani kesalahan autentikasi JWT
router.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    // Token tidak valid atau tidak ada
    res.status(401).json({ message: "Unauthorized" });
  } else {
    // Kesalahan lain
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
