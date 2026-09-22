import { useMemo, useState } from "react";
import portfolio from "./data/portfolio.json";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des", "Jan"];
const DAY_LABELS = ["Sen", "", "Rab", "", "Jum", "", ""];
const WEEKS = 53;
const LEVELS = ["lv0", "lv1", "lv2", "lv3", "lv4"];

function levelFor(w, d) {
  if (w >= 39) return 0;
  if (w >= 36) return d % 3 === 0 ? 1 : 0;
  const seed = (w * 7 + d * 13 + w * d) % 10;
  if (w < 8) return seed < 5 ? 4 : seed < 7 ? 3 : 2;
  if (w < 22) return seed < 6 ? 4 : seed < 8 ? 3 : 1;
  if (w < 32) return seed < 5 ? 4 : seed < 7 ? 2 : 1;
  return seed < 4 ? 3 : seed < 6 ? 2 : 1;
}

export default function Profile({ active = "about", onNavigate = () => {} }) {
  const experiences = portfolio.experiences;
  const profile = portfolio.profile;
  const [year, setYear] = useState("2026");

  const grid = useMemo(() => {
    const cols = [];
    for (let w = 0; w < WEEKS; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) days.push(levelFor(w, d));
      cols.push(days);
    }
    return cols;
  }, []);

  const go = (tab) => () => onNavigate(tab);

  return (
    <>
      <style>{`
        .profile-page {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          background-color: #191a19;
          background-image:
            radial-gradient(circle at 50% 35%, #303130 0%, #292a29 30%, #222322 62%, #181918 100%);
          color: #f5f5f5;
          font-family: Arial, Helvetica, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 14px 120px;
          box-sizing: border-box;
        }

        .profile-card {
          position: relative;
          width: min(96vw, 980px);
          background-color: rgba(34,35,34,.72);
          background-image:
            linear-gradient(rgba(150,150,150,.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(150,150,150,.13) 1px, transparent 1px);
          background-size: 16px 16px;
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 16px;
          padding: 40px 34px 28px;
          box-sizing: border-box;
          text-align: center;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35);
          animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .pcorner { position: absolute; width: 18px; height: 18px; opacity: 0.7; }
        .pcorner::before, .pcorner::after { content: ""; position: absolute; background: #b0b0b0; }
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
          background: conic-gradient(from 0deg, #eeeeee, #707070, #353635, #eeeeee);
          animation: ringRotate 6s linear infinite;
        }
        @keyframes ringRotate {
          to { background: conic-gradient(from 360deg, #eeeeee, #707070, #353635, #eeeeee); }
        }
        .p-photo-ring::after {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #eeeeee, #707070, #353635, #eeeeee);
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
          background: #242524; display: block;
          border: 3px solid #1b1c1b;
        }

        .p-name {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 22px; font-weight: 700; color: #f5f5f5;
          margin: 0 0 6px; line-height: 1.3;
          letter-spacing: -0.3px;
        }
        .p-title-line {
          font-size: 11px; font-weight: 500;
          color: #9b9b9b; letter-spacing: 2px;
          text-transform: uppercase; margin: 0 0 16px;
        }
        .p-bio {
          font-size: 11.5px; line-height: 1.85; color: #9b9b9b;
          max-width: 800px; margin: 0 auto 22px;
        }

        .p-hire {
          display: inline-flex; align-items: center; gap: 10px;
          background: #eeeeee;
          color: #1b1c1b; border: none; border-radius: 999px;
          font-family: inherit; font-size: 11.5px; font-weight: 700;
          padding: 12px 28px; cursor: pointer; position: relative;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
          box-shadow: 0 10px 35px rgba(255, 255, 255, 0.18), 0 0 25px rgba(255, 255, 255, 0.1);
        }
        .p-hire:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 35px rgba(255, 255, 255, 0.18), 0 0 25px rgba(255, 255, 255, 0.1);
        }
        .p-hire:active { transform: translateY(0) scale(0.98); }
        .p-hire-icon { width: 16px; height: 16px; }

        .p-divider {
          height: 1px; border: none; margin: 30px 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%);
        }

        .p-git-head { display: flex; align-items: center; justify-content: space-between; margin: 0 0 12px; gap: 10px; }
        .p-git-left { display: flex; align-items: center; gap: 8px; }
        .p-git-title { font-size: 11.5px; font-weight: 700; color: #f5f5f5; }
        .p-year {
          background: #242524; color: #f5f5f5; border: 1px solid rgba(255,255,255,0.25);
          border-radius: 6px; font-family: inherit; font-size: 10.5px; padding: 3px 8px;
          cursor: pointer; transition: border-color 0.2s;
        }
        .p-year:focus { border-color: rgba(255,255,255,0.5); outline: none; }
        .p-git-total { font-size: 10.5px; color: #858585; }
        .p-git-total b { color: #f5f5f5; font-weight: 700; }
        .p-git-scroll { overflow-x: auto; padding-bottom: 6px; }
        .p-git-scroll::-webkit-scrollbar { height: 4px; }
        .p-git-scroll::-webkit-scrollbar-track { background: #1b1c1b; border-radius: 2px; }
        .p-git-scroll::-webkit-scrollbar-thumb { background: #707070; border-radius: 2px; }
        .p-git { min-width: 620px; text-align: left; }
        .p-git-months { display: grid; grid-template-columns: 34px repeat(53, 1fr); font-size: 8.5px; color: #858585; margin-bottom: 4px; }
        .p-git-months span:first-child { grid-column: 2; }
        .p-git-months span { overflow: visible; white-space: nowrap; }
        .p-git-body { display: grid; grid-template-columns: 34px 1fr; gap: 4px; }
        .p-git-days { display: grid; grid-template-rows: repeat(7, 11px); gap: 3px; font-size: 8.5px; color: #858585; align-items: center; }
        .p-git-grid { display: grid; grid-template-columns: repeat(53, 1fr); gap: 3px; }
        .p-week { display: grid; grid-template-rows: repeat(7, 11px); gap: 3px; }
        .p-cell { width: 11px; height: 11px; border-radius: 2px; display: inline-block; transition: transform 0.15s ease; }
        .p-cell:hover { transform: scale(1.4); z-index: 2; }
        .p-cell.lv0 { background: #2b2c2b; }
        .p-cell.lv1 { background: #4c4f4c; }
        .p-cell.lv2 { background: #848784; }
        .p-cell.lv3 { background: #c9cbc9; }
        .p-cell.lv4 { background: #eeeeee; }
        .p-cell.sm { width: 10px; height: 10px; }
        .p-git-legend { display: flex; align-items: center; justify-content: flex-end; gap: 5px; font-size: 9px; color: #858585; margin-top: 8px; }

        .p-sec {
          text-align: left; font-size: 12px; font-weight: 700;
          color: #f5f5f5; margin: 28px 0 14px;
          letter-spacing: 1.5px; text-transform: uppercase;
        }
        .p-sec::after {
          content: ""; display: block; width: 32px; height: 2px;
          background: linear-gradient(90deg, #b0b0b0, transparent);
          margin-top: 6px; border-radius: 1px;
        }

        .p-exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .p-exp {
          display: flex; gap: 16px; text-align: left;
          background: #1b1c1b;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 12px; padding: 20px;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          animation: expIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both;
        }
        @keyframes expIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .p-exp:hover {
          border-color: rgba(255,255,255,.35);
          box-shadow: 0 8px 24px rgba(0,0,0,.35);
          transform: translateY(-2px);
        }
        .p-exp-logo {
          flex-shrink: 0; width: 60px; height: 60px; border-radius: 12px;
          background: #242524;
          border: 1px solid rgba(255,255,255,.22);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #f5f5f5;
        }
        .p-exp-logo .sup { font-size: 7px; vertical-align: super; }
        .p-exp-body { flex: 1; min-width: 0; }
        .p-exp-title { font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color: #f5f5f5; margin: 0 0 4px; }
        .p-exp-sub { font-size: 10.5px; color: #d2d2d2; margin: 0 0 10px; }
        .p-exp-desc { font-size: 10.5px; line-height: 1.7; color: #9b9b9b; margin: 0 0 14px; }
        .p-exp-resp { font-size: 9.5px; font-weight: 700; color: #d2d2d2; margin: 0 0 7px; letter-spacing: 1px; }
        .p-exp-list { margin: 0 0 14px; padding: 0; list-style: none; font-size: 10.5px; color: #9b9b9b; line-height: 1.8; }
        .p-exp-list li { position: relative; padding-left: 14px; }
        .p-exp-list li::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #b0b0b0; opacity: 0.5; }
        .p-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .p-tags span {
          font-size: 9px; color: #d2d2d2; border: 1px solid rgba(255,255,255,.22);
          border-radius: 6px; padding: 4px 10px;
          background: rgba(255,255,255,.03);
          transition: background 0.2s, border-color 0.2s;
        }
        .p-tags span:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.35); }
        .p-exp-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
        .p-date { font-size: 10px; color: #858585; }
        .p-badge {
          font-size: 10px; color: #e6e6e6;
          border: 1px solid rgba(255,255,255,.25);
          border-radius: 6px; padding: 4px 12px;
          background: #1c1c1c;
        }

        .p-socials { display: flex; justify-content: center; gap: 12px; margin-top: 22px; }
        .p-soc {
          width: 44px; height: 44px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,.28);
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          color: #f5f5f5; transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          text-decoration: none;
        }
        .p-soc:hover {
          color: #fff; border-color: rgba(255,255,255,.4);
          background: rgba(255,255,255,.1);
          transform: translateY(-2px);
        }
        .p-soc svg { width: 19px; height: 19px; }

        .p-foot {
          display: flex; justify-content: space-between; gap: 12px;
          margin-top: 28px; font-size: 10px; color: #fff;
          font-weight: 700; flex-wrap: wrap;
        }
        .p-foot .dim { color: #666; font-weight: 400; }
        .p-copy { font-size: 10px; color: #707070; margin: 10px 0 0; text-align: center; letter-spacing: 1px; }

        .p-nav {
          position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%);
          display: flex; align-items: center; gap: 4px;
          background: rgba(34,35,34,.82);
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 999px; padding: 6px; z-index: 60;
          backdrop-filter: blur(12px);
        }
        .p-nav-item {
          border: none; background: transparent; color: #cfcfcf; cursor: pointer;
          min-width: 44px; min-height: 44px; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          font-family: inherit; font-size: 11px; font-weight: 700;
          padding: 8px 10px; transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          position: relative;
        }
        .p-nav-item svg { width: 17px; height: 17px; }
        .p-nav-item.wide { padding: 8px 16px; }
        .p-nav-item.active {
          background: rgba(255,255,255,.17); color: #fff;
        }
        .p-nav-item:hover { background: rgba(255,255,255,.1); color: #fff; }

        @media (max-width: 860px) {
          .p-exp-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .profile-card { padding: 26px 16px 18px; }
          .p-name { font-size: 16px; }
          .p-bio { font-size: 10.5px; }
          .p-exp { flex-direction: column; }
          .p-exp-logo { width: 50px; height: 50px; font-size: 10px; }
          .p-foot { justify-content: center; text-align: center; }
          .p-photo-ring { width: 130px; height: 130px; }
          .p-photo { width: 122px; height: 122px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .profile-card, .p-exp { animation: none; }
          .p-photo-ring, .p-photo-ring::after { animation: none; }
          .p-cell:hover { transform: none; }
        }
      `}</style>

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
          <p className="p-title-line">{profile.role}</p>

          <p className="p-bio">{profile.bio}</p>

          <button className="p-hire" onClick={go("contact")}>
            <svg viewBox="0 0 24 24" className="p-hire-icon">
              <path
                d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 7L4 7v11h16V7l-8 5Z"
                fill="currentColor"
              />
            </svg>
            Hubungi Saya / Hire Me
          </button>

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
            <span className="p-git-total"><b>{profile.githubTotal.toLocaleString("id-ID")}</b> kontribusi</span>
          </div>

          <div className="p-git-scroll">
            <div className="p-git">
              <div className="p-git-months">
                {MONTHS.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <div className="p-git-body">
                <div className="p-git-days">
                  {DAY_LABELS.map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
                <div className="p-git-grid">
                  {grid.map((week, wi) => (
                    <div key={wi} className="p-week">
                      {week.map((lv, di) => (
                        <span key={di} className={`p-cell ${LEVELS[lv]}`} />
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
          {experiences.map((job) => (
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
                {job.resp.map((r) => (<li key={r}>{r}</li>))}
              </ul>
              <div className="p-tags">
                {job.tags.map((t) => (<span key={t}>{t}</span>))}
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
            <a href={profile.socials.instagram} aria-label="Instagram" className="p-soc">
              <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-10.4a1.4 1.4 0 1 0 0-2.9 1.4 1.4 0 0 0 0 2.9Z" fill="currentColor" /></svg>
            </a>
            <a href={profile.socials.github} aria-label="GitHub" className="p-soc">
              <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.8 9.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.4 4.7-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z" fill="currentColor" /></svg>
            </a>
            <a href={profile.socials.linkedin} aria-label="LinkedIn" className="p-soc">
              <svg viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8.09h4.56V23H.22V8.09Zm7.44 0h4.37v2.04h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v8.24h-4.55v-7.3c0-1.74-.03-3.98-2.43-3.98-2.43 0-2.8 1.9-2.8 3.86V23H7.66V8.09Z" fill="currentColor" /></svg>
            </a>
          </div>

          <div className="p-foot">
            <span className="p-foot-l"><span className="dim">Status: </span>{profile.status}</span>
            <span className="p-foot-r"><span className="dim">Peran: </span>{profile.role}</span>
          </div>
          <p className="p-copy">© 2026 {profile.name.toUpperCase()}</p>
        </div>

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
      </div>
    </>
  );
}