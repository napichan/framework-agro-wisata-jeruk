# Framework Agro Wisata Jeruk

Project Framework Development - Website Agro Wisata Petik Jeruk Selorejo.

## Branch & Development Workflow

Project ini menggunakan Git Branching Workflow untuk mengatur proses pengembangan dan kolaborasi antar anggota tim.

### Branch yang Digunakan

| Branch | Fungsi |
|---|---|
| `main` | Menyimpan versi final/stabil dari project yang siap digunakan atau dikumpulkan. |
| `dev` | Digunakan sebagai branch pengembangan dan integrasi seluruh fitur sebelum masuk ke `main`. |
| `feature/*` | Digunakan oleh anggota tim untuk mengembangkan fitur tertentu secara terpisah. |

### Alur Pengembangan

Setiap anggota tim mengembangkan fitur pada branch masing-masing. Setelah fitur selesai, perubahan akan diajukan melalui Pull Request (PR) menuju branch `dev`.

Alur pengembangan project:

`feature/*` → `dev` → `main`

Contoh:

```text
feature/landing
       ↓
      PR
       ↓
      dev
       ↓
Testing & Integration
       ↓
      PR
       ↓
     main
```

### Pembagian Pengembangan

Pengembangan project dilakukan secara kolaboratif oleh anggota tim. Setiap fitur dikerjakan pada branch tersendiri untuk menghindari perubahan langsung pada branch utama.

Branch fitur yang digunakan dalam project antara lain:

- `feature/landing` — pengembangan Landing Page
- `feature/tentang-wisata` — pengembangan halaman Tentang Wisata
- `feature/admin-login` — pengembangan fitur login admin
- `feature/admin-management` — pengembangan dashboard dan manajemen admin

Setelah fitur selesai dikembangkan, branch fitur dibuatkan Pull Request menuju `dev` untuk dilakukan penggabungan dan pengujian bersama.

### Tujuan Penggunaan Branch

Penggunaan branch bertujuan untuk:

1. Memisahkan pengembangan setiap fitur.
2. Memudahkan kolaborasi antar anggota tim.
3. Mengurangi risiko perubahan kode yang saling bertabrakan.
4. Memudahkan proses review melalui Pull Request.
5. Menjaga `main` sebagai versi project yang stabil dan siap digunakan.

## Teknologi yang Digunakan

Project ini dikembangkan menggunakan teknologi berikut:

- Next.js 16.3.8
- React 19.2.8
- TypeScript
- Tailwind CSS
- Node.js
- Git
- GitHub

## Library yang Digunakan

| Library | Kegunaan |
|---|---|
| Next.js | Framework untuk pengembangan aplikasi web |
| React | Membangun komponen antarmuka pengguna |
| React DOM | Merender aplikasi React pada web |
| TypeScript | Menambahkan static typing pada JavaScript |
| Tailwind CSS | Styling dan pembuatan tampilan antarmuka |
| ESLint | Membantu menjaga kualitas dan konsistensi kode |
| JOSE | Mendukung kebutuhan autentikasi dan pengelolaan token |

## Struktur Project

```text
framework-agro-wisata-jeruk/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   │   └── images/
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

## Cara Menjalankan Project

### Prasyarat

Pastikan perangkat sudah memiliki:

- Node.js
- npm
- Git

### Clone Repository

```bash
git clone https://github.com/napichan/framework-agro-wisata-jeruk.git
cd framework-agro-wisata-jeruk
```

### Menjalankan Frontend

Masuk ke folder frontend:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Setelah server berjalan, buka alamat yang ditampilkan pada terminal, biasanya:

```text
http://localhost:3000
```

### Build Project

Untuk membuat production build:

```bash
npm run build
```

### Menjalankan Production Build

Setelah proses build selesai:

```bash
npm run start
```

### Menjalankan Linter

Untuk memeriksa kualitas kode:

```bash
npm run lint
```

## Screenshot Aplikasi

Screenshot hasil akhir aplikasi akan ditambahkan setelah seluruh fitur project selesai dikembangkan dan diuji.

## Tim Pengembang

| Anggota | Tugas |
|---|---|
| [Dwiki Ilman Nafian - 253140707111035] | Frontend Development (Landing Page, Tentang Wisata, Login Admin) dan Backend Development (API, Database, dan Autentikasi) |
| [Shely Rahmatika Devi - 253140707111021] | Frontend Development Admin Dashboard (Manajemen User, Verifikasi Pembayaran, dan Laporan) |

## Catatan Pengembangan

Project ini masih dalam tahap pengembangan. Fitur backend, database, dan beberapa fitur dashboard admin akan ditambahkan secara bertahap.
