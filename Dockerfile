# Menggunakan image Node.js dari Docker Hub
FROM node:latest

# Membuat direktori kerja di dalam kontainer
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json ke dalam direktori kerja
COPY package*.json ./

# Menginstall dependensi dari package.json
RUN npm install

# Menyalin seluruh kode sumber aplikasi ke dalam direktori kerja
COPY . .

# Menjalankan aplikasi saat kontainer dimulai
ENTRYPOINT ["sh", "-c", "node index.js"]
