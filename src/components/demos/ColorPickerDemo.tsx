
import { useState } from "react";

type ColorOption = {
  name: string;
  hex: string;
};

function ColorPickerDemo() {
  // ✅ Array of colors with names & hex codes
  const colors: ColorOption[] = [
    { name: "Pink",  hex: "#f508d5ff" },
    { name: "Green", hex: "#4caf50"   },
    { name: "Blue",  hex: "#2196f3"   },
    { name: "Yellow",hex: "#f7e707ff" },
    { name: "Purple",hex: "#7227b0ff" },
    { name: "Red",   hex: "#f52b2bff" },
  ];

  // ✅ Selected color (default = first color)
  const [selected, setSelected] = useState<ColorOption>(colors[0]);

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h3>Color Picker Demo</h3>

      {/* ✅ Preview box */}
      <div
        role="img"
        aria-label={`Selected color preview: ${selected.name}`}
        style={{
          width: "120px",
          height: "120px",
          background: selected.hex,
          margin: "1rem auto",
          borderRadius: "8px",
          border: "2px solid #ddd",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      />

      {/* ✅ Color buttons */}
      <div
        role="listbox"
        aria-label="Pick a color"
        style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
      >
        {colors.map((c) => {
          const isSelected = selected.hex === c.hex;
          return (
            <button
              key={c.hex}
              aria-label={c.name}
              aria-selected={isSelected}
              onClick={() => setSelected(c)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: isSelected ? "3px solid black" : "2px solid #ccc",
                background: c.hex,
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              title={`${c.name} (${c.hex})`}
            />
          );
        })}
      </div>

      {/* ✅ Selected color label (format: selected : Pink   Code) */}
      <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
        {/* Change casing/spacing here to match exactly your required string */}
        selected : <span style={{ color: selected.hex }}>{selected.name}</span>  Code: {selected.hex}
      </p>
    </div>
  );
}

export default ColorPickerDemo;
