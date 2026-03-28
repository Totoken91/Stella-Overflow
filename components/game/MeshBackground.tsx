"use client";

export default function MeshBackground() {
  return (
    <div className="noise-overlay pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Pink blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "45vmax",
          height: "45vmax",
          background: "rgba(255, 214, 224, 0.18)",
          top: "-10%",
          left: "-10%",
          filter: "blur(80px)",
          animation: "blobMove1 18s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
      {/* Lavender blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "40vmax",
          height: "40vmax",
          background: "rgba(212, 206, 240, 0.13)",
          top: "40%",
          right: "-10%",
          filter: "blur(80px)",
          animation: "blobMove2 22s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
      {/* Teal blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "38vmax",
          height: "38vmax",
          background: "rgba(127, 216, 216, 0.13)",
          bottom: "-10%",
          left: "30%",
          filter: "blur(80px)",
          animation: "blobMove3 20s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
    </div>
  );
}
