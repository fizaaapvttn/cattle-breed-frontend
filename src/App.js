import React, { useState, useRef, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import BreedInfo from "./pages/BreedInfo";
import AboutUs from "./pages/AboutUs";
import "./App.css";
import Detect from "./pages/Detect";
import OpeningScreen from "./pages/OpeningScreen";
import Health from "./pages/Health";
import AppreciationWall from "./pages/AppreciationWall";
import cattleBg from "./assets/cattle-bg.jpg";

/* ─────────────────────────────────────────────
   LANGUAGE CONTEXT
───────────────────────────────────────────── */
export const LangContext = createContext({ lang: "en", setLang: () => {} });

export const T = {
  en: {
    navHome: "Home",
    navDetect: "Detection",
    navBreed: "Breed Info",
    navHealth: "Health",
    navAbout: "About Us",
    navWall: "Wall",
    logoText: "Cattle AI",
    cattleIndia: "Cattle in India",
    cattleDesc: "India has one of the largest cattle populations in the world, with over 300 million animals. Cattle are crucial for milk and draught power — integral to agriculture, economy, and culture.",
    whyFarmers: "Why Farmers Raise Cattle",
    r1t: "Milk Production:",
    r1d: "Provides dairy for households and commercial purposes.",
    r2t: "Agricultural Work:",
    r2d: "Bulls and oxen assist in ploughing, transportation, and farm labor.",
    r3t: "Manure:",
    r3d: "Organic fertilizer for crops — reducing input costs.",
    r4t: "Income Source:",
    r4d: "Selling milk and calves generates consistent revenue.",
    r5t: "Cultural Significance:",
    r5d: "Many breeds hold deep religious and traditional importance.",
    aboutProject: "About Our Project",
    aboutDesc: "Our project uses Artificial Intelligence to detect cattle breeds from uploaded images or camera input — helping farmers identify animals instantly.",
    detectBtn: "Start Breed Detection",
    popularBreeds: "Popular Breeds by State",
    detectTitle: "Detect Your Cattle Breed",
    detectSub: "Upload a photo or use your camera to identify any of 16 Indian breeds instantly.",
    uploadImage: "Upload Image",
    useCamera: "Use Camera",
    frontCam: "Front Camera",
    backCam: "Back Camera",
    capturePhoto: "Capture Photo",
    predict: "Predict",
    detecting: "Detecting...",
    breedLabel: "Detected Breed",
    confLabel: "Confidence",
    knowMore: "Know More About This Breed",
    noDetect: "Could not detect a breed. Please try a clearer image.",
    noBackend: "Could not connect to backend. Is the server running?",
  },
  mr: {
    navHome: "मुख्यपृष्ठ",
    navDetect: "ओळख",
    navBreed: "जाती माहिती",
    navHealth: "आरोग्य",
    navAbout: "आमच्याबद्दल",
    navWall: "भिंत",
    logoText: "गुरे AI",
    cattleIndia: "भारतातील गुरे",
    cattleDesc: "भारतात जगातील सर्वाधिक गुरांची संख्या आहे. दूध, शेतकाम आणि संस्कृती यांसाठी गुरे अत्यंत महत्त्वाची आहेत.",
    whyFarmers: "शेतकरी गुरे का पाळतात",
    r1t: "दूध उत्पादन:",
    r1d: "घरगुती व व्यावसायिक दुग्धोत्पादन.",
    r2t: "शेतकाम:",
    r2d: "बैल नांगरणी, वाहतूक व शेतमजुरीत उपयुक्त.",
    r3t: "शेणखत:",
    r3d: "पिकांसाठी सेंद्रिय खत.",
    r4t: "उत्पन्नाचे साधन:",
    r4d: "दूध व वासरे विकून नियमित उत्पन्न.",
    r5t: "सांस्कृतिक महत्त्व:",
    r5d: "काही जातींना धार्मिक व पारंपारिक महत्त्व आहे.",
    aboutProject: "आमच्या प्रकल्पाबद्दल",
    aboutDesc: "आमचा प्रकल्प प्रतिमा किंवा कॅमेरा वापरून AI द्वारे गुरांची जात तत्काळ ओळखतो.",
    detectBtn: "जाती ओळख सुरू करा",
    popularBreeds: "राज्यानुसार लोकप्रिय जाती",
    detectTitle: "तुमच्या गुरांची जात ओळखा",
    detectSub: "फोटो अपलोड करा किंवा कॅमेरा वापरा — १६ भारतीय जातींपैकी कोणतीही जात तत्काळ ओळखा.",
    uploadImage: "प्रतिमा अपलोड करा",
    useCamera: "कॅमेरा वापरा",
    frontCam: "समोरील कॅमेरा",
    backCam: "मागील कॅमेरा",
    capturePhoto: "फोटो घ्या",
    predict: "अंदाज करा",
    detecting: "शोधत आहे...",
    breedLabel: "ओळखलेली जात",
    confLabel: "विश्वास",
    knowMore: "या जातीबद्दल अधिक जाणून घ्या",
    noDetect: "जाती शोधता आली नाही. कृपया स्पष्ट प्रतिमा वापरा.",
    noBackend: "बॅकएंडशी कनेक्ट होता आले नाही.",
  },
};

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
function HomePage({ popularBreeds }) {
  const { lang } = useContext(LangContext);
  const t = T[lang];

  return (
    <div className="home-page">

      <section className="project-panel">
        {/* decorative blobs */}
        <div className="project-panel-blob1" />
        <div className="project-panel-blob2" />

        <div className="project-panel-eyebrow">🤖 AI Powered</div>

        <h2>{t.aboutProject}</h2>
        <p>{t.aboutDesc}</p>

        {/* feature chips */}
        <div className="project-panel-chips">
          <div className="project-chip"><span className="project-chip-icon">📷</span> Upload or Camera</div>
          <div className="project-chip"><span className="project-chip-icon">🧠</span> 16 Indian Breeds</div>
          <div className="project-chip"><span className="project-chip-icon">⚡</span> Instant Results</div>
          <div className="project-chip"><span className="project-chip-icon">🌐</span> EN + मराठी</div>
        </div>

        <div className="about-detect-btn">
          <Link to="/detect"><button>{t.detectBtn} →</button></Link>
        </div>
      </section>

      <section className="info-panel">
        {/* Background orb */}
        <div className="info-panel-orb" />

        <h1><span>{t.cattleIndia}</span></h1>
        <p>{t.cattleDesc}</p>

        <div className="info-subsection">
          <h3>🌾 {t.whyFarmers}</h3>
          <ul>
            <li>
              <span>🐄</span>
              <span><strong style={{ color: "#059669" }}>{t.r1t}</strong> {t.r1d}</span>
            </li>
            <li>
              <span>🚜</span>
              <span><strong style={{ color: "#0284c7" }}>{t.r2t}</strong> {t.r2d}</span>
            </li>
            <li>
              <span>🌿</span>
              <span><strong style={{ color: "#d97706" }}>{t.r3t}</strong> {t.r3d}</span>
            </li>
            <li>
              <span>💰</span>
              <span><strong style={{ color: "#7c3aed" }}>{t.r4t}</strong> {t.r4d}</span>
            </li>
            <li>
              <span>🙏</span>
              <span><strong style={{ color: "#e11d48" }}>{t.r5t}</strong> {t.r5d}</span>
            </li>
          </ul>
        </div>

        <div className="info-images">
          <img src="amritmahalcowimg.jpg" alt="Amritmahal cattle" />
          <img src="jerseycowimg.jpeg" alt="Jersey cattle" />
          <img src="tharparkercowimg.jpg" alt="Tharparkar cattle" />
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="stats-panel">
        <div className="stats-panel-bg" />
        <div className="stats-eyebrow">📊 By The Numbers</div>
        <div className="stats-grid">
          <div className="stat-block">
            <span className="stat-num" style={{color:"#10b981"}}>16</span>
            <span className="stat-unit">Breeds</span>
            <span className="stat-desc">Indian cattle breeds our AI can identify</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <span className="stat-num" style={{color:"#0ea5e9"}}>~75%</span>
            <span className="stat-unit">Accuracy</span>
            <span className="stat-desc">Model accuracy after fine-tuning & augmentation</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <span className="stat-num" style={{color:"#f59e0b"}}>300M+</span>
            <span className="stat-unit">Cattle</span>
            <span className="stat-desc">Cattle population in India we aim to help manage</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <span className="stat-num" style={{color:"#8b5cf6"}}>2</span>
            <span className="stat-unit">Languages</span>
            <span className="stat-desc">English & Marathi for wider farmer reach</span>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-panel">
        <div className="how-eyebrow">⚙️ How It Works</div>
        <h2 className="how-title">Three Simple Steps</h2>
        <p className="how-sub">From photo to breed identification in seconds — no expertise needed.</p>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-num" style={{background:"linear-gradient(135deg,#10b981,#059669)"}}>1</div>
            <div className="how-step-icon">📸</div>
            <h4 className="how-step-title">Upload or Capture</h4>
            <p className="how-step-desc">Take a photo of your cattle using your phone camera or upload an existing image from your gallery.</p>
          </div>
          <div className="how-connector" />
          <div className="how-step">
            <div className="how-step-num" style={{background:"linear-gradient(135deg,#0ea5e9,#0284c7)"}}>2</div>
            <div className="how-step-icon">🧠</div>
            <h4 className="how-step-title">AI Analyses</h4>
            <p className="how-step-desc">Our EfficientNetB0 deep learning model processes the image and matches it against 16 trained breed patterns.</p>
          </div>
          <div className="how-connector" />
          <div className="how-step">
            <div className="how-step-num" style={{background:"linear-gradient(135deg,#f59e0b,#d97706)"}}>3</div>
            <div className="how-step-icon">📋</div>
            <h4 className="how-step-title">Get Full Report</h4>
            <p className="how-step-desc">Instantly receive the breed name, confidence score, feeding guide, maintenance tips, and vaccination schedule.</p>
          </div>
        </div>
      </section>

      {/* ── Breeds panel ── */}
      <section className="breeds-panel">
        <h2>{t.popularBreeds}</h2>
        <div className="breeds-grid">
          {popularBreeds.map((b, i) => (
            <div className="breed-card" key={i}>
              <img src={b.image} alt={b.name} />
              <h4>{b.name}</h4>
              <p>{b.state}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="features-panel">
        <div className="features-eyebrow">✨ Platform Features</div>
        <h2 className="features-title">Everything You Need</h2>
        <div className="features-grid">
          {[
            { icon:"🔍", title:"Breed Detection",      desc:"Identify 16 Indian cattle breeds instantly from a photo using deep learning.",                      color:"#10b981", bg:"rgba(16,185,129,0.10)" },
            { icon:"📋", title:"Breed Profiles",       desc:"Detailed info — origin, milk yield, weight, climate suitability and lifespan.",                     color:"#0ea5e9", bg:"rgba(14,165,233,0.10)" },
            { icon:"🌾", title:"Feeding Guide",         desc:"Breed-specific daily feeding plans with fodder quantities and mineral requirements.",                color:"#f59e0b", bg:"rgba(245,158,11,0.10)" },
            { icon:"🔧", title:"Maintenance Tips",      desc:"Care routines — grooming, shelter, exercise, parasite control and vet schedules.",                  color:"#8b5cf6", bg:"rgba(139,92,246,0.10)" },
            { icon:"🩺", title:"Health Diagnosis",      desc:"AI health report — select symptoms to get causes, medications and prevention advice.",              color:"#f43f5e", bg:"rgba(244,63,94,0.10)"  },
            { icon:"💉", title:"Vaccination Schedule",  desc:"Complete guide for FMD, HS, BQ, Brucellosis and Anthrax with timing and symptoms.",                color:"#06b6d4", bg:"rgba(6,182,212,0.10)"  },
          ].map((f, i) => (
            <div className="feat-card" key={i} style={{"--feat-color": f.color, "--feat-bg": f.bg}}>
              <div className="feat-icon-wrap">
                <span className="feat-icon">{f.icon}</span>
              </div>
              <h4 className="feat-title">{f.title}</h4>
              <p className="feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR LAYOUT
───────────────────────────────────────────── */
function Layout({ children }) {
  const location = useLocation();
  const { lang, setLang } = useContext(LangContext);
  const t = T[lang];
  const isOpening = location.pathname === "/";

  return (
    <>
      {!isOpening && (
        <nav className="navbar">
          <div className="logo">
            🐄 {t.logoText}
            <span className="logo-dot" />
          </div>
          <div className="nav-links">
            <Link to="/home">{t.navHome}</Link>
            <Link to="/detect">{t.navDetect}</Link>
            <Link to="/breed-info">{t.navBreed}</Link>
            <Link to="/health">{t.navHealth}</Link>
            <Link to="/about-us">{t.navAbout}</Link>
            <Link to="/appreciation">{t.navWall}</Link>
            <div className="lang-toggle">
              <button
                className={"lang-btn" + (lang === "en" ? " lang-active" : "")}
                onClick={() => setLang("en")}
              >EN</button>
              <button
                className={"lang-btn" + (lang === "mr" ? " lang-active" : "")}
                onClick={() => setLang("mr")}
              >मर</button>
            </div>
          </div>
        </nav>
      )}
      {children}
    </>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [lang, setLang] = useState("en");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const capturePhoto = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 300, 225);
    canvasRef.current.toBlob(function(blob) {
      if (!blob) return;
      const img = new File([blob], "camera.jpg", { type: "image/jpeg" });
      setFile(img);
      setPreview(URL.createObjectURL(blob));
    });
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select or capture an image!");
      return;
    }
    setLoading(true);
    setResult(null);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: T[lang].noBackend });
    } finally {
      setLoading(false);
    }
  };

  const popularBreeds = [
    { name: "Gir",        state: "Gujarat",       image: "/gircowimg.jpg" },
    { name: "Hallikar",   state: "Karnataka",      image: "/hallikarcowimg.jpg" },
    { name: "Dangi",      state: "Maharashtra",    image: "/dangicowimg.jpg" },
    { name: "Red Sindhi", state: "Sindh/Pakistan", image: "/redsindhicowimg.webp" },
    { name: "Sahiwal",    state: "Punjab",         image: "/sahiwalcowimg.jpg" },
  ];

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<OpeningScreen />} />
            <Route
              path="/home"
              element={<HomePage popularBreeds={popularBreeds} />}
            />
            <Route
              path="/detect"
              element={
                <Detect
                  handleFileChange={handleFileChange}
                  capturePhoto={capturePhoto}
                  handleSubmit={handleSubmit}
                  preview={preview}
                  result={result}
                  loading={loading}
                  videoRef={videoRef}
                  canvasRef={canvasRef}
                />
              }
            />
            <Route path="/breed-info"     element={<BreedInfo />} />
            <Route path="/breed-info/:id" element={<BreedInfo />} />
            <Route path="/health"         element={<Health />} />
            <Route path="/about-us"       element={<AboutUs />} />
            <Route path="/appreciation"   element={<AppreciationWall />} />
          </Routes>
        </Layout>
      </Router>
    </LangContext.Provider>
  );
}
