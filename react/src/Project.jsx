import { useMemo, useState } from "react";
import portfolio from "./data/portfolio.json";

const FILTERS = ["Semua", "Web", "Mobile", "Desktop", "IoT", "AI"];

const PROJECTS = portfolio.projects;

function Nav({ active, onNavigate }) {
  const go = (t) => (e) => { e.preventDefault(); onNavigate(t); };
  const item = (tab, label, path, wide) => (
    <button className={`p-nav-item${wide ? " wide" : ""} ${active === tab ? "active" : ""}`} onClick={() => onNavigate(tab)} aria-label={label}>
      <svg viewBox="0 0 24 24"><path d={path} fill="currentColor" /></svg>
      {wide && <span>{label}</span>}
    </button>
  );
  return (
    <nav className="p-nav" aria-label="Navigasi utama">
      {item("home", "Beranda", "M12 3 3 10.5V21h6v-6h6v6h6V10.5L12 3Z")}
      <button className={`p-nav-item ${active === "about" ? "active" : ""}`} onClick={() => onNavigate("about")} aria-label="Tentang">
        <svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0v1H5v-1Z" fill="currentColor" /></svg>
      </button>
      {item("project", "Project", "M4 5h6l2 2h8v11H4V5Zm0 5h16v2H4v-2Z", true)}
      {item("achievement", "Achievement", "M6 3h12v5a6 6 0 0 1-4 5.65V16h3v2H7v-2h3v-2.35A6 6 0 0 1 6 8V3Zm-2 2H2v2a4 4 0 0 0 4 4V9H4V5Zm16 0h-2v4h-2v2a4 4 0 0 0 4-4V5ZM9 20h6v2H9v-2Z")}
      <button className={`p-nav-item ${active === "certification" ? "active" : ""}`} onClick={() => onNavigate("certification")} aria-label="Certification">
        <svg viewBox="0 0 24 24"><path d="M4 4h7v16H4V4Zm11 0h5v16h-5V4ZM12 4v16" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>
      </button>
    </nav>
  );
}

export default function Project({ active = "project", onNavigate = () => {} }) {
  const [filter, setFilter] = useState("Semua");
  const shown = useMemo(() => (filter === "Semua" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter)), [filter]);

  return (
    <>
      <style>{`
        .profile-page{min-height:100vh;min-height:100dvh;width:100%;background-color:#191a19;background-image:radial-gradient(circle at 50% 35%,#303130 0%,#292a29 30%,#222322 62%,#181918 100%);color:#f5f5f5;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:flex;flex-direction:column;align-items:center;padding:28px 14px 110px;box-sizing:border-box}
        .profile-card{position:relative;width:min(96vw,1200px);background-color:rgba(34,35,34,.72);background-image:linear-gradient(rgba(150,150,150,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(150,150,150,.13) 1px,transparent 1px);background-size:16px 16px;border:1px solid rgba(255,255,255,.22);border-radius:16px;padding:34px 30px 22px;box-sizing:border-box;text-align:center}
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
        .x-sub{font-size:11px;line-height:1.7;color:#9b9b9b;max-width:520px;margin:0 auto 16px}
        .x-filters{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:18px}
        .x-chip{background:transparent;color:#d2d2d2;border:1px solid rgba(255,255,255,.25);border-radius:999px;font-family:inherit;font-size:10.5px;font-weight:700;padding:7px 16px;cursor:pointer;transition:all .2s}
        .x-chip.on{background:#f5f5f5;color:#1b1c1b;border-color:#f5f5f5}
        .x-chip:hover{border-color:#f5f5f5;color:#f5f5f5}.x-chip.on:hover{color:#1b1c1b}
        .pj-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;text-align:left}
        .pj-card{background:#1b1c1b;border:1px solid rgba(255,255,255,.14);border-radius:12px;overflow:hidden;transition:transform .2s,border-color .2s}
        .pj-card:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.35)}
        .pj-cover{position:relative;height:110px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.85)}
        .pj-icon{width:38px;height:38px}
        .pj-status{position:absolute;top:8px;right:8px;font-size:9px;font-weight:700;background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.3);padding:3px 9px;border-radius:999px;color:#f5f5f5}
        .pj-body{padding:12px 13px 13px}
        .pj-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
        .pj-top h3{font-size:12.5px;font-weight:800;color:#f5f5f5;margin:0}
        .pj-year{font-size:9.5px;color:#858585}
        .pj-desc{font-size:10.5px;line-height:1.65;color:#9b9b9b;margin:7px 0 10px}
        .p-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
        .p-tags span{font-size:9px;color:#d2d2d2;border:1px solid rgba(255,255,255,.22);border-radius:5px;padding:3px 8px;background:rgba(255,255,255,.03)}
        .pj-links{display:flex;gap:12px}
        .pj-links a{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:700;color:#f5f5f5;text-decoration:none}
        .pj-links a:hover{text-decoration:underline}
        .pj-links svg{width:14px;height:14px}
        .x-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}
        .x-stats div{background:#1b1c1b;border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:12px}
        .x-stats b{display:block;font-size:17px;color:#f5f5f5}
        .x-stats span{font-size:9.5px;color:#858585}
        .p-copy{font-size:10px;color:#707070;margin:16px 0 0}
        .p-nav{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;align-items:center;gap:4px;background:rgba(34,35,34,.82);border:1px solid rgba(255,255,255,.22);border-radius:999px;padding:6px;z-index:60;backdrop-filter:blur(12px)}
        .p-nav-item{border:none;background:transparent;color:#d2d2d2;cursor:pointer;min-width:44px;min-height:44px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:7px;font-family:inherit;font-size:11px;font-weight:700;padding:8px 10px;transition:background .2s,color .2s}
        .p-nav-item svg{width:17px;height:17px}
        .p-nav-item.wide{padding:8px 16px}
        .p-nav-item.active{background:rgba(255,255,255,.17);color:#f5f5f5}
        .p-nav-item:hover{background:rgba(255,255,255,.1);color:#f5f5f5}
        @media(max-width:1024px){.pj-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:560px){.profile-card{padding:26px 16px 18px}.pj-grid{grid-template-columns:1fr}.x-title{font-size:18px}}
      `}</style>

      <div className="profile-page">
        <div className="profile-card">
          <span className="pcorner tl" /><span className="pcorner tr" />
          <span className="pcorner bl" /><span className="pcorner br" />

          <p className="x-eyebrow">PORTOFOLIO</p>
          <h1 className="x-title">Project Pilihan</h1>
          <p className="x-sub">Koleksi kerja end-to-end: web, mobile, dan AI. Klik filter untuk menjelajah.</p>

          <div className="x-filters">
            {FILTERS.map((f) => (
              <button key={f} className={`x-chip ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>

          <div className="pj-grid">
            {shown.map((p) => (
              <article key={p.title} className="pj-card">
                <div className="pj-cover" style={{ background: p.grad }}>
                  <svg viewBox="0 0 24 24" className="pj-icon">
                    <path d={p.icon} stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="pj-status">{p.status}</span>
                </div>
                <div className="pj-body">
                  <div className="pj-top"><h3>{p.title}</h3><span className="pj-year">{p.year}</span></div>
                  <p className="pj-desc">{p.desc}</p>
                  <div className="p-tags">{p.tags.map((t) => (<span key={t}>{t}</span>))}</div>
                  <div className="pj-links">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.8 9.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.4 4.7-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z" fill="currentColor" /></svg>
                      Source
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()}>Live <span aria-hidden="true">↗</span></a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="x-stats">
            <div><b>8+</b><span>Project</span></div>
            <div><b>3</b><span>Bidang</span></div>
            <div><b>9K+</b><span>Kontribusi</span></div>
          </div>

          <p className="p-copy">© 2026 SAIFUL RIZAL</p>
        </div>

        <Nav active={active} onNavigate={onNavigate} />
      </div>
    </>
  );
}
