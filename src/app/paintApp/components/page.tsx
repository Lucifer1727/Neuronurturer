"use client";

import type React from "react";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Paintbrush,
  Circle,
  Square,
  Triangle,
  Eraser,
  Undo,
  Redo,
  Download,
  Upload,
  Trash2,
  Palette,
  Sparkles,
  Heart,
  Star,
  Flower,
} from "lucide-react";

interface DrawingState {
  imageData: ImageData | null;
}

const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
  "#F8C471",
  "#82E0AA",
  "#F1948A",
  "#D7BDE2",
  "#AED6F1",
];

const templates = [
  {
    name: "Dinosaur",
    icon: "🦕",
  },
  {
    name: "Butterfly",
    icon: "🦋",
  },
  {
    name: "Flower",
    icon: "🌸",
  },
  {
    name: "House",
    icon: "🏠",
  },
];

export default function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#4ECDC4");
  const [brushSize, setBrushSize] = useState(10);
  const [currentTool, setCurrentTool] = useState("brush");
  const [history, setHistory] = useState<DrawingState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showTemplates, setShowTemplates] = useState(false);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ imageData });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    // Fill with white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial state
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([{ imageData }]);
    setHistoryIndex(0);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (currentTool === "brush") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (currentTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize;
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (currentTool === "brush" || currentTool === "eraser") {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const drawShape = (shape: string, e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = currentColor;
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2;

    const size = brushSize * 2;

    switch (shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case "square":
        ctx.fillRect(x - size, y - size, size * 2, size * 2);
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size, y + size);
        ctx.lineTo(x + size, y + size);
        ctx.closePath();
        ctx.fill();
        break;
      case "heart":
        ctx.beginPath();
        ctx.moveTo(x, y + size / 2);
        ctx.bezierCurveTo(
          x - size,
          y - size / 2,
          x - size * 2,
          y + size / 2,
          x,
          y + size * 1.5
        );
        ctx.bezierCurveTo(
          x + size * 2,
          y + size / 2,
          x + size,
          y - size / 2,
          x,
          y + size / 2
        );
        ctx.fill();
        break;
      case "star":
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5;
          const radius = i % 2 === 0 ? size : size / 2;
          const pointX = x + Math.cos(angle) * radius;
          const pointY = y + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(pointX, pointY);
          else ctx.lineTo(pointX, pointY);
        }
        ctx.closePath();
        ctx.fill();
        break;
    }
    saveState();
  };

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      if (state.imageData) {
        ctx.putImageData(state.imageData, 0, 0);
        setHistoryIndex(newIndex);
      }
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      if (state.imageData) {
        ctx.putImageData(state.imageData, 0, 0);
        setHistoryIndex(newIndex);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "my-artwork.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const loadTemplate = (template: (typeof templates)[0]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas first
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set template drawing style
    ctx.strokeStyle = "#CCCCCC";
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 8]);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    switch (template.name) {
      case "Dinosaur":
        // Draw a simple dinosaur outline
        ctx.beginPath();
        // Body (oval)
        ctx.ellipse(centerX, centerY + 20, 80, 50, 0, 0, 2 * Math.PI);
        ctx.stroke();

        // Head (circle)
        ctx.beginPath();
        ctx.arc(centerX - 60, centerY - 30, 35, 0, 2 * Math.PI);
        ctx.stroke();

        // Neck
        ctx.beginPath();
        ctx.moveTo(centerX - 25, centerY - 15);
        ctx.lineTo(centerX - 35, centerY - 5);
        ctx.stroke();

        // Tail
        ctx.beginPath();
        ctx.moveTo(centerX + 80, centerY + 10);
        ctx.quadraticCurveTo(
          centerX + 120,
          centerY - 20,
          centerX + 140,
          centerY + 30
        );
        ctx.stroke();

        // Legs
        ctx.beginPath();
        ctx.moveTo(centerX - 30, centerY + 70);
        ctx.lineTo(centerX - 30, centerY + 120);
        ctx.moveTo(centerX + 10, centerY + 70);
        ctx.lineTo(centerX + 10, centerY + 120);
        ctx.moveTo(centerX + 50, centerY + 70);
        ctx.lineTo(centerX + 50, centerY + 120);
        ctx.stroke();
        break;

      case "Butterfly":
        // Draw butterfly wings
        ctx.beginPath();
        // Left upper wing
        ctx.ellipse(centerX - 40, centerY - 30, 35, 25, -0.3, 0, 2 * Math.PI);
        ctx.stroke();

        // Right upper wing
        ctx.beginPath();
        ctx.ellipse(centerX + 40, centerY - 30, 35, 25, 0.3, 0, 2 * Math.PI);
        ctx.stroke();

        // Left lower wing
        ctx.beginPath();
        ctx.ellipse(centerX - 30, centerY + 20, 25, 20, -0.2, 0, 2 * Math.PI);
        ctx.stroke();

        // Right lower wing
        ctx.beginPath();
        ctx.ellipse(centerX + 30, centerY + 20, 25, 20, 0.2, 0, 2 * Math.PI);
        ctx.stroke();

        // Body
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 50);
        ctx.lineTo(centerX, centerY + 50);
        ctx.stroke();

        // Antennae
        ctx.beginPath();
        ctx.moveTo(centerX - 5, centerY - 45);
        ctx.lineTo(centerX - 15, centerY - 60);
        ctx.moveTo(centerX + 5, centerY - 45);
        ctx.lineTo(centerX + 15, centerY - 60);
        ctx.stroke();
        break;

      case "Flower":
        // Draw flower petals
        const petalCount = 6;
        const petalRadius = 30;
        const centerRadius = 15;

        for (let i = 0; i < petalCount; i++) {
          const angle = (i * 2 * Math.PI) / petalCount;
          const petalX = centerX + Math.cos(angle) * 40;
          const petalY = centerY + Math.sin(angle) * 40;

          ctx.beginPath();
          ctx.ellipse(petalX, petalY, petalRadius, 15, angle, 0, 2 * Math.PI);
          ctx.stroke();
        }

        // Flower center
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // Stem
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + centerRadius);
        ctx.lineTo(centerX, centerY + 100);
        ctx.stroke();

        // Leaves
        ctx.beginPath();
        ctx.ellipse(centerX - 20, centerY + 60, 15, 8, -0.5, 0, 2 * Math.PI);
        ctx.ellipse(centerX + 20, centerY + 80, 15, 8, 0.5, 0, 2 * Math.PI);
        ctx.stroke();
        break;

      case "House":
        // Draw house outline
        const houseWidth = 120;
        const houseHeight = 80;
        const roofHeight = 40;

        // House base
        ctx.beginPath();
        ctx.rect(
          centerX - houseWidth / 2,
          centerY - houseHeight / 2,
          houseWidth,
          houseHeight
        );
        ctx.stroke();

        // Roof
        ctx.beginPath();
        ctx.moveTo(centerX - houseWidth / 2 - 10, centerY - houseHeight / 2);
        ctx.lineTo(centerX, centerY - houseHeight / 2 - roofHeight);
        ctx.lineTo(centerX + houseWidth / 2 + 10, centerY - houseHeight / 2);
        ctx.stroke();

        // Door
        ctx.beginPath();
        ctx.rect(centerX - 15, centerY + 10, 30, 30);
        ctx.stroke();

        // Windows
        ctx.beginPath();
        ctx.rect(centerX - 45, centerY - 20, 20, 20);
        ctx.rect(centerX + 25, centerY - 20, 20, 20);
        ctx.stroke();

        // Window crosses
        ctx.beginPath();
        ctx.moveTo(centerX - 35, centerY - 20);
        ctx.lineTo(centerX - 35, centerY);
        ctx.moveTo(centerX - 45, centerY - 10);
        ctx.lineTo(centerX - 25, centerY - 10);
        ctx.moveTo(centerX + 35, centerY - 20);
        ctx.lineTo(centerX + 35, centerY);
        ctx.moveTo(centerX + 25, centerY - 10);
        ctx.lineTo(centerX + 45, centerY - 10);
        ctx.stroke();
        break;
    }

    ctx.setLineDash([]);
    saveState();
    setShowTemplates(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-purple-700 flex items-center justify-center gap-2 mb-2">
              <Palette className="w-8 h-8" />
              Creative Paint Studio
              <Sparkles className="w-8 h-8" />
            </h1>
            <p className="text-gray-600">
              Express yourself with colors and shapes!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Paintbrush className="w-5 h-5" />
                Tools
              </h2>

              <div className="space-y-4">
                {/* Drawing Tools */}
                <div>
                  <h3 className="font-semibold mb-2">Drawing Tools</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`flex flex-col items-center gap-1 p-2 rounded border transition-colors ${
                        currentTool === "brush"
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setCurrentTool("brush")}
                    >
                      <Paintbrush className="w-4 h-4" />
                      <span className="text-xs">Brush</span>
                    </button>
                    <button
                      className={`flex flex-col items-center gap-1 p-2 rounded border transition-colors ${
                        currentTool === "eraser"
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setCurrentTool("eraser")}
                    >
                      <Eraser className="w-4 h-4" />
                      <span className="text-xs">Eraser</span>
                    </button>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Shapes */}
                <div>
                  <h3 className="font-semibold mb-2">Shapes</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { tool: "circle", icon: Circle, label: "Circle" },
                      { tool: "square", icon: Square, label: "Square" },
                      { tool: "triangle", icon: Triangle, label: "Triangle" },
                      { tool: "heart", icon: Heart, label: "Heart" },
                      { tool: "star", icon: Star, label: "Star" },
                      { tool: "flower", icon: Flower, label: "Flower" },
                    ].map(({ tool, icon: Icon, label }) => (
                      <button
                        key={tool}
                        className={`flex flex-col items-center gap-1 p-2 rounded border transition-colors ${
                          currentTool === tool
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => setCurrentTool(tool)}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Brush Size */}
                <div>
                  <h3 className="font-semibold mb-2">
                    Brush Size: {brushSize}px
                  </h3>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <hr className="border-gray-200" />

                {/* Colors */}
                <div>
                  <h3 className="font-semibold mb-2">Colors</h3>
                  <div className="grid grid-cols-5 gap-2 mb-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          currentColor === color
                            ? "border-gray-800 scale-110"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setCurrentColor(color)}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    className="w-full h-8 rounded border"
                  />
                </div>

                <hr className="border-gray-200" />

                {/* Actions */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={undo}
                      disabled={historyIndex <= 0}
                    >
                      <Undo className="w-4 h-4" />
                      Undo
                    </button>
                    <button
                      className="flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={redo}
                      disabled={historyIndex >= history.length - 1}
                    >
                      <Redo className="w-4 h-4" />
                      Redo
                    </button>
                  </div>
                  <button
                    className="w-full flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    onClick={() => setShowTemplates(!showTemplates)}
                  >
                    <Upload className="w-4 h-4" />
                    Templates
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    onClick={downloadImage}
                  >
                    <Download className="w-4 h-4" />
                    Save Art
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={clearCanvas}
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Templates */}
            {showTemplates && (
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-lg font-semibold mb-4">
                  Choose a Template
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.name}
                      className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      onClick={() => loadTemplate(template)}
                    >
                      <span className="text-2xl">{template.icon}</span>
                      <span className="text-sm">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Canvas */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="border-2 border-gray-300 rounded-lg shadow-lg cursor-crosshair bg-white"
                  onMouseDown={
                    currentTool === "brush" || currentTool === "eraser"
                      ? startDrawing
                      : undefined
                  }
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onClick={
                    [
                      "circle",
                      "square",
                      "triangle",
                      "heart",
                      "star",
                      "flower",
                    ].includes(currentTool)
                      ? (e) => drawShape(currentTool, e)
                      : undefined
                  }
                />
              </div>
              <div className="mt-4 flex justify-center gap-4 text-sm text-gray-600">
                <span className="px-2 py-1 bg-gray-100 rounded">
                  Current Tool: {currentTool}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded">
                  Color: {currentColor}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded">
                  Size: {brushSize}px
                </span>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold mb-4">How to Use</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">🎨 Drawing</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Select brush tool and drag to draw</li>
                    <li>• Choose colors from the palette</li>
                    <li>• Adjust brush size with the slider</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔷 Shapes</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Select a shape tool</li>
                    <li>• Click on canvas to place shapes</li>
                    <li>• Size changes with brush size</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📋 Templates</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Click Templates to see options</li>
                    <li>• Choose a template to trace</li>
                    <li>• Dotted lines guide your drawing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💾 Saving</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Use Undo/Redo for mistakes</li>
                    <li>• Save Art downloads your creation</li>
                    <li>• Clear starts fresh</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
