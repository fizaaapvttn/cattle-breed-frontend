import React, { useState, useRef } from "react";

const TABS = [
  { id: "gallery",       label: "📸 Gallery",               icon: "📸" },
  { id: "sponsorship",   label: "📜 Sponsorship Letters",   icon: "📜" },
  { id: "certificates",  label: "🏆 Project Certificates",  icon: "🏆" },
];

const EMPTY_MESSAGES = {
  gallery:      "No gallery photos added yet. Upload your first memory!",
  sponsorship:  "No sponsorship letters added yet. Add one to celebrate your supporters!",
  certificates: "No certificates added yet. Showcase your achievements!",
};

export default function AppreciationWall() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [items, setItems] = useState({ gallery: [], sponsorship: [], certificates: [] });
  const [modal, setModal] = useState(null); // { src, type, title }
  const [uploading, setUploading] = useState(false);

  const fileRef = useRef();

  /* ---------- Upload ---------- */
  const handleFiles = (files) => {
    setUploading(true);
    const accepted = Array.from(files).filter(f => f.type.startsWith("image/") || f.type === "application/pdf");
    let loaded = 0;
    accepted.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newItem = {
          id: Date.now() + Math.random(),
          title: file.name.replace(/\.[^.]+$/, ""),
          src: e.target.result,
          type: file.type,
          date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        };
        setItems(prev => ({
          ...prev,
          [activeTab]: [newItem, ...prev[activeTab]],
        }));
        loaded++;
        if (loaded === accepted.length) setUploading(false);
      };
      reader.readAsDataURL(file);
    });
    if (!accepted.length) setUploading(false);
  };

  const onFileInput = (e) => handleFiles(e.target.files);

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeItem = (id) => {
    setItems(prev => ({ ...prev, [activeTab]: prev[activeTab].filter(i => i.id !== id) }));
  };

  /* ---------- Render ---------- */
  return (
    <>
      <style>{CSS}</style>

      {modal && (
        <div className="aw-overlay" onClick={() => setModal(null)}>
          <div className="aw-lightbox" onClick={e => e.stopPropagation()}>
            <button className="aw-lbox-close" onClick={() => setModal(null)}>✕</button>
            <p className="aw-lbox-title">{modal.title}</p>
            {modal.type === "application/pdf"
              ? <iframe className="aw-lbox-pdf" src={modal.src} title={modal.title} />
              : <img className="aw-lbox-img" src={modal.src} alt={modal.title} />
            }
          </div>
        </div>
      )}

      <div className="aw-page">
        {/* Hero */}
        <div className="aw-hero">
          <div className="aw-hero-glow" />
          <span className="aw-hero-badge">✦ Community</span>
          <h1 className="aw-hero-title">Appreciation Wall</h1>
          <p className="aw-hero-sub">
            A living tribute to everyone who believed in this project — our sponsors,<br />
            supporters, and every milestone we've achieved together.
          </p>
        </div>

        {/* Tabs */}
        <div className="aw-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`aw-tab ${activeTab === t.id ? "aw-tab--active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="aw-tab-icon">{t.icon}</span>
              <span className="aw-tab-label">{t.label.split(" ").slice(1).join(" ")}</span>
            </button>
          ))}
        </div>

        {/* Upload zone */}
        <div
          className="aw-drop"
          onDragOver={e => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileRef.current.click()}
        >
          <input ref={fileRef} type="file" multiple accept="image/*,application/pdf" style={{ display: "none" }} onChange={onFileInput} />
          <div className="aw-drop-icon">{uploading ? "⏳" : "⬆️"}</div>
          <p className="aw-drop-text">
            {uploading ? "Uploading…" : <><b>Click or drag</b> images / PDFs here to add to {TABS.find(t => t.id === activeTab)?.label.split(" ").slice(1).join(" ")}</>}
          </p>
        </div>

        {/* Grid */}
        {items[activeTab].length === 0 ? (
          <div className="aw-empty">
            <span className="aw-empty-icon">{TABS.find(t => t.id === activeTab)?.icon}</span>
            <p>{EMPTY_MESSAGES[activeTab]}</p>
          </div>
        ) : (
          <div className={`aw-grid aw-grid--${activeTab}`}>
            {items[activeTab].map((item, idx) => (
              <div
                key={item.id}
                className="aw-card"
                style={{ animationDelay: `${idx * 0.07}s` }}
                onClick={() => setModal(item)}
              >
                <div className="aw-card-thumb">
                  {item.type === "application/pdf"
                    ? <div className="aw-pdf-placeholder"><span>📄</span><p>PDF</p></div>
                    : <img src={item.src} alt={item.title} />
                  }
                  <div className="aw-card-overlay">
                    <span className="aw-card-view">View</span>
                  </div>
                </div>
                <div className="aw-card-info">
                  <p className="aw-card-title">{item.title}</p>
                  <p className="aw-card-date">{item.date}</p>
                </div>
                <button className="aw-card-del" onClick={e => { e.stopPropagation(); removeItem(item.id); }}>✕</button>
              </div>
            ))}
          </div>
        )}

        {/* Count badge */}
        {items[activeTab].length > 0 && (
          <p className="aw-count">{items[activeTab].length} item{items[activeTab].length > 1 ? "s" : ""} in this section</p>
        )}
      </div>
    </>
  );
}

/* ===================== CSS ===================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.aw-page {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%);
  padding: 0 0 80px;
}

/* ---- HERO ---- */
.aw-hero {
  position: relative;
  text-align: center;
  padding: 64px 20px 48px;
  overflow: hidden;
}
.aw-hero-glow {
  position: absolute;
  top: -60px; left: 50%;
  transform: translateX(-50%);
  width: 600px; height: 300px;
  background: radial-gradient(ellipse, rgba(34,197,94,0.13) 0%, transparent 70%);
  pointer-events: none;
}
.aw-hero-badge {
  display: inline-block;
  background: rgba(34,197,94,0.12);
  border: 1px solid rgba(34,197,94,0.35);
  color: #16a34a;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 20px;
  margin-bottom: 18px;
}
.aw-hero-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #071a2f;
  margin-bottom: 16px;
  line-height: 1.1;
}
.aw-hero-sub {
  font-size: 16px;
  color: #475569;
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ---- TABS ---- */
.aw-tabs {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin: 0 auto 36px;
  padding: 0 20px;
  max-width: 860px;
}
.aw-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 26px;
  border-radius: 50px;
  border: 2px solid rgba(7,26,47,0.15);
  background: rgba(255,255,255,0.9);
  color: #334155;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}
.aw-tab:hover {
  border-color: #22c55e;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(34,197,94,0.15);
}
.aw-tab--active {
  background: linear-gradient(135deg, #071a2f, #123b63);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 12px 30px rgba(7,26,47,0.35);
  transform: translateY(-3px);
}
.aw-tab-icon { font-size: 18px; }

/* ---- DROP ZONE ---- */
.aw-drop {
  max-width: 700px;
  margin: 0 auto 40px;
  padding: 32px 24px;
  border: 2px dashed rgba(34,197,94,0.4);
  border-radius: 20px;
  background: rgba(255,255,255,0.7);
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 6px 20px rgba(0,0,0,0.04);
  backdrop-filter: blur(6px);
}
.aw-drop:hover {
  border-color: #22c55e;
  background: rgba(240,253,244,0.9);
  box-shadow: 0 12px 30px rgba(34,197,94,0.1);
  transform: translateY(-2px);
}
.aw-drop-icon { font-size: 32px; margin-bottom: 10px; }
.aw-drop-text { font-size: 15px; color: #475569; margin: 0; }
.aw-drop-text b { color: #071a2f; }

/* ---- EMPTY ---- */
.aw-empty {
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
}
.aw-empty-icon { font-size: 52px; display: block; margin-bottom: 16px; opacity: 0.5; }
.aw-empty p { font-size: 15px; }

/* ---- GRID ---- */
.aw-grid {
  display: grid;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}
.aw-grid--gallery       { grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); }
.aw-grid--sponsorship   { grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); }
.aw-grid--certificates  { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }

/* ---- CARD ---- */
.aw-card {
  position: relative;
  background: rgba(255,255,255,0.95);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0,0,0,0.07);
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: awFadeUp 0.5s ease both;
}
.aw-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 28px 60px rgba(7,26,47,0.14);
  border-color: rgba(34,197,94,0.4);
}
@keyframes awFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Thumb */
.aw-card-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #f1f5f9;
}
.aw-card-thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.aw-card:hover .aw-card-thumb img {
  transform: scale(1.06);
}
.aw-pdf-placeholder {
  width: 100%; height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e7ff, #f0fdf4);
}
.aw-pdf-placeholder span { font-size: 48px; }
.aw-pdf-placeholder p { font-size: 13px; color: #64748b; margin: 6px 0 0; font-weight: 600; }

/* Overlay */
.aw-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(7,26,47,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.aw-card:hover .aw-card-overlay { opacity: 1; }
.aw-card-view {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: 2px solid rgba(255,255,255,0.7);
  padding: 8px 22px;
  border-radius: 30px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Info */
.aw-card-info {
  padding: 14px 16px 16px;
}
.aw-card-title {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.aw-card-date {
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
}

/* Delete */
.aw-card-del {
  position: absolute;
  top: 10px; right: 10px;
  width: 28px; height: 28px;
  border-radius: 50%;
  background: rgba(239,68,68,0.85);
  border: none;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
  padding: 0;
  box-shadow: none;
}
.aw-card:hover .aw-card-del { opacity: 1; }
.aw-card-del:hover { transform: scale(1.2); }

/* ---- COUNT ---- */
.aw-count {
  text-align: center;
  margin-top: 32px;
  font-size: 13px;
  color: #94a3b8;
}

/* ---- LIGHTBOX ---- */
.aw-overlay {
  position: fixed;
  inset: 0;
  background: rgba(7,26,47,0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  animation: awFadeIn 0.2s ease;
}
@keyframes awFadeIn { from { opacity: 0; } to { opacity: 1; } }
.aw-lightbox {
  position: relative;
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  overflow: hidden;
}
.aw-lbox-close {
  position: absolute;
  top: 14px; right: 14px;
  background: #071a2f;
  color: #fff;
  border: none;
  width: 34px; height: 34px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  padding: 0;
  transition: background 0.2s;
}
.aw-lbox-close:hover { background: #ef4444; transform: none; }
.aw-lbox-title {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  padding-right: 40px;
}
.aw-lbox-img {
  max-width: 75vw;
  max-height: 75vh;
  border-radius: 10px;
  object-fit: contain;
}
.aw-lbox-pdf {
  width: 75vw;
  height: 75vh;
  border: none;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .aw-tabs { flex-direction: column; align-items: center; }
  .aw-grid--gallery, .aw-grid--sponsorship, .aw-grid--certificates {
    grid-template-columns: 1fr;
  }
}
`;