<script setup>
import { ref } from "vue";
import portfolio from "../data/portfolio.json";

const emit = defineEmits(["navigate"]);
const go = (tab) => emit("navigate", tab);

const clone = (o) => JSON.parse(JSON.stringify(o));
const draft = ref(clone(portfolio));
const tab = ref("profile");
const tabs = [
  ["profile", "Profil"],
  ["project", "Project"],
  ["exp", "Pengalaman"],
  ["ach", "Achievement"],
  ["cert", "Sertifikasi"],
  ["github", "GitHub"],
];

const CFG_KEY = "portfolio-github-cfg-vue";
const cfg = ref({
  owner: "saiful-rizal",
  repo: "portofolio-saifulrizal-react-vue",
  path: "vue/src/data/portfolio.json",
  branch: "main",
  token: "",
});
try {
  const saved = JSON.parse(localStorage.getItem(CFG_KEY) || "null");
  if (saved) cfg.value = { ...cfg.value, ...saved };
} catch (e) {}

const status = ref("");
const saving = ref(false);

const persistCfg = () => {
  try {
    localStorage.setItem(CFG_KEY, JSON.stringify(cfg.value));
  } catch (e) {}
};

const addItem = (list, blank) => list.push(clone(blank));
const removeItem = (list, i) => list.splice(i, 1);

const BLANK = {
  project: { title: "Project Baru", desc: "", tags: [], cat: "Web", year: "2026", status: "Demo", grad: "linear-gradient(135deg,#303130,#1b1c1b)", icon: "M4 5h16v14H4z M4 9h16" },
  exp: { logo: "NEW", title: "", company: "", desc: "", resp: [""], tags: [], date: "", badge: "" },
  ach: { year: "2026", title: "", org: "", desc: "", tag: "" },
  cert: { init: "", title: "", issuer: "", year: "2026", id: "", cat: "Web", grad: "linear-gradient(135deg,#303130,#1b1c1b)" },
  stat: { n: "", l: "" },
};

const splitLines = (e) => e.target.value.split("\n");
const splitComma = (e) => e.target.value.split(",").map((s) => s.trim()).filter(Boolean);

const downloadJSON = () => {
  const blob = new Blob([JSON.stringify(draft.value, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "portfolio.json";
  a.click();
  URL.revokeObjectURL(a.href);
  status.value = "File portfolio.json diunduh.";
};

const resetDraft = () => {
  draft.value = clone(portfolio);
  status.value = "Draf dikembalikan ke data awal.";
};

const saveGitHub = async () => {
  if (!cfg.value.token) {
    status.value = "Isi token GitHub dulu di tab GitHub.";
    tab.value = "github";
    return;
  }
  saving.value = true;
  status.value = "Menghubungkan ke GitHub...";
  try {
    persistCfg();
    const base = `https://api.github.com/repos/${cfg.value.owner}/${cfg.value.repo}/contents/${cfg.value.path}`;
    const headers = { Authorization: `Bearer ${cfg.value.token}`, Accept: "application/vnd.github+json" };
    const getRes = await fetch(`${base}?ref=${encodeURIComponent(cfg.value.branch)}`, { headers });
    if (!getRes.ok) throw new Error("Gagal membaca file di GitHub (" + getRes.status + "). Cek owner/repo/path/branch.");
    const { sha } = await getRes.json();
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(draft.value, null, 2))));
    const putRes = await fetch(base, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Update portfolio via dashboard",
        content,
        sha,
        branch: cfg.value.branch,
      }),
    });
    const out = await putRes.json();
    if (!putRes.ok) throw new Error(out.message || "Gagal menyimpan.");
    status.value = "Tersimpan di GitHub. " + (out.content && out.content.html_url ? out.content.html_url : "");
  } catch (e) {
    status.value = "Error: " + e.message;
  }
  saving.value = false;
};
</script>

<template>
  <div class="profile-page">
    <div class="profile-card db-wide">
      <span class="pcorner tl" /><span class="pcorner tr" />
      <span class="pcorner bl" /><span class="pcorner br" />

      <p class="x-eyebrow">ADMIN</p>
      <h1 class="x-title">Dashboard Data</h1>
      <p class="x-sub">Kelola semua konten portfolio. Simpan ke <b>portfolio.json</b> di GitHub atau unduh manual.</p>

      <div class="x-filters">
        <button v-for="[key, label] in tabs" :key="key" class="x-chip" :class="{ on: tab === key }" @click="tab = key">
          {{ label }}
        </button>
      </div>

      <!-- PROFIL -->
      <div v-if="tab === 'profile'" class="db-form">
        <label class="db-field"><span>Nama lengkap</span><input v-model="draft.profile.name" /></label>
        <div class="db-row">
          <label class="db-field"><span>Nama pendek (hero)</span><input v-model="draft.profile.shortName" /></label>
          <label class="db-field"><span>Peran</span><input v-model="draft.profile.role" /></label>
        </div>
        <div class="db-row">
          <label class="db-field"><span>Sapaan</span><input v-model="draft.profile.hello" /></label>
          <label class="db-field"><span>Kategori</span><input v-model="draft.profile.title" /></label>
        </div>
        <label class="db-field"><span>Bio</span><textarea v-model="draft.profile.bio" rows="6" /></label>
        <label class="db-field"><span>URL foto</span><input v-model="draft.profile.photo" /></label>
        <div class="db-row">
          <label class="db-field"><span>Status</span><input v-model="draft.profile.status" /></label>
          <label class="db-field"><span>Total kontribusi</span><input v-model.number="draft.profile.githubTotal" type="number" /></label>
        </div>
        <div class="db-row3">
          <label class="db-field"><span>Instagram</span><input v-model="draft.profile.socials.instagram" /></label>
          <label class="db-field"><span>GitHub</span><input v-model="draft.profile.socials.github" /></label>
          <label class="db-field"><span>LinkedIn</span><input v-model="draft.profile.socials.linkedin" /></label>
        </div>
      </div>

      <!-- PROJECT -->
      <div v-if="tab === 'project'" class="db-list">
        <div v-for="(p, i) in draft.projects" :key="i" class="db-item">
          <div class="db-item-head"><b>#{{ i + 1 }} {{ p.title }}</b><button class="db-del" @click="removeItem(draft.projects, i)">Hapus</button></div>
          <div class="db-row">
            <label class="db-field"><span>Judul</span><input v-model="p.title" /></label>
            <label class="db-field"><span>Tahun</span><input v-model="p.year" /></label>
          </div>
          <label class="db-field"><span>Deskripsi</span><textarea v-model="p.desc" rows="2" /></label>
          <div class="db-row3">
            <label class="db-field"><span>Kategori</span>
              <select v-model="p.cat"><option>Web</option><option>Mobile</option><option>AI</option></select>
            </label>
            <label class="db-field"><span>Status</span>
              <select v-model="p.status"><option>Live</option><option>Demo</option><option>Source</option></select>
            </label>
            <label class="db-field"><span>Tags (koma)</span><input :value="p.tags.join(', ')" @input="p.tags = splitComma($event)" /></label>
          </div>
          <div class="db-row">
            <label class="db-field"><span>Gradient</span><input v-model="p.grad" /></label>
            <label class="db-field"><span>Icon (path SVG)</span><input v-model="p.icon" /></label>
          </div>
        </div>
        <button class="db-add" @click="addItem(draft.projects, BLANK.project)">+ Tambah Project</button>
      </div>

      <!-- PENGALAMAN -->
      <div v-if="tab === 'exp'" class="db-list">
        <div v-for="(job, i) in draft.experiences" :key="i" class="db-item">
          <div class="db-item-head"><b>#{{ i + 1 }} {{ job.title }}</b><button class="db-del" @click="removeItem(draft.experiences, i)">Hapus</button></div>
          <div class="db-row">
            <label class="db-field"><span>Posisi</span><input v-model="job.title" /></label>
            <label class="db-field"><span>Logo (teks)</span><input v-model="job.logo" /></label>
          </div>
          <label class="db-field"><span>Perusahaan</span><input v-model="job.company" /></label>
          <label class="db-field"><span>Deskripsi</span><textarea v-model="job.desc" rows="2" /></label>
          <label class="db-field"><span>Tanggung jawab (1 per baris)</span><textarea :value="job.resp.join('\n')" @input="job.resp = splitLines($event)" rows="3" /></label>
          <label class="db-field"><span>Tags (koma)</span><input :value="job.tags.join(', ')" @input="job.tags = splitComma($event)" /></label>
          <div class="db-row">
            <label class="db-field"><span>Periode</span><input v-model="job.date" /></label>
            <label class="db-field"><span>Badge</span><input v-model="job.badge" /></label>
          </div>
        </div>
        <button class="db-add" @click="addItem(draft.experiences, BLANK.exp)">+ Tambah Pengalaman</button>
      </div>

      <!-- ACHIEVEMENT -->
      <div v-if="tab === 'ach'" class="db-list">
        <p class="db-label">Statistik</p>
        <div v-for="(s, i) in draft.achievements.stats" :key="i" class="db-row">
          <label class="db-field"><span>Angka</span><input v-model="s.n" /></label>
          <label class="db-field"><span>Label</span><input v-model="s.l" /></label>
          <button class="db-del" @click="removeItem(draft.achievements.stats, i)">Hapus</button>
        </div>
        <button class="db-add" @click="addItem(draft.achievements.stats, BLANK.stat)">+ Tambah Statistik</button>
        <p class="db-label">Daftar achievement</p>
        <div v-for="(a, i) in draft.achievements.items" :key="i" class="db-item">
          <div class="db-item-head"><b>#{{ i + 1 }} {{ a.title }}</b><button class="db-del" @click="removeItem(draft.achievements.items, i)">Hapus</button></div>
          <div class="db-row">
            <label class="db-field"><span>Tahun</span><input v-model="a.year" /></label>
            <label class="db-field"><span>Tag</span><input v-model="a.tag" /></label>
          </div>
          <label class="db-field"><span>Judul</span><input v-model="a.title" /></label>
          <label class="db-field"><span>Organisasi</span><input v-model="a.org" /></label>
          <label class="db-field"><span>Deskripsi</span><textarea v-model="a.desc" rows="2" /></label>
        </div>
        <button class="db-add" @click="addItem(draft.achievements.items, BLANK.ach)">+ Tambah Achievement</button>
      </div>

      <!-- SERTIFIKASI -->
      <div v-if="tab === 'cert'" class="db-list">
        <div v-for="(c, i) in draft.certifications" :key="i" class="db-item">
          <div class="db-item-head"><b>#{{ i + 1 }} {{ c.title }}</b><button class="db-del" @click="removeItem(draft.certifications, i)">Hapus</button></div>
          <div class="db-row">
            <label class="db-field"><span>Judul</span><input v-model="c.title" /></label>
            <label class="db-field"><span>Inisial logo</span><input v-model="c.init" /></label>
          </div>
          <div class="db-row">
            <label class="db-field"><span>Penerbit</span><input v-model="c.issuer" /></label>
            <label class="db-field"><span>Tahun</span><input v-model="c.year" /></label>
          </div>
          <div class="db-row3">
            <label class="db-field"><span>ID Kredensial</span><input v-model="c.id" /></label>
            <label class="db-field"><span>Kategori</span>
              <select v-model="c.cat"><option>Training</option><option>HKI</option><option>Kepanitiaan</option><option>Organisasi</option><option>Penghargaan</option></select>
            </label>
            <label class="db-field"><span>Gradient</span><input v-model="c.grad" /></label>
          </div>
        </div>
        <button class="db-add" @click="addItem(draft.certifications, BLANK.cert)">+ Tambah Sertifikasi</button>
      </div>

      <!-- GITHUB -->
      <div v-if="tab === 'github'" class="db-form">
        <div class="db-row">
          <label class="db-field"><span>Owner</span><input v-model="cfg.owner" /></label>
          <label class="db-field"><span>Repo</span><input v-model="cfg.repo" /></label>
        </div>
        <div class="db-row">
          <label class="db-field"><span>Path file JSON</span><input v-model="cfg.path" /></label>
          <label class="db-field"><span>Branch</span><input v-model="cfg.branch" /></label>
        </div>
        <label class="db-field"><span>Token GitHub (classic, scope repo)</span><input v-model="cfg.token" type="password" placeholder="ghp_..." /></label>
        <p class="db-hint">Token tersimpan di localStorage browser ini saja. Buat di GitHub → Settings → Developer settings → Personal access tokens.</p>
      </div>

      <p v-if="status" class="db-status">{{ status }}</p>

      <div class="db-actions">
        <button class="db-btn ghost" @click="go('home')">← Kembali</button>
        <button class="db-btn ghost" @click="resetDraft">Reset</button>
        <button class="db-btn ghost" @click="downloadJSON">Unduh JSON</button>
        <button class="db-btn primary" :disabled="saving" @click="saveGitHub">
          {{ saving ? "Menyimpan..." : "Simpan ke GitHub" }}
        </button>
      </div>

      <p class="p-copy">© 2026 {{ draft.profile.name.toUpperCase() }}</p>
    </div>
  </div>
</template>

<style>
.profile-page{min-height:100vh;min-height:100dvh;width:100%;background-color:#191a19;background-image:radial-gradient(circle at 50% 35%,#303130 0%,#292a29 30%,#222322 62%,#181918 100%);color:#f5f5f5;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:flex;flex-direction:column;align-items:center;padding:28px 14px 60px;box-sizing:border-box}
.profile-card{position:relative;width:min(94vw,740px);background-color:rgba(34,35,34,.72);background-image:linear-gradient(rgba(150,150,150,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(150,150,150,.13) 1px,transparent 1px);background-size:16px 16px;border:1px solid rgba(255,255,255,.22);border-radius:16px;padding:34px 30px 22px;box-sizing:border-box;text-align:center}
.profile-card.db-wide{width:min(96vw,1200px)}
.pcorner{position:absolute;width:16px;height:16px;opacity:.85}
.pcorner::before,.pcorner::after{content:"";position:absolute;background:#f5f5f5}
.pcorner::before{width:100%;height:2px}
.pcorner.tl::before,.pcorner.tr::before{top:0}
.pcorner.bl::before,.pcorner.br::before{bottom:0}
.pcorner::after{width:2px;height:100%}
.pcorner.tl::after,.pcorner.bl::after{left:0}
.pcorner.tr::after,.pcorner.br::after{right:0}
.pcorner.tl{top:10px;left:10px}.pcorner.tr{top:10px;right:10px}.pcorner.bl{bottom:10px;left:10px}.pcorner.br{bottom:10px;right:10px}
.x-eyebrow{font-size:10px;letter-spacing:3px;color:#858585;margin:0 0 8px}
.x-title{font-size:22px;font-weight:800;color:#f5f5f5;margin:0 0 8px}
.x-sub{font-size:11px;line-height:1.7;color:#9b9b9b;max-width:560px;margin:0 auto 16px}
.x-sub b{color:#f5f5f5}
.x-filters{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:18px}
.x-chip{background:transparent;color:#d2d2d2;border:1px solid rgba(255,255,255,.25);border-radius:999px;font-family:inherit;font-size:10.5px;font-weight:700;padding:7px 16px;cursor:pointer;transition:all .2s}
.x-chip.on{background:#f5f5f5;color:#1b1c1b;border-color:#f5f5f5}
.x-chip:hover{border-color:#f5f5f5}
.db-form,.db-list{display:flex;flex-direction:column;gap:12px;text-align:left}
.db-label{font-size:11px;font-weight:800;color:#f5f5f5;margin:8px 0 0;letter-spacing:1px}
.db-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.db-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.db-field{display:flex;flex-direction:column;gap:5px;min-width:0}
.db-field span{font-size:9.5px;color:#858585;letter-spacing:.5px}
.db-field input,.db-field textarea,.db-field select{background:#1b1c1b;border:1px solid rgba(255,255,255,.2);border-radius:8px;color:#f5f5f5;font-family:inherit;font-size:11px;padding:9px 12px;width:100%;box-sizing:border-box}
.db-field textarea{resize:vertical;line-height:1.6}
.db-field input:focus,.db-field textarea:focus,.db-field select:focus{outline:none;border-color:rgba(255,255,255,.5)}
.db-item{background:#1b1c1b;border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px}
.db-item-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
.db-item-head b{font-size:11.5px;color:#f5f5f5}
.db-del{background:transparent;border:1px solid rgba(255,120,120,.5);color:#ff9c9c;border-radius:7px;font-family:inherit;font-size:9.5px;font-weight:700;padding:5px 11px;cursor:pointer;flex-shrink:0}
.db-del:hover{background:rgba(255,120,120,.12)}
.db-add{background:transparent;border:1px dashed rgba(255,255,255,.35);color:#f5f5f5;border-radius:10px;font-family:inherit;font-size:11px;font-weight:700;padding:11px;cursor:pointer}
.db-add:hover{background:rgba(255,255,255,.07)}
.db-hint{font-size:10px;line-height:1.6;color:#858585;margin:0}
.db-status{font-size:11px;color:#f5f5f5;background:#1b1c1b;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:10px 12px;margin:16px 0 0;word-break:break-all;text-align:left}
.db-actions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:16px}
.db-btn{border-radius:9px;font-family:inherit;font-size:11px;font-weight:700;padding:10px 18px;cursor:pointer}
.db-btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.3);color:#f5f5f5}
.db-btn.ghost:hover{background:rgba(255,255,255,.1)}
.db-btn.primary{background:#eeeeee;border:1px solid #eeeeee;color:#1b1c1b}
.db-btn.primary:hover{background:#ffffff}
.db-btn:disabled{opacity:.6;cursor:wait}
.p-copy{font-size:10px;color:#707070;margin:16px 0 0}
@media(max-width:640px){.db-row,.db-row3{grid-template-columns:1fr}.profile-card{padding:26px 16px 18px}}
@media(prefers-reduced-motion:reduce){*{transition-duration:.01ms!important}}
</style>
