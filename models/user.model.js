const mongoose = require('mongoose');

// Definisikan skema user
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true // Jika nomor akun harus unik
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true // Jika alamat email harus unik
  },
  identityNumber: {
    type: String,
    required: true,
    unique: true // Jika nomor identitas harus unik
  }
});

// Buat model user berdasarkan skema
const User = mongoose.model('User', userSchema);

module.exports = User;
