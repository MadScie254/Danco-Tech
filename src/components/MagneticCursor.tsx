import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/motion";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    hoveringRef.current = isHovering;
  }, [isHovering]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check if device supports hover (ignore on touch devices)
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      return;
    }

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    const speed = 0.15;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const updateCursor = () => {
      if (!cursor) return;

      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      const elOffset = hoveringRef.current ? 20 : 10;
      xSet(pos.x - elOffset);
      ySet(pos.y - elOffset);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    gsap.ticker.add(updateCursor);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      gsap.ticker.remove(updateCursor);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border border-brand transition-all duration-300 ease-out 
        ${isHovering ? "w-10 h-10 bg-brand/20 backdrop-blur-sm" : "w-5 h-5 bg-transparent"}`}
      style={{
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
