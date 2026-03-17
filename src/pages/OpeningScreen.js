import React from "react";
import { useNavigate } from "react-router-dom";
import "./OpeningScreen.css";
import cattleBg from "../assets/cattle-bg.jpg";

export default function OpeningScreen() {
  const navigate = useNavigate();
  return (
    <div
      className="opening-container"
      style={{ backgroundImage: `url(${cattleBg})` }}
    >
      {/* Corner frame accents */}
      <div className="corner-accent corner-accent--tl" />
      <div className="corner-accent corner-accent--tr" />
      <div className="corner-accent corner-accent--bl" />
      <div className="corner-accent corner-accent--br" />

      <div className="opening-card">
        <div className="opening-badge">🐄 Final Year Project · 2026</div>

        <h1 className="title">
          Cattle Breed<br />
          <span className="title-accent">Classifier</span>
        </h1>

        <p className="subtitle">
          An AI&#8209;powered platform to instantly detect &amp; identify Indian cattle breeds
          from a single photo — built for farmers, researchers &amp; students.
        </p>

        <div className="opening-stats">
          <div className="stat-pill">🧠 <strong>16</strong> Breeds Detected</div>
          <div className="stat-pill">📊 <strong>~75%</strong> Model Accuracy</div>
          <div className="stat-pill">🌐 English + <strong>मराठी</strong></div>
        </div>

        <button className="enter-btn" onClick={() => navigate("/home")}>
          Get Started →
        </button>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
        scroll
      </div>
    </div>
  );
}
