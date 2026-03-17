import React, { useState, useEffect } from "react";
import "./BreedInfo.css";
import { useParams } from "react-router-dom";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */

const breeds = [
  { id:"amritmahal",   name:"Amritmahal",   origin:"Karnataka",          type:"Draught",       milkPerDay:"1–3 L",   milkPerLactation:"500–800 L",   lifespan:"12–15 yrs", weight:"340–400 kg", climate:"Dry & semi-arid",       usedFor:"Heavy agricultural work & transport", special:"Very strong with excellent endurance", image:"/amritmahalcowimg.jpg" },
  { id:"dangi",        name:"Dangi",         origin:"Maharashtra",        type:"Dual Purpose",  milkPerDay:"2–5 L",   milkPerLactation:"600–1200 L",  lifespan:"12–15 yrs", weight:"300–350 kg", climate:"Heavy rainfall regions",  usedFor:"Milk and ploughing",                   special:"Highly disease resistant",            image:"/dangicowimg.jpg" },
  { id:"gir",          name:"Gir",           origin:"Gujarat",            type:"Dairy",         milkPerDay:"10–15 L", milkPerLactation:"2000–3000 L", lifespan:"12–15 yrs", weight:"385–475 kg", climate:"Hot and dry",            usedFor:"High-quality A2 milk production",      special:"Top indigenous dairy breed",          image:"/gircowimg.jpg" },
  { id:"hallikar",     name:"Hallikar",      origin:"Karnataka",          type:"Draught",       milkPerDay:"1–3 L",   milkPerLactation:"500–700 L",   lifespan:"12–15 yrs", weight:"300–350 kg", climate:"Dry regions",            usedFor:"Fast ploughing",                       special:"Very agile and energetic",            image:"/hallikarcowimg.jpg" },
  { id:"hariana",      name:"Hariana",       origin:"Haryana",            type:"Dual Purpose",  milkPerDay:"8–10 L",  milkPerLactation:"1500–2500 L", lifespan:"12–15 yrs", weight:"400–500 kg", climate:"North Indian plains",    usedFor:"Milk and farming",                     special:"Strong and productive",               image:"/harianacowimg3.jpg" },
  { id:"jersey cow female diary", name:"Jersey", origin:"Jersey Island (UK)", type:"Dairy",    milkPerDay:"15–25 L", milkPerLactation:"4000–6000 L", lifespan:"15–20 yrs", weight:"400–450 kg", climate:"Moderate climates",      usedFor:"Commercial dairy farming",             special:"High butterfat milk (5%)",            image:"/jerseycowimg.jpeg" },
  { id:"kankrej",      name:"Kankrej",       origin:"Gujarat",            type:"Dual Purpose",  milkPerDay:"8–12 L",  milkPerLactation:"1800–2600 L", lifespan:"12–15 yrs", weight:"500–550 kg", climate:"Hot and dry",            usedFor:"Milk and heavy draught work",          special:"Strong curved horns",                 image:"/kankrejcowimg (2).jpg" },
  { id:"khillar",      name:"Khillar",       origin:"Maharashtra",        type:"Draught",       milkPerDay:"2–4 L",   milkPerLactation:"500–800 L",   lifespan:"12–15 yrs", weight:"350–400 kg", climate:"Dry zones",              usedFor:"Traditional farming",                  special:"Tall and muscular body",              image:"/khillarcowimg.jpg" },
  { id:"krishna_valley",name:"Krishna Valley",origin:"Karnataka & Maharashtra",type:"Draught", milkPerDay:"3–6 L",   milkPerLactation:"800–1200 L",  lifespan:"12–15 yrs", weight:"550–650 kg", climate:"River basin areas",      usedFor:"Heavy ploughing",                      special:"Large and powerful breed",            image:"/krishnavalleycowimg.jpg" },
  { id:"malnad_gidda", name:"Malnad Gidda",  origin:"Karnataka",          type:"Dairy",         milkPerDay:"2–4 L",   milkPerLactation:"500–1000 L",  lifespan:"15 yrs",    weight:"200–250 kg", climate:"Hilly & humid",          usedFor:"Low maintenance dairy farming",        special:"Smallest indigenous cattle of Karnataka", image:"/malnadgiddacowimg.jpg" },
  { id:"ongole",       name:"Ongole",        origin:"Andhra Pradesh",     type:"Dual Purpose",  milkPerDay:"5–8 L",   milkPerLactation:"1000–1500 L", lifespan:"12–15 yrs", weight:"600–700 kg", climate:"Tropical",               usedFor:"Breeding and farming",                 special:"Exported worldwide for breeding",     image:"/ongolecowimg.png" },
  { id:"rathi",        name:"Rathi",         origin:"Rajasthan",          type:"Dairy",         milkPerDay:"8–10 L",  milkPerLactation:"1500–3000 L", lifespan:"12–15 yrs", weight:"350–450 kg", climate:"Arid regions",           usedFor:"Milk production in desert areas",      special:"Excellent heat tolerance",            image:"/rathicowimg.jpg" },
  { id:"red_sindhi",   name:"Red Sindhi",    origin:"Sindh region",       type:"Dairy",         milkPerDay:"8–12 L",  milkPerLactation:"2000–3000 L", lifespan:"12–15 yrs", weight:"325–400 kg", climate:"Hot climates",           usedFor:"Heat tolerant dairy farming",          special:"Reddish brown coat",                  image:"/redsindhicowimg.webp" },
  { id:"sahiwal",      name:"Sahiwal",       origin:"Punjab",             type:"Dairy",         milkPerDay:"10–16 L", milkPerLactation:"2000–3500 L", lifespan:"12–15 yrs", weight:"400–500 kg", climate:"Hot regions",            usedFor:"Commercial dairy farming",             special:"Calm temperament & high milk yield",  image:"/sahiwalcowimg.jpg" },
  { id:"tharparkar",   name:"Tharparkar",    origin:"Rajasthan",          type:"Dual Purpose",  milkPerDay:"8–10 L",  milkPerLactation:"1800–2600 L", lifespan:"12–15 yrs", weight:"400–500 kg", climate:"Desert regions",         usedFor:"Milk and drought farming",             special:"Highly drought resistant",            image:"/tharparkercowimg.jpg" },
  { id:"vechur",       name:"Vechur",        origin:"Kerala",             type:"Dairy",         milkPerDay:"2–4 L",   milkPerLactation:"500–1000 L",  lifespan:"15–18 yrs", weight:"130–150 kg", climate:"Humid regions",          usedFor:"Small-scale dairy farming",            special:"Smallest cattle breed in the world",  image:"/vechurcowimg.jpg" },
];

const maintenanceTips = {
  amritmahal:    ["Provide high energy feed — strong draught breed needs extra fuel.", "Needs regular exercise and open grazing areas.", "Ensure clean drinking water and periodic veterinary checkups."],
  dangi:         ["Well suited for rainy climates; shelter during heavy monsoon.", "Provide balanced fodder and fresh green grass.", "Maintain dry shelter to prevent hoof infections."],
  gir:           ["Provide green fodder, grains and mineral mixture daily.", "Ensure clean and well-ventilated shelter.", "Regular vaccination and structured milking management."],
  hallikar:      ["Strong draught breed — needs open space for movement.", "Provide nutritious feed to maintain stamina.", "Periodic hoof trimming and parasite control."],
  hariana:       ["Good for both milk and draught — balanced nutrition essential.", "Provide green fodder alongside dry feed.", "Regular veterinary care and deworming recommended."],
  "jersey cow female diary": ["High milk producing breed — protein-rich diet mandatory.", "Provide quality fodder and concentrates twice daily.", "Maintain strict milking hygiene to prevent mastitis."],
  kankrej:       ["Provide sufficient green fodder and clean water daily.", "Needs spacious shelter for its large body size.", "Regular health monitoring and hoof care."],
  khillar:       ["Very active draught breed — ensure open space and exercise.", "Provide nutritious diet with mineral supplements.", "Regular physical activity prevents muscle stiffness."],
  krishna_valley:["Provide strong nutrition for heavy draught work.", "Needs clean housing and open field access.", "Regular parasite control and deworming."],
  malnad_gidda:  ["Small breed with low maintenance requirements.", "Provide natural grazing and simple fodder.", "Suitable for hilly regions — minimal shelter needs."],
  ongole:        ["Large breed — ensure high nutrition feed twice daily.", "Provide spacious and clean shelter.", "Regular veterinary care and vaccination important."],
  rathi:         ["Good milk producer — provide balanced feed with mineral mixture.", "Ensure proper milking management and hygiene.", "Protect from extreme heat with shade and water."],
  red_sindhi:    ["Provide balanced fodder and concentrate feed.", "Protect from extreme heat — shade and water critical.", "Regular vaccination and parasite control."],
  sahiwal:       ["High milk producer — rich diet with green fodder essential.", "Provide protein supplements and mineral mixture.", "Ensure regular milking routine twice a day."],
  tharparkar:    ["Well adapted to dry climates — store fodder for dry seasons.", "Provide sufficient water — drought tolerant but needs hydration.", "Regular veterinary checkups and deworming."],
  vechur:        ["Small breed with very low feed requirements.", "Provide natural grazing and basic shelter.", "Regular health monitoring and minimal supplementation."],
};

const feedingGuide = {
  amritmahal:    ["Green fodder: maize, sorghum or grass (15–20 kg/day)", "Dry fodder: hay or paddy straw (5–8 kg/day)", "Mineral mixture (50 g/day) + unlimited clean water"],
  dangi:         ["Fresh green grass and crop residues (12–18 kg/day)", "Dry fodder: rice straw or wheat straw (4–6 kg/day)", "Mineral supplements + clean drinking water"],
  gir:           ["Green fodder: maize, grass, legumes (20–25 kg/day)", "Concentrate feed for milk production (3–5 kg/day)", "Mineral mixture (80 g/day) + unlimited water"],
  hallikar:      ["Nutritious green fodder: sorghum or maize (15–20 kg/day)", "Dry fodder and grains for strength (5–7 kg/day)", "Mineral supplements + clean water"],
  hariana:       ["Green grass and crop residues (18–22 kg/day)", "Balanced concentrate feed (2–4 kg/day)", "Mineral mixture + ample clean drinking water"],
  "jersey cow female diary": ["High protein feed: soybean, cottonseed meal (4–6 kg/day)", "Green fodder and grains twice daily (20–30 kg/day)", "Mineral mixture + vitamins + unlimited water"],
  kankrej:       ["Green fodder: maize, sorghum (20–25 kg/day)", "Dry fodder and concentrate feed (4–6 kg/day)", "Mineral supplements + clean water at all times"],
  khillar:       ["Strong nutritious fodder: sorghum, maize (18–22 kg/day)", "Dry fodder and grains for energy (5–7 kg/day)", "Mineral mixture (60 g/day) + fresh water"],
  krishna_valley:["Green grass and legume crop residues (22–28 kg/day)", "Dry fodder and concentrates for draught work (5–8 kg/day)", "Mineral supplements + water twice daily"],
  malnad_gidda:  ["Natural grazing grass (8–12 kg/day)", "Small quantity of dry fodder (2–3 kg/day)", "Clean water supply — low maintenance"],
  ongole:        ["Green fodder and legumes (25–30 kg/day)", "Dry fodder and grains (6–8 kg/day)", "Mineral supplements + fresh water at all times"],
  rathi:         ["Green fodder and concentrates (18–22 kg/day)", "Dry fodder: hay or straw (4–6 kg/day)", "Mineral mixture + plenty of water for heat zones"],
  red_sindhi:    ["Green fodder and concentrate mixture (18–22 kg/day)", "Dry fodder: paddy or wheat straw (4–6 kg/day)", "Mineral mixture (70 g/day) + clean water"],
  sahiwal:       ["Protein-rich fodder: grass + legumes (20–25 kg/day)", "Green grass and grains for milk boost (4–5 kg/day)", "Mineral supplements + vitamins + water"],
  tharparkar:    ["Dry fodder suited for desert regions (8–12 kg/day)", "Green fodder when available (10–15 kg/day)", "Mineral mixture + extra water in dry season"],
  vechur:        ["Natural grazing grass (6–8 kg/day)", "Small quantity dry fodder (1–2 kg/day)", "Clean drinking water + minimal supplementation"],
};

const vaccinationSchedule = [
  { name:"FMD (Foot & Mouth Disease)", icon:"🦷", color:"#ef4444", schedule:"Every 6 months", what:"Highly contagious viral disease affecting hooves and mouth.", symptoms:["Blisters in mouth and tongue","Sores on feet and hooves","Fever and excessive drooling","Difficulty walking or eating"] },
  { name:"HS (Hemorrhagic Septicemia)", icon:"🫁", color:"#f59e0b", schedule:"Once every year", what:"Serious bacterial disease common during rainy seasons.", symptoms:["High fever","Swelling in throat and neck","Breathing difficulty","Sudden death in severe cases"] },
  { name:"BQ (Black Quarter)",          icon:"🦵", color:"#8b5cf6", schedule:"Once every year", what:"Bacterial infection mainly affecting young cattle muscles.", symptoms:["Swelling in muscles","Fever and lameness","Pain in legs or shoulders","Gas formation under the skin"] },
  { name:"Brucellosis",                  icon:"🧬", color:"#3b82f6", schedule:"Female calves (4–8 months)", what:"Bacterial disease affecting the reproductive system.", symptoms:["Abortion in pregnant cows","Infertility problems","Reduced milk production"] },
  { name:"Anthrax",                      icon:"⚠️", color:"#dc2626", schedule:"High risk areas only", what:"Dangerous bacterial disease found in contaminated soil.", symptoms:["Sudden high fever","Bleeding from body openings","Sudden death"] },
];

const STAT_ICONS = { origin:"📍", type:"🏷️", milkPerDay:"🥛", milkPerLactation:"📊", lifespan:"⏳", weight:"⚖️", climate:"🌡️", usedFor:"🔨", special:"✨" };
const STAT_LABELS = { origin:"Origin", type:"Type", milkPerDay:"Milk / Day", milkPerLactation:"Milk / Lactation", lifespan:"Lifespan", weight:"Weight", climate:"Climate", usedFor:"Used For", special:"Special Trait" };
const TYPE_COLORS = { Dairy:"#22c55e", Draught:"#3b82f6", "Dual Purpose":"#f59e0b" };

/* ─────────────────────────────────────────────────────────
   TAB COMPONENT
───────────────────────────────────────────────────────── */
const TABS = [
  { id:"info",     label:"📋 Overview" },
  { id:"feeding",  label:"🌾 Feeding" },
  { id:"maintain", label:"🔧 Maintenance" },
  { id:"vaccine",  label:"💉 Vaccination" },
];

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */
export default function BreedInfo() {
  const { id } = useParams();
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (id) {
      const found = breeds.find(b => b.id === id);
      if (found) { setSelectedBreed(found); setActiveTab("info"); }
    }
  }, [id]);

  const openBreed = (breed) => { setSelectedBreed(breed); setActiveTab("info"); };
  const closeBreed = () => setSelectedBreed(null);

  const filtered = breeds.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.origin.toLowerCase().includes(search.toLowerCase()) ||
    b.type.toLowerCase().includes(search.toLowerCase())
  );

  const tips  = selectedBreed ? (maintenanceTips[selectedBreed.id] || []) : [];
  const foods = selectedBreed ? (feedingGuide[selectedBreed.id]    || []) : [];

  return (
    <div className="bi-page">

      {/* ── Hero ── */}
      <div className="bi-hero">
        <div className="bi-hero-glow" />
        <p className="bi-eyebrow">🐄 16 Indian Breeds</p>
        <h1 className="bi-title">Breed Information</h1>
        <p className="bi-subtitle">Select any breed for detailed stats, feeding guide, maintenance tips & vaccination schedule</p>
        <input
          className="bi-search"
          type="text"
          placeholder="🔍  Search by name, origin or type…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* ── Grid ── */}
      <div className="bi-grid">
        {filtered.map((breed, i) => (
          <div
            className="bi-card"
            key={breed.id}
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => openBreed(breed)}
          >
            <div className="bi-card-img-wrap">
              <img src={breed.image} alt={breed.name} />
              <span className="bi-type-badge" style={{ background: TYPE_COLORS[breed.type] || "#6b7280" }}>
                {breed.type}
              </span>
            </div>
            <div className="bi-card-body">
              <h3 className="bi-card-name">{breed.name}</h3>
              <p className="bi-card-origin">📍 {breed.origin}</p>
              <div className="bi-card-stats">
                <span>🥛 {breed.milkPerDay}</span>
                <span>⚖️ {breed.weight}</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bi-no-results">No breeds found for "<b>{search}</b>"</div>
        )}
      </div>

      {/* ── Modal ── */}
      {selectedBreed && (
        <div className="bi-overlay" onClick={closeBreed}>
          <div className="bi-modal" onClick={e => e.stopPropagation()}>

            {/* Close */}
            <button className="bi-close" onClick={closeBreed}>✕</button>

            {/* Modal hero */}
            <div className="bi-modal-hero">
              <img className="bi-modal-img" src={selectedBreed.image} alt={selectedBreed.name} />
              <div className="bi-modal-title-block">
                <span className="bi-modal-type" style={{ background: TYPE_COLORS[selectedBreed.type] || "#6b7280" }}>
                  {selectedBreed.type}
                </span>
                <h2 className="bi-modal-name">{selectedBreed.name}</h2>
                <p className="bi-modal-origin">📍 {selectedBreed.origin}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bi-tabs">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`bi-tab ${activeTab === t.id ? "bi-tab--on" : ""}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="bi-tab-content">

              {/* ── OVERVIEW ── */}
              {activeTab === "info" && (
                <div className="bi-stats-grid">
                  {Object.keys(STAT_LABELS).map(key => (
                    <div className="bi-stat" key={key}>
                      <span className="bi-stat-icon">{STAT_ICONS[key]}</span>
                      <div>
                        <p className="bi-stat-label">{STAT_LABELS[key]}</p>
                        <p className="bi-stat-val">{selectedBreed[key]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── FEEDING ── */}
              {activeTab === "feeding" && (
                <div className="bi-list-section">
                  <p className="bi-list-intro">
                    Recommended daily feeding plan for <b>{selectedBreed.name}</b>
                  </p>
                  <ul className="bi-checklist">
                    {foods.length ? foods.map((f, i) => (
                      <li key={i} className="bi-check-item">
                        <span className="bi-check-dot" style={{ background: "#22c55e" }} />
                        {f}
                      </li>
                    )) : <li className="bi-check-item">Feeding data not available yet.</li>}
                  </ul>
                  <div className="bi-tip-box">
                    💡 Always provide fresh, clean water at all times. Adjust quantities based on season and work intensity.
                  </div>
                </div>
              )}

              {/* ── MAINTENANCE ── */}
              {activeTab === "maintain" && (
                <div className="bi-list-section">
                  <p className="bi-list-intro">
                    Care & maintenance tips for <b>{selectedBreed.name}</b>
                  </p>
                  <ul className="bi-checklist">
                    {tips.length ? tips.map((tip, i) => (
                      <li key={i} className="bi-check-item">
                        <span className="bi-check-dot" style={{ background: "#3b82f6" }} />
                        {tip}
                      </li>
                    )) : <li className="bi-check-item">Maintenance data not available yet.</li>}
                  </ul>
                  <div className="bi-tip-box" style={{ borderColor: "#3b82f6", background: "rgba(59,130,246,0.06)" }}>
                    🔧 Consistent care routines improve lifespan and productivity significantly.
                  </div>
                </div>
              )}

              {/* ── VACCINATION ── */}
              {activeTab === "vaccine" && (
                <div className="bi-vaccine-list">
                  {vaccinationSchedule.map((v, i) => (
                    <div className="bi-vaccine-card" key={i} style={{ borderLeft: `4px solid ${v.color}` }}>
                      <div className="bi-vaccine-header">
                        <span className="bi-vaccine-icon" style={{ background: v.color + "22", color: v.color }}>{v.icon}</span>
                        <div className="bi-vaccine-title-block">
                          <h4 className="bi-vaccine-name">{v.name}</h4>
                          <span className="bi-vaccine-schedule" style={{ color: v.color }}>🗓 {v.schedule}</span>
                        </div>
                      </div>
                      <p className="bi-vaccine-what">{v.what}</p>
                      <p className="bi-vaccine-sym-label">Symptoms to watch:</p>
                      <ul className="bi-vaccine-syms">
                        {v.symptoms.map((s, si) => <li key={si}>{s}</li>)}
                      </ul>
                    </div>
                  ))}
                  <div className="bi-tip-box" style={{ borderColor: "#ef4444", background: "rgba(239,68,68,0.05)" }}>
                    ⚠️ Always consult a licensed veterinarian before administering vaccines.
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}