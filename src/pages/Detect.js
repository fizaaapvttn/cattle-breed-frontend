import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LangContext, T } from "../App";


export default function Detect(props) {
  const { lang } = useContext(LangContext);
  const t = T[lang];
  const [cameraType, setCameraType] = useState("environment");

  const startCamera = async (type) => {
    setCameraType(type);
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: type } });
    props.videoRef.current.srcObject = stream;
    props.videoRef.current.play();
  };

  const breedKey =
    props.result?.breed && typeof props.result.breed === "string"
      ? props.result.breed.toLowerCase() : "";
  const hasResult = breedKey.length > 0;

  return (
    <div style={{ paddingBottom: "72px" }}>

      {/* ── Page header ── */}
      <div style={{ textAlign:"center", padding:"48px 24px 8px" }}>
        <span style={{
          display:"inline-block",
          background:"rgba(16,185,129,0.10)",
          border:"1px solid rgba(16,185,129,0.25)",
          color:"var(--emerald-600)",
          fontSize:"11px", fontWeight:"700",
          letterSpacing:"2px", textTransform:"uppercase",
          padding:"5px 18px", borderRadius:"30px", marginBottom:"16px"
        }}>AI Detection</span>
        <h1 className="detect-title" style={{paddingTop:0}}>{t.detectTitle}</h1>
        <p style={{
          textAlign:"center", color:"var(--color-text-muted)",
          fontSize:"15px", maxWidth:"440px", margin:"0 auto",
          lineHeight:"1.65"
        }}>{t.detectSub}</p>
      </div>

      {/* ── Upload + Camera ── */}
      <div className="upload-container">

        {/* Upload box */}
        <div className="upload-box">
          <h3>📁 {t.uploadImage}</h3>
          <label style={{
            display:"block",
            border:"2px dashed rgba(16,185,129,0.32)",
            borderRadius:"var(--radius-md)",
            padding:"22px 16px",
            textAlign:"center",
            cursor:"pointer",
            background:"var(--emerald-50)",
            transition:"all .22s ease",
            color:"var(--emerald-700)",
            fontSize:"13.5px", fontWeight:"500"
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--emerald-500)";e.currentTarget.style.background="var(--emerald-100)"}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(16,185,129,0.32)";e.currentTarget.style.background="var(--emerald-50)"}}
          >
            <div style={{fontSize:"28px",marginBottom:"8px"}}>📷</div>
            <div>Click to browse image</div>
            <div style={{fontSize:"12px", opacity:0.6, marginTop:"4px"}}>JPG, PNG, WEBP supported</div>
            <input type="file" accept="image/*" onChange={props.handleFileChange} style={{display:"none"}} />
          </label>

          {props.preview && (
            <div style={{marginTop:"14px", borderRadius:"var(--radius-md)", overflow:"hidden", boxShadow:"0 6px 24px rgba(16,185,129,0.18)"}}>
              <img src={props.preview} alt="preview" className="preview" style={{marginTop:0}} />
            </div>
          )}
        </div>

        {/* Camera box */}
        <div className="camera-box">
          <h3>📷 {t.useCamera}</h3>
          <div style={{display:"flex",justifyContent:"center",marginBottom:"16px"}}>
            <button onClick={() => startCamera("user")} style={{
              background:"linear-gradient(135deg,#071a2f,#123b63)",
              padding:"12px 32px", fontSize:"15px"
            }}>
              📷 {t.frontCam}
            </button>
          </div>
          <div style={{borderRadius:"var(--radius-md)", overflow:"hidden", background:"#0d1b2a"}}>
            <video ref={props.videoRef} style={{width:"100%",display:"block"}} />
          </div>
          <div style={{display:"flex",justifyContent:"center",marginTop:"14px"}}>
            <button onClick={props.capturePhoto} style={{
              background:"linear-gradient(135deg,#10b981,#059669)",
              padding:"12px 32px", fontSize:"15px",
              boxShadow:"0 6px 20px rgba(16,185,129,0.35)"
            }}>
              📸 {t.capturePhoto}
            </button>
          </div>
          <canvas ref={props.canvasRef} width="300" height="225" style={{display:"none"}} />
        </div>

      </div>

      {/* ── Predict ── */}
      <div className="predict-container" style={{marginTop:"28px"}}>
        <button
          className="predict-btn"
          onClick={props.handleSubmit}
          disabled={props.loading}
          style={props.loading ? {background:"#94a3b8",boxShadow:"none",transform:"none",cursor:"not-allowed"} : {}}
        >
          {props.loading ? `⏳ ${t.detecting}` : `🔍 ${t.predict}`}
        </button>
      </div>

      {/* ── Error ── */}
      {props.result?.error && (
        <div style={{
          textAlign:"center", color:"#be123c", fontSize:"14.5px",
          background:"#fff1f2", border:"1px solid rgba(244,63,94,0.2)",
          borderRadius:"var(--radius-md)", padding:"14px 24px",
          maxWidth:"480px", margin:"20px auto 0"
        }}>⚠️ {props.result.error}</div>
      )}

      {/* ── No detect ── */}
      {props.result && !props.result.error && !hasResult && (
        <p style={{textAlign:"center",color:"var(--color-text-muted)",fontSize:"14.5px",marginTop:"22px"}}>
          {t.noDetect}
        </p>
      )}

      {/* ── Result card ── */}
      {hasResult && (
        <div className="result">
          <p style={{
            fontSize:"11.5px", fontWeight:"700", letterSpacing:"2px",
            textTransform:"uppercase", color:"var(--color-text-muted)",
            marginBottom:"8px"
          }}>{t.breedLabel}</p>

          <span className="breed-name">{props.result.breed}</span>

          <p style={{fontSize:"13px",color:"var(--color-text-muted)",marginTop:"10px",marginBottom:"2px"}}>
            {t.confLabel}: <strong style={{color:"var(--emerald-600)"}}>{props.result.confidence}%</strong>
          </p>

          <div className="confidence-bar">
            <div className="confidence-fill" style={{width:`${props.result.confidence}%`}} />
          </div>

          <Link className="know-more" to={`/breed-info/${breedKey}`}>
            {t.knowMore}
          </Link>
        </div>
      )}

    </div>
  );
}
