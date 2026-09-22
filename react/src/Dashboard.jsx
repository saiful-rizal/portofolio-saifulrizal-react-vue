import { useState } from "react";
import portfolio from "./data/portfolio.json";

const clone = (o) => JSON.parse(JSON.stringify(o));
const TABS = [
  ["profile", "Profil"],
  ["project", "Project"],
  ["exp", "Pengalaman"],
  ["ach", "Achievement"],
  ["cert", "Sertifikasi"],
  ["github", "GitHub"],
];

const BLANK = {
  project: { title: "Project Baru", desc: "", tags: [], cat: "Web", year: "2026", status: "Demo", grad: "linear-gradient(135deg,#303130,#1b1c1b)", icon: "M4 5h16v14H4z M4 9h16" },
  exp: { logo: "NEW", title: "", company: "", desc: "", resp: [""], tags: [], date: "", badge: "" },
  ach: { year: "2026", title: "", org: "", desc: "", tag: "" },
  cert: { init: "", title: "", issuer: "", year: "2026", id: "", cat: "Web", grad: "linear-gradient(135deg,#303130,#1b1c1b)" },
  stat: { n: "", l: "" },
};

const CFG_KEY = "portfolio-github-cfg-react";
const DEFAULT_CFG = {
  owner: "saiful-rizal",
  repo: "portofolio-saifulrizal-react-vue",
  path: "react/src/data/portfolio.json",
  branch: "main",
  token: "",
};

function loadCfg() {
  try {
    const saved = JSON.parse(localStorage.getItem(CFG_KEY) || "null");
    if (saved) return { ...DEFAULT_CFG, ...saved };
  } catch (e) {}
  return { ...DEFAULT_CFG };
}

const splitLines = (v) => v.split("\n");
const splitComma = (v) => v.split(",").map((s) => s.trim()).filter(Boolean);

function Field({ label, children }) {
  return (
    <label className="db-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function Dashboard({ onNavigate = () => {} }) {
  const [draft, setDraft] = useState(() => clone(portfolio));
  const [tab, setTab] = useState("profile");
  const [cfg, setCfg] = useState(loadCfg);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (fn) => setDraft((d) => { const n = clone(d); fn(n); return n; });
  const setCfgF = (k) => (e) => {
    const v = e.target.value;
    setCfg((c) => { const n = { ...c, [k]: v }; try { localStorage.setItem(CFG_KEY, JSON.stringify(n)); } catch (err) {} return n; });
  };
  const addItem = (get, blank) => set((d) => get(d).push(clone(blank)));
  const removeItem = (get, i) => set((d) => get(d).splice(i, 1));

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio.json";
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus("File portfolio.json diunduh.");
  };

  const resetDraft = () => {
    setDraft(clone(portfolio));
    setStatus("Draf dikembalikan ke data awal.");
  };

  const saveGitHub = async () => {
    if (!cfg.token) {
      setStatus("Isi token GitHub dulu di tab GitHub.");
      setTab("github");
      return;
    }
    setSaving(true);
    setStatus("Menghubungkan ke GitHub...");
    try {
      try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); } catch (e) {}
      const base = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${cfg.path}`;
      const headers = { Authorization: `Bearer ${cfg.token}`, Accept: "application/vnd.github+json" };
      const getRes = await fetch(`${base}?ref=${encodeURIComponent(cfg.branch)}`, { headers });
      if (!getRes.ok) throw new Error("Gagal membaca file di GitHub (" + getRes.status + "). Cek owner/repo/path/branch.");
      const { sha } = await getRes.json();
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(draft, null, 2))));
      const putRes = await fetch(base, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Update portfolio via dashboard", content, sha, branch: cfg.branch }),
      });
      const out = await putRes.json();
      if (!putRes.ok) throw new Error(out.message || "Gagal menyimpan.");
      setStatus("Tersimpan di GitHub. " + (out.content && out.content.html_url ? out.content.html_url : ""));
    } catch (e) {
      setStatus("Error: " + e.message);
    }
    setSaving(false);
  };

  const go = (t) => () => onNavigate(t);

  return (
    <>
      <style>{`
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
      `}</style>

      <div className="profile-page">
        <div className="profile-card db-wide">
          <span className="pcorner tl" /><span className="pcorner tr" />
          <span className="pcorner bl" /><span className="pcorner br" />

          <p className="x-eyebrow">ADMIN</p>
          <h1 className="x-title">Dashboard Data</h1>
          <p className="x-sub">Kelola semua konten portfolio. Simpan ke <b>portfolio.json</b> di GitHub atau unduh manual.</p>

          <div className="x-filters">
            {TABS.map(([key, label]) => (
              <button key={key} className={`x-chip ${tab === key ? "on" : ""}`} onClick={() => setTab(key)}>{label}</button>
            ))}
          </div>

          {tab === "profile" && (
            <div className="db-form">
              <Field label="Nama lengkap"><input value={draft.profile.name} onChange={(e) => set((d) => { d.profile.name = e.target.value; })} /></Field>
              <div className="db-row">
                <Field label="Nama pendek (hero)"><input value={draft.profile.shortName} onChange={(e) => set((d) => { d.profile.shortName = e.target.value; })} /></Field>
                <Field label="Peran"><input value={draft.profile.role} onChange={(e) => set((d) => { d.profile.role = e.target.value; })} /></Field>
              </div>
              <div className="db-row">
                <Field label="Sapaan"><input value={draft.profile.hello} onChange={(e) => set((d) => { d.profile.hello = e.target.value; })} /></Field>
                <Field label="Kategori"><input value={draft.profile.title} onChange={(e) => set((d) => { d.profile.title = e.target.value; })} /></Field>
              </div>
              <Field label="Bio"><textarea value={draft.profile.bio} rows={6} onChange={(e) => set((d) => { d.profile.bio = e.target.value; })} /></Field>
              <Field label="URL foto"><input value={draft.profile.photo} onChange={(e) => set((d) => { d.profile.photo = e.target.value; })} /></Field>
              <div className="db-row">
                <Field label="Status"><input value={draft.profile.status} onChange={(e) => set((d) => { d.profile.status = e.target.value; })} /></Field>
                <Field label="Total kontribusi"><input value={draft.profile.githubTotal} type="number" onChange={(e) => set((d) => { d.profile.githubTotal = Number(e.target.value); })} /></Field>
              </div>
              <div className="db-row3">
                <Field label="Instagram"><input value={draft.profile.socials.instagram} onChange={(e) => set((d) => { d.profile.socials.instagram = e.target.value; })} /></Field>
                <Field label="GitHub"><input value={draft.profile.socials.github} onChange={(e) => set((d) => { d.profile.socials.github = e.target.value; })} /></Field>
                <Field label="LinkedIn"><input value={draft.profile.socials.linkedin} onChange={(e) => set((d) => { d.profile.socials.linkedin = e.target.value; })} /></Field>
              </div>
            </div>
          )}

          {tab === "project" && (
            <div className="db-list">
              {draft.projects.map((p, i) => (
                <div key={i} className="db-item">
                  <div className="db-item-head"><b>#{i + 1} {p.title}</b><button className="db-del" onClick={() => removeItem((d) => d.projects, i)}>Hapus</button></div>
                  <div className="db-row">
                    <Field label="Judul"><input value={p.title} onChange={(e) => set((d) => { d.projects[i].title = e.target.value; })} /></Field>
                    <Field label="Tahun"><input value={p.year} onChange={(e) => set((d) => { d.projects[i].year = e.target.value; })} /></Field>
                  </div>
                  <Field label="Deskripsi"><textarea value={p.desc} rows={2} onChange={(e) => set((d) => { d.projects[i].desc = e.target.value; })} /></Field>
                  <div className="db-row3">
                    <Field label="Kategori">
                      <select value={p.cat} onChange={(e) => set((d) => { d.projects[i].cat = e.target.value; })}>
                        <option>Web</option><option>Mobile</option><option>AI</option>
                      </select>
                    </Field>
                    <Field label="Status">
                      <select value={p.status} onChange={(e) => set((d) => { d.projects[i].status = e.target.value; })}>
                        <option>Live</option><option>Demo</option><option>Source</option>
                      </select>
                    </Field>
                    <Field label="Tags (koma)"><input value={p.tags.join(", ")} onChange={(e) => set((d) => { d.projects[i].tags = splitComma(e.target.value); })} /></Field>
                  </div>
                  <div className="db-row">
                    <Field label="Gradient"><input value={p.grad} onChange={(e) => set((d) => { d.projects[i].grad = e.target.value; })} /></Field>
                    <Field label="Icon (path SVG)"><input value={p.icon} onChange={(e) => set((d) => { d.projects[i].icon = e.target.value; })} /></Field>
                  </div>
                </div>
              ))}
              <button className="db-add" onClick={() => addItem((d) => d.projects, BLANK.project)}>+ Tambah Project</button>
            </div>
          )}

          {tab === "exp" && (
            <div className="db-list">
              {draft.experiences.map((job, i) => (
                <div key={i} className="db-item">
                  <div className="db-item-head"><b>#{i + 1} {job.title}</b><button className="db-del" onClick={() => removeItem((d) => d.experiences, i)}>Hapus</button></div>
                  <div className="db-row">
                    <Field label="Posisi"><input value={job.title} onChange={(e) => set((d) => { d.experiences[i].title = e.target.value; })} /></Field>
                    <Field label="Logo (teks)"><input value={job.logo} onChange={(e) => set((d) => { d.experiences[i].logo = e.target.value; })} /></Field>
                  </div>
                  <Field label="Perusahaan"><input value={job.company} onChange={(e) => set((d) => { d.experiences[i].company = e.target.value; })} /></Field>
                  <Field label="Deskripsi"><textarea value={job.desc} rows={2} onChange={(e) => set((d) => { d.experiences[i].desc = e.target.value; })} /></Field>
                  <Field label="Tanggung jawab (1 per baris)"><textarea value={job.resp.join("\n")} rows={3} onChange={(e) => set((d) => { d.experiences[i].resp = splitLines(e.target.value); })} /></Field>
                  <Field label="Tags (koma)"><input value={job.tags.join(", ")} onChange={(e) => set((d) => { d.experiences[i].tags = splitComma(e.target.value); })} /></Field>
                  <div className="db-row">
                    <Field label="Periode"><input value={job.date} onChange={(e) => set((d) => { d.experiences[i].date = e.target.value; })} /></Field>
                    <Field label="Badge"><input value={job.badge} onChange={(e) => set((d) => { d.experiences[i].badge = e.target.value; })} /></Field>
                  </div>
                </div>
              ))}
              <button className="db-add" onClick={() => addItem((d) => d.experiences, BLANK.exp)}>+ Tambah Pengalaman</button>
            </div>
          )}

          {tab === "ach" && (
            <div className="db-list">
              <p className="db-label">Statistik</p>
              {draft.achievements.stats.map((s, i) => (
                <div key={i} className="db-row">
                  <Field label="Angka"><input value={s.n} onChange={(e) => set((d) => { d.achievements.stats[i].n = e.target.value; })} /></Field>
                  <Field label="Label"><input value={s.l} onChange={(e) => set((d) => { d.achievements.stats[i].l = e.target.value; })} /></Field>
                  <button className="db-del" onClick={() => removeItem((d) => d.achievements.stats, i)}>Hapus</button>
                </div>
              ))}
              <button className="db-add" onClick={() => addItem((d) => d.achievements.stats, BLANK.stat)}>+ Tambah Statistik</button>
              <p className="db-label">Daftar achievement</p>
              {draft.achievements.items.map((a, i) => (
                <div key={i} className="db-item">
                  <div className="db-item-head"><b>#{i + 1} {a.title}</b><button className="db-del" onClick={() => removeItem((d) => d.achievements.items, i)}>Hapus</button></div>
                  <div className="db-row">
                    <Field label="Tahun"><input value={a.year} onChange={(e) => set((d) => { d.achievements.items[i].year = e.target.value; })} /></Field>
                    <Field label="Tag"><input value={a.tag} onChange={(e) => set((d) => { d.achievements.items[i].tag = e.target.value; })} /></Field>
                  </div>
                  <Field label="Judul"><input value={a.title} onChange={(e) => set((d) => { d.achievements.items[i].title = e.target.value; })} /></Field>
                  <Field label="Organisasi"><input value={a.org} onChange={(e) => set((d) => { d.achievements.items[i].org = e.target.value; })} /></Field>
                  <Field label="Deskripsi"><textarea value={a.desc} rows={2} onChange={(e) => set((d) => { d.achievements.items[i].desc = e.target.value; })} /></Field>
                </div>
              ))}
              <button className="db-add" onClick={() => addItem((d) => d.achievements.items, BLANK.ach)}>+ Tambah Achievement</button>
            </div>
          )}

          {tab === "cert" && (
            <div className="db-list">
              {draft.certifications.map((c, i) => (
                <div key={i} className="db-item">
                  <div className="db-item-head"><b>#{i + 1} {c.title}</b><button className="db-del" onClick={() => removeItem((d) => d.certifications, i)}>Hapus</button></div>
                  <div className="db-row">
                    <Field label="Judul"><input value={c.title} onChange={(e) => set((d) => { d.certifications[i].title = e.target.value; })} /></Field>
                    <Field label="Inisial logo"><input value={c.init} onChange={(e) => set((d) => { d.certifications[i].init = e.target.value; })} /></Field>
                  </div>
                  <div className="db-row">
                    <Field label="Penerbit"><input value={c.issuer} onChange={(e) => set((d) => { d.certifications[i].issuer = e.target.value; })} /></Field>
                    <Field label="Tahun"><input value={c.year} onChange={(e) => set((d) => { d.certifications[i].year = e.target.value; })} /></Field>
                  </div>
                  <div className="db-row3">
                    <Field label="ID Kredensial"><input value={c.id} onChange={(e) => set((d) => { d.certifications[i].id = e.target.value; })} /></Field>
                    <Field label="Kategori">
                      <select value={c.cat} onChange={(e) => set((d) => { d.certifications[i].cat = e.target.value; })}>
                        <option>Web</option><option>Mobile</option><option>Cloud</option>
                      </select>
                    </Field>
                    <Field label="Gradient"><input value={c.grad} onChange={(e) => set((d) => { d.certifications[i].grad = e.target.value; })} /></Field>
                  </div>
                </div>
              ))}
              <button className="db-add" onClick={() => addItem((d) => d.certifications, BLANK.cert)}>+ Tambah Sertifikasi</button>
            </div>
          )}

          {tab === "github" && (
            <div className="db-form">
              <div className="db-row">
                <Field label="Owner"><input value={cfg.owner} onChange={setCfgF("owner")} /></Field>
                <Field label="Repo"><input value={cfg.repo} onChange={setCfgF("repo")} /></Field>
              </div>
              <div className="db-row">
                <Field label="Path file JSON"><input value={cfg.path} onChange={setCfgF("path")} /></Field>
                <Field label="Branch"><input value={cfg.branch} onChange={setCfgF("branch")} /></Field>
              </div>
              <Field label="Token GitHub (classic, scope repo)"><input value={cfg.token} type="password" placeholder="ghp_..." onChange={setCfgF("token")} /></Field>
              <p className="db-hint">Token tersimpan di localStorage browser ini saja. Buat di GitHub → Settings → Developer settings → Personal access tokens.</p>
            </div>
          )}

          {status && <p className="db-status">{status}</p>}

          <div className="db-actions">
            <button className="db-btn ghost" onClick={go("home")}>← Kembali</button>
            <button className="db-btn ghost" onClick={resetDraft}>Reset</button>
            <button className="db-btn ghost" onClick={downloadJSON}>Unduh JSON</button>
            <button className="db-btn primary" disabled={saving} onClick={saveGitHub}>
              {saving ? "Menyimpan..." : "Simpan ke GitHub"}
            </button>
          </div>

          <p className="p-copy">© 2026 {draft.profile.name.toUpperCase()}</p>
        </div>
      </div>
    </>
  );
}
