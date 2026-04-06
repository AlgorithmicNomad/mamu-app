"use client";

import { useEffect, useRef, useState } from "react";

const LANGS = [
  { text: "ಬೆಳಗಾವಿ", font: "'Noto Sans Kannada', sans-serif" },
  { text: "Belagavi",  font: "inherit" },
  { text: "बेलगावी",  font: "'Noto Sans Devanagari', sans-serif" },
];

export function BelagaviInlineText() {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const transitioning = useRef(false);

  useEffect(() => {
    // Preload Google Fonts once
    if (!document.getElementById("belgavi-fonts")) {
      const link = document.createElement("link");
      link.id = "belgavi-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@600&family=Noto+Sans+Devanagari:wght@600&display=swap";
      document.head.appendChild(link);
    }

    const interval = setInterval(() => {
      if (transitioning.current) return;
      transitioning.current = true;
      setPhase("out");
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % LANGS.length);
        setPhase("in");
        transitioning.current = false;
      }, 220);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const lang = LANGS[current];

  return (
    <span
      style={{
        fontFamily: lang.font,
        display: "inline-block",
        opacity: phase === "in" ? 1 : 0,
        transform:
          phase === "in"
            ? "translateY(0) scale(1)"
            : "translateY(-8px) scale(0.95)",
        transition: "opacity 220ms ease, transform 220ms ease",
        willChange: "opacity, transform",
      }}
    >
      {lang.text}
    </span>
  );
}
