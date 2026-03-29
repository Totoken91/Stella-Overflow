"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSaveStore } from "@/lib/saveStore";
import SaveLoadMenu from "./SaveLoadMenu";

const MENU_BUTTONS = [
  {
    key: "new",
    label: "NOUVELLE PARTIE",
    gradient: "linear-gradient(135deg, #D4F5E9 0%, #B8EDD9 100%)",
    border: "rgba(168, 228, 202, 0.6)",
  },
  {
    key: "continue",
    label: "CONTINUER",
    gradient: "linear-gradient(135deg, #E8E4F8 0%, #D4CEF0 100%)",
    border: "rgba(200, 192, 232, 0.6)",
  },
  {
    key: "load",
    label: "CHARGER",
    gradient: "linear-gradient(135deg, #FFD6E0 0%, #FFBDD5 100%)",
    border: "rgba(255, 143, 171, 0.5)",
  },
  {
    key: "quit",
    label: "QUITTER",
    gradient: "linear-gradient(135deg, #F0E8E0 0%, #E8DDD5 100%)",
    border: "rgba(200, 180, 160, 0.5)",
  },
] as const;

function MenuButton({
  btn,
  index,
  onClick,
}: {
  btn: (typeof MENU_BUTTONS)[number];
  index: number;
  onClick: () => void;
}) {
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });
  const [hovering, setHovering] = useState(false);
  const [shimmer, setShimmer] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      setTilt({
        rotY: ((x - midX) / midX) * 8,
        rotX: ((midY - y) / midY) * 8,
      });
    },
    []
  );

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setHovering(true);
        setShimmer(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
        setTilt({ rotX: 0, rotY: 0 });
        setTimeout(() => setShimmer(false), 600);
      }}
      className="relative w-full overflow-hidden text-center"
      style={{
        fontFamily: "var(--font-dm-mono)",
        fontSize: "0.85rem",
        letterSpacing: "0.15em",
        color: "var(--pink-dark)",
        background: btn.gradient,
        border: `1px solid ${hovering ? btn.border : "rgba(255,255,255,0.3)"}`,
        borderRadius: "16px",
        padding: "1rem 1.5rem",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transform: hovering
          ? `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`
          : "rotateX(0) rotateY(0)",
        transition: hovering
          ? "box-shadow 0.3s ease, border-color 0.3s ease"
          : "transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        boxShadow: hovering
          ? "0 16px 48px rgba(0,0,0,0.12)"
          : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Shimmer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "16px",
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.4) 55%, transparent 60%)",
          transform: shimmer ? undefined : "translateX(-100%)",
          animation: shimmer ? "shimmer 0.6s ease forwards" : "none",
        }}
      />
      <span className="relative z-10">{btn.label}</span>
    </motion.button>
  );
}

export default function MainMenu() {
  const router = useRouter();
  const loadSlots = useSaveStore((s) => s.loadSlots);
  const hasAutosave = useSaveStore((s) => s.hasAutosave);
  const setPendingLoad = useSaveStore((s) => s.setPendingLoad);
  const [exiting, setExiting] = useState(false);
  const [loadMenuOpen, setLoadMenuOpen] = useState(false);
  const [autosaveExists, setAutosaveExists] = useState(false);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  useEffect(() => {
    setAutosaveExists(hasAutosave());
  }, [hasAutosave]);

  const navigateToGame = useCallback(() => {
    sessionStorage.setItem("stella-from-menu", "1");
    setExiting(true);
    setTimeout(() => router.push("/game"), 400);
  }, [router]);

  const handleClick = (key: string) => {
    switch (key) {
      case "new":
        setPendingLoad(null);
        navigateToGame();
        break;
      case "continue":
        if (autosaveExists) {
          setPendingLoad(0);
        } else {
          setPendingLoad(null);
        }
        navigateToGame();
        break;
      case "load":
        setLoadMenuOpen(true);
        break;
      case "quit":
        window.close();
        break;
    }
  };

  const handleLoadSlot = (slotId: number) => {
    setPendingLoad(slotId);
    setLoadMenuOpen(false);
    navigateToGame();
  };

  return (
    <motion.div
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "#1A0A1E", perspective: "800px" }}
      animate={
        exiting
          ? { opacity: 0, scale: 0.98 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.4 }}
    >
      {/* Mesh blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute rounded-full"
          style={{
            width: "50vmax",
            height: "50vmax",
            background: "rgba(255, 214, 224, 0.4)",
            top: "-15%",
            left: "-15%",
            filter: "blur(90px)",
            animation: "blobMove1 18s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "45vmax",
            height: "45vmax",
            background: "rgba(212, 206, 240, 0.4)",
            top: "35%",
            right: "-15%",
            filter: "blur(90px)",
            animation: "blobMove2 22s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "42vmax",
            height: "42vmax",
            background: "rgba(127, 216, 216, 0.4)",
            bottom: "-15%",
            left: "25%",
            filter: "blur(90px)",
            animation: "blobMove3 20s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-4 text-center">
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontStyle: "italic",
            color: "var(--pink-soft)",
            textShadow: "0 0 30px rgba(255,143,171,0.5)",
            animation: "breathe 4s ease-in-out infinite",
          }}
        >
          STELLA{" "}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1em",
              height: "1em",
              verticalAlign: "middle",
              animation: "spin 4s linear infinite",
            }}
          >
            <span
              style={{
                color: "var(--teal)",
                filter: "drop-shadow(0 0 10px rgba(127,216,216,0.8))",
                fontSize: "0.7em",
                lineHeight: 1,
              }}
            >
              ✦
            </span>
          </span>{" "}
          OVERFLOW
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.8rem",
            letterSpacing: "0.3em",
            color: "rgba(255, 179, 198, 0.45)",
            marginTop: "0.5rem",
          }}
        >
          un visual novel
        </p>
      </div>

      {/* Buttons */}
      <div
        className="relative z-10 mt-8 flex flex-col gap-3"
        style={{ width: 280 }}
      >
        {MENU_BUTTONS.map((btn, i) => (
          <MenuButton
            key={btn.key}
            btn={btn}
            index={i}
            onClick={() => handleClick(btn.key)}
          />
        ))}
      </div>

      {/* Load menu overlay */}
      <SaveLoadMenu
        mode="load"
        open={loadMenuOpen}
        onClose={() => setLoadMenuOpen(false)}
        onLoadSlot={handleLoadSlot}
      />
    </motion.div>
  );
}
