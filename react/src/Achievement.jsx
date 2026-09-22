const STATS = portfolio.achievements.stats;

const ITEMS = portfolio.achievements.items;

import portfolio from "./data/portfolio.json";

export default function Achievement({ active = "achievement", onNavigate = () => {} }) {
  const go = (t) => () => onNavigate(t);
  return (
    <>
      <style>{`
        .profile-page{min-height:100vh;min-height:100dvh;width:100%;background-color:#191a19;background-image:radial-gradient(circle at 50% 35%,#303130 0%,#292a29 30%,#222322 62%,#181918 100%);color:#f5f5f5;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:flex;flex-direction:column;align-items:center;padding:28px 14px 110px;box-sizing:border-box}
        .profile-card{position:relative;width:min(94vw,740px);background-color:rgba(34,35,34,.72);background-image:linear-gradient(rgba(150,150,150,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(150,150,150,.13) 1px,transparent 1px);background-size:16px 16px;border:1px solid rgba(255,255,255,.22);border-radius:16px;padding:34px 30px 22px;box-sizing:border-box;text-align:center}
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
        .x-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px}
        .x-stats div{background:#1b1c1b;border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:12px}
        .x-stats b{display:block;font-size:17px;color:#f5f5f5}
        .x-stats span{font-size:9.5px;color:#858585}
        .ac-timeline{display:flex;flex-direction:column;text-align:left;position:relative;margin-left:8px;padding-left:22px;border-left:1px solid rgba(255,255,255,.22)}
        .ac-item{position:relative;padding:0 0 14px}
        .ac-dot{position:absolute;left:-28px;top:14px;width:11px;height:11px;border-radius:50%;background:#f5f5f5;border:3px solid #707070;box-sizing:border-box}
        .ac-card{background:#1b1c1b;border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:13px 14px;transition:border-color .2s}
        .ac-card:hover{border-color:rgba(255,255,255,.35)}
        .ac-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
        .ac-year{font-size:10px;font-weight:800;color:#1b1c1b;background:#f5f5f5;border-radius:5px;padding:2px 9px}
        .ac-tag{font-size:9px;color:#bbb;border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:2px 9px}
        .ac-card h3{font-size:12.5px;font-weight:800;color:#f5f5f5;margin:0 0 2px}
        .ac-org{font-size:10.5px;color:#d2d2d2;margin:0 0 6px}
        .ac-desc{font-size:10.5px;line-height:1.65;color:#9b9b9b;margin:0}
        .p-copy{font-size:10px;color:#707070;margin:16px 0 0}
        .p-nav{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;align-items:center;gap:4px;background:rgba(34,35,34,.82);border:1px solid rgba(255,255,255,.22);border-radius:999px;padding:6px;z-index:60;backdrop-filter:blur(12px)}
        .p-nav-item{border:none;background:transparent;color:#d2d2d2;cursor:pointer;min-width:44px;min-height:44px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:7px;font-family:inherit;font-size:11px;font-weight:700;padding:8px 10px;transition:background .2s,color .2s}
        .p-nav-item svg{width:17px;height:17px}
        .p-nav-item.wide{padding:8px 16px}
        .p-nav-item.active{background:rgba(255,255,255,.17);color:#f5f5f5}
        .p-nav-item:hover{background:rgba(255,255,255,.1);color:#f5f5f5}
        @media(max-width:560px){.profile-card{padding:26px 16px 18px}.x-title{font-size:18px}}
      `}</style>

      <div className="profile-page">
        <div className="profile-card">
          <span className="pcorner tl" /><span className="pcorner tr" />
          <span className="pcorner bl" /><span className="pcorner br" />

          <p className="x-eyebrow">REKAM JEJAK</p>
          <h1 className="x-title">Achievement</h1>
          <p className="x-sub">Penghargaan, pendanaan, dan kompetisi yang memvalidasi kualitas kerja saya.</p>

          <div className="x-stats">
            {STATS.map((s) => (<div key={s.l}><b>{s.n}</b><span>{s.l}</span></div>))}
          </div>

          <div className="ac-timeline">
            {ITEMS.map((a) => (
              <div key={a.title} className="ac-item">
                <span className="ac-dot" />
                <div className="ac-card">
                  <div className="ac-top">
                    <span className="ac-year">{a.year}</span>
                    <span className="ac-tag">{a.tag}</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p className="ac-org">{a.org}</p>
                  <p className="ac-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="p-copy">© 2026 YANUAR ARDHIKA, S.Tr.Kom.</p>
        </div>

        <nav className="p-nav" aria-label="Navigasi utama">
          <button className={`p-nav-item ${active === "home" ? "active" : ""}`} onClick={go("home")} aria-label="Beranda">
            <svg viewBox="0 0 24 24"><path d="M12 3 3 10.5V21h6v-6h6v6h6V10.5L12 3Z" fill="currentColor" /></svg>
          </button>
          <button className={`p-nav-item ${active === "about" ? "active" : ""}`} onClick={go("about")} aria-label="Tentang">
            <svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0v1H5v-1Z" fill="currentColor" /></svg>
          </button>
          <button className={`p-nav-item ${active === "project" ? "active" : ""}`} onClick={go("project")} aria-label="Project">
            <svg viewBox="0 0 24 24"><path d="M4 5h6l2 2h8v11H4V5Zm0 5h16v2H4v-2Z" fill="currentColor" /></svg>
          </button>
          <button className={`p-nav-item wide ${active === "achievement" ? "active" : ""}`} onClick={go("achievement")}>
            <svg viewBox="0 0 24 24"><path d="M6 3h12v5a6 6 0 0 1-4 5.65V16h3v2H7v-2h3v-2.35A6 6 0 0 1 6 8V3Zm-2 2H2v2a4 4 0 0 0 4 4V9H4V5Zm16 0h-2v4h-2v2a4 4 0 0 0 4-4V5ZM9 20h6v2H9v-2Z" fill="currentColor" /></svg>
            <span>Achievement</span>
          </button>
          <button className={`p-nav-item ${active === "certification" ? "active" : ""}`} onClick={go("certification")} aria-label="Certification">
            <svg viewBox="0 0 24 24"><path d="M4 4h7v16H4V4Zm11 0h5v16h-5V4ZM12 4v16" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>
          </button>
        </nav>
      </div>
    </>
  );
}
