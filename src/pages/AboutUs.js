import React from "react";
import "./AboutUs.css";

const TEAM = [
  { name: "Nishita Agarwal",  role: "ML Engineer & Frontend",   avatar: "NA", color: "#22c55e" },
  { name: "Fiza Maner",       role: "Deep Learning & Backend",   avatar: "FM", color: "#3b82f6" },
  { name: "Shivani Khengat",  role: "Data Processing & UI",      avatar: "SK", color: "#f59e0b" },
  { name: "Gayatri Chakor",   role: "Model Training & Testing",  avatar: "GC", color: "#ec4899" },
];

const FEATURES = [
  { icon: "🔍", title: "Cattle Breed Detection",      desc: "Identify 16 Indian cattle breeds instantly from a photo using our EfficientNetB0 deep learning model." },
  { icon: "📋", title: "Breed Information",            desc: "Detailed profiles — origin, milk yield, weight, climate suitability, lifespan and special traits." },
  { icon: "🌾", title: "Feeding Guide",                desc: "Breed-specific daily feeding plans with fodder quantities, concentrates and mineral requirements." },
  { icon: "🔧", title: "Maintenance Tips",             desc: "Care routines for each breed — grooming, shelter, exercise, parasite control and vet schedules." },
  { icon: "🩺", title: "Disease Detection",            desc: "AI health diagnosis — select symptoms, get a full report with causes, medications and prevention." },
  { icon: "🌐", title: "English & Marathi Support",    desc: "Disease detection works in both English and Marathi, making it accessible to local farmers." },
  { icon: "💉", title: "Vaccination Schedule",         desc: "Complete guide for FMD, HS, BQ, Brucellosis and Anthrax — with symptoms and timing." },
  { icon: "🌟", title: "Appreciation Wall",            desc: "Gallery, sponsorship letters and certificates — celebrating everyone who supported this project." },
];

const PANELS = [
  {
    icon: "🧠", title: "Technologies Used",
    content: <ul>
      <li><span className="tag">Frontend</span>React.js, CSS</li>
      <li><span className="tag">Backend</span>Flask (Python)</li>
      <li><span className="tag">Deep Learning</span>TensorFlow, Keras</li>
      <li><span className="tag">Model</span>EfficientNetB0</li>
      <li><span className="tag">Libraries</span>NumPy, OpenCV, Matplotlib</li>
    </ul>
  },
  {
    icon: "📊", title: "Dataset Details",
    content: <ul>
      <li>Total Classes: <b>16 cattle breeds</b></li>
      <li>Data Split: 80% Training, 20% Validation</li>
      <li>Preprocessing: Resizing &amp; Normalization</li>
      <li>Augmentation: Flip, Rotation, Zoom</li>
    </ul>
  },
  {
    icon: "🏋️", title: "Model Training",
    content: <ul>
      <li>Transfer Learning via EfficientNet</li>
      <li>Optimizer: Adam</li>
      <li>Loss: Categorical Crossentropy</li>
      <li>Multiple epochs for refinement</li>
    </ul>
  },
  {
    icon: "🔬", title: "Model Refinement",
    content: <ul>
      <li>Fine-tuned top layers</li>
      <li>Dropout to reduce overfitting</li>
      <li>EarlyStopping &amp; LR Reduction</li>
    </ul>
  },
  {
    icon: "📈", title: "Model Performance",
    content: <>
      <div className="acc-row">
        <div className="acc-block">
          <span className="acc-label">Initial</span>
          <span className="acc-val red">~31%</span>
        </div>
        <span className="acc-arrow">→</span>
        <div className="acc-block">
          <span className="acc-label">Current</span>
          <span className="acc-val green">~75%</span>
        </div>
      </div>
      <ul>
        <li>Improved via augmentation &amp; tuning</li>
        <li>Evaluated via Confusion Matrix</li>
        <li>Metrics: Precision, Recall, F1-score</li>
      </ul>
    </>
  },
  {
    icon: "📉", title: "Confusion Matrix",
    content: <p>Helped identify misclassifications between similar-looking breeds, guiding dataset quality improvements and targeted fine-tuning.</p>
  },
  {
    icon: "🚀", title: "Future Enhancements",
    content: <ul>
      <li>Mobile App Integration</li>
      <li>Cloud deployment</li>
      <li>Expanded disease database</li>
      <li>More regional language support</li>
    </ul>
  },
  {
    icon: "📌", title: "Project Goal",
    content: <p>Bridge the gap between AI research and real agricultural needs — giving every Indian farmer a smart, accessible tool for cattle management.</p>
  },
];

export default function AboutUs() {
  return (
    <div className="au-wrap">

      {/* ══════════════════════════════════════
          HERO — project intro + team together
      ══════════════════════════════════════ */}
      <div className="au-hero">
        <div className="au-glow" />

        <p className="au-eyebrow">🐄 Final Year Project · 2026</p>
        <h1 className="au-title">Cattle Breed Classifier</h1>

        {/* One paragraph about the project */}
        <p className="au-intro">
          Cattle AI 2026 is an AI-powered platform that helps Indian farmers and livestock
          breeders identify cattle breeds instantly from a single photo. Beyond detection, it
          provides breed-specific feeding guides, maintenance tips, a bilingual AI disease
          diagnosis tool in English and Marathi, vaccination schedules, and an appreciation
          wall — all in one place. Built on EfficientNetB0 with transfer learning, the model
          covers 16 Indian cattle breeds and improved from ~31% to ~75% accuracy through
          iterative augmentation, fine-tuning, and regularisation.
        </p>

        {/* Team — only here, not repeated below */}
        <div className="au-team-block">
          <p className="au-team-label">Built by</p>
          <div className="au-team-cards">
            {TEAM.map((m, i) => (
              <div className="au-member" key={i}>
                <div className="au-avatar" style={{ background: `${m.color}18`, border: `2px solid ${m.color}60` }}>
                  <span style={{ color: m.color }}>{m.avatar}</span>
                </div>
                <p className="au-mname">{m.name}</p>
                <p className="au-mrole">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <div className="au-section">
        <div className="au-sec-head">
          <h2>What This Project Does</h2>
          <p>Every feature built into the platform</p>
        </div>
        <div className="au-features">
          {FEATURES.map((f, i) => (
            <div className="au-feat" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="au-feat-icon">{f.icon}</span>
              <div>
                <h3 className="au-feat-title">{f.title}</h3>
                <p className="au-feat-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          TECHNICAL PANELS
      ══════════════════════════════════════ */}
      <div className="au-section">
        <div className="au-sec-head">
          <h2>Technical Details</h2>
          <p>How it was built and evaluated</p>
        </div>
        <div className="au-panels">
          {PANELS.map((p, i) => (
            <div className="au-panel" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
              <h3 className="au-panel-title">
                <span>{p.icon}</span>{p.title}
              </h3>
              <div className="au-panel-body">{p.content}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
