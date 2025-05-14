# 🛍️ Travelo - AI Trip Planner Web App

Travelo adalah aplikasi perencana perjalanan berbasis web yang menggunakan teknologi AI untuk membantu pengguna merancang itinerary perjalanan mereka secara otomatis, personal, dan cerdas hanya dalam hitungan detik. Thumbnail

## ✨ Short Description

Travelo memungkinkan pengguna memilih preferensi liburan (lokasi keberangkatan, tujuan, durasi, anggaran, dll), dan menghasilkan rencana perjalanan harian yang lengkap, termasuk aktivitas, transportasi, rekomendasi hotel, dan tips wisata. Aplikasi ini didukung oleh AI (Gemini), Firebase, dan React ecosystem.

## 🚀 Main Features

- 🔐 Login dengan Google (Firebase Auth)
- 📍 Pilihan kota keberangkatan & tujuan
- 🧠 **Generasi itinerary otomatis dengan AI **
- 🏨 **Rekomendasi hotel & aktivitas harian **
- 🔖 **Simpan & lihat detail trip yang telah dibuat **
- 🌙 **Mode terang/gelap (dark mode toggle) **
- 🗑️ **Hapus rencana perjalanan dengan konfirmasi **
- 📱 Responsif dan mudah digunakan

## ⚙️ Tech-Stack

### Front-end

- React using Typescript
- React Router
- Zustand (State Management)
- Framer Motion (Animasi)
- TailwindCSS (Styling)
- ShadCN UI / Headless UI untuk komponen Dialog

### Backend / Services

- Firebase Firestore
- Firebase Auth (Google Login)
- Gemini API (Google)
- Geoapify API (lokasi)

## 🧰 Installation and Setup

Follow these steps to get the project up and running on your local machine:

1. Clone this repository:

```
git clone https://github.com/fiqrioemry/ai_travel_planner_web_app.git
cd ai_travel_planner_web_app
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm rum
```

App akan berjalan di http://localhost:5173

## 📁 Folder Structure

```
├── src/
│   ├── api/               # Koneksi API: Firebase, Gemini, Geoapify
│   ├── components/        # Reusable UI components (Button, Dialog, Badge, dsb)
│   ├── hooks/             # Custom React hooks (theme, scrollToTop)
│   ├── pages/             # Halaman utama (Home, CreateTrip, SavedTrip, DetailTrip)
│   ├── store/             # Zustand store (useTripStore, useAuthStore)
│   ├── config/            # State, constant, emojiMap, prompt templates
│   ├── App.tsx            # Root routing dengan React Router
│   └── main.tsx           # Entry point React
```

## 🧪 How to use

1. Login

- Klik tombol "Ayo mulai" di halaman utama, lalu login dengan Google.

2. Buat Trip

- Navigasi ke /create-trip, isi semua preferensi perjalanan (dengan UI step-by-step), lalu klik "Generate Trip".

3. Simpan & Lihat Detail Trip

- Trip yang berhasil dibuat akan disimpan ke Firebase dan bisa dilihat kembali di /my-trips. Klik salah satu kartu untuk melihat detail lengkap.

4. Hapus Trip

- Klik ikon 🖑 di pojok kanan kartu trip. Konfirmasi dialog akan muncul sebelum dihapus permanen.

## 🔐 Konfigurasi Environment (.env)

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_key
VITE_GEOAPIFY_KEY=your_geoapify_key
```

## ☁️ Deployment

saya menggunakan web-hosting untuk project ini, namun kamu juga bisa mendeploy ke platform Saas seperti vercel ataupun netlify :

- Hubungkan repo Git
- Tambahkan .env ke dashboard environment
- Atur build command:

```
  npm run build
```

Output directory: dist

## 🤝 Kontribusi

Terbuka untuk Kontribusi bagi yang ingin mengembangkan fitur lebih jauh :

- Fork repository ini
- Buat branch: git checkout -b fitur-anda
- Commit perubahan: git commit -m 'feat: fitur baru'
- Push ke branch: git push origin fitur-anda
- Buka Pull Request

## License

**MIT License**

##👤 Developer - Author

- name : Ahmad Fiqri oemmry
- 📁 email : fiqrioemry@gmail.com
- 🌐 Linkedin : https://www.linkedin.com/in/ahmadfiqrioemry

## 🖼️ Preview

Berikut adalah beberapa preview tampilan untuk halaman website travel planner ini. Homepage Create Trip Detail Trip My Trip List
