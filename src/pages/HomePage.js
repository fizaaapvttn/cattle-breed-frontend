import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { LangContext, T } from "../App";

export default function HomePage() {
  const { lang } = useContext(LangContext);
  const t = T[lang];
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>{t.cattleIndia}</h1>
          <p>{t.cattleDesc}</p>
          <div className="hero-buttons">
            <Link to="/detect"    className="btn-primary">{t.detectBtn}</Link>
            <Link to="/breed-info" className="btn-secondary">{t.navBreed}</Link>
          </div>
        </div>
      </section>

      <section className="features" style={{background:"none",paddingTop:"60px",paddingBottom:"60px"}}>
        {[
          { icon:"📷", title: lang==="en"?"Image Detection":"प्रतिमा ओळख",   desc: lang==="en"?"Upload or capture cattle images and let our AI identify the breed instantly.":"गुरांचे फोटो अपलोड करा — AI जाती लगेच ओळखेल." },
          { icon:"🧠", title: lang==="en"?"AI Powered":"AI आधारित",            desc: lang==="en"?"EfficientNetB0 deep learning model trained on 16 Indian cattle breeds.":"EfficientNetB0 मॉडेल १६ भारतीय जातींवर प्रशिक्षित." },
          { icon:"📚", title: lang==="en"?"Breed Library":"जाती ग्रंथालय",    desc: lang==="en"?"Detailed profiles — milk yield, feeding guides, maintenance, vaccination.":"दूध उत्पादन, आहार, देखभाल, लसीकरण — सर्व माहिती." },
        ].map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      <div className="about">
        <h2>{lang==="en"?"Why This Project?":"हा प्रकल्प का?"}</h2>
        <p>{lang==="en"
          ? "India has one of the largest cattle populations in the world. Identifying cattle breeds can help improve livestock management, dairy production, and breeding practices."
          : "भारतात जगातील सर्वाधिक गुरांची संख्या आहे. जाती ओळखणे पशुपालन, दुग्धोत्पादन आणि प्रजनन सुधारण्यास मदत करते."
        }</p>
        <p>{lang==="en"
          ? "This project uses artificial intelligence to simplify breed identification — providing useful, actionable information to farmers and agriculture students."
          : "हा प्रकल्प AI वापरून जाती ओळख सोपी करतो — शेतकरी व विद्यार्थ्यांसाठी उपयुक्त माहिती देतो."
        }</p>
      </div>

      <footer className="footer">
        <p>© 2026 Cattle Breed Classifier · Built with React + AI</p>
      </footer>
    </div>
  );
}
