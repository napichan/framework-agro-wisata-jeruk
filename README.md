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
