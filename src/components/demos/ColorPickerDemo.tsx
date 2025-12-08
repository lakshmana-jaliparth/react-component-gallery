import { useState } from "react";

function ColorPickerDemo() {
  // ✅ Array of colors to choose from
  const colors = ["#8f3636ff", "#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#333333ff"];

  // ✅ Selected color (default = first color)
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h3>Color Picker (Boxes)</h3>

      {/* ✅ Grid of color boxes */}
      <div
        role="listbox"
        aria-label="Choose a color"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 44px)",
          gap: "10px",
          justifyContent: "center",
          margin: "1rem auto",
        }}
      >
        {colors.map((color) => {
          const isSelected = selectedColor === color;
          return (
            <button
              key={color}
              role="option"
              aria-selected={isSelected}
              onClick={() => setSelectedColor(color)}
              onKeyDown={(e) => {
                // ✅ Simple keyboard support: Enter/Space selects
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedColor(color);
                }
              }}
              title={color}
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                background: color,
                border: isSelected ? "3px solid #000" : "2px solid #ccc",
                boxShadow: isSelected ? "0 0 0 3px rgba(0,0,0,0.1) inset" : "none",
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>

      {/* ✅ Selected color shown separately */}
      <div
        aria-label="Selected color"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
          border: "1px solid #e0e0e0",
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: "1px solid #ddd",
            background: selectedColor,
          }}
        />
        <div style={{ textAlign: "left" }}>
          <div style={{ fontWeight: 700 }}>Selected</div>
          <div style={{ fontFamily: "monospace" }}>{selectedColor}</div>
        </div>
      </div>

      {/* ✅ Large preview kept separate from selection */}
      <div
        style={{
          width: 180,
          height: 120,
          background: selectedColor,
          margin: "1rem auto",
          borderRadius: 12,
          border: "2px solid #ddd",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontWeight: 700,
          textShadow: "0 1px 2px rgba(0,0,0,0.35)",
        }}
      >
        Preview
      </div>
    </div>
  );
}