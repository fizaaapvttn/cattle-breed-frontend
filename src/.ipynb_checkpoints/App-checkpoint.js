import React, { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [animal, setAnimal] = useState("cattle");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("animal", animal);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <div className="card">
        <h1>🐄 Breed Recognition System</h1>
        <p className="subtitle">
          Image-based Cattle & Buffalo Breed Identification using Deep Learning
        </p>

        <select value={animal} onChange={(e) => setAnimal(e.target.value)}>
          <option value="cattle">Cattle</option>
          <option value="buffalo">Buffalo</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img src={preview} alt="preview" className="preview" />
        )}

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Predicting..." : "Predict Breed"}
        </button>

        {result && !result.error && (
          <div className="result">
            <h2>Prediction Result</h2>
            <p><b>Animal:</b> {result.animal}</p>
            <p><b>Breed:</b> {result.breed}</p>
            <p><b>Confidence:</b> {result.confidence}%</p>
          </div>
        )}

        {result?.error && <p className="error">{result.error}</p>}
      </div>
    </div>
  );
}

export default App;
