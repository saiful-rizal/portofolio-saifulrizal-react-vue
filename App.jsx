import { useEffect, useMemo, useState } from "react";
import { CERTIFICATES } from "./certificates-data.js";

/* =====================================================
   PROFILE DATA — Saiful Rizal (sesuai CV)
===================================================== */

const PROFILE = {
  name: "Saiful Rizal",
  title: "Junior Web dan Mobile Developer",
  photo: "/profile.png",
  bio: "Mahasiswa D4 Teknik Informatika (semester 5) Politeknik Negeri Jember yang berfokus pada pengembangan aplikasi full stack meliputi web, mobile, dan Internet of Things (IoT). Berlatar belakang Teknik Elektronika Industri sehingga memahami sisi perangkat keras sekaligus perangkat lunak. Terbiasa membangun aplikasi yang interaktif, responsif, dan terstruktur; Juara 3 kompetisi Aplikasi Website dan Mobile TIF Exhibition 2025. Komunikatif, aktif berorganisasi, dan siap berkontribusi dalam tim pengembangan produk.",
  heroCategory: "JUNIOR DEVELOPER",
  phone: "082225675196",
  email: "syaifulrizal320206@gmail.com",
  githubTotal: 9430,
  status: "Mahasiswa D4 Teknik Informatika",
  role: "Junior Web dan Mobile Developer",
  socials: {
    instagram: "https://www.instagram.com/hai_saifulrizal",
    github: "https://github.com/saiful-rizal",
    linkedin: "https://www.linkedin.com/in/saiful-rizal-8606613ab/",
  },
};

const EXPERIENCES = [
  {
    logo: "PDAM",
    title: "Magang Teknik Elektronika Industri",
    company: "Kantor PDAM Bondowoso, Bondowoso, Indonesia",
    desc: "Praktik kerja lapangan di bidang teknik elektronika industri: membantu perawatan dan perbaikan instalasi serta perangkat elektronika pendukung operasional kantor.",
    resp: [
      "Membantu pemeriksaan dan perawatan perangkat elektronika industri",
      "Mendokumentasikan hasil temuan teknis selama masa magang",
      "Bekerja sama dengan teknisi dalam penyelesaian masalah lapangan",
    ],
      tags: ["Elektronika Industri", "Teknikal", "Maintenance"],
      date: "2023",
    badge: "Magang",
  },
  {
    logo: "PSHT",
    title: "Ketua Divisi Kominfo",
    company: "UKM Persaudaraan Setia Hati Terate, Politeknik Negeri Jember",
    desc: "Memimpin divisi komunikasi dan informasi: mengelola publikasi, dokumentasi kegiatan, dan media informasi organisasi.",
    resp: [
      "Mengelola konten publikasi dan dokumentasi kegiatan UKM",
      "Mengoordinasikan tim kominfo dalam setiap agenda organisasi",
      "Membangun alur informasi internal yang cepat dan jelas",
    ],
    tags: ["Leadership", "Kominfo", "Publikasi"],
    date: "2024 sampai Sekarang",
    badge: "Organisasi",
  },
  {
    logo: "KMTF",
    title: "Anggota Divisi Humas",
    company: "KEMATIF (Keluarga Mahasiswa Teknik Informatika), Politeknik Negeri Jember",
    desc: "Menjalankan fungsi hubungan masyarakat: menjalin relasi antar himpunan, publikasi acara, dan koordinasi kepanitiaan TIF Exhibition.",
    resp: [
      "Menjadi panitia Sie Perlengkapan TIF Exhibition Ganjil 2024",
      "Menjadi panitia Sie Acara TIF Exhibition Genap 2025",
      "Mengelola komunikasi dan relasi eksternal himpunan",
    ],
    tags: ["Humas", "Event", "Komunikasi"],
    date: "2024 sampai Sekarang",
    badge: "Organisasi",
  },
  {
    logo: "BPM",
    title: "Anggota Komisi Teknis",
    company: "Bakor Pemandu Mahasiswa, Politeknik Negeri Jember",
    desc: "Bertugas di komisi informasi: menyebarluaskan informasi kelembagaan dan mendukung transparansi kegiatan kemahasiswaan.",
    resp: [
      "Menyusun dan menyebarkan informasi kegiatan BPM",
      "Berkolaborasi dengan komisi lain dalam advokasi mahasiswa",
      "Mendukung dokumentasi rapat dan aspirasi mahasiswa",
    ],
      tags: ["Informasi", "Advokasi", "Kelembagaan"],
      date: "2025 sampai Sekarang",
      badge: "Organisasi",
    },
    {
      logo: "BLP",
      title: "Tenaga Didik (Freelance)",
      company: "Bimbel Bina Learning Prestasi",
      desc: "Mengajar dan membimbing peserta didik dalam memahami pemrograman secara sederhana dan mudah dipahami.",
      resp: [
        "Membimbing peserta didik memahami konsep pemrograman",
        "Menjelaskan materi secara sederhana dan mudah dipahami",
        "Mendampingi peserta didik dalam praktik dan latihan",
      ],
      tags: ["Mengajar", "Pemrograman", "Komunikasi"],
      date: "2025 sampai Sekarang",
      badge: "Freelance",
    },
    {
      logo: "DISPPR",
      title: "Pemuda Pelopor Bidang Pendidikan",
      company: "Dinas Pariwisata, Pemuda dan Olahraga Kabupaten Bondowoso",
      desc: "Mewakili pemuda Bondowoso dalam program Pemuda Pelopor bidang pendidikan: mengembangkan inovasi pembelajaran, mendampingi kegiatan literasi, dan berperan dalam penguatan karakter generasi muda.",
      resp: [
        "Mengembangkan program inovasi pendidikan bagi pemuda Bondowoso",
        "Mendampingi kegiatan literasi dan penguatan karakter generasi muda",
        "Berkolaborasi dengan DISPARPORAHUB dalam pelaksanaan program pemuda pelopor",
        "Meraih Juara 3 Pemuda Pelopor Bidang Pendidikan tingkat Kabupaten Bondowoso 2024",
      ],
      tags: ["Pendidikan", "Pemuda", "Literasi", "Karakter"],
      date: "2024",
      badge: "Penghargaan",
    },
  ];

/* =====================================================
   DATA LAYER — default + localStorage + hash routing
===================================================== */

const DATA_KEY = "saiful-portfolio-data-v4";

// 35 sertifikat asli dari folder Sertifikatku (gambar JPG + PDF di public/)
const DEFAULT_CERTS = CERTIFICATES;

function defaultStore() {
  return {
    profile: { ...PROFILE },
    experiences: EXPERIENCES.map((e) => ({ ...e, resp: [...e.resp], tags: [...e.tags] })),
    certifications: DEFAULT_CERTS.map((c) => ({ ...c })),
  };
}

function loadStore() {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (!raw) return defaultStore();
    const parsed = JSON.parse(raw);
    const fresh = defaultStore();
    const mergedProfile = { ...fresh.profile, ...(parsed.profile || {}) };
    if (
      mergedProfile.photo &&
      mergedProfile.photo.includes("images.unsplash.com")
    ) {
      mergedProfile.photo = fresh.profile.photo;
    }
    // Migrasi: kalau bio tersimpan masih bio bawaan lama, ganti dengan bio baru.
    const LEGACY_BIO_START = "Mahasiswa semester 5 D4 Teknik Informatika Politeknik Negeri Jember yang passionate";
    if (
      typeof mergedProfile.bio === "string" &&
      mergedProfile.bio.indexOf(LEGACY_BIO_START) === 0
    ) {
      mergedProfile.bio = fresh.profile.bio;
    }
    // Migrasi: lengkapi data lama tersimpan dengan field baru dari default (per id),
    // supaya field seperti "bidang" muncul tanpa menghapus editan user.
    const freshById = new Map(fresh.certifications.map((c) => [c.id, c]));
    const storedCerts = Array.isArray(parsed.certifications)
      ? parsed.certifications
      : [];
    const migratedCerts = storedCerts.map((c) => ({
      ...(freshById.get(c.id) || {}),
      ...c,
      bidang: c.bidang || (freshById.get(c.id) || {}).bidang || c.cat || "Lainnya",
    }));
    const storedIds = new Set(storedCerts.map((c) => c.id));
    for (const c of fresh.certifications) {
      if (!storedIds.has(c.id)) migratedCerts.push({ ...c });
    }
    return {
      profile: mergedProfile,
      experiences:
        Array.isArray(parsed.experiences) && parsed.experiences.length
          ? parsed.experiences
          : fresh.experiences,
      certifications: migratedCerts.length
        ? migratedCerts
        : fresh.certifications,
    };
  } catch (e) {
    return defaultStore();
  }
}

const HASH_VIEWS = ["about", "project", "achievement", "certification", "dashboard"];

function hashToView() {
  const h = window.location.hash || "";
  if (h === "" || h === "#home" || h === "#/home") return "home";
  if (h === "#" || h === "#/" || h === "#dashboard" || h === "#/dashboard") return "dashboard";
  const v = h.replace(/^#\/?/, "");
  if (/^project\/[a-z0-9-]+$/i.test(v)) {
    const key = v.split("/")[1].toLowerCase();
    const index = /^\d+$/.test(key)
      ? Number(key)
      : DEFAULT_PROJECTS.findIndex((project) => project.slug === key);
    return index >= 0 && index < DEFAULT_PROJECTS.length ? "project-detail" : "project";
  }
  if (/^certification\/[a-z0-9-]+$/i.test(v)) return "certification-detail";
  return HASH_VIEWS.includes(v) ? v : "home";
}

/* =====================================================
   PROFILE NAV — dipakai semua halaman (ada Beranda)
===================================================== */

function ProfileNav({ active = "", onNavigate = () => {} }) {
  const go = (tab) => () => onNavigate(tab);

  return (
    <nav className="p-nav" aria-label="Navigasi utama">
      <button className={`p-nav-item ${active === "home" ? "active" : ""}`} onClick={go("home")}>
        <svg viewBox="0 0 24 24"><path d="M12 3 3 10.5V21h6v-6h6v6h6V10.5L12 3Z" fill="currentColor" /></svg>
        <span>Beranda</span>
      </button>
      <button className={`p-nav-item ${active === "about" ? "active" : ""}`} onClick={go("about")}>
        <svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0v1H5v-1Z" fill="currentColor" /></svg>
        <span>Tentang</span>
      </button>
      <button className={`p-nav-item ${active === "project" ? "active" : ""}`} onClick={go("project")}>
        <svg viewBox="0 0 24 24"><path d="M4 5h6l2 2h8v11H4V5Zm0 5h16v2H4v-2Z" fill="currentColor" /></svg>
        <span>Project</span>
      </button>
      <button className={`p-nav-item ${active === "achievement" ? "active" : ""}`} onClick={go("achievement")}>
        <svg viewBox="0 0 24 24"><path d="M6 3h12v5a6 6 0 0 1-4 5.65V16h3v2H7v-2h3v-2.35A6 6 0 0 1 6 8V3Zm-2 2H2v2a4 4 0 0 0 4 4V9H4V5Zm16 0h-2v4h-2v2a4 4 0 0 0 4-4V5ZM9 20h6v2H9v-2Z" fill="currentColor" /></svg>
        <span>Achievement</span>
      </button>
      <button className={`p-nav-item ${active === "certification" ? "active" : ""}`} onClick={go("certification")}>
        <svg viewBox="0 0 24 24"><path d="M4 4h7v16H4V4Zm11 0h5v16h-5V4ZM12 4v16" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>
        <span>Certification</span>
      </button>
    </nav>
  );
}

const DEFAULT_PROJECTS = [
  {
    title: "Bimbel Bina Learning Prestasi",
    slug: "bimbel-bina-learning-prestasi",
    desc: "Website profil lembaga bimbingan belajar untuk memperkenalkan program belajar, keunggulan, testimoni, dan pilihan biaya pendidikan Bina Learning Prestasi kepada calon siswa dan orang tua.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    cat: "Web",
    year: "2025",
    status: "Live",
    liveUrl: "https://bimbel-learning-prestasi.vercel.app",
    image: "/project/bimbel/hero.jpg",
    documentation: {
      about: "Bina Learning Prestasi adalah website profil lembaga bimbingan belajar yang memperkenalkan program belajar, layanan, dan identitas lembaga kepada calon siswa dan orang tua. Informasi disajikan secara jelas, mulai dari keunggulan program, testimoni siswa, hingga pilihan biaya pendidikan untuk jenjang TK, SD, dan SMP.",
      highlights: [
        { title: "Pemahaman Cepat", desc: "Metode belajar efektif yang mempercepat penguasaan materi dalam waktu singkat." },
        { title: "Mentor Berpengalaman", desc: "Pengajar profesional yang siap membimbing dan menjawab setiap kesulitan belajar siswa." },
        { title: "Program Fleksibel", desc: "Kurikulum yang dapat disesuaikan dengan kebutuhan dan target nilai akademik siswa." },
        { title: "Materi Lengkap", desc: "Bank soal yang luas dan modul pembelajaran terstruktur untuk berbagai jenjang pendidikan." },
        { title: "Laporan Berkala", desc: "Pantau perkembangan belajar anak secara transparan melalui laporan mingguan yang detail." },
        { title: "Simulasi Ujian", desc: "Latihan ujian berkala untuk mengasah kesiapan mental dan kemampuan siswa menghadapi soal." },
        { title: "Biaya Transparan", desc: "Pilihan biaya pendidikan disajikan jelas untuk jenjang TK, SD, dan SMP." },
        { title: "Pendaftaran Mudah", desc: "Tombol daftar dan informasi program memudahkan calon siswa memulai bimbingan." },
      ],
      sections: [
        {
          title: "Siswa TK",
          items: [
            "Pengenalan huruf dan angka dasar",
            "Video belajar animasi seru",
            "Pengembangan motorik dan kreativitas",
            "Laporan perkembangan bulanan",
            "Guru ramah dan sabar",
          ],
        },
        {
          title: "Siswa SD",
          items: [
            "Akses materi kelas 1 sampai 6",
            "Bimbingan pekerjaan rumah (PR)",
            "Latihan soal dan ulangan harian",
            "Persiapan ujian sekolah",
            "Sertifikat dan reward belajar",
            "Matematika, Bahasa Inggris, dan IPA",
          ],
        },
        {
          title: "Siswa SMP",
          items: [
            "Akses materi kelas 7 sampai 9",
            "Latihan soal asesmen nasional",
            "Simulasi ujian masuk SMA favorit",
            "Mentoring akademik intensif",
            "Analisis kemampuan siswa",
            "Konsultasi minat bakat",
          ],
        },
      ],
      closing: "Bina Learning Prestasi membantu siswa mencapai potensi akademik terbaik melalui metode belajar yang efektif, fleksibel, dan terstruktur.",
      gallery: [
        { src: "/project/bimbel/hero.jpg", title: "Beranda", desc: "Hero utama dengan ajakan mendaftar dan highlight program bimbingan." },
        { src: "/project/bimbel/keunggulan.jpg", title: "Keunggulan Program", desc: "Enam alasan memilih Bina Learning Prestasi, dari mentor hingga simulasi ujian." },
        { src: "/project/bimbel/testimoni.jpg", title: "Testimoni Siswa", desc: "Cerita kesuksesan siswa yang telah mencapai target akademik mereka." },
        { src: "/project/bimbel/biaya-pendidikan.jpg", title: "Biaya Pendidikan", desc: "Pilihan paket biaya untuk jenjang TK, SD, dan SMP." },
      ],
    },
  },
  {
    title: "Saraso Koffiehaus",
    slug: "saraso",
    desc: "Website kedai kopi dengan katalog menu digital, pemesanan online, akun pelanggan, dan akun demo Admin Saraso untuk mencoba alur login serta melihat pesanan.",
    tags: ["React", "Vite", "CSS"],
    cat: "Web",
    year: "2026",
    status: "Live",
    liveUrl: "https://saraso-koffiehaus.vercel.app",
    image: "/project/saraso/hero.jpg",
    documentation: {
      about: "Saraso Koffiehaus adalah website kedai kopi yang menampilkan identitas, menu, dan pengalaman ruang Saraso. Pengunjung dapat menjelajahi menu berdasarkan kategori, menambahkan pesanan ke keranjang, membuat akun, dan melihat riwayat pesanan. Tersedia akun demo Admin Saraso untuk mencoba alur login dan melihat pesanan.",
      highlights: [
        { title: "Katalog Menu Digital", desc: "39 menu dengan kategori, harga, deskripsi, dan badge rekomendasi." },
        { title: "Filter dan Pencarian", desc: "Temukan menu berdasarkan kategori atau kata kunci dengan cepat." },
        { title: "Pemesanan Online", desc: "Tambahkan menu ke keranjang dan lihat ringkasan pesanan sebelum checkout." },
        { title: "Akun Pelanggan", desc: "Register, login, dan akses halaman Pesanan Saya untuk memantau riwayat." },
        { title: "Admin Saraso", desc: "Akun demo admin@sarasokoffiehaus.id untuk mencoba alur login dan melihat pesanan." },
        { title: "Desain Responsif", desc: "Tampilan konsisten dan nyaman di desktop maupun perangkat mobile." },
        { title: "Data Demo Lokal", desc: "Data menu, akun, dan pesanan tersimpan di localStorage dengan opsi reset demo." },
        { title: "Rating dan Ulasan", desc: "Menampilkan rating 4.9/5 dari 169 ulasan Google untuk memperkuat kepercayaan pengunjung." },
      ],
      sections: [
        {
          title: "Pelanggan",
          items: [
            "Jelajahi menu berdasarkan kategori",
            "Cari menu berdasarkan kata kunci",
            "Tambah menu ke keranjang",
            "Buat akun dan login",
            "Lihat riwayat di Pesanan Saya",
          ],
        },
        {
          title: "Admin Saraso",
          items: [
            "Login dengan akun demo admin",
            "Akses halaman pesanan",
            "Lihat ringkasan pesanan",
            "Reset data demo",
            "Logout dan ganti akun",
          ],
        },
        {
          title: "Kategori Menu",
          items: [
            "Kopi Basic",
            "Signature",
            "Refreshment",
            "Non-Coffee",
            "Khas Sumatra",
            "Dessert",
            "Food",
          ],
        },
      ],
      closing: "Saraso Koffiehaus menghadirkan pengalaman memesan kopi yang praktis, dari menjelajahi menu hingga memantau pesanan dalam satu platform.",
      gallery: [
        { src: "/project/saraso/hero.jpg", title: "Beranda", desc: "Identitas Saraso Koffiehaus, rating Google, dan ajakan menjelajahi menu." },
        { src: "/project/saraso/menu.jpg", title: "Katalog Menu", desc: "39 menu dengan filter kategori, pencarian, harga, dan badge rekomendasi." },
        { src: "/project/saraso/pesan-menu.jpg", title: "Pemesanan", desc: "Rakit pesanan, tambah menu ke keranjang, dan lihat ringkasan." },
        { src: "/project/saraso/login.jpg", title: "Login", desc: "Masuk dengan akun pelanggan atau akun demo Admin Saraso." },
        { src: "/project/saraso/register.jpg", title: "Register", desc: "Buat akun baru untuk menyimpan dan memantau pesanan." },
        { src: "/project/saraso/pesanan-saya.jpg", title: "Pesanan Saya", desc: "Riwayat pesanan akun Admin Saraso dengan status, rincian menu, dan total." },
      ],
    },
  },
  {
    title: "SIAPKAN SNIPER (Seblak Nurins Prasmanan)",
    slug: "siapkan-sniper",
    desc: "Aplikasi kasir berbasis desktop untuk mempermudah transaksi dan pengelolaan stok barang di Seblak Nurins Prasmanan, dengan laporan akurat, stok efisien, pengguna aman, dan informasi real-time.",
    tags: ["Point of Sales", "Desktop", "Database"],
    cat: "Desktop",
    year: "2025",
    status: "Live",
    image: "/project/seblak-nurins/dashboard-owner.jpg",
    documentation: {
      about: "Tingkatkan efisiensi bisnis Anda dengan SIAPKAN SNIPER, aplikasi kasir berbasis desktop yang dirancang untuk mempermudah transaksi dan pengelolaan stok barang di Seblak Nurins Prasmanan. Dengan fitur unggulan seperti laporan akurat, manajemen stok yang efisien, pengelolaan pengguna yang aman, dan akses informasi real-time, aplikasi ini mendukung operasional yang lebih terorganisir. Desainnya yang user-friendly memastikan kemudahan penggunaan, menjadikan aplikasi ini solusi ideal untuk meningkatkan efisiensi dan pengambilan keputusan bisnis secara tepat waktu.",
      highlights: [
        { title: "Laporan akurat", desc: "Rekap penjualan dan pembelian tersaji rapi untuk mendukung pengambilan keputusan bisnis." },
        { title: "Manajemen stok efisien", desc: "Pantau stok, barang terlaris, dan stok menipis langsung dari dashboard." },
        { title: "Pengelolaan pengguna aman", desc: "Kelola akses pengguna aplikasi sesuai kebutuhan operasional toko." },
        { title: "Informasi real-time", desc: "Data transaksi dan stok diperbarui langsung agar operasional tetap terorganisir." },
      ],
      closing: "Jangan biarkan proses manual menghambat pertumbuhan bisnis Anda. Beralihlah ke SIAPKAN SNIPER dan rasakan kemudahannya sekarang juga!",
      gallery: [
        { src: "/project/seblak-nurins/dashboard-owner.jpg", title: "Dashboard Owner", desc: "Ringkasan pendapatan, penjualan, rata-rata transaksi, barang terlaris, dan stok menipis." },
        { src: "/project/seblak-nurins/data-produk.jpg", title: "Data Produk", desc: "Kelola data produk, harga, stok, dan pencarian produk." },
        { src: "/project/seblak-nurins/transaksi-penjualan.jpg", title: "Transaksi Penjualan", desc: "Input transaksi, hitung total dan kembalian, lalu cetak struk." },
        { src: "/project/seblak-nurins/laporan-penjualan.jpg", title: "Laporan Penjualan", desc: "Filter laporan per periode, lihat rekap, dan ekspor data penjualan." },
      ],
    },
  },
  {
    title: "ALLESTIC (Alle Store Intelligent Cashier)",
    slug: "allestic",
    desc: "Aplikasi kasir berbasis desktop untuk mempermudah operasional toko secara cepat, efisien, dan terintegrasi: login RFID, scan barcode, cetak struk otomatis, laporan keuangan, stok, hingga presensi karyawan.",
    tags: ["Point of Sales", "Desktop", "Database"],
    cat: "Desktop",
    year: "2025",
    status: "Live",
    image: "/project/allestic/dashboard-admin.jpg",
    documentation: {
      about: "ALLESTIC (Alle Store Intelligent Cashier) adalah aplikasi kasir berbasis desktop yang kami kembangkan untuk mempermudah operasional toko secara cepat, efisien, dan terintegrasi. Fitur utamanya? Yuk simak!",
      highlights: [
        { title: "Login dengan scan kartu RFID", desc: "Autentikasi kasir cukup dengan menempelkan kartu RFID, sehingga sesi kerja dimulai lebih cepat dan aman." },
        { title: "Scan barcode produk", desc: "Produk masuk ke transaksi hanya dengan sekali scan barcode, mempercepat proses belanja dan mengurangi salah input." },
        { title: "Cetak struk otomatis", desc: "Struk transaksi tercetak otomatis setelah pembayaran, lengkap dengan rincian item dan total." },
      ],
      features: [
        "Transaksi penjualan",
        "Laporan keuangan dan grafik visual",
        "Manajemen stok barang",
        "Presensi dan penggajian karyawan",
        "Data real-time dan akurat",
      ],
      gallery: [
        { src: "/project/allestic/login-rfid.jpg", title: "Login RFID", desc: "Halaman login dengan opsi autentikasi scan kartu RFID." },
        { src: "/project/allestic/dashboard-admin.jpg", title: "Dashboard Admin", desc: "Ringkasan pendapatan, penjualan, laba, stok menipis, dan barang terlaris." },
        { src: "/project/allestic/form-barang-barcode.jpg", title: "Manajemen Barang", desc: "Input data barang, cetak barcode, dan pemantauan stok." },
        { src: "/project/allestic/transaksi-cetak-nota.jpg", title: "Transaksi dan Cetak Nota", desc: "Proses transaksi penjualan dengan preview struk sebelum dicetak." },
      ],
    },
  },
  {
    title: "SIPORA Versi 1.0",
    slug: "sipora",
    desc: "Pengembangan SIPORA agar sistem repository menjadi lebih praktis, informatif, dan mudah diakses melalui pembaruan antarmuka, penyederhanaan navigasi, serta dukungan akses web dan mobile.",
    tags: ["Laravel", "Flutter", "MySQL"],
    cat: "Web",
    year: "2024",
    status: "Live",
    image: "/project/sipora/admin-dashboard.jpg",
    documentation: {
      about: "Bagaimana jika proses unggah tugas akhir dapat dilakukan dengan alur yang lebih jelas? Dan bagaimana jika pencarian dokumen dapat memberikan hasil yang lebih relevan dan mudah ditemukan? Berangkat dari kebutuhan tersebut, kami mengembangkan SIPORA agar sistem repository menjadi lebih praktis, informatif, dan mudah diakses. Pengembangan dilakukan melalui pembaruan antarmuka, penyederhanaan navigasi, serta dukungan akses melalui perangkat mobile.",
      sections: [
        {
          title: "Website Admin",
          items: [
            "Dashboard ringkasan data",
            "Manajemen Admin",
            "Statistik dokumen",
            "Review dan verifikasi dokumen dan data mahasiswa",
            "Profil",
            "Laporan",
            "Mode gelap",
          ],
        },
        {
          title: "Website Mahasiswa",
          items: [
            "Dashboard informatif",
            "Upload dokumen dengan tahapan lebih terarah",
            "Pencarian berdasarkan kata kunci dan kata kunci trending",
            "Filter dokumen berdasarkan kategori",
            "Notifikasi melalui aplikasi website dan email",
            "Profil",
          ],
        },
        {
          title: "Aplikasi Mobile Mahasiswa",
          items: [
            "Tampilan dashboard ringkas dan responsif",
            "Unggah dokumen melalui perangkat mobile",
            "Filter dokumen berdasarkan kategori",
            "Pencarian dan penelusuran dokumen",
            "Download dan penyimpanan file",
            "Notifikasi real-time",
            "Pengelolaan profil pengguna",
          ],
        },
      ],
      advantages: [
        "Akses lintas perangkat (web dan mobile)",
        "Interaksi pengguna lebih mudah dan intuitif",
        "Proses unggah yang lebih terarah",
        "Pencarian dokumen yang lebih relevan",
        "Notifikasi otomatis yang membantu mahasiswa tetap mengikuti alur proses",
      ],
      closing: "SIPORA dikembangkan sebagai langkah menuju repository yang lebih mudah, terarah, dan relevan bagi penggunanya.",
      gallery: [
        { src: "/project/sipora/landing-page.jpg", title: "Landing Page SIPORA", desc: "Halaman utama untuk menjelajahi dan menemukan koleksi repository." },
        { src: "/project/sipora/admin-dashboard.jpg", title: "Dashboard Admin", desc: "Ringkasan total dokumen, tema, aktivitas dokumen, dan total user." },
      ],
    },
  },
  {
    title: "SIPORA Versi 1.2 AI Screening",
    slug: "sipora-ai",
    desc: "Platform repository digital terpusat untuk menyimpan, mengelola, dan mengakses karya tulis akademik melalui website dan aplikasi mobile, dengan dashboard interaktif, screening dokumen YOLO v8, chatbot AI, dan pencarian cerdas.",
    tags: ["Laravel", "Flutter", "AI Screening", "YOLO v8"],
    cat: "Web",
    year: "2025",
    status: "Live",
    image: "/project/sipora-ai/dashboard-admin.jpg",
    documentation: {
      about: "SIPORA v1.2 hadir sebagai platform repository digital yang dirancang untuk memudahkan penyimpanan, pengelolaan, dan akses karya tulis akademik secara terpusat melalui website maupun aplikasi mobile. Dengan berbagai pengembangan terbaru, SIPORA memberikan pengalaman yang lebih praktis, cepat, dan terintegrasi bagi seluruh pengguna.",
      highlights: [
        { title: "Dashboard Interaktif", desc: "Memantau statistik dan aktivitas repository secara real-time dalam satu tampilan yang informatif." },
        { title: "Screening Dokumen", desc: "Membantu memeriksa dan memvalidasi dokumen yang diunggah, termasuk screening otomatis berbasis YOLO v8, sehingga proses pengelolaan repository lebih terarah." },
        { title: "Chatbot AI", desc: "Asisten cerdas yang membantu pengguna menemukan informasi dan dokumen dengan lebih cepat." },
        { title: "Pencarian Cerdas", desc: "Menemukan karya tulis yang dibutuhkan dengan hasil pencarian yang lebih relevan dan akurat." },
        { title: "Unggah dan Kelola Dokumen", desc: "Proses unggah dan pengelolaan dokumen yang mudah dalam satu platform terintegrasi." },
        { title: "Jelajahi Dokumen", desc: "Mengakses berbagai karya tulis akademik yang tersimpan secara terpusat." },
        { title: "Notifikasi Real-Time", desc: "Mendapatkan informasi terbaru terkait aktivitas dan status dokumen secara langsung." },
        { title: "Terintegrasi Web dan Mobile", desc: "Akses repository kapan saja dan di mana saja melalui website maupun aplikasi mobile." },
      ],
      closing: "Dengan SIPORA v1.2, proses pengelolaan repository tidak lagi sekadar menyimpan dokumen, tetapi juga menghadirkan pengalaman yang lebih cerdas, efisien, dan modern melalui pemanfaatan teknologi digital dan kecerdasan buatan. Lebih mudah mengelola dokumen. Lebih cepat menemukan informasi. Lebih cerdas dengan teknologi AI. SIPORA v1.2: Smart Repository for Smart Academic Access.",
      gallery: [
        { src: "/project/sipora-ai/upload-ai-screening.jpg", title: "Upload dan Screening Dokumen", desc: "Unggah dokumen dengan screening otomatis, skor kelayakan, dan detail validasi." },
        { src: "/project/sipora-ai/repository-dokumen.jpg", title: "Jelajahi Dokumen", desc: "Telusuri karya tulis dengan pencarian cerdas dan filter jurusan, prodi, tema, serta jenis." },
        { src: "/project/sipora-ai/sipora-ai-assistant.jpg", title: "Chatbot AI", desc: "SIPORA AI Assistant membantu pengguna menemukan informasi dan dokumen akademik." },
        { src: "/project/sipora-ai/dashboard-admin.jpg", title: "Dashboard Interaktif", desc: "Statistik jurusan, prodi, tema, user, dan status dokumen dalam satu tampilan." },
      ],
    },
  },
  { title: "Absensi Arduino Nano", desc: "Sistem pencatatan absensi berbasis sistem tertanam menggunakan Arduino Nano untuk presensi otomatis.", tags: ["Arduino Nano", "Embedded", "Absensi"], cat: "IoT", year: "2024", status: "Demo" },
  {
    title: "SmartBin Eco-AI",
    desc: "Sistem pemilahan sampah berbasis computer vision yang mengenali jenis sampah, memantau kapasitas tong secara real-time, dan mencatat poin lokasi untuk pengelolaan sampah yang lebih terukur.",
    tags: ["React", "Computer Vision", "AI"],
    cat: "AI",
    year: "2025",
    status: "Live",
    liveUrl: "https://smartbin-eco-qls0u8e0u-saiful-rizals-projects-0615075e.vercel.app/",
    image: "/project/smartbin/hero.png",
  },
  { title: "SI Data Bendahara SMA Unggulan BPPT", desc: "Sistem informasi pencatatan data bendahara SMA Unggulan BPPT Darus Sholah Jember: kas, iuran, dan laporan keuangan.", tags: ["Web", "MySQL", "Keuangan"], cat: "Web", year: "2025", status: "Live" },
];

const DEFAULT_ACHIEVEMENTS = [
  { year: "2026", title: "Lolos Pendanaan P2MW", org: "Program Pembinaan Mahasiswa Wirausaha", desc: "Proposal kewirausahaan mahasiswa lolos seleksi pendanaan nasional pembinaan wirausaha.", tag: "Pendanaan" },
  { year: "2025", title: "Terbaik ke-10 Pagelaran Mahasiswa TIF", org: "Teknik Informatika, Politeknik Negeri Jember", desc: "Masuk 10 terbaik pagelaran karya mahasiswa Teknik Informatika tahun 2025.", tag: "Akademik" },
  { year: "2025", title: "Peringkat ke-7 Olimpiade Sastra Nasional", org: "OSN 2.8 Nasional", desc: "Meraih peringkat ke-7 pada Olimpiade Sastra Nasional OSN 2.8 tahun 2025.", tag: "Kompetisi" },
  { year: "2024", title: "Juara 3 Pemuda Pelopor Bidang Pendidikan", org: "Kabupaten Bondowoso", desc: "Meraih juara 3 Pemuda Pelopor Bidang Pendidikan Kabupaten Bondowoso.", tag: "Penghargaan" },
  { year: "2024", title: "Siswa Terbaik Jurusan Elektronika Industri", org: "SMKN 3 Bondowoso", desc: "Dinobatkan sebagai siswa terbaik jurusan Teknik Elektronika Industri SMKN 3 Bondowoso.", tag: "Akademik" },
  { year: "2024", title: "Juara 3 Poster TIF Exhibition 2024", org: "TIF Exhibition, Politeknik Negeri Jember", desc: "Meraih juara 3 lomba poster pada TIF Exhibition 2024.", tag: "Desain" },
  { year: "2024", title: "Juara 1 Seni Tunggal Putra IPSI SH Cup", org: "IPSI SH Cup Bondowoso", desc: "Juara 1 terbaik putra kategori seni tunggal pada kejuaraan IPSI SH Cup Bondowoso 2024.", tag: "Olahraga" },
];

const VIEW_META = {
  project: {
    title: "Project",
    desc: "Koleksi project web, mobile, dan AI sedang dikurasi. Segera hadir.",
  },
  achievement: {
    title: "Achievement",
    desc: "Penghargaan, pendanaan, dan kompetisi. Halaman sedang disiapkan, segera hadir.",
  },
  certification: {
    title: "Certification",
    desc: "Kepanitiaan, organisasi, dan penghargaan sesuai CV. Halaman sedang disiapkan, segera hadir.",
  },
};

const P_MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des", "Jan"];
const P_DAY_LABELS = ["Sen", "", "Rab", "", "Jum", "", ""];
const P_WEEKS = 53;
const P_LEVELS = ["lv0", "lv1", "lv2", "lv3", "lv4"];

function pLevelFor(w, d) {
  if (w >= 39) return 0;
  if (w >= 36) return d % 3 === 0 ? 1 : 0;
  const seed = (w * 7 + d * 13 + w * d) % 10;
  if (w < 8) return seed < 5 ? 4 : seed < 7 ? 3 : 2;
  if (w < 22) return seed < 6 ? 4 : seed < 8 ? 3 : 1;
  if (w < 32) return seed < 5 ? 4 : seed < 7 ? 2 : 1;
  return seed < 4 ? 3 : seed < 6 ? 2 : 1;
}

const PROFILE_CSS = `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700;800&family=Space+Grotesk:wght@400;500;700&display=swap');

        html, body { overflow-x: hidden; overflow-y: auto; height: auto; }
        #root { width: 100%; min-height: 100vh; }

        .profile-page {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          background: #090909;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(170,170,170,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(130,130,130,0.04) 0%, transparent 50%);
          color: #d4d8e0;
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 14px 120px;
          box-sizing: border-box;
        }

        .profile-card {
          position: relative;
          width: min(96vw, 1080px);
          background-color: rgba(20,20,20,0.85);
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 20px 20px;
          border: 1px solid rgba(170,170,170,0.12);
          border-radius: 20px;
          padding: 40px 34px 28px;
          box-sizing: border-box;
          text-align: center;
          box-shadow:
            0 0 60px rgba(170,170,170,0.04),
            0 2px 40px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.04);
          animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .pcorner { position: absolute; width: 18px; height: 18px; opacity: 0.7; }
        .pcorner::before, .pcorner::after { content: ""; position: absolute; background: #d4d4d4; }
        .pcorner::before { width: 100%; height: 1.5px; }
        .pcorner.tl::before, .pcorner.tr::before { top: 0; }
        .pcorner.bl::before, .pcorner.br::before { bottom: 0; }
        .pcorner::after { width: 1.5px; height: 100%; }
        .pcorner.tl::after, .pcorner.bl::after { left: 0; }
        .pcorner.tr::after, .pcorner.br::after { right: 0; }
        .pcorner.tl { top: 10px; left: 10px; }
        .pcorner.tr { top: 10px; right: 10px; }
        .pcorner.bl { bottom: 10px; left: 10px; }
        .pcorner.br { bottom: 10px; right: 10px; }

        .p-photo-wrap { display: flex; justify-content: center; margin-bottom: 22px; }
        .p-photo-ring {
          position: relative;
          width: 156px; height: 156px;
          border-radius: 50%;
          padding: 4px;
          background: conic-gradient(from 0deg, #d4d4d4, #8a8a8a, #404040, #d4d4d4);
          animation: ringRotate 6s linear infinite;
        }
        @keyframes ringRotate {
          to { background: conic-gradient(from 360deg, #d4d4d4, #8a8a8a, #404040, #d4d4d4); }
        }
        .p-photo-ring::after {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #d4d4d4, #8a8a8a, #404040, #d4d4d4);
          filter: blur(16px);
          opacity: 0.25;
          z-index: -1;
          animation: ringGlow 3s ease-in-out infinite alternate;
        }
        @keyframes ringGlow {
          from { opacity: 0.15; }
          to { opacity: 0.35; }
        }
        .p-photo {
          width: 148px; height: 148px; border-radius: 50%;
          object-fit: cover; filter: grayscale(20%) contrast(1.08) brightness(1.02);
          background: #1e1e1e; display: block;
          border: 3px solid #101010;
        }

        .p-name {
          font-family: 'Space Grotesk', 'JetBrains Mono', sans-serif;
          font-size: 19.85px; font-weight: 700; color: #fff;
          margin: 0 0 6px; line-height: 1.3;
          letter-spacing: -0.3px;
        }
        .p-title-line {
          font-size: 9.93px; font-weight: 500;
          color: #d4d4d4; letter-spacing: 2px;
          text-transform: uppercase; margin: 0 0 16px;
        }
        .p-bio {
          font-size: 10.37px; line-height: 1.85; color: #8a90a0;
          max-width: 880px; margin: 0 auto 22px;
        }

        .p-hire {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #d4d4d4 0%, #8a8a8a 100%);
          color: #090909; border: none; border-radius: 999px;
          font-family: inherit; font-size: 10.37px; font-weight: 700;
          padding: 12px 28px; cursor: pointer; position: relative;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
          box-shadow: 0 0 20px rgba(170,170,170,0.2);
        }
        .p-hire:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 0 40px rgba(170,170,170,0.35), 0 8px 30px rgba(130,130,130,0.2);
        }
        .p-hire:active { transform: translateY(0) scale(0.98); }
        .p-hire-icon { width: 16px; height: 16px; }

        .p-divider {
          height: 1px; border: none; margin: 30px 0;
          background: linear-gradient(90deg, transparent 0%, rgba(170,170,170,0.2) 50%, transparent 100%);
        }

        .p-git-head { display: flex; align-items: center; justify-content: space-between; margin: 0 0 12px; gap: 10px; }
        .p-git-left { display: flex; align-items: center; gap: 8px; }
        .p-git-title { font-size: 10.37px; font-weight: 700; color: #fff; }
        .p-year {
          background: #1c1c1c; color: #d4d4d4; border: 1px solid rgba(170,170,170,0.2);
          border-radius: 6px; font-family: inherit; font-size: 9.47px; padding: 3px 8px;
          cursor: pointer; transition: border-color 0.2s;
        }
        .p-year:focus { border-color: rgba(170,170,170,0.5); outline: none; }
        .p-git-total { font-size: 9.47px; color: #5a6070; }
        .p-git-total b { color: #d4d4d4; font-weight: 700; }
        .p-git-scroll { overflow-x: auto; padding-bottom: 6px; }
        .p-git-scroll::-webkit-scrollbar { height: 4px; }
        .p-git-scroll::-webkit-scrollbar-track { background: #101010; border-radius: 2px; }
        .p-git-scroll::-webkit-scrollbar-thumb { background: #2e2e2e; border-radius: 2px; }
        .p-git { min-width: 620px; text-align: left; }
        .p-git-months { display: grid; grid-template-columns: 34px repeat(53, 1fr); font-size: 7.67px; color: #4a5060; margin-bottom: 4px; }
        .p-git-months span:first-child { grid-column: 2; }
        .p-git-months span { overflow: visible; white-space: nowrap; }
        .p-git-body { display: grid; grid-template-columns: 34px 1fr; gap: 4px; }
        .p-git-days { display: grid; grid-template-rows: repeat(7, 11px); gap: 3px; font-size: 7.67px; color: #4a5060; align-items: center; }
        .p-git-grid { display: grid; grid-template-columns: repeat(53, 1fr); gap: 3px; }
        .p-week { display: grid; grid-template-rows: repeat(7, 11px); gap: 3px; }
        .p-cell { width: 11px; height: 11px; border-radius: 2px; display: inline-block; transition: transform 0.15s ease; }
        .p-cell:hover { transform: scale(1.4); z-index: 2; }
        .p-cell.lv0 { background: #161616; }
        .p-cell.lv1 { background: #2c2c2c; }
        .p-cell.lv2 { background: #4f4f4f; }
        .p-cell.lv3 { background: #7d7d7d; }
        .p-cell.lv4 { background: #d4d4d4; box-shadow: 0 0 4px rgba(170,170,170,0.3); }
        .p-cell.sm { width: 10px; height: 10px; }
        .p-git-legend { display: flex; align-items: center; justify-content: flex-end; gap: 5px; font-size: 8.12px; color: #4a5060; margin-top: 8px; }

        .p-sec {
          text-align: left; font-size: 10.83px; font-weight: 700;
          color: #d4d4d4; margin: 28px 0 14px;
          letter-spacing: 1.5px; text-transform: uppercase;
        }
        .p-sec::after {
          content: ""; display: block; width: 32px; height: 2px;
          background: linear-gradient(90deg, #d4d4d4, transparent);
          margin-top: 6px; border-radius: 1px;
        }

        .p-exp {
          display: flex; gap: 16px; text-align: left;
          background: linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(28,28,28,0.9) 100%);
          border: 1px solid rgba(170,170,170,0.08);
          border-left: 3px solid #d4d4d4;
          border-radius: 14px; padding: 20px;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          animation: expIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both;
        }
        @keyframes expIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .p-exp:hover {
          border-color: rgba(170,170,170,0.2);
          box-shadow: 0 0 30px rgba(170,170,170,0.06);
          transform: translateY(-2px);
        }
        .p-exp-logo {
          flex-shrink: 0; width: 60px; height: 60px; border-radius: 12px;
          background: linear-gradient(135deg, #181818 0%, #222222 100%);
          border: 1px solid rgba(170,170,170,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 9.93px; font-weight: 700; color: #d4d4d4;
        }
        .p-exp-logo .sup { font-size: 6.32px; vertical-align: super; }
        .p-exp-body { flex: 1; min-width: 0; }
        .p-exp-title { font-family: 'Space Grotesk', sans-serif; font-size: 12.63px; font-weight: 700; color: #fff; margin: 0 0 4px; }
        .p-exp-sub { font-size: 9.47px; color: #6a7080; margin: 0 0 10px; }
        .p-exp-desc { font-size: 9.47px; line-height: 1.7; color: #7a8090; margin: 0 0 14px; }
        .p-exp-resp { font-size: 8.58px; font-weight: 700; color: #d4d4d4; margin: 0 0 7px; letter-spacing: 1px; }
        .p-exp-list { margin: 0 0 14px; padding: 0; list-style: none; font-size: 9.47px; color: #7a8090; line-height: 1.8; }
        .p-exp-list li { position: relative; padding-left: 14px; }
        .p-exp-list li::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #d4d4d4; opacity: 0.5; }
        .p-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .p-tags span {
          font-size: 8.12px; color: #a0a8b8; border: 1px solid rgba(170,170,170,0.12);
          border-radius: 6px; padding: 4px 10px;
          background: rgba(170,170,170,0.04);
          transition: background 0.2s, border-color 0.2s;
        }
        .p-tags span:hover { background: rgba(170,170,170,0.1); border-color: rgba(170,170,170,0.3); }
        .p-exp-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
        .p-date { font-size: 9.03px; color: #5a6070; }
        .p-badge {
          font-size: 9.03px; color: #d4d4d4;
          border: 1px solid rgba(170,170,170,0.2);
          border-radius: 6px; padding: 4px 12px;
          background: rgba(170,170,170,0.06);
        }

        .p-socials { display: flex; justify-content: center; gap: 12px; margin-top: 22px; }
        .p-soc {
          width: 46px; height: 46px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          display: flex; align-items: center; justify-content: center;
          color: #6a7080; transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          text-decoration: none;
        }
        .p-soc:hover {
          color: #d4d4d4; border-color: rgba(170,170,170,0.3);
          background: rgba(170,170,170,0.06);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(170,170,170,0.1);
        }
        .p-soc svg { width: 20px; height: 20px; }

        .p-foot {
          display: flex; justify-content: space-between; gap: 12px;
          margin-top: 28px; font-size: 9.03px; color: #c8ccd4;
          font-weight: 500; flex-wrap: wrap;
        }
        .p-foot .dim { color: #3a4050; font-weight: 400; }
        .p-copy { font-size: 9.03px; color: #2a303c; margin: 10px 0 0; text-align: center; letter-spacing: 1px; }

        .p-nav {
          position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%);
          display: flex; align-items: center; gap: 4px;
          background: rgba(16,16,16,0.92);
          border: 1px solid rgba(170,170,170,0.1);
          border-radius: 999px; padding: 6px; z-index: 60;
          backdrop-filter: blur(16px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .p-nav-item {
          border: none; background: transparent; color: #5a6070; cursor: pointer;
          min-width: 44px; min-height: 44px; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center; gap: 0;
          font-family: inherit; font-size: 9.93px; font-weight: 700;
          padding: 8px 10px; transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          position: relative;
        }
        .p-nav-item svg { width: 17px; height: 17px; }
        .p-nav-item.wide { padding: 8px 16px; }
        .p-nav-item span { max-width: 0; opacity: 0; overflow: hidden; white-space: nowrap; transition: max-width 0.3s ease, opacity 0.25s ease; }
        .p-nav-item.active span, .p-nav-item:hover span { max-width: 90px; opacity: 1; }
        .p-nav-item.active, .p-nav-item:hover { gap: 10px; }
        .p-nav-item.active {
          background: rgba(170,170,170,0.1); color: #d4d4d4;
          box-shadow: 0 0 12px rgba(170,170,170,0.08);
        }
        .p-nav-item:hover { background: rgba(255,255,255,0.05); color: #c8ccd4; }
        .p-nav-item.active:hover { background: rgba(170,170,170,0.15); color: #d4d4d4; }

        .p-exp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        @media (max-width: 1024px) { .p-exp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .p-exp-grid { grid-template-columns: 1fr; } }

        .p-ct-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; text-align: left; }
        @media (max-width: 1024px) { .p-ct-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .p-ct-grid { grid-template-columns: 1fr; } }
        .p-ct-img { width: 100%; height: 150px; object-fit: cover; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: #181818; margin-bottom: 12px; display: block; }
        .p-ct-grid.project-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .project-grid .project-card {
          display: block; min-width: 0; overflow: hidden; padding: 0;
          background: #090909; border: 1px solid rgba(255,255,255,.1);
          border-radius: 16px; border-left: 1px solid rgba(255,255,255,.1);
          transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
        }
        .project-grid .project-card:hover {
          border-color: rgba(255,255,255,.24);
          box-shadow: 0 12px 30px rgba(0,0,0,.35);
          transform: translateY(-3px);
        }
        .project-visual {
          position: relative; height: 158px; overflow: hidden;
          background: radial-gradient(ellipse at 70% 20%, #282828, transparent 55%), #111;
        }
        .project-visual::after {
          content: ""; position: absolute; inset: 25% 0 0; pointer-events: none;
          background: linear-gradient(180deg, transparent 5%, rgba(9,9,9,.92) 100%);
        }
        .project-visual img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform .45s ease; }
        .project-card:hover .project-visual img { transform: scale(1.04); }
        .project-grid .project-visual img { object-fit: cover; }
        .project-grid .project-card:hover .project-visual img { transform: none; }
        .project-visual.is-placeholder {
          display: grid; place-items: center;
          background: radial-gradient(ellipse at 75% 15%, #353535 0, transparent 42%), linear-gradient(135deg, #1d1d1d, #090909 75%);
        }
        .project-visual-mark { color: rgba(255,255,255,.7); font: 700 42px 'Space Grotesk', sans-serif; letter-spacing: -3px; }
        .project-year, .project-open {
          position: absolute; z-index: 1; top: 10px;
          border: 1px solid rgba(255,255,255,.16); background: rgba(12,12,12,.76);
          color: #eee; backdrop-filter: blur(8px);
        }
        .project-year { left: 10px; border-radius: 999px; padding: 4px 8px; font-size: 7.22px; }
        .project-open {
          right: 10px; width: 27px; height: 27px; display: grid; place-items: center;
          border-radius: 50%; text-decoration: none; font-size: 11.73px;
        }
        .project-grid .project-card .p-exp-body { display: flex; flex-direction: column; min-height: 350px; padding: 0 15px 14px; }
        .project-grid .p-ct-img { height: 100%; margin: 0; border: 0; border-radius: 0; }
        .project-grid .project-card:not(.project-card-wide) .project-visual {
          width: calc(100% + 30px); height: 138px; margin: 0 -15px 11px;
        }
        .project-grid .project-card:not(.project-card-wide) .project-visual::after {
          inset: 24% 0 0; background: linear-gradient(180deg, transparent 4%, rgba(9,9,9,.45) 54%, #090909 100%);
        }
        .project-grid .p-exp-title { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; min-height: 40px; font-size: 12.63px; line-height: 1.45; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-title {
          order: 2; min-height: 0; margin: 0 0 8px; font-size: 14.44px; line-height: 1.35;
        }
        .project-grid .p-exp-sub { margin-bottom: 8px; color: #777; font-size: 8.12px; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-sub { display: none; }
        .project-grid .p-exp-desc { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 3; min-height: 45px; margin-bottom: 10px; color: #aaa; font-size: 8.12px; line-height: 1.65; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-desc {
          order: 3; min-height: 0; margin: 0 0 12px; font-size: 9.93px; line-height: 1.55; -webkit-line-clamp: 3;
        }
        .project-grid .p-exp-desc,
        .p-ct-grid.ct-wide .certificate-preview-desc { text-align: justify; }
        .project-grid .p-tags { gap: 5px; margin-bottom: 11px; }
        .project-grid .project-card:not(.project-card-wide) .p-tags { order: 1; margin: 0 0 10px; }
        .project-grid .p-tags span { padding: 4px 7px; border-radius: 5px; font-size: 8.12px; }
        .project-grid .p-exp-foot { margin-top: auto; padding-top: 9px; border-top: 1px solid rgba(255,255,255,.08); }
        .project-grid .p-badge { border: 0; background: none; color: #777; padding: 0; font-size: 8.12px; }
        .project-grid .p-btn { padding: 8px 13px; font-size: 9.03px; }
        .project-grid .p-exp-foot > div { gap: 6px !important; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-foot { order: 4; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-foot a.p-btn.solid { display: none; }
        .project-grid .project-card:not(.project-card-wide) .p-btn { background: #e8e8e8; color: #111; border-color: #e8e8e8; }
        .project-grid .project-card-wide { display: flex; grid-column: span 2; }
        .project-grid .project-card-wide .p-exp-body {
          position: relative; display: grid; flex: 1; grid-template-columns: 1.6fr 1fr;
          grid-template-rows: 1fr auto auto auto 1fr auto; align-content: stretch;
          gap: 0 16px; min-height: 350px; padding: 18px;
        }
        .project-grid .project-card-wide .project-visual {
          position: absolute; inset: 0 auto 0 0; width: 58%; height: 100%;
        }
        .project-grid .project-card-wide .project-visual img {
          object-fit: cover; object-position: center;
        }
        .project-grid .project-card-wide .project-visual::after {
          inset: 0; background: linear-gradient(90deg, transparent 42%, rgba(9,9,9,.58) 74%, #090909 100%);
        }
        .project-grid .project-card-wide .project-visual.is-placeholder {
          background: radial-gradient(ellipse at 30% 45%, #414141 0, transparent 48%), linear-gradient(120deg, #252525, #101010 75%);
        }
        .project-grid .project-card-wide .p-exp-title,
        .project-grid .project-card-wide .p-exp-sub,
        .project-grid .project-card-wide .p-exp-desc,
        .project-grid .project-card-wide .p-tags,
        .project-grid .project-card-wide .p-exp-foot { grid-column: 2; position: relative; }
        .project-grid .project-card-wide .p-exp-title { grid-row: 2; }
        .project-grid .project-card-wide .p-exp-title {
          min-height: 0; margin: 0 0 8px; font-size: 14.44px; line-height: 1.35;
        }
        .project-grid .project-card-wide .p-exp-sub { display: none; }
        .project-grid .project-card-wide .p-exp-desc {
          grid-row: 3; min-height: 0; margin: 0 0 12px; -webkit-line-clamp: 3;
          font-size: 9.93px; line-height: 1.55;
        }
        .project-grid .project-card-wide .p-tags { grid-row: 4; margin-bottom: 0; }
        .project-grid .project-card-wide .p-exp-foot { grid-row: 6; }
        .project-grid .project-card-wide .p-tags span { padding: 4px 7px; font-size: 8.12px; }
        .project-grid .project-card-wide .p-exp-foot { align-self: end; }
        .project-grid .project-card-wide .p-btn { padding: 8px 13px; font-size: 9.03px; }
        @media (max-width: 1024px) { .p-ct-grid.project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) {
          .p-ct-grid.project-grid { grid-template-columns: 1fr; }
          .project-grid .project-card .p-exp-body { min-height: 0; padding: 0 15px 16px; }
          .project-grid .project-card .project-visual {
            position: relative; inset: auto; width: calc(100% + 30px); height: 200px;
            margin: 0 -15px 12px;
          }
          .project-grid .project-card .project-visual::after {
            inset: 30% 0 0;
            background: linear-gradient(180deg, transparent 4%, rgba(9,9,9,.55) 54%, #090909 100%);
          }
          .project-grid .project-card .p-exp-title {
            position: relative; z-index: 1; min-height: 0; margin: 0 0 10px;
          }
          .project-grid .project-card-wide { grid-column: auto; }
          .project-grid .project-card-wide .p-exp-body { display: flex; min-height: 0; padding: 0 15px 16px; }
          .project-grid .project-card-wide .p-exp-title,
          .project-grid .project-card-wide .p-exp-sub,
          .project-grid .project-card-wide .p-exp-desc,
          .project-grid .project-card-wide .p-tags,
          .project-grid .project-card-wide .p-exp-foot { grid-column: auto; }
        }
        .project-detail-page { width: min(96vw, 1060px); margin: 0 auto; color: #e7e7e7; text-align: left; }
        .project-detail-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 24px; }
        .project-back, .project-step {
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          min-height: 32px; padding: 0 12px; border: 1px solid #252525; border-radius: 999px;
          color: #aaa; background: #0b0b0b; font-family: inherit; font-size: 8.12px; text-decoration: none; cursor: pointer;
        }
        .project-back:hover, .project-step:hover { color: #fff; border-color: #555; }
        .project-step-controls { display: flex; align-items: center; gap: 8px; color: #777; font-size: 8.12px; }
        .project-step { width: 30px; min-height: 30px; padding: 0; font-size: 10.83px; }
        .project-detail-layout { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(220px, .8fr); gap: 18px; align-items: start; }
        .project-detail-card { overflow: hidden; border: 1px solid #242424; border-radius: 15px; background: #090909; }
        .project-detail-visual { position: relative; height: clamp(210px, 30vw, 340px); overflow: hidden; background: radial-gradient(ellipse at 70% 20%, #343434, transparent 55%), #111; }
        .project-detail-visual::after { content: ""; position: absolute; inset: 45% 0 0; background: linear-gradient(180deg, transparent, #090909); pointer-events: none; }
        .project-detail-visual img { width: 100%; height: 100%; display: block; object-fit: cover; }
        .project-detail-visual.is-placeholder { display: grid; place-items: center; }
        .project-detail-visual.is-placeholder::before { content: ""; position: absolute; width: 60%; aspect-ratio: 1; border: 1px solid rgba(255,255,255,.1); border-radius: 50%; box-shadow: 0 0 0 28px rgba(255,255,255,.02), 0 0 0 56px rgba(255,255,255,.015); }
        .project-detail-visual .project-visual-mark { font-size: clamp(48.73px, 8.12vw, 90.25px); }
        .project-detail-content { padding: 0 20px 20px; }
        .project-detail-meta { display: flex; align-items: center; gap: 8px; margin: -2px 0 12px; color: #aaa; font-size: 8.12px; }
        .project-detail-meta span { padding: 4px 8px; border: 1px solid #292929; border-radius: 999px; background: #111; }
        .project-detail-content h1 { font: 700 clamp(20px, 3vw, 28px)/1.2 'Space Grotesk', sans-serif; letter-spacing: -.5px; margin: 0 0 12px; }
        .project-detail-description { color: #aaa; font-size: 9.03px; line-height: 1.9; margin: 0; }
        .project-detail-description, .certificate-detail-copy { text-align: justify; }
        .project-detail-tech { border-top: 1px solid #222; margin-top: 18px; padding-top: 14px; }
        .project-detail-tech-label { margin: 0 0 9px; color: #777; font-size: 7.22px; letter-spacing: 1px; text-transform: uppercase; }
        .project-detail-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .project-detail-tags span { border: 1px solid #292929; border-radius: 7px; padding: 5px 8px; color: #c3c3c3; font-size: 7.22px; }
        .project-detail-actions { display: flex; flex-wrap: wrap; gap: 8px; border-top: 1px solid #222; margin-top: 16px; padding-top: 14px; }
        .project-detail-actions .p-btn { padding: 8px 12px; font-size: 8.12px; }
        .certificate-detail-visual {
          display: grid; place-items: center; min-height: 300px; padding: 14px;
          background: #111; border-bottom: 1px solid #242424;
        }
        .certificate-detail-visual img {
          display: block; width: 100%; max-height: min(62vh, 620px); object-fit: contain;
          border-radius: 9px; background: #f4f4f4;
        }
        .certificate-detail-content { padding-top: 20px; }
        .certificate-detail-content h1 { font: 700 clamp(20px, 3vw, 28px)/1.25 'Space Grotesk', sans-serif; margin: 0 0 12px; }
        .certificate-detail-meta { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 14px; }
        .certificate-detail-meta span {
          padding: 4px 8px; border: 1px solid #292929; border-radius: 999px;
          background: #111; color: #aaa; font-size: 8.12px;
        }
        .certificate-detail-copy { color: #aaa; font-size: 9.93px; line-height: 1.8; margin: 0; }
        .certificate-detail-code { margin: 12px 0 0; color: #777; font-size: 9.03px; }
        .certificate-detail-sidebar h2 { font-size: 16.25px; }
        .certificate-detail-list {
          max-height: none; overflow: visible;
        }
        .certificate-detail-list button { grid-template-columns: 76px minmax(0, 1fr); gap: 12px; padding: 11px; }
        .certificate-detail-list .project-detail-thumb { height: 58px; }
        .certificate-detail-list .project-detail-list-copy strong { font-size: 11.73px; line-height: 1.4; }
        .certificate-detail-list .project-detail-list-copy small { font-size: 9.03px; margin-top: 6px; }
        .certificate-detail-layout { grid-template-columns: minmax(0, 1fr); }
        .certificate-related { margin-top: 28px; }
        .certificate-related > h2 {
          margin: 0 0 14px; color: #eee; font: 700 18px 'Space Grotesk', sans-serif;
        }
        .certificate-related-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        .certificate-related-card {
          display: grid; grid-template-columns: minmax(140px, .8fr) minmax(0, 1fr);
          min-width: 0; overflow: hidden; border: 1px solid #242424; border-radius: 14px;
          background: #090909; transition: border-color .2s ease, transform .2s ease;
        }
        .certificate-related-card:hover { border-color: #555; transform: translateY(-2px); }
        .certificate-related-image { display: grid; place-items: center; min-height: 190px; padding: 10px; background: #111; }
        .certificate-related-image img { display: block; width: 100%; max-height: 210px; object-fit: contain; border-radius: 7px; background: #f4f4f4; }
        .certificate-related-image span { color: #aaa; font: 700 32px 'Space Grotesk', sans-serif; }
        .certificate-related-body { display: flex; flex-direction: column; min-width: 0; padding: 14px; }
        .certificate-related-meta { margin: 0 0 8px; color: #888; font-size: 9.03px; }
        .certificate-related-body h3 {
          display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
          margin: 0 0 8px; color: #eee; font: 700 15px/1.35 'Space Grotesk', sans-serif;
        }
        .certificate-related-body p { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 3; margin: 0 0 12px; color: #aaa; font-size: 9.93px; line-height: 1.6; }
        .certificate-related-body .p-btn { align-self: flex-start; margin-top: auto; }
        .project-detail-sidebar h2, .project-related h2 { color: #eee; font: 700 14px 'Space Grotesk', sans-serif; margin: 0 0 10px; }
        .project-detail-list { display: flex; flex-direction: column; gap: 7px; }
        .project-detail-list button {
          display: grid; grid-template-columns: 55px minmax(0, 1fr); align-items: center; gap: 9px;
          width: 100%; min-width: 0; padding: 7px; border: 1px solid #242424; border-radius: 10px;
          background: #090909; color: #ddd; text-align: left; cursor: pointer;
        }
        .project-detail-list button:hover, .project-detail-list button[aria-current="page"] { border-color: #555; background: #111; }
        .project-detail-thumb { position: relative; display: grid; place-items: center; height: 40px; overflow: hidden; border-radius: 6px; background: #1b1b1b; }
        .project-detail-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .project-detail-thumb span { color: #aaa; font: 700 13px 'Space Grotesk', sans-serif; }
        .project-detail-list-copy { min-width: 0; }
        .project-detail-list-copy strong { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; color: #ddd; font: 600 9px/1.45 'Space Grotesk', sans-serif; }
        .project-detail-list-copy small { display: block; color: #777; font-size: 6.32px; margin-top: 4px; }
        .project-docs { border-top: 1px solid #202020; margin-top: 28px; padding-top: 22px; }
        .project-docs-head { max-width: 800px; margin-bottom: 20px; }
        .project-docs-eyebrow { margin: 0 0 7px; color: #777; font-size: 7.22px; letter-spacing: 1.4px; text-transform: uppercase; }
        .project-docs-head h2 { color: #f0f0f0; font: 700 clamp(18px, 2.5vw, 24px)/1.25 'Space Grotesk', sans-serif; letter-spacing: -.4px; margin: 0 0 10px; }
        .project-docs-intro { color: #aaa; font-size: 9.47px; line-height: 1.9; margin: 0; }
        .project-docs-block { margin-top: 22px; }
        .project-docs-block h3 { color: #eee; font: 700 13px 'Space Grotesk', sans-serif; margin: 0 0 11px; }
        .project-docs-highlights { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 10px; }
        .project-docs-highlight { overflow: hidden; padding: 16px 14px 14px; border: 1px solid #242424; border-radius: 12px; background: linear-gradient(160deg, #111, #090909 70%); }
        .project-docs-number { display: inline-grid; place-items: center; width: 26px; height: 26px; margin-bottom: 10px; border: 1px solid #333; border-radius: 8px; color: #bbb; font: 700 9px 'Space Grotesk', sans-serif; }
        .project-docs-highlight h4 { color: #eee; font: 600 11px/1.5 'Space Grotesk', sans-serif; margin: 0 0 7px; }
        .project-docs-highlight p { color: #888; font-size: 8.12px; line-height: 1.7; margin: 0; }
        .project-docs-sections { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 22px; }
        .project-docs-section { padding: 14px; border: 1px solid #242424; border-radius: 12px; background: #0b0b0b; }
        .project-docs-section h3 { margin: 0 0 10px; color: #eee; font: 700 11.5px 'Space Grotesk', sans-serif; }
        .project-docs-section ul { display: flex; flex-direction: column; gap: 7px; list-style: none; margin: 0; padding: 0; }
        .project-docs-section li { display: flex; gap: 8px; color: #aaa; font-size: 8.12px; line-height: 1.65; }
        .project-docs-section li span { flex: 0 0 auto; color: #9ad6a6; font-size: 7.22px; margin-top: 2px; }
        .project-docs-closing { margin: 18px 0 0; padding: 13px 15px; border: 1px solid #2a2a2a; border-left: 2px solid #9ad6a6; border-radius: 10px; background: #0b0b0b; color: #b8b8b8; font-size: 9.03px; line-height: 1.8; }
        .project-docs-features ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; list-style: none; margin: 0; padding: 0; }
        .project-docs-features li { display: flex; align-items: center; gap: 9px; padding: 10px 12px; border: 1px solid #242424; border-radius: 9px; background: #0b0b0b; color: #c3c3c3; font-size: 8.58px; }
        .project-docs-features li span { display: grid; place-items: center; width: 16px; height: 16px; flex: 0 0 auto; border-radius: 50%; background: #1c1c1c; color: #9ad6a6; font-size: 7.22px; }
        .project-docs-gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .project-docs-gallery figure { overflow: hidden; margin: 0; border: 1px solid #242424; border-radius: 11px; background: #0b0b0b; }
        .project-docs-gallery img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; background: #111; }
        .project-docs-gallery figcaption { display: flex; flex-direction: column; gap: 4px; padding: 10px 12px 12px; }
        .project-docs-gallery strong { color: #ddd; font: 600 10px 'Space Grotesk', sans-serif; }
        .project-docs-gallery span { color: #777; font-size: 7.67px; line-height: 1.6; }
        .project-related { border-top: 1px solid #202020; margin-top: 28px; padding-top: 17px; }
        .project-related-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 11px; }
        .project-related-head p { color: #777; font-size: 7.22px; margin: 4px 0 0; }
        .project-related-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
        .project-related-item { overflow: hidden; padding: 0; border: 1px solid #252525; border-radius: 10px; background: #0b0b0b; color: #ddd; text-align: left; cursor: pointer; }
        .project-related-item:hover { border-color: #555; }
        .project-related-image { position: relative; display: grid; place-items: center; height: 100px; overflow: hidden; background: #191919; }
        .project-related-image::after { content: ""; position: absolute; inset: 45% 0 0; background: linear-gradient(transparent, #0b0b0b); }
        .project-related-image img { width: 100%; height: 100%; object-fit: cover; }
        .project-related-image span { color: #aaa; font: 700 28px 'Space Grotesk', sans-serif; }
        .project-related-item strong { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; padding: 8px; font: 600 9px/1.5 'Space Grotesk', sans-serif; }
        @media (max-width: 720px) {
          .project-detail-page { width: min(100%, 560px); }
          .project-detail-layout { grid-template-columns: 1fr; }
          .project-detail-sidebar { order: 2; }
          .project-detail-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .certificate-related-grid { grid-template-columns: 1fr; }
          .project-detail-content { padding: 0 15px 16px; }
          .project-docs-highlights { grid-template-columns: 1fr; }
          .project-docs-sections { grid-template-columns: 1fr; }
          .project-docs-features ul { grid-template-columns: 1fr; }
          .project-docs-gallery { grid-template-columns: 1fr; }
          .project-related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 420px) {
          .project-detail-list { grid-template-columns: 1fr; }
          .project-related-grid { grid-template-columns: 1fr; }
          .project-detail-top { align-items: flex-start; }
        }
        .profile-card.cert-wide { width: min(98vw, 1400px); }
        .p-ct-grid.ct-wide { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .p-ct-grid.ct-wide .p-exp { min-height: 0; padding: 14px; align-items: stretch; }
        .p-ct-grid.ct-wide .p-exp-body { display: flex; flex: 1; flex-direction: column; min-width: 0; }
        .p-ct-grid.ct-wide .p-ct-img {
          height: 190px; object-fit: contain; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.1); background: #f4f4f4;
          margin: 0 0 10px;
        }
        .p-ct-grid.ct-wide .p-exp-title {
          display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
          min-height: 2.9em; margin: 0 0 5px; line-height: 1.45;
        }
        .p-ct-grid.ct-wide .p-exp-sub {
          display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
          min-height: 3em; margin: 0 0 7px; line-height: 1.5;
        }
        .p-ct-grid.ct-wide .certificate-preview-desc {
          display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 3;
          min-height: 4.8em; color: #aaa; font-size: 9.03px; line-height: 1.6; margin: 0 0 8px;
        }
        .p-ct-grid.ct-wide .p-exp-foot { margin-top: auto; padding-top: 8px; }
        @media (max-width: 1024px) { .p-ct-grid.ct-wide { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (max-width: 768px) { .p-ct-grid.ct-wide { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) {
          .p-ct-grid.ct-wide { grid-template-columns: 1fr; }
          .p-ct-grid.ct-wide .p-exp { min-height: 0; }
          .p-ct-grid.ct-wide .p-ct-img { height: clamp(190px, 55vw, 280px); }
          .certificate-detail-visual { min-height: 180px; padding: 10px; }
          .certificate-detail-visual img { max-height: 55vh; }
        }
        .p-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; text-align: left; }
        .p-field > span { font-size: 9.03px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #8a8f9e; }
        .p-input, .p-textarea { background: #141414; border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; color: #e8e8e8; font-family: inherit; font-size: 10.83px; padding: 10px 12px; width: 100%; box-sizing: border-box; }
        .p-input:focus, .p-textarea:focus { outline: none; border-color: rgba(255,255,255,0.35); }
        .p-textarea { min-height: 90px; resize: vertical; line-height: 1.6; }
        .p-btn-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 6px; }
        .p-btn { display: inline-flex; align-items: center; gap: 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: #e8e8e8; font-family: inherit; font-size: 9.93px; font-weight: 700; padding: 10px 20px; cursor: pointer; transition: all 0.25s ease; }
        .p-btn:hover { background: rgba(255,255,255,0.1); }
        .p-btn.solid { background: #e8e8e8; color: #111; border-color: #e8e8e8; }
        .p-btn.solid:hover { background: #ffffff; }
        .p-btn.danger { border-color: rgba(255,120,120,0.4); color: #ff9c9c; }
        .p-btn.danger:hover { background: rgba(255,120,120,0.1); }
        .p-thumb { width: 100%; height: 120px; object-fit: cover; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: #181818; display: block; }
        .p-tabs { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
        .p-tab { border: 1px solid rgba(255,255,255,0.15); background: transparent; color: #9aa0ae; border-radius: 999px; font-family: inherit; font-size: 9.47px; font-weight: 700; padding: 8px 18px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; }
        .p-tab.on { background: #e8e8e8; color: #111; border-color: #e8e8e8; }
        .p-file { font-size: 9.93px; color: #9aa0ae; }
        .p-file::file-selector-button { background: #222; color: #e8e8e8; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 8px 14px; margin-right: 10px; cursor: pointer; font-family: inherit; font-size: 9.93px; }
        .p-modal-bg { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.72); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 18px; box-sizing: border-box; animation: cardIn 0.3s ease both; }
        .p-modal-box { width: min(94vw, 520px); max-height: 88vh; overflow-y: auto; background: #141414; border: 1px solid rgba(255,255,255,0.14); border-radius: 18px; padding: 28px; box-sizing: border-box; text-align: center; }

        @media (max-width: 560px) {
          .profile-page { padding: 20px 10px 110px; }
          .profile-card { padding: 28px 18px 20px; }
          .p-name { font-size: 15.34px; }
          .p-title-line { font-size: 9.03px; letter-spacing: 1px; }
          .p-bio { font-size: 9.47px; }
          .p-hire { width: 100%; justify-content: center; }
          .p-git-head { flex-wrap: wrap; }
          .p-exp { flex-direction: column; padding: 16px; }
          .p-exp-logo { width: 50px; height: 50px; font-size: 9.03px; }
          .p-exp-grid, .p-ct-grid { gap: 10px; }
          .p-ct-img { height: 130px; }
          .p-foot { justify-content: center; text-align: center; }
          .p-photo-ring { width: 130px; height: 130px; }
          .p-photo { width: 122px; height: 122px; }
          .p-modal-bg { padding: 12px; }
          .p-modal-box { padding: 20px 16px; }
          .p-nav { bottom: 10px; max-width: calc(100vw - 16px); overflow-x: auto; }
          .p-nav-item { min-width: 40px; min-height: 40px; font-size: 8.12px; padding: 8px 8px; }
          .p-nav-item.wide { padding: 8px 10px; }
        }

        .profile-page .p-name { font-size: clamp(16.25px, 1.8vw, 21.66px); }
        .profile-page .p-title-line { font-size: 10.83px; }
        .profile-page .p-bio { font-size: 11.29px; }
        .profile-page .p-sec { font-size: 11.73px; }
        .profile-page .p-exp-title { font-size: 13.54px; }
        .profile-page .p-exp-sub,
        .profile-page .p-exp-desc,
        .profile-page .p-exp-list { font-size: 10.37px; }
        .profile-page .p-tags span { font-size: 9.03px; }
        .profile-page .p-badge { font-size: 9.03px; }
        .profile-page .p-btn { font-size: 10.83px; }
        .profile-page .p-tab { font-size: 10.37px; }
        .profile-page .p-nav-item { font-size: 10.83px; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-title,
        .project-grid .project-card-wide .p-exp-title { font-size: 15.34px; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-desc,
        .project-grid .project-card-wide .p-exp-desc { font-size: 10.83px; }
        .project-grid .p-tags span,
        .project-grid .project-card-wide .p-tags span { font-size: 9.03px; }
        .project-grid .p-btn,
        .project-grid .project-card-wide .p-btn { font-size: 9.93px; }
        .project-detail-page .project-detail-description,
        .project-detail-page .certificate-detail-copy { font-size: 10.83px; }
        .project-detail-page .project-detail-meta,
        .project-detail-page .certificate-detail-meta span,
        .project-detail-page .project-detail-actions .p-btn { font-size: 9.03px; }
        .p-ct-grid.ct-wide .p-exp-title { font-size: 13.54px; }
        .p-ct-grid.ct-wide .p-exp-sub { font-size: 10.37px; }
        .p-ct-grid.ct-wide .certificate-preview-desc { font-size: 9.93px; }

        @media (prefers-reduced-motion: reduce) {
          .profile-card, .p-exp { animation: none; }
          .p-photo-ring, .p-photo-ring::after { animation: none; }
          .p-cell:hover { transform: none; }
        }
@media (min-width: 769px) {

        .p-name {
          font-size: 23.82px;
        }
        .p-title-line {
          font-size: 11.92px;
        }
        .p-bio {
          font-size: 12.44px;
        }

        .p-hire { font-size: 12.44px;
        }
        .p-git-title { font-size: 12.44px; }
        .p-year { font-size: 11.36px;
        }
        .p-git-total { font-size: 11.36px; }
        .p-git-months { font-size: 9.2px; }
        .p-git-days { font-size: 9.2px; }
        .p-git-legend { font-size: 9.74px; }

        .p-sec { font-size: 13px;
        }
        .p-exp-logo {
          font-size: 11.92px;
        }
        .p-exp-logo .sup { font-size: 7.58px; }
        .p-exp-title { font-size: 15.16px; }
        .p-exp-sub { font-size: 11.36px; }
        .p-exp-desc { font-size: 11.36px; }
        .p-exp-resp { font-size: 10.3px; }
        .p-exp-list { font-size: 11.36px; }
        .p-tags span {
          font-size: 9.74px;
        }
        .p-date { font-size: 10.84px; }
        .p-badge {
          font-size: 10.84px;
        }

        .p-foot { font-size: 10.84px;
        }
        .p-copy { font-size: 10.84px; }
        .p-nav-item { font-size: 11.92px;
        }
        .project-visual-mark { font: 700 50.4px 'Space Grotesk', sans-serif; }
        .project-year { font-size: 8.66px; }
        .project-open { font-size: 14.08px;
        }
        .project-grid .p-exp-title { font-size: 15.16px; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-title { font-size: 17.33px;
        }
        .project-grid .p-exp-sub { font-size: 9.74px; }
        .project-grid .p-exp-desc { font-size: 9.74px; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-desc { font-size: 11.92px;
        }
        .project-grid .p-tags span { font-size: 9.74px; }
        .project-grid .p-badge { font-size: 9.74px; }
        .project-grid .p-btn { font-size: 10.84px; }
        .project-grid .project-card-wide .p-exp-title { font-size: 17.33px;
        }
        .project-grid .project-card-wide .p-exp-desc {
          font-size: 11.92px;
        }
        .project-grid .project-card-wide .p-tags span { font-size: 9.74px; }
        .project-grid .project-card-wide .p-btn { font-size: 10.84px; }
        .project-back, .project-step { font-size: 9.74px;
        }
        .project-step-controls { font-size: 9.74px; }
        .project-step { font-size: 13px; }
        .project-detail-visual .project-visual-mark { font-size: clamp(58.48px, 9.74vw, 108.3px); }
        .project-detail-meta { font-size: 9.74px; }
        .project-detail-content h1 { font: 700 clamp(24px, 3.6vw, 33.6px)/1.2 'Space Grotesk', sans-serif; }
        .project-detail-description { font-size: 10.84px; }
        .project-detail-tech-label { font-size: 8.66px; }
        .project-detail-tags span { font-size: 8.66px; }
        .project-detail-actions .p-btn { font-size: 9.74px; }
        .certificate-detail-content h1 { font: 700 clamp(24px, 3.6vw, 33.6px)/1.25 'Space Grotesk', sans-serif; }
        .certificate-detail-meta span { font-size: 9.74px;
        }
        .certificate-detail-copy { font-size: 11.92px; }
        .certificate-detail-code { font-size: 10.84px; }
        .certificate-detail-sidebar h2 { font-size: 19.5px; }
        .certificate-detail-list .project-detail-list-copy strong { font-size: 14.08px; }
        .certificate-detail-list .project-detail-list-copy small { font-size: 10.84px; }
        .certificate-related > h2 { font: 700 21.6px 'Space Grotesk', sans-serif;
        }
        .certificate-related-image span { font: 700 38.4px 'Space Grotesk', sans-serif; }
        .certificate-related-meta { font-size: 10.84px; }
        .certificate-related-body h3 { font: 700 18px/1.35 'Space Grotesk', sans-serif;
        }
        .certificate-related-body p { font-size: 11.92px; }
        .project-detail-sidebar h2, .project-related h2 { font: 700 16.8px 'Space Grotesk', sans-serif; }
        .project-detail-thumb span { font: 700 15.6px 'Space Grotesk', sans-serif; }
        .project-detail-list-copy strong { font: 600 10.8px/1.45 'Space Grotesk', sans-serif; }
        .project-detail-list-copy small { font-size: 7.58px; }
        .project-docs-eyebrow { font-size: 8.66px; }
        .project-docs-head h2 { font: 700 clamp(21.6px, 3vw, 28.8px)/1.25 'Space Grotesk', sans-serif; }
        .project-docs-intro { font-size: 11.36px; }
        .project-docs-block h3 { font: 700 15.6px 'Space Grotesk', sans-serif; }
        .project-docs-number { font: 700 10.8px 'Space Grotesk', sans-serif; }
        .project-docs-highlight h4 { font: 600 13.2px/1.5 'Space Grotesk', sans-serif; }
        .project-docs-highlight p { font-size: 9.74px; }
        .project-docs-section h3 { font: 700 13.8px 'Space Grotesk', sans-serif; }
        .project-docs-section li { font-size: 9.74px; }
        .project-docs-section li span { font-size: 8.66px; }
        .project-docs-closing { font-size: 10.84px; }
        .project-docs-features li { font-size: 10.3px; }
        .project-docs-features li span { font-size: 8.66px; }
        .project-docs-gallery strong { font: 600 12px 'Space Grotesk', sans-serif; }
        .project-docs-gallery span { font-size: 9.2px; }
        .project-related-head p { font-size: 8.66px; }
        .project-related-image span { font: 700 33.6px 'Space Grotesk', sans-serif; }
        .project-related-item strong { font: 600 10.8px/1.5 'Space Grotesk', sans-serif; }
        .p-ct-grid.ct-wide .certificate-preview-desc { font-size: 10.84px;
        }
        .p-field > span { font-size: 10.84px; }
        .p-input, .p-textarea { font-size: 13px; }
        .p-btn { font-size: 11.92px; }
        .p-tab { font-size: 11.36px; }
        .p-file { font-size: 11.92px; }
        .p-file::file-selector-button { font-size: 11.92px; }

        @media (max-width: 560px) {
          .p-name { font-size: 18.41px; }
        }

        @media (max-width: 560px) {
          .p-title-line { font-size: 10.84px; }
        }

        @media (max-width: 560px) {
          .p-bio { font-size: 11.36px; }
        }

        @media (max-width: 560px) {
          .p-exp-logo { font-size: 10.84px; }
        }

        @media (max-width: 560px) {
          .p-nav-item { font-size: 9.74px; }
        }

        .profile-page .p-name { font-size: clamp(19.5px, 2.16vw, 25.99px); }
        .profile-page .p-title-line { font-size: 13px; }
        .profile-page .p-bio { font-size: 13.55px; }
        .profile-page .p-sec { font-size: 14.08px; }
        .profile-page .p-exp-title { font-size: 16.25px; }
        .profile-page .p-exp-sub,
        .profile-page .p-exp-desc,
        .profile-page .p-exp-list { font-size: 12.44px; }
        .profile-page .p-tags span { font-size: 10.84px; }
        .profile-page .p-badge { font-size: 10.84px; }
        .profile-page .p-btn { font-size: 13px; }
        .profile-page .p-tab { font-size: 12.44px; }
        .profile-page .p-nav-item { font-size: 13px; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-title,
        .project-grid .project-card-wide .p-exp-title { font-size: 18.41px; }
        .project-grid .project-card:not(.project-card-wide) .p-exp-desc,
        .project-grid .project-card-wide .p-exp-desc { font-size: 13px; }
        .project-grid .p-tags span,
        .project-grid .project-card-wide .p-tags span { font-size: 10.84px; }
        .project-grid .p-btn,
        .project-grid .project-card-wide .p-btn { font-size: 11.92px; }
        .project-detail-page .project-detail-description,
        .project-detail-page .certificate-detail-copy { font-size: 13px; }
        .project-detail-page .project-detail-meta,
        .project-detail-page .certificate-detail-meta span,
        .project-detail-page .project-detail-actions .p-btn { font-size: 10.84px; }
        .p-ct-grid.ct-wide .p-exp-title { font-size: 16.25px; }
        .p-ct-grid.ct-wide .p-exp-sub { font-size: 12.44px; }
        .p-ct-grid.ct-wide .certificate-preview-desc { font-size: 11.92px; }
        .p-modal-box .p-exp-title {
        font-size: 17.33px !important;
    }
}
`;

/* =====================================================
   PROFILE VIEW — tampilan profil (data Saiful Rizal)
===================================================== */

function ProfileView({ data, active = "about", onNavigate = () => {} }) {
  const profile = data.profile;
  const [year, setYear] = useState("2026");

  const grid = useMemo(() => {
    const cols = [];
    for (let w = 0; w < P_WEEKS; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) days.push(pLevelFor(w, d));
      cols.push(days);
    }
    return cols;
  }, []);

  const go = (tab) => () => onNavigate(tab);

  return (
    <>
      <style>{PROFILE_CSS}</style>

      <div className="profile-page">
        <div className="profile-card">
          <span className="pcorner tl" />
          <span className="pcorner tr" />
          <span className="pcorner bl" />
          <span className="pcorner br" />

          <div className="p-photo-wrap">
            <div className="p-photo-ring">
              <img
                className="p-photo"
                src={profile.photo}
                alt="Foto profil"
              />
            </div>
          </div>

          <h1 className="p-name">{profile.name}</h1>
          <p className="p-title-line">{profile.title}</p>
          <p className="p-exp-sub" style={{ textAlign: "center", marginBottom: "16px" }}>
            {profile.phone}, {profile.email}
          </p>

          <p className="p-bio">{profile.bio}</p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              className="p-hire"
              href="/cv-saiful-rizal.pdf"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              Unduh CV
            </a>
          </div>

          <hr className="p-divider" />

          {/* GitHub Contributions - Hidden */}
          <div style={{ display: "none" }}>
            <div className="p-git-head">
              <div className="p-git-left">
                <span className="p-git-title">Kontribusi GitHub</span>
                <select value={year} onChange={(e) => setYear(e.target.value)} className="p-year" aria-label="Pilih tahun">
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
              <span className="p-git-total"><b>{profile.githubTotal}</b> kontribusi</span>
            </div>

            <div className="p-git-scroll">
              <div className="p-git">
                <div className="p-git-months">
                  {P_MONTHS.map((m, i) => (
                    <span key={i}>{m}</span>
                  ))}
                </div>
                <div className="p-git-body">
                  <div className="p-git-days">
                    {P_DAY_LABELS.map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                  <div className="p-git-grid">
                    {grid.map((week, wi) => (
                      <div key={wi} className="p-week">
                        {week.map((lv, di) => (
                          <span key={di} className={`p-cell ${P_LEVELS[lv]}`} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-git-legend">
                  <span>Jarang</span>
                  <span className="p-cell lv0 sm" />
                  <span className="p-cell lv1 sm" />
                  <span className="p-cell lv2 sm" />
                  <span className="p-cell lv3 sm" />
                  <span className="p-cell lv4 sm" />
                  <span>Sering</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="p-sec">Pengalaman Kerja</h2>

          <div className="p-exp-grid">
            {data.experiences.map((job) => (
              <div key={job.title} className="p-exp">
                <div className="p-exp-logo">
                  {job.logo}<span className="sup">®</span>
                </div>
                <div className="p-exp-body">
                  <h3 className="p-exp-title">{job.title}</h3>
                  <p className="p-exp-sub">{job.company}</p>
                  <p className="p-exp-desc">{job.desc}</p>
                  <p className="p-exp-resp">TANGGUNG JAWAB UTAMA</p>
                  <ul className="p-exp-list">
                    {job.resp.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <div className="p-tags">
                    {job.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="p-exp-foot">
                    <span className="p-date">{job.date}</span>
                    <span className="p-badge">{job.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-socials">
            <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="p-soc">
              <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-10.4a1.4 1.4 0 1 0 0-2.9 1.4 1.4 0 0 0 0 2.9Z" fill="currentColor" /></svg>
            </a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="p-soc">
              <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.8 9.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.4 4.7-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z" fill="currentColor" /></svg>
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-soc">
              <svg viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8.09h4.56V23H.22V8.09Zm7.44 0h4.37v2.04h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v8.24h-4.55v-7.3c0-1.74-.03-3.98-2.43-3.98-2.43 0-2.8 1.9-2.8 3.86V23H7.66V8.09Z" fill="currentColor" /></svg>
            </a>
          </div>

          <div className="p-foot">
            <span className="p-foot-l"><span className="dim">Status: </span>{profile.status}</span>
            <span className="p-foot-r"><span className="dim">Peran: </span>{profile.role}</span>
          </div>
          <p className="p-copy">© 2026 SAIFUL RIZAL</p>
        </div>

        <ProfileNav active={active} onNavigate={onNavigate} />
      </div>
    </>
  );
}

/* =====================================================
   PLACEHOLDER VIEW — halaman lain (segera hadir)
===================================================== */

function PlaceholderView({ title, desc, active = "", onNavigate = () => {} }) {
  return (
    <>
      <style>{PROFILE_CSS}</style>

      <div className="profile-page">
        <div className="profile-card">
          <span className="pcorner tl" />
          <span className="pcorner tr" />
          <span className="pcorner bl" />
          <span className="pcorner br" />

          <h1 className="p-name">{title}</h1>
          <p className="p-title-line">Portfolio</p>

          <p className="p-bio">{desc}</p>

          <button className="p-hire" onClick={() => onNavigate("home")}>
            Kembali ke Beranda
          </button>

          <p className="p-copy">© 2026 SAIFUL RIZAL</p>
        </div>

        <ProfileNav active={active} onNavigate={onNavigate} />
      </div>
    </>
  );
}

/* =====================================================
   DETAIL MODAL — isi tombol Lihat
===================================================== */

function DetailModal({ item, onClose = () => {} }) {
  const [tab, setTab] = useState(
    item && item.liveUrl ? "preview" : item && item.pdf ? "pdf" : "gambar"
  );
  if (!item) return null;

  return (
    <div className="p-modal-bg" onClick={onClose}>
      <div className="p-modal-box" onClick={(e) => e.stopPropagation()} style={{ width: "min(96vw, 1100px)", maxWidth: "1100px" }}>
        <h3 className="p-exp-title" style={{ fontSize: "14.44px", marginBottom: "6px" }}>
          {item.title}
        </h3>
        {item.sub ? <p className="p-exp-sub">{item.sub}</p> : null}
        {item.desc ? <p className="p-exp-desc">{item.desc}</p> : null}
        {item.tags && item.tags.length ? (
          <div className="p-tags" style={{ justifyContent: "center" }}>
            {item.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        ) : null}
        {item.liveUrl || item.pdf || item.image ? (
          <div className="p-btn-row" style={{ justifyContent: "center", marginTop: "10px" }}>
            {item.liveUrl ? (
              <button
                className={`p-btn${tab === "preview" ? " solid" : ""}`}
                onClick={() => setTab("preview")}
              >
                Preview Live
              </button>
            ) : null}
            {item.pdf ? (
              <button
                className={`p-btn${tab === "pdf" ? " solid" : ""}`}
                onClick={() => setTab("pdf")}
              >
                Lihat PDF
              </button>
            ) : null}
            {item.image ? (
              <button
                className={`p-btn${tab === "gambar" ? " solid" : ""}`}
                onClick={() => setTab("gambar")}
              >
                Lihat Gambar
              </button>
            ) : null}
          </div>
        ) : null}
        {tab === "preview" && item.liveUrl ? (
          <iframe
            title={item.title + " live preview"}
            src={item.liveUrl}
            loading="lazy"
            allowFullScreen
            style={{ width: "100%", height: "72vh", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "12px", marginTop: "10px", background: "#000" }}
          />
        ) : null}
        {tab === "pdf" && item.pdf ? (
          <iframe
            title={item.title}
            src={item.pdf}
            style={{ width: "100%", height: "72vh", border: "1px solid var(--line)", borderRadius: "12px", marginTop: "10px", background: "#fff" }}
          />
        ) : null}
        {(tab === "gambar" || (!item.liveUrl && !item.pdf)) && item.image ? (
          <img
            className="p-ct-img"
            src={item.image}
            alt={item.title}
            style={{ marginTop: "10px" }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : null}
        <div className="p-btn-row" style={{ justifyContent: "center", marginTop: "10px" }}>
          {item.liveUrl ? (
            <a
              className="p-btn solid"
              href={item.liveUrl}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              Buka Live Demo
            </a>
          ) : null}
          {item.pdf ? (
            <a
              className="p-btn solid"
              href={item.pdf}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              Buka PDF
            </a>
          ) : null}
          {item.image ? (
            <a
              className="p-btn"
              href={item.image}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              Buka Gambar
            </a>
          ) : null}
          <button className="p-btn" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   CERTIFICATION VIEW — daftar sertifikasi + gambar
===================================================== */

function CertificationView({ certs, active = "certification", onNavigate = () => {} }) {
  const [filter, setFilter] = useState("Semua");
  const bidangOf = (c) => c.bidang || c.cat || "Lainnya";
  const BIDANG_ORDER = [
    "Cyber Security",
    "Data, AI, dan Cloud",
    "Mobile dan Web Development",
    "Sains dan Inovasi",
    "Kompetisi dan Prestasi",
    "Kewirausahaan dan Bisnis",
    "Organisasi dan Kampus",
    "Pengembangan Diri dan Bahasa",
  ];
  const cats = useMemo(() => {
    const ada = new Set(certs.map(bidangOf));
    return ["Semua", ...BIDANG_ORDER.filter((b) => ada.has(b)), ...[...ada].filter((b) => b !== "Semua" && !BIDANG_ORDER.includes(b))];
  }, [certs]);
  const countOf = (cat) =>
    cat === "Semua"
      ? certs.length
      : certs.filter((c) => bidangOf(c) === cat).length;
  const shown =
    filter === "Semua" ? certs : certs.filter((c) => bidangOf(c) === filter);
  return (
    <>
      <style>{PROFILE_CSS}</style>

      <div className="profile-page">
        <div className="profile-card cert-wide">
          <span className="pcorner tl" />
          <span className="pcorner tr" />
          <span className="pcorner bl" />
          <span className="pcorner br" />

          <h1 className="p-name">Certification</h1>
          <p className="p-title-line">Kepanitiaan, Organisasi, dan Penghargaan</p>

          <p className="p-bio">
            Kepanitiaan, organisasi, dan penghargaan Saiful Rizal, dikelompokkan per bidang ({certs.length} sertifikat).
          </p>

          <div className="p-tabs">
            {cats.map((cat) => (
              <button
                key={cat}
                className={`p-tab${filter === cat ? " on" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat} ({countOf(cat)})
              </button>
            ))}
          </div>

          {shown.length === 0 ? (
            <p className="p-bio">Belum ada data sertifikasi.</p>
          ) : (
            <div className="p-ct-grid ct-wide">
              {shown.map((c) => {
                return (
                  <div key={c.id} className="p-exp">
                    <div className="p-exp-body">
                      {c.image ? (
                        <img className="p-ct-img" src={c.image} alt={c.title} />
                      ) : null}
                      <h3 className="p-exp-title">{c.title}</h3>
                      <p className="p-exp-sub">
                        {c.issuer}{c.dateLabel ? `, ${c.dateLabel}` : c.year ? `, ${c.year}` : ""}
                      </p>
                      {c.desc ? <p className="certificate-preview-desc">{c.desc}</p> : null}
                      {c.code ? <p className="p-exp-desc">ID: {c.code}</p> : null}
                      <div className="p-exp-foot">
                        <span className="p-badge">{c.bidang || c.cat || "Lainnya"}</span>
                        <button className="p-btn" onClick={() => onNavigate(`certification/${c.id}`)}>
                          Lihat
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="p-copy">© 2026 SAIFUL RIZAL</p>
        </div>

        <ProfileNav active={active} onNavigate={onNavigate} />
      </div>
    </>
  );
}

function CertificationDetailView({ certs, index = 0, onNavigate = () => {} }) {
  const certificate = certs[index];
  if (!certificate) {
    return <CertificationView certs={certs} active="certification" onNavigate={onNavigate} />;
  }

  const previous = certs[(index - 1 + certs.length) % certs.length];
  const next = certs[(index + 1) % certs.length];
  const issuerDate = [
    certificate.issuer,
    certificate.dateLabel || certificate.year,
  ].filter(Boolean).join(", ");

  return (
    <>
      <style>{PROFILE_CSS}</style>
      <div className="profile-page">
        <main className="project-detail-page">
          <div className="project-detail-top">
            <button className="project-back" onClick={() => onNavigate("certification")}>
              ← Kembali ke Sertifikat
            </button>
            <div className="project-step-controls" aria-label="Navigasi sertifikat">
              <button
                className="project-step"
                onClick={() => onNavigate(`certification/${previous.id}`)}
                aria-label="Sertifikat sebelumnya"
              >
                ←
              </button>
              <span>{String(index + 1).padStart(2, "0")} / {String(certs.length).padStart(2, "0")}</span>
              <button
                className="project-step"
                onClick={() => onNavigate(`certification/${next.id}`)}
                aria-label="Sertifikat berikutnya"
              >
                →
              </button>
            </div>
          </div>

          <div className="project-detail-layout certificate-detail-layout">
            <article className="project-detail-card">
              <div className="certificate-detail-visual">
                {certificate.image ? (
                  <img src={certificate.image} alt={`Sertifikat ${certificate.title}`} />
                ) : (
                  <span className="project-visual-mark" aria-hidden="true">CERT</span>
                )}
              </div>
              <div className="project-detail-content certificate-detail-content">
                <div className="certificate-detail-meta">
                  {[certificate.bidang || certificate.cat || "Lainnya", certificate.year].filter(Boolean).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <h1>{certificate.title}</h1>
                <p className="certificate-detail-copy">{certificate.desc || "Tidak ada keterangan tambahan untuk sertifikat ini."}</p>
                {issuerDate ? <p className="certificate-detail-code">{issuerDate}</p> : null}
                {certificate.code ? <p className="certificate-detail-code">ID Sertifikat: {certificate.code}</p> : null}
                <div className="project-detail-actions">
                  {certificate.image ? (
                    <a className="p-btn solid" href={certificate.image} target="_blank" rel="noreferrer">
                      Lihat Gambar ↗
                    </a>
                  ) : null}
                  {certificate.pdf ? (
                    <a className="p-btn solid" href={certificate.pdf} target="_blank" rel="noreferrer">
                      Buka PDF ↗
                    </a>
                  ) : null}
                  <button className="p-btn" onClick={() => onNavigate("certification")}>
                    ← Semua Sertifikat
                  </button>
                </div>
              </div>
            </article>

          </div>
          <section className="certificate-related" aria-labelledby="certificate-related-title">
            <h2 id="certificate-related-title">Sertifikat Lainnya</h2>
            <div className="certificate-related-grid">
              {certs.map((item, itemIndex) => itemIndex === index ? null : (
                <article className="certificate-related-card" key={item.id}>
                  <div className="certificate-related-image">
                    {item.image ? <img src={item.image} alt={`Sertifikat ${item.title}`} loading="lazy" /> : <span>PDF</span>}
                  </div>
                  <div className="certificate-related-body">
                    <p className="certificate-related-meta">{item.bidang || item.cat || "Lainnya"}{item.year ? `, ${item.year}` : ""}</p>
                    <h3>{item.title}</h3>
                    <p>{item.desc || item.issuer}</p>
                    <button className="p-btn" onClick={() => onNavigate(`certification/${item.id}`)}>
                      Lihat Detail →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <p className="p-copy">© 2026 SAIFUL RIZAL</p>
        </main>
      </div>
    </>
  );
}

/* =====================================================
   DASHBOARD VIEW — input data sertifikasi + gambar
===================================================== */

function DashboardView({ store, setStore, onNavigate = () => {} }) {
  const [tab, setTab] = useState("sertifikasi");

  const updateCert = (id, patch) =>
    setStore((s) => ({
      ...s,
      certifications: s.certifications.map((c) =>
        c.id === id ? { ...c, ...patch } : c
      ),
    }));

  const addCert = () =>
    setStore((s) => ({
      ...s,
      certifications: [
        ...s.certifications,
        {
          id: "c" + Date.now(),
          title: "Sertifikat Baru",
          issuer: "",
          year: "2026",
          dateLabel: "",
          code: "",
          cat: "Training",
          bidang: "Lainnya",
          desc: "",
          image: "",
          pdf: "",
        },
      ],
    }));

  const delCert = (id) =>
    setStore((s) => ({
      ...s,
      certifications: s.certifications.filter((c) => c.id !== id),
    }));

  const setProfile = (patch) =>
    setStore((s) => ({ ...s, profile: { ...s.profile, ...patch } }));

  const fileToDataUrl = (file, cb) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  };

  const resetAll = () => {
    try {
      localStorage.removeItem(DATA_KEY);
    } catch (e) {}
    setStore(defaultStore());
  };

  const p = store.profile;

  return (
    <>
      <style>{PROFILE_CSS}</style>

      <div className="profile-page">
        <div className="profile-card">
          <span className="pcorner tl" />
          <span className="pcorner tr" />
          <span className="pcorner bl" />
          <span className="pcorner br" />

          <h1 className="p-name">Dashboard</h1>
          <p className="p-title-line">Kelola Data Portfolio</p>

          <p className="p-bio">
            Tambah / ubah data sertifikasi lengkap dengan gambar (URL atau upload).
            Semua perubahan tersimpan otomatis di browser ini.
          </p>

          <div className="p-tabs">
            <button
              className={`p-tab ${tab === "sertifikasi" ? "on" : ""}`}
              onClick={() => setTab("sertifikasi")}
            >
              Sertifikasi ({store.certifications.length})
            </button>
            <button
              className={`p-tab ${tab === "profil" ? "on" : ""}`}
              onClick={() => setTab("profil")}
            >
              Profil
            </button>
          </div>

          {tab === "sertifikasi" ? (
            <>
              <div className="p-ct-grid">
                {store.certifications.map((c) => (
                  <div key={c.id} className="p-exp">
                    <div className="p-exp-body">
                      {c.image ? (
                        <img className="p-thumb" src={c.image} alt={c.title} style={{ marginBottom: "12px" }} />
                      ) : null}
                      <div className="p-field">
                        <span>Judul</span>
                        <input
                          className="p-input"
                          value={c.title}
                          onChange={(e) => updateCert(c.id, { title: e.target.value })}
                        />
                      </div>
                      <div className="p-field">
                        <span>Penerbit</span>
                        <input
                          className="p-input"
                          value={c.issuer}
                          onChange={(e) => updateCert(c.id, { issuer: e.target.value })}
                        />
                      </div>
                      <div className="p-field">
                        <span>Tahun</span>
                        <input
                          className="p-input"
                          value={c.year}
                          onChange={(e) => updateCert(c.id, { year: e.target.value })}
                        />
                      </div>
                      <div className="p-field">
                        <span>ID Kredensial</span>
                        <input
                          className="p-input"
                          value={c.code}
                          onChange={(e) => updateCert(c.id, { code: e.target.value })}
                        />
                      </div>
                      <div className="p-field">
                        <span>Kategori</span>
                        <select
                          className="p-input"
                          value={c.cat}
                          onChange={(e) => updateCert(c.id, { cat: e.target.value })}
                        >
                          <option>Training</option>
                          <option>HKI</option>
                          <option>Kepanitiaan</option>
                          <option>Organisasi</option>
                          <option>Penghargaan</option>
                          <option>Kampus dan Organisasi</option>
                          <option>Prestasi dan Lomba</option>
                          <option>Webinar dan Workshop</option>
                          <option>Dicoding dan Komunitas</option>
                          <option>IBM SkillsBuild</option>
                          <option>Bahasa</option>
                          <option>Lainnya</option>
                        </select>
                      </div>
                      <div className="p-field">
                        <span>Bidang</span>
                        <select
                          className="p-input"
                          value={c.bidang || "Lainnya"}
                          onChange={(e) => updateCert(c.id, { bidang: e.target.value })}
                        >
                          <option>Cyber Security</option>
                          <option>Data, AI, dan Cloud</option>
                          <option>Mobile dan Web Development</option>
                          <option>Sains dan Inovasi</option>
                          <option>Kompetisi dan Prestasi</option>
                          <option>Kewirausahaan dan Bisnis</option>
                          <option>Organisasi dan Kampus</option>
                          <option>Pengembangan Diri dan Bahasa</option>
                          <option>Lainnya</option>
                        </select>
                      </div>
                      <div className="p-field">
                        <span>Gambar (URL)</span>
                        <input
                          className="p-input"
                          value={c.image && c.image.startsWith("data:") ? "" : c.image}
                          placeholder="https://... atau upload file di bawah"
                          onChange={(e) => updateCert(c.id, { image: e.target.value })}
                        />
                      </div>
                      <div className="p-field">
                        <span>Upload Gambar</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="p-file"
                          onChange={(e) =>
                            fileToDataUrl(e.target.files[0], (url) =>
                              updateCert(c.id, { image: url })
                            )
                          }
                        />
                      </div>
                      <div className="p-field">
                        <span>PDF (URL)</span>
                        <input
                          className="p-input"
                          value={c.pdf || ""}
                          placeholder="/nama-file.pdf"
                          onChange={(e) => updateCert(c.id, { pdf: e.target.value })}
                        />
                      </div>
                      <div className="p-btn-row">
                        {c.image ? (
                          <button className="p-btn" onClick={() => updateCert(c.id, { image: "" })}>
                            Hapus Gambar
                          </button>
                        ) : null}
                        <button className="p-btn danger" onClick={() => delCert(c.id)}>
                          Hapus Sertifikat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-btn-row" style={{ justifyContent: "center", marginTop: "16px" }}>
                <button className="p-btn solid" onClick={addCert}>
                  Tambah Sertifikasi
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "left" }}>
              <div className="p-field">
                <span>Nama</span>
                <input
                  className="p-input"
                  value={p.name}
                  onChange={(e) => setProfile({ name: e.target.value })}
                />
              </div>
              <div className="p-field">
                <span>Jabatan (baris kecil)</span>
                <input
                  className="p-input"
                  value={p.title}
                  onChange={(e) => setProfile({ title: e.target.value })}
                />
              </div>
              <div className="p-field">
                <span>Kategori Hero (beranda)</span>
                <input
                  className="p-input"
                  value={p.heroCategory}
                  onChange={(e) => setProfile({ heroCategory: e.target.value })}
                />
              </div>
              <div className="p-field">
                <span>Bio</span>
                <textarea
                  className="p-textarea"
                  value={p.bio}
                  onChange={(e) => setProfile({ bio: e.target.value })}
                />
              </div>
              <div className="p-field">
                <span>Foto (URL)</span>
                <input
                  className="p-input"
                  value={p.photo && p.photo.startsWith("data:") ? "" : p.photo}
                  placeholder="https://..."
                  onChange={(e) => setProfile({ photo: e.target.value })}
                />
              </div>
              <div className="p-field">
                <span>Upload Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  className="p-file"
                  onChange={(e) =>
                    fileToDataUrl(e.target.files[0], (url) => setProfile({ photo: url }))
                  }
                />
              </div>
              {p.photo ? (
                <img className="p-thumb" src={p.photo} alt="Foto profil" style={{ marginBottom: "12px" }} />
              ) : null}
              <div className="p-field">
                <span>Total Kontribusi GitHub</span>
                <input
                  className="p-input"
                  value={p.githubTotal}
                  onChange={(e) => setProfile({ githubTotal: e.target.value })}
                />
              </div>
              <div className="p-field">
                <span>Status</span>
                <input
                  className="p-input"
                  value={p.status}
                  onChange={(e) => setProfile({ status: e.target.value })}
                />
              </div>
              <div className="p-field">
                <span>Peran</span>
                <input
                  className="p-input"
                  value={p.role}
                  onChange={(e) => setProfile({ role: e.target.value })}
                />
              </div>
              <div className="p-field">
                <span>No. HP</span>
                <input
                  className="p-input"
                  value={p.phone || ""}
                  onChange={(e) => setProfile({ phone: e.target.value })}
                />
              </div>
              <div className="p-field">
                <span>Email</span>
                <input
                  className="p-input"
                  value={p.email || ""}
                  onChange={(e) => setProfile({ email: e.target.value })}
                />
              </div>
            </div>
          )}

          <hr className="p-divider" />

          <div className="p-btn-row" style={{ justifyContent: "center" }}>
            <button className="p-btn solid" onClick={() => onNavigate("home")}>
              Kembali ke Beranda
            </button>
            <button className="p-btn danger" onClick={resetAll}>
              Reset ke Default
            </button>
          </div>

          <p className="p-copy">© 2026 SAIFUL RIZAL</p>
        </div>

        <ProfileNav active="" onNavigate={onNavigate} />
      </div>
    </>
  );
}

/* =====================================================
   PROJECT VIEW — daftar project + tombol Lihat
===================================================== */

function ProjectView({ active = "project", onNavigate = () => {} }) {
  return (
    <>
      <style>{PROFILE_CSS}</style>

      <div className="profile-page">
        <div className="profile-card">
          <span className="pcorner tl" />
          <span className="pcorner tr" />
          <span className="pcorner bl" />
          <span className="pcorner br" />

          <h1 className="p-name">Project</h1>
          <p className="p-title-line">Web, Mobile, dan AI</p>

          <p className="p-bio">
            Koleksi project desktop, web, mobile, IoT, dan AI. Klik Lihat untuk detail dan live preview, atau buka langsung demo onlinenya.
          </p>

          <div className="p-ct-grid project-grid">
            {DEFAULT_PROJECTS.map((pr, index) => (
              <div key={pr.title} className={`p-exp project-card${index === 3 ? " project-card-wide" : ""}`}>
                <div className="p-exp-body">
                  <div className={`project-visual${pr.image ? "" : " is-placeholder"}`}>
                    {pr.image ? (
                      <img
                        className="p-ct-img"
                        src={pr.image}
                        alt={pr.title}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <span className="project-visual-mark" aria-hidden="true">{pr.cat.slice(0, 2).toUpperCase()}</span>
                    )}
                    <span className="project-year">{pr.year}</span>
                    {pr.liveUrl ? (
                      <a
                        className="project-open"
                        href={pr.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Buka ${pr.title} di tab baru`}
                      >
                        ↗
                      </a>
                    ) : null}
                  </div>
                  <h3 className="p-exp-title">{pr.title}</h3>
                  <p className="p-exp-sub">{pr.cat}, {pr.year}</p>
                  {pr.desc ? <p className="p-exp-desc">{pr.desc}</p> : null}
                  <div className="p-tags">
                    {(index === 0 ? pr.tags : pr.tags.slice(0, 3)).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                    {index !== 0 && pr.tags.length > 3 ? <span>{pr.tags.length - 3} lagi</span> : null}
                  </div>
                  <div className="p-exp-foot">
                    <span className="p-badge">{index === 0 ? pr.status : `${pr.tags.length} teknologi`}</span>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button
                        className="p-btn"
                        onClick={() => onNavigate(`project/${index}`)}
                      >
                        {index === 0 ? "Lihat detail" : "Detail →"}
                      </button>
                      {pr.liveUrl ? (
                        <a
                          className="p-btn solid"
                          href={pr.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          Live Demo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="p-copy">© 2026 SAIFUL RIZAL</p>
        </div>

        <ProfileNav active={active} onNavigate={onNavigate} />
      </div>
    </>
  );
}

function ProjectDetailView({ index = 0, onNavigate = () => {} }) {
  const projectIndex = index >= 0 && index < DEFAULT_PROJECTS.length ? index : 0;
  const project = DEFAULT_PROJECTS[projectIndex];
  const relatedProjects = DEFAULT_PROJECTS
    .map((_, offset) => {
      const relatedIndex = (projectIndex + offset + 1) % DEFAULT_PROJECTS.length;
      return { item: DEFAULT_PROJECTS[relatedIndex], index: relatedIndex };
    })
    .slice(0, 4);
  const featuredProjects = relatedProjects.slice(0, 3);
  const previousIndex = (projectIndex - 1 + DEFAULT_PROJECTS.length) % DEFAULT_PROJECTS.length;
  const nextIndex = (projectIndex + 1) % DEFAULT_PROJECTS.length;

  return (
    <>
      <style>{PROFILE_CSS}</style>
      <div className="profile-page">
        <main className="project-detail-page">
          <div className="project-detail-top">
            <button className="project-back" onClick={() => onNavigate("project")}>
              ← Kembali ke Proyek
            </button>
            <div className="project-step-controls" aria-label="Navigasi proyek">
              <button className="project-step" onClick={() => onNavigate(`project/${previousIndex}`)} aria-label="Proyek sebelumnya">←</button>
              <span>{String(projectIndex + 1).padStart(2, "0")} / {String(DEFAULT_PROJECTS.length).padStart(2, "0")}</span>
              <button className="project-step" onClick={() => onNavigate(`project/${nextIndex}`)} aria-label="Proyek berikutnya">→</button>
            </div>
          </div>

          <div className="project-detail-layout">
            <article className="project-detail-card">
              <div className={`project-detail-visual${project.image ? "" : " is-placeholder"}`}>
                {project.image ? (
                  <img src={project.image} alt={`Tampilan ${project.title}`} />
                ) : (
                  <span className="project-visual-mark" aria-hidden="true">{project.cat.slice(0, 2).toUpperCase()}</span>
                )}
                <span className="project-year">{project.year}</span>
              </div>
              <div className="project-detail-content">
                <div className="project-detail-meta">
                  <span>{project.cat}</span>
                  <span>{project.status}</span>
                  <span>{project.year}</span>
                </div>
                <h1>{project.title}</h1>
                <p className="project-detail-description">{project.desc}</p>
                <div className="project-detail-tech">
                  <p className="project-detail-tech-label">Teknologi yang digunakan</p>
                  <div className="project-detail-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <div className="project-detail-actions">
                  {project.liveUrl ? (
                    <a className="p-btn solid" href={project.liveUrl} target="_blank" rel="noreferrer">
                      Buka Live Demo ↗
                    </a>
                  ) : null}
                  <button className="p-btn" onClick={() => onNavigate("project")}>← Semua Proyek</button>
                </div>
              </div>
            </article>

            <aside className="project-detail-sidebar">
              <h2>Proyek Lainnya</h2>
              <div className="project-detail-list">
                {relatedProjects.map(({ item, index: relatedIndex }) => (
                  <button
                    key={item.title}
                    onClick={() => onNavigate(`project/${relatedIndex}`)}
                    aria-current={relatedIndex === projectIndex ? "page" : undefined}
                  >
                    <span className="project-detail-thumb">
                      {item.image ? <img src={item.image} alt="" /> : <span>{item.cat.slice(0, 2).toUpperCase()}</span>}
                    </span>
                    <span className="project-detail-list-copy">
                      <strong>{item.title}</strong>
                      <small>Tahun {item.year}, {item.tags.length} teknologi</small>
                    </span>
                  </button>
                ))}
              </div>
            </aside>
          </div>

          {project.documentation ? (
            <section className="project-docs" aria-labelledby="project-docs-title">
              <div className="project-docs-head">
                <p className="project-docs-eyebrow">Dokumentasi</p>
                <h2 id="project-docs-title">{project.title}</h2>
                <p className="project-docs-intro">{project.documentation.about}</p>
              </div>

              {project.documentation.highlights ? (
                <div className="project-docs-block">
                  <h3>{project.documentation.highlights.length} Fitur Unggulan</h3>
                  <div className="project-docs-highlights">
                    {project.documentation.highlights.map((item, highlightIndex) => (
                      <article className="project-docs-highlight" key={item.title}>
                        <span className="project-docs-number">0{highlightIndex + 1}</span>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.documentation.features ? (
                <div className="project-docs-block project-docs-features">
                  <h3>Fitur Lengkap</h3>
                  <ul>
                    {project.documentation.features.map((feature) => (
                      <li key={feature}>
                        <span aria-hidden="true">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.documentation.sections ? (
                <div className="project-docs-sections">
                  {project.documentation.sections.map((section) => (
                    <article className="project-docs-section" key={section.title}>
                      <h3>{section.title}</h3>
                      <ul>
                        {section.items.map((item) => (
                          <li key={item}>
                            <span aria-hidden="true">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              ) : null}

              {project.documentation.advantages ? (
                <div className="project-docs-block project-docs-features">
                  <h3>Keunggulan</h3>
                  <ul>
                    {project.documentation.advantages.map((advantage) => (
                      <li key={advantage}>
                        <span aria-hidden="true">✓</span>
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.documentation.closing ? (
                <p className="project-docs-closing">{project.documentation.closing}</p>
              ) : null}

              {project.documentation.gallery ? (
                <div className="project-docs-block">
                  <h3>Tangkapan Layar</h3>
                  <div className="project-docs-gallery">
                    {project.documentation.gallery.map((shot) => (
                      <figure key={shot.src}>
                        <img src={shot.src} alt={`${project.title}: ${shot.title}`} />
                        <figcaption>
                          <strong>{shot.title}</strong>
                          <span>{shot.desc}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}

          <section className="project-related">
            <div className="project-related-head">
              <div>
                <h2>Eksplorasi Proyek Lainnya</h2>
                <p>Karya web, mobile, dan sistem informasi pilihan dari portofolio.</p>
              </div>
              <div className="project-step-controls">
                <button className="project-step" onClick={() => onNavigate(`project/${previousIndex}`)} aria-label="Proyek sebelumnya">←</button>
                <button className="project-step" onClick={() => onNavigate(`project/${nextIndex}`)} aria-label="Proyek berikutnya">→</button>
              </div>
            </div>
            <div className="project-related-grid">
              {featuredProjects.map(({ item, index: relatedIndex }) => (
                <button
                  type="button"
                  className="project-related-item"
                  key={item.title}
                  onClick={() => onNavigate(`project/${relatedIndex}`)}
                >
                  <span className="project-related-image">
                    {item.image ? <img src={item.image} alt="" /> : <span>{item.cat.slice(0, 2).toUpperCase()}</span>}
                  </span>
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
          </section>
          <p className="p-copy">© 2026 SAIFUL RIZAL</p>
        </main>
      </div>
    </>
  );
}

/* =====================================================
   ACHIEVEMENT VIEW — daftar penghargaan + tombol Lihat
===================================================== */

function AchievementView({ active = "achievement", onNavigate = () => {} }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <style>{PROFILE_CSS}</style>

      <div className="profile-page">
        <div className="profile-card">
          <span className="pcorner tl" />
          <span className="pcorner tr" />
          <span className="pcorner bl" />
          <span className="pcorner br" />

          <h1 className="p-name">Achievement</h1>
          <p className="p-title-line">Penghargaan, Pendanaan, dan Kompetisi</p>

          <p className="p-bio">
            Penghargaan, pendanaan, dan kompetisi yang memvalidasi kualitas kerja.
            Klik Lihat pada kartu untuk detail.
          </p>

          <div className="p-ct-grid">
            {DEFAULT_ACHIEVEMENTS.map((a) => (
              <div key={a.title} className="p-exp">
                <div className="p-exp-body">
                  <h3 className="p-exp-title">{a.title}</h3>
                  <p className="p-exp-sub">{a.org}, {a.year}</p>
                  <p className="p-exp-desc">{a.desc}</p>
                  <div className="p-exp-foot">
                    <span className="p-badge">{a.tag}</span>
                    <button
                      className="p-btn"
                      onClick={() =>
                        setSelected({
                          title: a.title,
                          sub: `${a.org}, ${a.year}`,
                          desc: a.desc,
                          tags: [a.tag],
                          image: "",
                        })
                      }
                    >
                      Lihat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="p-copy">© 2026 SAIFUL RIZAL</p>
        </div>

        <ProfileNav active={active} onNavigate={onNavigate} />
      </div>
      <DetailModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}

/* =====================================================
   PAGE FADE — transisi halus tiap pindah halaman
===================================================== */

function PageFade({ viewKey }) {
  const [cover, setCover] = useState(true);

  useEffect(() => {
    setCover(true);
    const t = setTimeout(() => setCover(false), 30);
    return () => clearTimeout(t);
  }, [viewKey]);

  return <div className="page-fade" style={{ opacity: cover ? 1 : 0 }} />;
}

export default function App() {
  const [time, setTime] = useState(new Date());
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [view, setView] = useState(hashToView);
  const [store, setStore] = useState(loadStore);

  useEffect(() => {
    const onHash = () => {
      setView(hashToView());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DATA_KEY, JSON.stringify(store));
    } catch (e) {}
  }, [store]);

  const navTo = (v) => {
    const h = v === "home" ? "" : v === "dashboard" ? "#" : "#" + v;
    if ((window.location.hash || "") === h) {
      setView(hashToView());
    } else {
      window.location.hash = h;
    }
  };

  useEffect(() => {
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 14,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(clock);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  const viewMeta = VIEW_META[view] || VIEW_META.project;
  const projectDetailKey = ((window.location.hash || "").match(/^#\/?project\/([a-z0-9-]+)$/i) || [])[1] || "";
  const projectDetailIndex = /^\d+$/.test(projectDetailKey)
    ? Number(projectDetailKey)
    : Math.max(0, DEFAULT_PROJECTS.findIndex((project) => project.slug === projectDetailKey.toLowerCase()));
  const certificateDetailKey = ((window.location.hash || "").match(/^#\/?certification\/([a-z0-9-]+)$/i) || [])[1] || "";
  const certificateDetailIndex = store.certifications.findIndex(
    (certificate) => certificate.id.toLowerCase() === certificateDetailKey.toLowerCase(),
  );

  if (view === "dashboard") {
    return (
      <>
        <PageFade viewKey={view} />
        <DashboardView store={store} setStore={setStore} onNavigate={navTo} />
      </>
    );
  }

  if (view !== "home") {
    return (
      <>
        <PageFade viewKey={view} />
        {view === "about" ? (
          <ProfileView data={store} active={view} onNavigate={navTo} />
        ) : view === "certification-detail" ? (
          <CertificationDetailView certs={store.certifications} index={certificateDetailIndex} onNavigate={navTo} />
        ) : view === "certification" ? (
          <CertificationView certs={store.certifications} active={view} onNavigate={navTo} />
        ) : view === "project" ? (
          <ProjectView active={view} onNavigate={navTo} />
        ) : view === "project-detail" ? (
          <ProjectDetailView index={projectDetailIndex} onNavigate={navTo} />
        ) : view === "achievement" ? (
          <AchievementView active={view} onNavigate={navTo} />
        ) : (
          <PlaceholderView
            title={viewMeta.title}
            desc={viewMeta.desc}
            active={view}
            onNavigate={navTo}
          />
        )}
      </>
    );
  }

  return (
    <>
      <PageFade viewKey={view} />
      <style>{`

        /* =====================================================
           RESET
        ===================================================== */

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          width: 100%;
          height: 100%;
          scroll-behavior: smooth;
        }

        body {
          width: 100%;
          min-height: 100%;
          overflow: hidden;
          background: #090909;
          font-family: Arial, Helvetica, sans-serif;
        }

        #root {
          width: 100%;
          min-height: 100vh;
        }


        /* =====================================================
           MAIN
        ===================================================== */

        .portfolio {
          position: relative;

          width: 100%;
          height: 100vh;
          height: 100dvh;

          min-height: 520px;

          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #fff;

          background:
            radial-gradient(
              circle at 50% 45%,
              #232323 0%,
              #191919 25%,
              #111111 57%,
              #090909 100%
            );
        }


        /* =====================================================
           GRAIN
        ===================================================== */

        .grain {
          position: absolute;
          inset: 0;

          z-index: 50;

          pointer-events: none;

          opacity: 0.045;

          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");

          mix-blend-mode: screen;
        }


        /* =====================================================
           LIGHT
        ===================================================== */

        .light {
          position: absolute;

          left: 50%;
          top: 50%;

          width: clamp(
            180px,
            30vw,
            430px
          );

          aspect-ratio: 1;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background:
            rgba(200, 200, 200, 0.05);

          filter:
            blur(
              clamp(
                40px,
                5vw,
                85px
              )
            );

          pointer-events: none;

          animation:
            lightPulse 6s ease-in-out infinite;
        }

        @keyframes lightPulse {
          0%,
          100% {
            opacity: 0.2;
            scale: 0.85;
          }

          50% {
            opacity: 0.6;
            scale: 1.12;
          }
        }


        /* =====================================================
           GRID
        ===================================================== */

        .grid {
          position: absolute;

          left: 50%;
          top: 7%;

          width: min(48vw, 650px);

          height: clamp(
            90px,
            17vh,
            180px
          );

          transform: translateX(-50%);

          background-image:
            linear-gradient(
              rgba(170, 170, 170, 0.2) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(170, 170, 170, 0.2) 1px,
              transparent 1px
            );

          background-size:
            clamp(18px, 2vw, 30px)
            clamp(18px, 2vw, 30px);

          opacity: 0.42;

          mask-image:
            linear-gradient(
              to bottom,
              black 0%,
              rgba(0, 0, 0, 0.45) 55%,
              transparent 100%
            );
        }

        .grid.bottom {
          top: auto;
          bottom: 12%;

          mask-image:
            linear-gradient(
              to top,
              black 0%,
              rgba(0, 0, 0, 0.45) 55%,
              transparent 100%
            );
        }


        /* =====================================================
           TIMER
        ===================================================== */

        .timer-background {
          position: absolute;

          left: 50%;
          top: 50%;

          z-index: 1;

          width: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          pointer-events: none;

          transform:
            translate(
              calc(-50% + ${mouse.x * 0.25}px),
              calc(-50% + ${mouse.y * 0.25}px)
            );

          transition:
            transform 0.15s ease-out;
        }

        .timer {
          color: #2e2e2e;

          font-size: clamp(
            57.76px,
            9.93vw,
            162.45px
          );

          line-height: 0.8;

          font-weight: 900;

          letter-spacing: -0.55vw;

          white-space: nowrap;

          font-variant-numeric: tabular-nums;

          opacity: 0.7;

          user-select: none;

          animation:
            timerAppear 1.2s ease-out both;
        }

        @keyframes timerAppear {
          from {
            opacity: 0;
            transform: scale(0.94);
          }

          to {
            opacity: 0.7;
            transform: scale(1);
          }
        }


        /* =====================================================
           TOP LABEL
        ===================================================== */

        .top-left,
        .top-right {
          position: absolute;

          top: clamp(
            20px,
            5.5vh,
            60px
          );

          z-index: 15;

          color: #8a8f9e;

          font-size: clamp(
            5.42px,
            0.49vw,
            8.12px
          );

          font-weight: 600;

          letter-spacing: clamp(
            2px,
            0.35vw,
            5px
          );

          text-transform: uppercase;

          white-space: nowrap;

          animation:
            topAppear 1s ease-out both;
        }

        .top-left {
          left: clamp(
            18px,
            4vw,
            60px
          );
        }

        .top-right {
          right: clamp(
            18px,
            4vw,
            60px
          );

          animation-delay: 0.15s;
        }

        @keyframes topAppear {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* =====================================================
           HERO
        ===================================================== */

        .main {
          position: relative;

          z-index: 10;

          width: min(
            94vw,
            1150px
          );

          padding: 20px;

          text-align: center;
        }


        /* =====================================================
           HELLO
        ===================================================== */

        .hello {
          margin-bottom: clamp(
            13px,
            2vh,
            22px
          );

          color: #e8e8e8;

          font-size: clamp(
            12.63px,
            1.08vw,
            18.05px
          );

          font-weight: 700;

          letter-spacing: clamp(
            4px,
            0.65vw,
            9px
          );

          text-transform: uppercase;

          animation:
            heroTop 0.9s
            cubic-bezier(.2,.8,.2,1)
            0.15s both;
        }


        /* =====================================================
           CATEGORY
        ===================================================== */

        .category {
          margin-bottom: clamp(
            18px,
            2.7vh,
            29px
          );

          color: #8a8f9e;

          font-size: clamp(
            9.03px,
            0.81vw,
            13.54px
          );

          font-weight: 600;

          letter-spacing: clamp(
            3px,
            0.58vw,
            8px
          );

          text-transform: uppercase;

          animation:
            heroTop 0.9s
            cubic-bezier(.2,.8,.2,1)
            0.3s both;
        }

        @keyframes heroTop {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* =====================================================
           TITLE
        ===================================================== */

        .title-row {
          width: 100%;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: clamp(
            8px,
            1.3vw,
            20px
          );

          animation:
            titleAppear 1.1s
            cubic-bezier(.2,.8,.2,1)
            0.45s both;
        }

        .line {
          flex: 1;

          max-width: clamp(
            45px,
            9vw,
            125px
          );

          height: 1px;

          background: #8a8a8a;

          opacity: 0.85;
        }

        .title {
          flex-shrink: 1;

          color: #f5f5f5;

          font-size: clamp(
            39.71px,
            5.86vw,
            81.22px
          );

          line-height: 0.9;

          font-weight: 900;

          letter-spacing: clamp(
            1px,
            0.25vw,
            3px
          );

          white-space: nowrap;

          text-shadow:
            0 0 30px
            rgba(
              200,
              200,
              200,
              0.15
            );
        }

        @keyframes titleAppear {
          from {
            opacity: 0;
            transform:
              translateY(25px)
              scale(0.97);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }


        /* =====================================================
           BUTTON CONTAINER
        ===================================================== */

        .buttons {
          display: flex;

          flex-wrap: wrap;

          align-items: center;
          justify-content: center;

          gap: clamp(
            7px,
            0.8vw,
            13px
          );

          margin-top: clamp(
            21px,
            3vh,
            32px
          );

          animation:
            buttonsEntrance 1s
            cubic-bezier(.2,.8,.2,1)
            0.65s both;
        }

        @keyframes buttonsEntrance {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* =====================================================
           BUTTON
        ===================================================== */

        .button {
          position: relative;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          min-width: clamp(
            105px,
            9vw,
            138px
          );

          height: clamp(
            32px,
            3.5vh,
            41px
          );

          padding:
            0 clamp(
              14px,
              1.5vw,
              23px
            );

          overflow: hidden;

          border: 1px solid #3a3a3a;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color: #d4d4d4;

          font-size: clamp(
            6.32px,
            0.59vw,
            9.03px
          );

          font-weight: 700;

          letter-spacing: clamp(
            0.8px,
            0.14vw,
            1.7px
          );

          text-decoration: none;

          text-transform: uppercase;

          backdrop-filter: blur(8px);

          transform: translateY(0);

          transition:
            transform 0.35s
              cubic-bezier(.2,.8,.2,1),
            background 0.35s ease,
            color 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;

          animation:
            buttonFloat 4s ease-in-out infinite;
        }


        /* =====================================================
           BUTTON DELAY
        ===================================================== */

        .button:nth-child(1) {
          animation-delay: 0s;
        }

        .button:nth-child(2) {
          animation-delay: 0.25s;
        }

        .button:nth-child(3) {
          animation-delay: 0.5s;
        }

        @keyframes buttonFloat {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-3px);
          }
        }


        /* =====================================================
           BUTTON LIGHT SWEEP
        ===================================================== */

        .button::before {
          content: "";

          position: absolute;

          top: 0;
          left: -130%;

          width: 75%;
          height: 100%;

          background:
            linear-gradient(
              100deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.22
              ),
              transparent
            );

          transform: skewX(-20deg);

          transition:
            left 0.65s ease;

          pointer-events: none;
        }

        .button:hover::before {
          left: 145%;
        }


        /* =====================================================
           BUTTON BORDER GLOW
        ===================================================== */

        .button::after {
          content: "";

          position: absolute;

          inset: 0;

          border-radius: inherit;

          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.6
            );

          opacity: 0;

          transform: scale(0.96);

          transition:
            opacity 0.35s ease,
            transform 0.35s ease;

          pointer-events: none;
        }

        .button:hover::after {
          opacity: 1;

          transform: scale(1);
        }


        /* =====================================================
           BUTTON HOVER
        ===================================================== */

        .button:hover {
          transform:
            translateY(-7px)
            scale(1.045);

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );

          color: #ffffff;

          border-color: #8a8a8a;

          box-shadow:
            0 10px 30px
            rgba(
              0,
              0,
              0,
              0.5
            ),
            0 0 20px
            rgba(
              255,
              255,
              255,
              0.06
            );

          animation-play-state: paused;
        }


        /* =====================================================
           BUTTON CLICK
        ===================================================== */

        .button:active {
          transform:
            translateY(-1px)
            scale(0.95);

          transition:
            transform 0.1s ease;
        }


        /* =====================================================
           PRIMARY BUTTON
        ===================================================== */

        .button.primary {
          background: #e8e8e8;

          color: #111111;

          border-color: #e8e8e8;

          box-shadow:
            0 0 0
            rgba(
              255,
              255,
              255,
              0
            );
        }

        .button.primary:hover {
          background: #ffffff;

          color: #111111;

          border-color: #ffffff;

          box-shadow:
            0 10px 35px
            rgba(
              255,
              255,
              255,
              0.15
            ),
            0 0 25px
            rgba(
              255,
              255,
              255,
              0.08
            );
        }


        /* =====================================================
           BOTTOM TEXT
        ===================================================== */

        .bottom {
          position: absolute;

          left: 50%;
          bottom: clamp(
            91px,
            13vh,
            128px
          );

          z-index: 10;

          width: 90%;

          transform:
            translateX(-50%);

          display: flex;

          align-items: center;
          justify-content: center;

          gap: clamp(
            12px,
            2vw,
            26px
          );

          color: #5a5f6a;

          font-size: clamp(
            4.51px,
            0.45vw,
            7.22px
          );

          font-weight: 600;

          letter-spacing: clamp(
            2px,
            0.35vw,
            5px
          );

          white-space: nowrap;

          animation:
            bottomAppear 1s ease-out 1s both;
        }

        .bottom-line {
          width: clamp(
            25px,
            4vw,
            60px
          );

          height: 1px;

          background: #333333;
        }

        @keyframes bottomAppear {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }


        /* =====================================================
           NAVBAR
        ===================================================== */

        .bottom-nav {
          position: absolute;

          left: 50%;
          bottom: clamp(
            15px,
            3.5vh,
            38px
          );

          z-index: 30;

          transform:
            translateX(-50%);

          display: flex;

          align-items: center;
          justify-content: center;

          width: max-content;

          max-width:
            calc(100vw - 30px);

          min-height: 52px;

          padding: 5px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.14
            );

          border-radius: 999px;

          background:
            rgba(
              16,
              16,
              16,
              0.9
            );

          box-shadow:
            0 12px 35px
            rgba(
              0,
              0,
              0,
              0.35
            );

          backdrop-filter:
            blur(15px);

          -webkit-backdrop-filter:
            blur(15px);

          animation:
            navAppear 0.9s
            cubic-bezier(.2,.8,.2,1)
            0.8s both;
        }

        @keyframes navAppear {
          from {
            opacity: 0;
            transform:
              translate(-50%, 25px);
          }

          to {
            opacity: 1;
            transform:
              translate(-50%, 0);
          }
        }


        /* =====================================================
           NAV ITEM
        ===================================================== */

        .nav-item {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 9px;

          width: 50px;
          min-width: 50px;

          height: 42px;

          padding: 0 11px;

          border-radius: 999px;

          color: #b9bec9;

          text-decoration: none;

          transition:
            width 0.3s ease,
            min-width 0.3s ease,
            background 0.3s ease,
            color 0.3s ease,
            transform 0.3s ease;
        }

        .nav-icon {
          width: 19px;
          height: 19px;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-shrink: 0;
        }

        .nav-icon svg {
          width: 18px;
          height: 18px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.7;

          stroke-linecap: round;

          stroke-linejoin: round;

          transition:
            transform 0.3s ease;
        }

        .nav-label {
          max-width: 0;

          overflow: hidden;

          opacity: 0;

          white-space: nowrap;

          font-size: 9.03px;

          font-weight: 700;

          transition:
            max-width 0.3s ease,
            opacity 0.3s ease;
        }


        /* =====================================================
           ACTIVE
        ===================================================== */

        .nav-item.active {
          width: 101px;

          min-width: 101px;

          background:
            rgba(
              255,
              255,
              255,
              0.14
            );

          color: #ffffff;

          box-shadow:
            inset 0 1px
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .nav-item.active .nav-label {
          max-width: 65px;

          opacity: 1;
        }


        /* =====================================================
           NAV HOVER
        ===================================================== */

        .nav-item:hover {
          background:
            rgba(
              255,
              255,
              255,
              0.07
            );

          color: #ffffff;

          transform:
            translateY(-3px);
        }

        .nav-item:hover .nav-icon svg {
          transform:
            scale(1.12);
        }

        .nav-item:hover .nav-label {
          max-width: 80px;

          opacity: 1;
        }


        /* =====================================================
           CORNER
        ===================================================== */

        .mark {
          position: absolute;

          width: clamp(
            12px,
            1.4vw,
            20px
          );

          aspect-ratio: 1;

          opacity: 0.45;
        }

        .mark::before,
        .mark::after {
          content: "";

          position: absolute;

          background: #6e6e6e;
        }

        .mark::before {
          width: 100%;
          height: 1px;

          left: 0;
          top: 50%;
        }

        .mark::after {
          width: 1px;
          height: 100%;

          left: 50%;
          top: 0;
        }

        .mark.one {
          left: 4%;
          bottom: 4%;
        }

        .mark.two {
          right: 4%;
          bottom: 4%;
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {

          .main {
            width: 95vw;
          }

          .grid {
            width: 72vw;
          }

          .timer {
            font-size:
              clamp(
                54.15px,
                12.63vw,
                144.4px
              );
          }

          .title {
            font-size:
              clamp(
                36.1px,
                6.32vw,
                63.17px
              );
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

          .portfolio {
            min-height: 100svh;
            height: 100svh;
          }


          /* GRID */

          .grid {
            width: 90vw;

            height: 90px;

            top: 11%;

            background-size:
              20px 20px;
          }

          .grid.bottom {
            bottom: 14%;
          }


          /* TIMER */

          .timer {
            font-size:
              clamp(
                43.32px,
                16.25vw,
                81.22px
              );

            letter-spacing: -4px;
          }


          /* TOP */

          .top-left,
          .top-right {
            top: 4%;

            font-size: 4.51px;

            letter-spacing: 1.5px;
          }

          .top-left {
            left: 5%;
          }

          .top-right {
            right: 5%;
          }


          /* HERO */

          .main {
            width: 100%;

            padding:
              15px 16px;
          }


          /* HELLO */

          .hello {
            margin-bottom: 14px;

            font-size: 9.93px;

            letter-spacing: 3.8px;
          }


          /* CATEGORY */

          .category {
            margin-bottom: 17px;

            font-size: 7.22px;

            letter-spacing: 3.2px;
          }


          /* TITLE */

          .title-row {
            gap: 6px;
          }

          .line {
            max-width: 34px;
          }

          .title {
            font-size:
              clamp(
                27.98px,
                8.58vw,
                41.52px
              );

            letter-spacing: 0.8px;
          }


          /* BUTTONS */

          .buttons {
            margin-top: 21px;

            gap: 7px;
          }

          .button {
            min-width: 91px;

            height: 30px;

            padding: 0 9px;

            font-size: 5.86px;
          }


          /* BOTTOM */

          .bottom {
            display: none;
          }


          /* NAV */

          .bottom-nav {
            bottom: 12px;

            min-height: 49px;

            padding: 4px;

            max-width:
              calc(100vw - 20px);
          }

          .nav-item {
            width: 43px;

            min-width: 43px;

            height: 39px;

            padding: 0;

            gap: 6px;
          }

          .nav-item.active {
            width: 84px;

            min-width: 84px;

            padding: 0 11px;
          }

          .nav-icon {
            width: 18px;
            height: 18px;
          }

          .nav-icon svg {
            width: 17px;
            height: 17px;
          }

          .nav-item.active .nav-label {
            max-width: 53px;

            font-size: 8.12px;
          }


          /* CORNER */

          .mark {
            display: none;
          }

        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 380px) {

          .top-left,
          .top-right {
            font-size: 4.06px;

            letter-spacing: 1px;
          }

          .timer {
            font-size: 40.61px;

            letter-spacing: -3px;
          }

          .hello {
            font-size: 9.03px;

            letter-spacing: 3px;
          }

          .category {
            font-size: 6.32px;

            letter-spacing: 2.5px;
          }

          .title-row {
            gap: 4px;
          }

          .line {
            max-width: 21px;
          }

          .title {
            font-size: 24.37px;

            letter-spacing: 0.5px;
          }

          .buttons {
            gap: 4px;

            margin-top: 18px;
          }

          .button {
            min-width: 80px;

            height: 27px;

            font-size: 4.96px;
          }

          .bottom-nav {
            bottom: 9px;

            max-width:
              calc(100vw - 12px);
          }

          .nav-item {
            width: 39px;

            min-width: 39px;
          }

          .nav-item.active {
            width: 77px;

            min-width: 77px;
          }

          .nav-item.active .nav-label {
            font-size: 7.22px;
          }

        }


        /* =====================================================
           LANDSCAPE MOBILE
        ===================================================== */

        @media (
          max-height: 500px
        ) and (
          max-width: 900px
        ) {

          .main {
            transform: scale(0.8);
          }

          .timer {
            font-size: 90.25px;
          }

          .grid {
            top: 2%;
            height: 65px;
          }

          .grid.bottom {
            bottom: 2%;
          }

          .bottom {
            display: none;
          }

          .bottom-nav {
            bottom: 7px;

            transform:
              translateX(-50%)
              scale(0.85);
          }

        }


        /* =====================================================
           LARGE SCREEN
        ===================================================== */

        @media (min-width: 1600px) {

          .main {
            width: min(
              1050px,
              70vw
            );
          }

          .hello {
            font-size: 18.05px;
          }

          .category {
            font-size: 13.54px;
          }

          .title {
            font-size: 79.42px;
          }

          .timer {
            font-size: 162.45px;
          }

        }

        .top-left, .top-right { font-size: clamp(6.32px, 0.54vw, 9.03px); }
        .hello { font-size: clamp(13.54px, 1.17vw, 18.95px); }
        .category { font-size: clamp(9.93px, 0.9vw, 14.44px); }
        .title { font-size: clamp(41.52px, 6.05vw, 84.83px); }
        .button { font-size: clamp(7.22px, 0.65vw, 9.93px); }
        .nav-label { font-size: 9.93px; }
        .nav-item.active .nav-label { font-size: 9.03px; }

        /* =====================================================
           REDUCE MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

        }


@media (min-width: 769px) {

        .timer {

          font-size: clamp(
            69.31px,
            11.92vw,
            194.94px
          );
        }

        .top-left,
        .top-right {

          font-size: clamp(
            6.5px,
            0.59vw,
            9.74px
          );
        }

        .hello {

          font-size: clamp(
            15.16px,
            1.3vw,
            21.66px
          );
        }

        .category {

          font-size: clamp(
            10.84px,
            0.97vw,
            16.25px
          );
        }

        .title {

          font-size: clamp(
            47.65px,
            7.03vw,
            97.46px
          );
        }

        .button {

          font-size: clamp(
            7.58px,
            0.71vw,
            10.84px
          );
        }

        .bottom {

          font-size: clamp(
            5.41px,
            0.54vw,
            8.66px
          );
        }

        .nav-label {

          font-size: 10.84px;
        }

        @media (max-width: 900px) {

          .timer {
            font-size:
              clamp(
                64.98px,
                15.16vw,
                173.28px
              );
          }

        }

        @media (max-width: 900px) {

          .title {
            font-size:
              clamp(
                43.32px,
                7.58vw,
                75.8px
              );
          }

        }

        @media (max-width: 600px) {

          .timer {
            font-size:
              clamp(
                51.98px,
                19.5vw,
                97.46px
              );
          }

        }

        @media (max-width: 600px) {

          .top-left,
          .top-right {

            font-size: 5.41px;
          }

        }

        @media (max-width: 600px) {

          .hello {

            font-size: 11.92px;
          }

        }

        @media (max-width: 600px) {

          .category {

            font-size: 8.66px;
          }

        }

        @media (max-width: 600px) {

          .title {
            font-size:
              clamp(
                33.58px,
                10.3vw,
                49.82px
              );
          }

        }

        @media (max-width: 600px) {

          .button {

            font-size: 7.03px;
          }

        }

        @media (max-width: 600px) {

          .nav-item.active .nav-label {

            font-size: 9.74px;
          }

        }

        @media (max-width: 380px) {

          .top-left,
          .top-right {
            font-size: 4.87px;
          }

        }

        @media (max-width: 380px) {

          .timer {
            font-size: 48.73px;
          }

        }

        @media (max-width: 380px) {

          .hello {
            font-size: 10.84px;
          }

        }

        @media (max-width: 380px) {

          .category {
            font-size: 7.58px;
          }

        }

        @media (max-width: 380px) {

          .title {
            font-size: 29.24px;
          }

        }

        @media (max-width: 380px) {

          .button {

            font-size: 5.95px;
          }

        }

        @media (max-width: 380px) {

          .nav-item.active .nav-label {
            font-size: 8.66px;
          }

        }

        @media (
          max-height: 500px
        ) and (
          max-width: 900px
        ) {

          .timer {
            font-size: 108.3px;
          }

        }

        @media (min-width: 1600px) {

          .hello {
            font-size: 21.66px;
          }

        }

        @media (min-width: 1600px) {

          .category {
            font-size: 16.25px;
          }

        }

        @media (min-width: 1600px) {

          .title {
            font-size: 95.3px;
          }

        }

        @media (min-width: 1600px) {

          .timer {
            font-size: 194.94px;
          }

        }

        .top-left, .top-right { font-size: clamp(7.58px, 0.65vw, 10.84px); }
        .hello { font-size: clamp(16.25px, 1.4vw, 22.74px); }
        .category { font-size: clamp(11.92px, 1.08vw, 17.33px); }
        .title { font-size: clamp(49.82px, 7.26vw, 101.8px); }
        .button { font-size: clamp(8.66px, 0.78vw, 11.92px); }
        .nav-label { font-size: 11.92px; }
        .nav-item.active .nav-label { font-size: 10.84px; }
}
`}</style>


      <main className="portfolio">

        {/* BACKGROUND */}

        <div className="grain" />

        <div className="light" />

        <div className="grid" />

        <div className="grid bottom" />


        {/* TOP */}

        <div className="top-left">
          WEB / MOBILE / AI ENGINEER
        </div>

        <div className="top-right">
          BUILD, LEARN, GROW
        </div>


        {/* TIMER */}

        <div className="timer-background">

          <div className="timer">
            {hours}:{minutes}:{seconds}
          </div>

        </div>


        {/* HERO */}

        <section className="main">

          <div className="hello">
            HELLO
          </div>

          <div className="category">
            {store.profile.heroCategory}
          </div>


          <div className="title-row">

            <div className="line" />

            <h1 className="title">
              {store.profile.name.toUpperCase()}
            </h1>

            <div className="line" />

          </div>


          <div className="buttons">

            <a
              href="#about"
              className="button primary"
              onClick={(e) => { e.preventDefault(); navTo("about"); }}
            >
              Tentang Saya
            </a>

            <a
              href="/cv-saiful-rizal.pdf"
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              Lihat CV
            </a>

            <a
              href="#certification"
              className="button"
              onClick={(e) => { e.preventDefault(); navTo("certification"); }}
            >
              Certification
            </a>

          </div>

        </section>


        {/* BOTTOM */}

        <div className="bottom">

          <div className="bottom-line" />

          <span>
            LIFE IS AN EXPERIMENTATION
          </span>

          <div className="bottom-line" />

        </div>


        {/* NAVBAR */}

        <nav className="bottom-nav">

          {/* BERANDA */}

          <a
            href="#home"
            className="nav-item active"
            onClick={(e) => { e.preventDefault(); navTo("home"); }}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="
                  M3 10.8
                  L12 3
                  L21 10.8
                  V21
                  H14.5
                  V14.5
                  H9.5
                  V21
                  H3
                  Z
                " />

              </svg>

            </span>

            <span className="nav-label">
              Beranda
            </span>

          </a>


          {/* PROFIL */}

          <a
            href="#about"
            className="nav-item"
            onClick={(e) => { e.preventDefault(); navTo("about"); }}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <circle
                  cx="12"
                  cy="8"
                  r="4"
                />

                <path d="
                  M4 21
                  C4 16.8
                  7.5 14.5
                  12 14.5
                  C16.5 14.5
                  20 16.8
                  20 21
                " />

              </svg>

            </span>

            <span className="nav-label">
              Profil
            </span>

          </a>


          {/* PROJECT */}

          <a
            href="#project"
            className="nav-item"
            onClick={(e) => { e.preventDefault(); navTo("project"); }}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="
                  M3 6
                  H9
                  L11 8
                  H21
                  V19
                  H3
                  Z
                " />

                <path d="
                  M3 9
                  H21
                " />

              </svg>

            </span>

            <span className="nav-label">
              Project
            </span>

          </a>


          {/* ACHIEVEMENT */}

          <a
            href="#achievement"
            className="nav-item"
            onClick={(e) => { e.preventDefault(); navTo("achievement"); }}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="
                  M7 4
                  H17
                  V8
                  C17 11
                  15 13
                  12 14
                  C9 13
                  7 11
                  7 8
                  Z
                " />

                <path d="
                  M7 6
                  H4
                  V8
                  C4 10
                  5.5 11
                  8 11
                " />

                <path d="
                  M17 6
                  H20
                  V8
                  C20 10
                  18.5 11
                  16 11
                " />

                <path d="
                  M12 14
                  V18
                " />

                <path d="
                  M8 21
                  H16
                " />

              </svg>

            </span>

            <span className="nav-label">
              Achievement
            </span>

          </a>


          {/* CERTIFICATION */}

          <a
            href="#certification"
            className="nav-item"
            onClick={(e) => { e.preventDefault(); navTo("certification"); }}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="
                  M4 4
                  H10
                  C11 4
                  12 5
                  12 6
                  V20
                  C11 19
                  10 18.5
                  8 18.5
                  H4
                  Z
                " />

                <path d="
                  M20 4
                  H14
                  C13 4
                  12 5
                  12 6
                  V20
                  C13 19
                  14 18.5
                  16 18.5
                  H20
                  Z
                " />

              </svg>

            </span>

            <span className="nav-label">
              Certification
            </span>

          </a>

        </nav>


        {/* CORNER */}

        <div className="mark one" />

        <div className="mark two" />

      </main>
    </>
  );
}
