const redis = require("redis");
const client = redis.createClient({
  host: "redis",
  port: "6379",
  password: "secretredis",
//   db: "redis_nestamaulana_betest",
});
// Middleware untuk mendapatkan semua pengguna dari cache
const getAllUsersFromCache = (req, res, next) => {
  // Pastikan koneksi Redis masih terbuka sebelum menggunakan client
  if (client.connected) {
    client.get("all_users", (err, data) => {
      if (err) {
        console.error("Redis error:", err);
        return next();
      }

      if (data !== null) {
        res.json(JSON.parse(data));
      } else {
        next();
      }
    });
  } else {
    console.error("Redis connection is closed 1");
    next(); // Lanjutkan ke middleware berikutnya
  }
};

// Middleware untuk menyimpan semua pengguna ke cache
const saveAllUsersToCache = (users) => {
  // Pastikan koneksi Redis masih terbuka sebelum menggunakan client
  if (client.connected) {
    client.setex("all_users", 3600, JSON.stringify(users)); // Simpan data selama 1 jam
  } else {
    console.error("Redis connection is closed 1");
  }
};

module.exports = { getAllUsersFromCache, saveAllUsersToCache };
