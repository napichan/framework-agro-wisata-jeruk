"use client";

import { useMemo, useState } from "react";
import type {
  AdminUser,
  UserModalMode,
  UserModalState,
  UserRole,
  UserRoleFilter,
  UserStatusFilter,
} from "@/types/user.types";

/**
 * Data demo Manajemen User.
 * Angka dirancang agar cocok dengan design Figma:
 * - Total pengguna : 248
 * - Wisatawan/User : 214
 * - Staf lapangan  : 26
 * - Admin          : 8
 *
 * Untuk produksi: ganti dengan panggilan API (apiFetch dari @/lib/api).
 */

const PAGE_SIZE = 7; // sesuai design: "Menampilkan 1-7 dari 248 pengguna"

/* ==================== 7 baris pertama (persis design) ==================== */

const FEATURED_USERS: AdminUser[] = [
  {
    id: "USR-8821",
    name: "Dinda Maharani",
    email: "dinda@gmail.com",
    role: "User",
    status: "Aktif",
    lastLogin: "Hari ini, 07:45 WIB",
    lastDevice: "Mobile App (Android)",
  },
  {
    id: "USR-8822",
    name: "Raka Pratama",
    email: "raka@email.com",
    role: "User",
    status: "Aktif",
    lastLogin: "Kemarin, 16:15 WIB",
    lastDevice: "Website Booking",
  },
  {
    id: "USR-8823",
    name: "Sinta Wulandari",
    email: "sinta@gmail.com",
    role: "User",
    status: "Aktif",
    lastLogin: "26 Sep, 11:20 WIB",
    lastDevice: "Mobile App (iOS)",
  },
  {
    id: "USR-8824",
    name: "Andi Setiawan",
    email: "andi@gmail.com",
    role: "User",
    status: "Aktif",
    lastLogin: "25 Sep, 16:04 WIB",
    lastDevice: "Tiket Loket Masuk",
  },
  {
    id: "USR-8825",
    name: "Nabila Rahma",
    email: "nabila@gmail.com",
    role: "User",
    status: "Aktif",
    lastLogin: "24 Sep, 10:11 WIB",
    lastDevice: "Mobile App (Android)",
  },
  {
    id: "ADM-0001",
    name: "Admin Kebun",
    email: "admin@gmail.com",
    role: "Admin",
    status: "Aktif",
    lastLogin: "Sedang Online",
    lastDevice: "Web Chrome (Ubuntu)",
    verified: true,
  },
  {
    id: "STF-1029",
    name: "Budi Santoso",
    email: "budi.kebun@agropetikjeruk.id",
    role: "Staf Kebun",
    status: "Aktif",
    lastLogin: "Hari ini, 07:18 WIB",
    lastDevice: "Handheld Scanner (Zona B)",
  },
];

/* ==================== Pool untuk data generate ==================== */

const FIRST_NAMES = [
  "Dewi", "Fajar", "Rizky", "Putri", "Bayu", "Intan", "Yoga", "Lestari",
  "Hendra", "Melati", "Arif", "Citra", "Dimas", "Rina", "Taufik", "Wulan",
  "Ilham", "Vina", "Galih", "Anisa", "Reza", "Fitri", "Bagus", "Novi",
  "Sari", "Irfan", "Ayu", "Joko", "Mira", "Anton", "Selly", "Doni",
  "Ratna", "Eko", "Lia", "Yusuf", "Tari", "Rendi", "Wati", "Gilang",
];

const LAST_NAMES = [
  "Saputra", "Permata", "Hidayat", "Nugroho", "Susanto", "Anggraini",
  "Kusuma", "Firmansyah", "Putri", "Ramadhan", "Oktaviani", "Sanjaya",
  "Hakim", "Puspita", "Maulana", "Utami", "Santoso", "Wirawan", "Negara",
  "Handayani", "Prakoso", "Kurnia", "Amelia", "Setiadi", "Wibowo",
  "Mulyani", "Suryana", "Halim", "Chandra", "Gunawan", "Pertiwi",
  "Sihombing", "Muhardjo", "Kartika", "Lesmana", "Hartono", "Wijaya",
  "Safitri", "Nugraha", "Pramesti",
];

const DOMAINS = ["gmail.com", "email.com", "yahoo.com"];

const DEVICES = [
  "Mobile App (Android)",
  "Mobile App (iOS)",
  "Website Booking",
  "Tiket Loket Masuk",
  "Web Chrome (Windows)",
] as const;

const LOGIN_STAMPS = [
  "Hari ini, 09:30 WIB",
  "Hari ini, 08:12 WIB",
  "Kemarin, 19:40 WIB",
  "Kemarin, 14:05 WIB",
  "26 Sep, 09:55 WIB",
  "25 Sep, 13:22 WIB",
  "24 Sep, 17:48 WIB",
  "23 Sep, 10:07 WIB",
  "22 Sep, 15:33 WIB",
  "21 Sep, 08:26 WIB",
] as const;

/* ==================== Generator deterministik ==================== */

function pick<T>(pool: readonly T[], index: number): T {
  return pool[index % pool.length];
}

function buildUsers(): AdminUser[] {
  const users: AdminUser[] = [...FEATURED_USERS];

  let userNo = 8826; // lanjutan USR-8825
  let stafNo = 1030; // lanjutan STF-1029
  let admNo = 2; // lanjutan ADM-0001

  // Target: 214 User, 26 Staf Kebun, 8 Admin (total 248).
  const targets: Array<{ role: UserRole; count: number }> = [
    { role: "User", count: 214 - 5 }, // 5 sudah ada di FEATURED
    { role: "Staf Kebun", count: 26 - 1 },
    { role: "Admin", count: 8 - 1 },
  ];

  let i = 0;
  for (const target of targets) {
    for (let n = 0; n < target.count; n++, i++) {
      const first = pick(FIRST_NAMES, i);
      const last = pick(LAST_NAMES, Math.floor(i / FIRST_NAMES.length));
      const name = `${first} ${last}`;

      let id: string;
      let email: string;
      let device: string;

      if (target.role === "User") {
        id = `USR-${userNo++}`;
        email = `${first.toLowerCase()}.${last.toLowerCase()}@${pick(DOMAINS, i)}`;
        device = pick(DEVICES, i);
      } else if (target.role === "Staf Kebun") {
        id = `STF-${stafNo++}`;
        email = `${first.toLowerCase()}.${last.toLowerCase()}@agropetikjeruk.id`;
        device = "Handheld Scanner (Zona B)";
      } else {
        id = `ADM-${String(admNo++).padStart(4, "0")}`;
        email = `${first.toLowerCase()}.${last.toLowerCase()}@admin.agropetikjeruk.id`;
        device = "Web Chrome (Ubuntu)";
      }

      users.push({
        id,
        name,
        email,
        role: target.role,
        // Sekitar 8% tidak aktif supaya filter status ada isinya.
        status: i % 13 === 4 ? "Nonaktif" : "Aktif",
        lastLogin: pick(LOGIN_STAMPS, i),
        lastDevice: device,
        verified: target.role === "Admin",
      });
    }
  }

  return users;
}

const ADMIN_USERS: AdminUser[] = buildUsers();

export const USER_STATS = {
  total: ADMIN_USERS.length,
  wisatawan: ADMIN_USERS.filter((u) => u.role === "User").length,
  staf: ADMIN_USERS.filter((u) => u.role === "Staf Kebun").length,
  admin: ADMIN_USERS.filter((u) => u.role === "Admin").length,
};

const ROLE_OPTIONS: UserRoleFilter[] = [
  "Semua Role",
  "User",
  "Staf Kebun",
  "Admin",
];

const STATUS_OPTIONS: UserStatusFilter[] = [
  "Semua Status",
  "Aktif",
  "Nonaktif",
];

/* ==================== Hook ==================== */

export function useUser() {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRoleFilter>("Semua Role");
  const [status, setStatus] = useState<UserStatusFilter>("Semua Status");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<UserModalState>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchSearch =
        query === "" ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query);

      const matchRole = role === "Semua Role" || user.role === role;
      const matchStatus = status === "Semua Status" || user.status === status;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, role, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  // Nomor halaman: jendela 3 di sekitar halaman aktif (seperti design).
  const pageNumbers = useMemo(() => {
    const from = Math.max(1, Math.min(currentPage - 1, totalPages - 2));
    const to = Math.min(totalPages, from + 2);
    const numbers: number[] = [];
    for (let n = from; n <= to; n++) numbers.push(n);
    return numbers;
  }, [currentPage, totalPages]);

  const from = filtered.length === 0 ? 0 : start + 1;
  const to = Math.min(start + PAGE_SIZE, filtered.length);

  function changeSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function changeRole(value: UserRoleFilter) {
    setRole(value);
    setPage(1);
  }

  function changeStatus(value: UserStatusFilter) {
    setStatus(value);
    setPage(1);
  }

  function openModal(user: AdminUser, mode: UserModalMode) {
    setModal({ user, mode });
  }

  function closeModal() {
    setModal(null);
  }

  function saveUser(updated: AdminUser) {
    setUsers((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    );
    setModal(null);
  }

  function exportCsv() {
    const header = [
      "ID",
      "Nama",
      "Email",
      "Role",
      "Status",
      "Terakhir Login",
      "Perangkat",
    ];

    const rows = filtered.map((user) =>
      [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.lastLogin,
        user.lastDevice,
      ]
        .map((cell) => `"${cell.replace(/"/g, '""')}"`)
        .join(","),
    );

    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "manajemen-user.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return {
    // filter
    search,
    role,
    status,
    changeSearch,
    changeRole,
    changeStatus,
    roleOptions: ROLE_OPTIONS,
    statusOptions: STATUS_OPTIONS,

    // data
    users: visible,
    totalFiltered: filtered.length,

    // paginasi
    start,
    from,
    to,
    currentPage,
    totalPages,
    pageNumbers,
    setPage,

    // modal
    modal,
    openModal,
    closeModal,
    saveUser,

    // export
    exportCsv,
  };
}