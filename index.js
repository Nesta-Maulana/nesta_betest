const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");

const app = express();
const PORT = 3004;

// Ganti nilai 'redis_nestamaulana_betest' sesuai dengan nama yang Anda inginkan
const client = redis.createClient({
  host: "redis",
  port: "6379",
  password: "secretredis",
  db: "redis_nestamaulana_betest",
});

// Event listener untuk menangani koneksi ke Redis
client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoute"); // Impor router authRoutes
const userRoutes = require("./routes/userRoute");

app.use("/users", userRoutes);
app.use("/auth", authRoutes); // Gunakan router authRoutes di bawah prefix '/auth'

// Start server
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://nestamaulana09:4WbOmNUwLmq13Uhk@dbnestabetest.zfqy9ez.mongodb.net/DB_NestaMaulana_Test?retryWrites=true&w=majority&appName=dbnestabetest",
    { useNewUrlParser: true, useUnifiedTopology: true } // Tambahkan opsi mongoose
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
