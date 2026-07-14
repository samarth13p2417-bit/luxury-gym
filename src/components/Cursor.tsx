"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "play" | "drag">("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    // Smooth cursor interpolation using requestAnimationFrame
    const animateCursor = () => {
      const ease = 0.15; // Interpolation factor for smooth lag effect
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;

      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }
      requestAnimationFrame(animateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        const type = interactive.getAttribute("data-cursor") as any;
        const text = interactive.getAttribute("data-cursor-text") || "";
        setCursorType(type || "hover");
        setCursorText(text);
      } else {
        const isLink = target.closest("a, button, [role='button'], input, select, textarea");
        if (isLink) {
          setCursorType("hover");
          setCursorText("");
        } else {
          setCursorType("default");
          setCursorText("");
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    window.addEventListener("mouseover", handleMouseOver);

    const animFrame = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-6 h-6 rounded-full bg-white pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center text-center select-none overflow-hidden
        ${cursorType === "hover" ? "w-14 h-14 bg-accent-green mix-blend-normal text-black font-extrabold text-[8px] tracking-wider uppercase scale-100" : ""}
        ${cursorType === "play" ? "w-16 h-16 bg-accent-orange mix-blend-normal text-white font-extrabold text-[9px] tracking-wider uppercase scale-100" : ""}
        ${cursorType === "drag" ? "w-20 h-20 bg-white mix-blend-normal text-black border border-black/10 font-extrabold text-[9px] tracking-wider uppercase scale-100" : ""}
      `}
      style={{
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      {cursorType !== "default" && cursorText && (
        <span className="text-[9px] font-bold text-center block leading-none select-none tracking-widest text-black">
          {cursorText}
        </span>
      )}
    </div>
  );
}
