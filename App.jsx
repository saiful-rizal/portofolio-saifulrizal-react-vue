import { useEffect, useMemo, useState } from "react";

/* =====================================================
   PROFILE DATA — Saiful Rizal (sesuai CV)
===================================================== */

const PROFILE = {
  name: "Saiful Rizal",
  title: "Junior Web & Mobile Developer",
  photo: "/profile.png",
  bio: "Mahasiswa semester 5 D4 Teknik Informatika Politeknik Negeri Jember yang passionate dalam pengembangan teknologi dan pembuatan aplikasi. Terbiasa membangun aplikasi web dan mobile yang responsif, interaktif, dan mudah digunakan dengan Flutter, Dart, Java, HTML, dan CSS menggunakan VS Code dan Android Studio. Memiliki kemampuan public speaking, bertanggung jawab, serta mampu menjelaskan dan membimbing peserta didik dalam memahami pemrograman secara sederhana dan mudah dipahami.",
  heroCategory: "JUNIOR DEVELOPER",
  phone: "082225675196",
  email: "syaifulrizal320206@gmail.com",
  githubTotal: "9,430",
  status: "Mahasiswa D4 Teknik Informatika",
  role: "Junior Web & Mobile Developer",
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
    company: "Kantor PDAM Bondowoso — Bondowoso, Indonesia",
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
    company: "UKM Persaudaraan Setia Hati Terate — Politeknik Negeri Jember",
    desc: "Memimpin divisi komunikasi dan informasi: mengelola publikasi, dokumentasi kegiatan, dan media informasi organisasi.",
    resp: [
      "Mengelola konten publikasi dan dokumentasi kegiatan UKM",
      "Mengoordinasikan tim kominfo dalam setiap agenda organisasi",
      "Membangun alur informasi internal yang cepat dan jelas",
    ],
    tags: ["Leadership", "Kominfo", "Publikasi"],
    date: "2024 — Sekarang",
    badge: "Organisasi",
  },
  {
    logo: "KMTF",
    title: "Anggota Divisi Humas",
    company: "KEMATIF (Keluarga Mahasiswa Teknik Informatika) — Politeknik Negeri Jember",
    desc: "Menjalankan fungsi hubungan masyarakat: menjalin relasi antar himpunan, publikasi acara, dan koordinasi kepanitiaan TIF Exhibition.",
    resp: [
      "Menjadi panitia Sie Perlengkapan TIF Exhibition Ganjil 2024",
      "Menjadi panitia Sie Acara TIF Exhibition Genap 2025",
      "Mengelola komunikasi dan relasi eksternal himpunan",
    ],
    tags: ["Humas", "Event", "Komunikasi"],
    date: "2024 — Sekarang",
    badge: "Organisasi",
  },
  {
    logo: "BPM",
    title: "Anggota Komisi Teknis",
    company: "Bakor Pemandu Mahasiswa — Politeknik Negeri Jember",
    desc: "Bertugas di komisi informasi: menyebarluaskan informasi kelembagaan dan mendukung transparansi kegiatan kemahasiswaan.",
    resp: [
      "Menyusun dan menyebarkan informasi kegiatan BPM",
      "Berkolaborasi dengan komisi lain dalam advokasi mahasiswa",
      "Mendukung dokumentasi rapat dan aspirasi mahasiswa",
    ],
      tags: ["Informasi", "Advokasi", "Kelembagaan"],
      date: "2025 — Sekarang",
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
      date: "2025 — Sekarang",
      badge: "Freelance",
    },
  ];

/* =====================================================
   DATA LAYER — default + localStorage + hash routing
===================================================== */

const DATA_KEY = "saiful-portfolio-data-v2";

const DEFAULT_CERTS = [
  { id: "HKI-AIQUA", title: "Hak Kekayaan Intelektual Sistem Sterilisasi Air Minum Ternak (AIQUA)", issuer: "Politeknik Negeri Jember", year: "2025", code: "HKI-AIQUA", cat: "HKI", image: "" },
  { id: "PRM-D1", title: "Pemandu Materi Latihan Keterampilan Pramuka - Tingkat Dasar", issuer: "Jurusan Kesehatan Pertanian, Politeknik Negeri Jember", year: "2025", code: "PRM-D1", cat: "Training", image: "" },
  { id: "PRM-D2", title: "Pemandu Materi Latihan Keterampilan Pramuka - Tingkat Dasar", issuer: "Jurusan Teknologi Pertanian, Politeknik Negeri Jember", year: "2025", code: "PRM-D2", cat: "Training", image: "" },
  { id: "IBM-CLS", title: "Data Classification And Summarization Using IBM Granite", issuer: "IBM SkillsBuild", year: "2025", code: "IBM-CLS", cat: "Training", image: "" },
  { id: "IBM-SLV", title: "Penyelesaian Data Menggunakan IBM Granite", issuer: "IBM SkillsBuild", year: "2025", code: "IBM-SLV", cat: "Training", image: "" },
  { id: "IBM-SUM", title: "Summarizing Data Using IBM Granite", issuer: "IBM SkillsBuild", year: "2025", code: "IBM-SUM", cat: "Training", image: "" },
  { id: "HR-SF", title: "Mengenal Dunia Human Resource : Menguasai Dasar - Dasar HR", issuer: "SF Chow Consulting", year: "2025", code: "HR-SF", cat: "Training", image: "" },
  { id: "MC-PT", title: "Penetration Tester | Bug Hunter - Punggawa Cyber Security", issuer: "Merdeka Cyber", year: "2025", code: "MC-PT", cat: "Training", image: "" },
  { id: "MC-BAC", title: "Strategi Terbaik Live Sesi Broken Access Control Hacking", issuer: "Merdeka Cyber", year: "2025", code: "MC-BAC", cat: "Training", image: "" },
  { id: "SI-2025", title: "Sekolah Ilmiah 2025", issuer: "UKM Skim Politeknik Negeri Jember", year: "2025", code: "SI-2025", cat: "Training", image: "" },
  { id: "H8-SDI", title: "Code Generations And Optimization Class in the Student Developer Initiative", issuer: "Hacktiv8 Indonesia", year: "2025", code: "H8-SDI", cat: "Training", image: "" },
  { id: "UGM-G2R", title: "Model G2R Tetrapeneur : Inovasi Perencanaan Bisnis Ikonik Asli Indonesia", issuer: "Kewirausahaan HMP Universitas Gadjah Mada", year: "2025", code: "UGM-G2R", cat: "Training", image: "" },
  { id: "UGM-BAL", title: "Mastering The Balance, Achieving Success : A Journey In Entrepreneurship", issuer: "Unit Kewirausahaan Pascasarjana Universitas Gadjah Mada", year: "2025", code: "UGM-BAL", cat: "Training", image: "" },
  { id: "DC-174", title: "DevCoach 174 : IOS : Mendalami Swift UI, UI Framework Masa depan", issuer: "Dicoding Event", year: "2025", code: "DC-174", cat: "Training", image: "" },
  { id: "DC-179", title: "DevCoach 179 : Flutter : Ciptakan Animasi Epik Dengan Animation", issuer: "Dicoding Event", year: "2025", code: "DC-179", cat: "Training", image: "" },
  { id: "DC-192", title: "DevCoach 192 : Soft Skill : Penangkal Nirwaktu : Atur Prioritas dengan lebih cerdas", issuer: "Dicoding Event", year: "2025", code: "DC-192", cat: "Training", image: "" },
  { id: "DC-193", title: "DevCoach 193 : React : Hooks Mengubah Segalanya", issuer: "Dicoding Event", year: "2025", code: "DC-193", cat: "Training", image: "" },
  { id: "DC-194", title: "DevCoach 194 : Data Engineering | ETL : Wajib Bagi Seorang Data Engineer", issuer: "Dicoding Event", year: "2025", code: "DC-194", cat: "Training", image: "" },
  { id: "DC-195", title: "DevCoach 195 : Kotlin 101 | Mengenal Special Classes dan Collection", issuer: "Dicoding Event", year: "2025", code: "DC-195", cat: "Training", image: "" },
  { id: "DC-168", title: "DevCoach 168 : ML in Google Cloud | Training dan Deployment Machine Learning dengan Google Cloud", issuer: "Dicoding Event", year: "2024", code: "DC-168", cat: "Training", image: "" },
  { id: "GCA-2025", title: "Google Cloud Arcade Fasilitator 2025 : Program Overview & Deep Dive", issuer: "Dicoding Event", year: "2025", code: "GCA-2025", cat: "Training", image: "" },
  { id: "IDC-05", title: "IDCamo Alumni Dialogue #5 - Debunking The Myth Of Inteligent Automation", issuer: "Dicoding Event", year: "2025", code: "IDC-05", cat: "Training", image: "" },
  { id: "IDC-08", title: "IDCamp x Dicoding Live #8 - When Business Questions Meet Machine", issuer: "Dicoding Event", year: "2025", code: "IDC-08", cat: "Training", image: "" },
  { id: "IDC-04", title: "[Reschedule] IDCamp Alumni Dialogue #4 - Failing Forward: Turning Setbacks into Growth in Tech", issuer: "Dicoding Event", year: "2025", code: "IDC-04", cat: "Training", image: "" },
];

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
    return {
      profile: mergedProfile,
      experiences:
        Array.isArray(parsed.experiences) && parsed.experiences.length
          ? parsed.experiences
          : fresh.experiences,
      certifications: Array.isArray(parsed.certifications)
        ? parsed.certifications
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
  return HASH_VIEWS.includes(v) ? v : "home";
}

/* =====================================================
   PROFILE NAV — dipakai semua halaman (ada Beranda)
===================================================== */

function ProfileNav({ active = "", onNavigate = () => {} }) {
  const go = (tab) => () => onNavigate(tab);

  return (
    <nav className="p-nav" aria-label="Navigasi utama">
      <button className={`p-nav-item ${active === "home" ? "active" : ""}`} onClick={go("home")} aria-label="Beranda">
        <svg viewBox="0 0 24 24"><path d="M12 3 3 10.5V21h6v-6h6v6h6V10.5L12 3Z" fill="currentColor" /></svg>
      </button>
      <button className={`p-nav-item wide ${active === "about" ? "active" : ""}`} onClick={go("about")}>
        <svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0v1H5v-1Z" fill="currentColor" /></svg>
        <span>Tentang</span>
      </button>
      <button className={`p-nav-item ${active === "project" ? "active" : ""}`} onClick={go("project")} aria-label="Project">
        <svg viewBox="0 0 24 24"><path d="M4 5h6l2 2h8v11H4V5Zm0 5h16v2H4v-2Z" fill="currentColor" /></svg>
      </button>
      <button className={`p-nav-item ${active === "achievement" ? "active" : ""}`} onClick={go("achievement")} aria-label="Achievement">
        <svg viewBox="0 0 24 24"><path d="M6 3h12v5a6 6 0 0 1-4 5.65V16h3v2H7v-2h3v-2.35A6 6 0 0 1 6 8V3Zm-2 2H2v2a4 4 0 0 0 4 4V9H4V5Zm16 0h-2v4h-2v2a4 4 0 0 0 4-4V5ZM9 20h6v2H9v-2Z" fill="currentColor" /></svg>
      </button>
      <button className={`p-nav-item ${active === "certification" ? "active" : ""}`} onClick={go("certification")} aria-label="Certification">
        <svg viewBox="0 0 24 24"><path d="M4 4h7v16H4V4Zm11 0h5v16h-5V4ZM12 4v16" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>
      </button>
    </nav>
  );
}

const DEFAULT_PROJECTS = [
  { title: "SIAKAD Instansi", desc: "Sistem informasi akademik end-to-end: KRS, nilai, presensi QR, dan panel admin role-based.", tags: ["Next.js", "Laravel", "MySQL"], cat: "Web", year: "2025", status: "Live" },
  { title: "PKM Riset App", desc: "Aplikasi riset terdanai PKM: survei lapangan offline-first dengan sinkronisasi otomatis.", tags: ["Flutter", "Firebase"], cat: "Mobile", year: "2024", status: "Source" },
  { title: "AI Helpdesk Chatbot", desc: "Chatbot layanan kampus dengan RAG: jawab FAQ, buat tiket, dan eskalasi ke staf.", tags: ["Python", "OpenAI", "Next.js"], cat: "AI", year: "2025", status: "Demo" },
  { title: "E-Commerce Headless", desc: "Toko online headless: katalog cepat, checkout midtrans, dan dashboard penjualan.", tags: ["Next.js", "Tailwind"], cat: "Web", year: "2024", status: "Live" },
  { title: "Absensi QR Mobile", desc: "Presensi karyawan via QR + geofence dengan rekap otomatis dan ekspor Excel.", tags: ["Flutter", "Laravel"], cat: "Mobile", year: "2025", status: "Source" },
  { title: "Analitik Dashboard", desc: "Dashboard KPI real-time: chart interaktif, filter tanggal, dan ekspor CSV.", tags: ["React", "TypeScript"], cat: "Web", year: "2023", status: "Demo" },
  { title: "Kasir POS Web", desc: "Point of sales untuk UMKM: kelola stok, struk thermal, dan laporan harian.", tags: ["Vue", "Laravel"], cat: "Web", year: "2024", status: "Live" },
  { title: "Absensi Wajah AI", desc: "Presensi berbasis pengenalan wajah on-device dengan anti-spoofing sederhana.", tags: ["Python", "Flutter"], cat: "AI", year: "2025", status: "Demo" },
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
    desc: "Penghargaan, pendanaan, dan kompetisi — halaman sedang disiapkan. Segera hadir.",
  },
  certification: {
    title: "Certification",
    desc: "Kepanitiaan, organisasi, dan penghargaan sesuai CV — halaman sedang disiapkan. Segera hadir.",
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
          font-size: 22px; font-weight: 700; color: #fff;
          margin: 0 0 6px; line-height: 1.3;
          letter-spacing: -0.3px;
        }
        .p-title-line {
          font-size: 11px; font-weight: 500;
          color: #d4d4d4; letter-spacing: 2px;
          text-transform: uppercase; margin: 0 0 16px;
        }
        .p-bio {
          font-size: 11.5px; line-height: 1.85; color: #8a90a0;
          max-width: 880px; margin: 0 auto 22px;
        }

        .p-hire {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #d4d4d4 0%, #8a8a8a 100%);
          color: #090909; border: none; border-radius: 999px;
          font-family: inherit; font-size: 11.5px; font-weight: 700;
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
        .p-git-title { font-size: 11.5px; font-weight: 700; color: #fff; }
        .p-year {
          background: #1c1c1c; color: #d4d4d4; border: 1px solid rgba(170,170,170,0.2);
          border-radius: 6px; font-family: inherit; font-size: 10.5px; padding: 3px 8px;
          cursor: pointer; transition: border-color 0.2s;
        }
        .p-year:focus { border-color: rgba(170,170,170,0.5); outline: none; }
        .p-git-total { font-size: 10.5px; color: #5a6070; }
        .p-git-total b { color: #d4d4d4; font-weight: 700; }
        .p-git-scroll { overflow-x: auto; padding-bottom: 6px; }
        .p-git-scroll::-webkit-scrollbar { height: 4px; }
        .p-git-scroll::-webkit-scrollbar-track { background: #101010; border-radius: 2px; }
        .p-git-scroll::-webkit-scrollbar-thumb { background: #2e2e2e; border-radius: 2px; }
        .p-git { min-width: 620px; text-align: left; }
        .p-git-months { display: grid; grid-template-columns: 34px repeat(53, 1fr); font-size: 8.5px; color: #4a5060; margin-bottom: 4px; }
        .p-git-months span:first-child { grid-column: 2; }
        .p-git-months span { overflow: visible; white-space: nowrap; }
        .p-git-body { display: grid; grid-template-columns: 34px 1fr; gap: 4px; }
        .p-git-days { display: grid; grid-template-rows: repeat(7, 11px); gap: 3px; font-size: 8.5px; color: #4a5060; align-items: center; }
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
        .p-git-legend { display: flex; align-items: center; justify-content: flex-end; gap: 5px; font-size: 9px; color: #4a5060; margin-top: 8px; }

        .p-sec {
          text-align: left; font-size: 12px; font-weight: 700;
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
          font-size: 11px; font-weight: 700; color: #d4d4d4;
        }
        .p-exp-logo .sup { font-size: 7px; vertical-align: super; }
        .p-exp-body { flex: 1; min-width: 0; }
        .p-exp-title { font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 700; color: #fff; margin: 0 0 4px; }
        .p-exp-sub { font-size: 10.5px; color: #6a7080; margin: 0 0 10px; }
        .p-exp-desc { font-size: 10.5px; line-height: 1.7; color: #7a8090; margin: 0 0 14px; }
        .p-exp-resp { font-size: 9.5px; font-weight: 700; color: #d4d4d4; margin: 0 0 7px; letter-spacing: 1px; }
        .p-exp-list { margin: 0 0 14px; padding: 0; list-style: none; font-size: 10.5px; color: #7a8090; line-height: 1.8; }
        .p-exp-list li { position: relative; padding-left: 14px; }
        .p-exp-list li::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #d4d4d4; opacity: 0.5; }
        .p-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .p-tags span {
          font-size: 9px; color: #a0a8b8; border: 1px solid rgba(170,170,170,0.12);
          border-radius: 6px; padding: 4px 10px;
          background: rgba(170,170,170,0.04);
          transition: background 0.2s, border-color 0.2s;
        }
        .p-tags span:hover { background: rgba(170,170,170,0.1); border-color: rgba(170,170,170,0.3); }
        .p-exp-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
        .p-date { font-size: 10px; color: #5a6070; }
        .p-badge {
          font-size: 10px; color: #d4d4d4;
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
          margin-top: 28px; font-size: 10px; color: #c8ccd4;
          font-weight: 500; flex-wrap: wrap;
        }
        .p-foot .dim { color: #3a4050; font-weight: 400; }
        .p-copy { font-size: 10px; color: #2a303c; margin: 10px 0 0; text-align: center; letter-spacing: 1px; }

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
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          font-family: inherit; font-size: 11px; font-weight: 700;
          padding: 8px 10px; transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          position: relative;
        }
        .p-nav-item svg { width: 17px; height: 17px; }
        .p-nav-item.wide { padding: 8px 16px; }
        .p-nav-item.active {
          background: rgba(170,170,170,0.1); color: #d4d4d4;
          box-shadow: 0 0 12px rgba(170,170,170,0.08);
        }
        .p-nav-item:hover { background: rgba(255,255,255,0.05); color: #c8ccd4; }
        .p-nav-item.active:hover { background: rgba(170,170,170,0.15); color: #d4d4d4; }

        .p-exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 820px) { .p-exp-grid { grid-template-columns: 1fr; } }

        .p-ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; text-align: left; }
        @media (max-width: 820px) { .p-ct-grid { grid-template-columns: 1fr; } }
        .p-ct-img { width: 100%; height: 150px; object-fit: cover; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: #181818; margin-bottom: 12px; display: block; }
        .p-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; text-align: left; }
        .p-field > span { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #8a8f9e; }
        .p-input, .p-textarea { background: #141414; border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; color: #e8e8e8; font-family: inherit; font-size: 12px; padding: 10px 12px; width: 100%; box-sizing: border-box; }
        .p-input:focus, .p-textarea:focus { outline: none; border-color: rgba(255,255,255,0.35); }
        .p-textarea { min-height: 90px; resize: vertical; line-height: 1.6; }
        .p-btn-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 6px; }
        .p-btn { display: inline-flex; align-items: center; gap: 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: #e8e8e8; font-family: inherit; font-size: 11px; font-weight: 700; padding: 10px 20px; cursor: pointer; transition: all 0.25s ease; }
        .p-btn:hover { background: rgba(255,255,255,0.1); }
        .p-btn.solid { background: #e8e8e8; color: #111; border-color: #e8e8e8; }
        .p-btn.solid:hover { background: #ffffff; }
        .p-btn.danger { border-color: rgba(255,120,120,0.4); color: #ff9c9c; }
        .p-btn.danger:hover { background: rgba(255,120,120,0.1); }
        .p-thumb { width: 100%; height: 120px; object-fit: cover; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: #181818; display: block; }
        .p-tabs { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
        .p-tab { border: 1px solid rgba(255,255,255,0.15); background: transparent; color: #9aa0ae; border-radius: 999px; font-family: inherit; font-size: 10.5px; font-weight: 700; padding: 8px 18px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; }
        .p-tab.on { background: #e8e8e8; color: #111; border-color: #e8e8e8; }
        .p-file { font-size: 11px; color: #9aa0ae; }
        .p-file::file-selector-button { background: #222; color: #e8e8e8; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 8px 14px; margin-right: 10px; cursor: pointer; font-family: inherit; font-size: 11px; }
        .p-modal-bg { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.72); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 18px; box-sizing: border-box; animation: cardIn 0.3s ease both; }
        .p-modal-box { width: min(94vw, 520px); max-height: 88vh; overflow-y: auto; background: #141414; border: 1px solid rgba(255,255,255,0.14); border-radius: 18px; padding: 28px; box-sizing: border-box; text-align: center; }

        @media (max-width: 560px) {
          .profile-page { padding: 20px 10px 110px; }
          .profile-card { padding: 28px 18px 20px; }
          .p-name { font-size: 17px; }
          .p-title-line { font-size: 10px; letter-spacing: 1px; }
          .p-bio { font-size: 10.5px; }
          .p-hire { width: 100%; justify-content: center; }
          .p-git-head { flex-wrap: wrap; }
          .p-exp { flex-direction: column; padding: 16px; }
          .p-exp-logo { width: 50px; height: 50px; font-size: 10px; }
          .p-exp-grid, .p-ct-grid { gap: 10px; }
          .p-ct-img { height: 130px; }
          .p-foot { justify-content: center; text-align: center; }
          .p-photo-ring { width: 130px; height: 130px; }
          .p-photo { width: 122px; height: 122px; }
          .p-modal-bg { padding: 12px; }
          .p-modal-box { padding: 20px 16px; }
          .p-nav { bottom: 10px; max-width: calc(100vw - 16px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .profile-card, .p-exp { animation: none; }
          .p-photo-ring, .p-photo-ring::after { animation: none; }
          .p-cell:hover { transform: none; }
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
            {profile.phone} • {profile.email}
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
  if (!item) return null;

  return (
    <div className="p-modal-bg" onClick={onClose}>
      <div className="p-modal-box" onClick={(e) => e.stopPropagation()}>
        {item.image ? (
          <img className="p-ct-img" src={item.image} alt={item.title} />
        ) : null}
        <h3 className="p-exp-title" style={{ fontSize: "16px", marginBottom: "6px" }}>
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
        <div className="p-btn-row" style={{ justifyContent: "center", marginTop: "10px" }}>
          {item.image ? (
            <a
              className="p-btn solid"
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

          <h1 className="p-name">Certification</h1>
          <p className="p-title-line">Kepanitiaan • Organisasi • Penghargaan</p>

          <p className="p-bio">
            Kepanitiaan, organisasi, dan penghargaan Saiful Rizal sesuai CV.
            Kelola datanya lewat dashboard (tambahkan /# pada link).
          </p>

          {certs.length === 0 ? (
            <p className="p-bio">Belum ada data sertifikasi.</p>
          ) : (
            <div className="p-ct-grid">
              {certs.map((c) => (
                <div key={c.id} className="p-exp">
                  <div className="p-exp-body">
                    {c.image ? (
                      <img className="p-ct-img" src={c.image} alt={c.title} />
                    ) : null}
                    <h3 className="p-exp-title">{c.title}</h3>
                    <p className="p-exp-sub">
                      {c.issuer}{c.year ? ` • ${c.year}` : ""}
                    </p>
                    {c.code ? <p className="p-exp-desc">ID: {c.code}</p> : null}
                    <div className="p-exp-foot">
                      <span className="p-badge">{c.cat || "Lainnya"}</span>
                      <button
                        className="p-btn"
                        onClick={() =>
                          setSelected({
                            title: c.title,
                            sub: `${c.issuer}${c.year ? ` • ${c.year}` : ""}`,
                            desc: c.code ? `ID: ${c.code}` : "",
                            tags: c.cat ? [c.cat] : [],
                            image: c.image || "",
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
          )}

          <p className="p-copy">© 2026 SAIFUL RIZAL</p>
        </div>

        <ProfileNav active={active} onNavigate={onNavigate} />
      </div>
      <DetailModal item={selected} onClose={() => setSelected(null)} />
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
          code: "",
          cat: "Training",
          image: "",
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
                  + Tambah Sertifikasi
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

          <h1 className="p-name">Project</h1>
          <p className="p-title-line">Web • Mobile • AI</p>

          <p className="p-bio">
            Koleksi project web, mobile, dan AI. Klik Lihat pada kartu untuk detail.
          </p>

          <div className="p-ct-grid">
            {DEFAULT_PROJECTS.map((pr) => (
              <div key={pr.title} className="p-exp">
                <div className="p-exp-body">
                  <h3 className="p-exp-title">{pr.title}</h3>
                  <p className="p-exp-sub">{pr.cat} • {pr.year}</p>
                  <p className="p-exp-desc">{pr.desc}</p>
                  <div className="p-tags">
                    {pr.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="p-exp-foot">
                    <span className="p-badge">{pr.status}</span>
                    <button
                      className="p-btn"
                      onClick={() =>
                        setSelected({
                          title: pr.title,
                          sub: `${pr.cat} • ${pr.year} • ${pr.status}`,
                          desc: pr.desc,
                          tags: pr.tags,
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
          <p className="p-title-line">Penghargaan • Pendanaan • Kompetisi</p>

          <p className="p-bio">
            Penghargaan, pendanaan, dan kompetisi yang memvalidasi kualitas kerja.
            Klik Lihat pada kartu untuk detail.
          </p>

          <div className="p-ct-grid">
            {DEFAULT_ACHIEVEMENTS.map((a) => (
              <div key={a.title} className="p-exp">
                <div className="p-exp-body">
                  <h3 className="p-exp-title">{a.title}</h3>
                  <p className="p-exp-sub">{a.org} • {a.year}</p>
                  <p className="p-exp-desc">{a.desc}</p>
                  <div className="p-exp-foot">
                    <span className="p-badge">{a.tag}</span>
                    <button
                      className="p-btn"
                      onClick={() =>
                        setSelected({
                          title: a.title,
                          sub: `${a.org} • ${a.year}`,
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

export default function App() {
  const [time, setTime] = useState(new Date());
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [view, setView] = useState(hashToView);
  const [store, setStore] = useState(loadStore);

  useEffect(() => {
    const onHash = () => setView(hashToView());
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
      setView(v);
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

  if (view === "dashboard") {
    return <DashboardView store={store} setStore={setStore} onNavigate={navTo} />;
  }

  if (view !== "home") {
    return (
      <>
        {view === "about" ? (
          <ProfileView data={store} active={view} onNavigate={navTo} />
        ) : view === "certification" ? (
          <CertificationView certs={store.certifications} active={view} onNavigate={navTo} />
        ) : view === "project" ? (
          <ProjectView active={view} onNavigate={navTo} />
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
            64px,
            11vw,
            180px
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
            6px,
            0.55vw,
            9px
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
            14px,
            1.2vw,
            20px
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
            10px,
            0.9vw,
            15px
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
            44px,
            6.5vw,
            90px
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
            7px,
            0.65vw,
            10px
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
            5px,
            0.5vw,
            8px
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

          font-size: 10px;

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
                60px,
                14vw,
                160px
              );
          }

          .title {
            font-size:
              clamp(
                40px,
                7vw,
                70px
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
                48px,
                18vw,
                90px
              );

            letter-spacing: -4px;
          }


          /* TOP */

          .top-left,
          .top-right {
            top: 4%;

            font-size: 5px;

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

            font-size: 11px;

            letter-spacing: 3.8px;
          }


          /* CATEGORY */

          .category {
            margin-bottom: 17px;

            font-size: 8px;

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
                31px,
                9.5vw,
                46px
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

            font-size: 6.5px;
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

            font-size: 9px;
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
            font-size: 4.5px;

            letter-spacing: 1px;
          }

          .timer {
            font-size: 45px;

            letter-spacing: -3px;
          }

          .hello {
            font-size: 10px;

            letter-spacing: 3px;
          }

          .category {
            font-size: 7px;

            letter-spacing: 2.5px;
          }

          .title-row {
            gap: 4px;
          }

          .line {
            max-width: 21px;
          }

          .title {
            font-size: 27px;

            letter-spacing: 0.5px;
          }

          .buttons {
            gap: 4px;

            margin-top: 18px;
          }

          .button {
            min-width: 80px;

            height: 27px;

            font-size: 5.5px;
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
            font-size: 8px;
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
            font-size: 100px;
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
            font-size: 20px;
          }

          .category {
            font-size: 15px;
          }

          .title {
            font-size: 88px;
          }

          .timer {
            font-size: 180px;
          }

        }


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
          BUILD · LEARN · GROW
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
