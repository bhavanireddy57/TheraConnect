// src/pages/DrawingPad.jsx
/*import React, { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";

const DrawingPad = () => {
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState("#6b21a8"); // purple default
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [saving, setSaving] = useState(false);
  const [caption, setCaption] = useState("");
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/drawings", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setGallery(res.data || []);
    } catch (err) {
      console.error("Failed to fetch drawings", err);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // exportImage returns base64 png data URL
      const dataUrl = await canvasRef.current.exportImage("png");
      // send to backend
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/drawings",
        { image: dataUrl, caption },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          // allow big payloads; server must also allow large body
        }
      );
      setCaption("");
      // refresh gallery
      await fetchGallery();
      alert("Saved drawing!");
    } catch (err) {
      console.error(err);
      alert("Failed to save drawing");
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => canvasRef.current.clearCanvas();
  const handleUndo = () => canvasRef.current.undo();
  const handleRedo = () => canvasRef.current.redo();

  return (
    <div className="bg-purple-50 min-h-screen flex flex-col items-center py-12">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Creative Space</h2>
        <p className="text-gray-600 mb-4">Draw, doodle, and express how you feel — save your sketches to your account.</p>

        <div className="mb-4 flex items-center gap-3">
          <label className="font-medium">Color</label>
          <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} />
          <label className="font-medium ml-4">Brush</label>
          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-40"
          />
          <div className="ml-auto flex gap-2">
            <button onClick={handleUndo} className="px-3 py-1 bg-gray-200 rounded">Undo</button>
            <button onClick={handleRedo} className="px-3 py-1 bg-gray-200 rounded">Redo</button>
            <button onClick={handleClear} className="px-3 py-1 bg-red-100 text-red-700 rounded">Clear</button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            canvasColor="#ffffff"
            style={{ width: "100%", height: 400 }}
          />
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption (optional)"
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {}
        <div className="mt-6">
          <h3 className="font-semibold text-purple-600 mb-2">Your Drawings</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gallery.length === 0 && <p className="text-gray-500 col-span-full">No drawings yet.</p>}
            {gallery.map((g) => (
              <div key={g._id} className="border rounded-lg overflow-hidden bg-purple-50">
                <img src={g.url} alt={g.caption || "drawing"} className="w-full h-32 object-cover" />
                <div className="p-2 text-sm">
                  <p className="truncate">{g.caption}</p>
                  <p className="text-xs text-gray-500">{new Date(g.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingPad;*/



import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const DrawingPad = () => {
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState("#6b21a8"); // default purple
  const [strokeWidth, setStrokeWidth] = useState(6);

  const handleClear = () => canvasRef.current.clearCanvas();
  const handleUndo = () => canvasRef.current.undo();
  const handleRedo = () => canvasRef.current.redo();

  return (
    <div className="bg-purple-50 min-h-screen flex flex-col items-center pt-28 pb-12">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Practice Drawing Pad</h2>
        <p className="text-gray-600 mb-4">
          A free space to doodle and practice. Nothing is saved.
        </p>

        {/* Controls */}
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <label className="font-medium">Color</label>
          <input 
            type="color" 
            value={strokeColor} 
            onChange={(e) => setStrokeColor(e.target.value)} 
          />

          <label className="font-medium ml-4">Brush</label>
          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-40"
          />

          <div className="ml-auto flex gap-2">
            <button 
              onClick={handleUndo} 
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Undo
            </button>
            <button 
              onClick={handleRedo} 
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Redo
            </button>
            <button 
              onClick={handleClear} 
              className="px-3 py-1 bg-red-100 text-red-700 rounded"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Drawing Canvas */}
        <div className="border rounded-lg overflow-hidden">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            canvasColor="#ffffff"
            style={{ width: "100%", height: 400 }}
          />
        </div>
      </div>
    </div>
  );
};

export default DrawingPad;

