"use client";

export default function MeshBackground() {
  return (
    <div
      className="noise-overlay pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #2C1A2E 0%, #1A1520 40%, #152025 100%)" }}
    >
      {/* Pink blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "50vmax",
          height: "50vmax",
          background: "rgba(255, 214, 224, 0.45)",
          top: "-15%",
          left: "-15%",
          filter: "blur(90px)",
          animation: "blobMove1 18s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
      {/* Lavender blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "45vmax",
          height: "45vmax",
          background: "rgba(212, 206, 240, 0.35)",
          top: "35%",
          right: "-15%",
          filter: "blur(90px)",
          animation: "blobMove2 22s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
      {/* Teal blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "42vmax",
          height: "42vmax",
          background: "rgba(127, 216, 216, 0.35)",
          bottom: "-15%",
          left: "25%",
          filter: "blur(90px)",
          animation: "blobMove3 20s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
    </div>
  );
}
