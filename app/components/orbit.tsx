"use client";

import { useEffect, useRef } from "react";

export default function Orbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      angle = 0,
      visible = true;
    let pointer = { x: 0, y: 0 };
    let width = 0,
      height = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reduced.matches) draw();
    };
    function project(lat: number, lon: number) {
      const x = Math.cos(lat) * Math.cos(lon + angle);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.sin(lon + angle);
      const tilt = -0.35 + pointer.y * 0.08;
      const yy = y * Math.cos(tilt) - z * Math.sin(tilt);
      const zz = y * Math.sin(tilt) + z * Math.cos(tilt);
      const radius = Math.min(width, height) * 0.36;
      const perspective = 3.5 / (3.5 - zz);
      return {
        x: width / 2 + x * radius * perspective + pointer.x * 7,
        y: height / 2 + yy * radius * perspective,
        z: zz,
      };
    }
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let line = 0; line < 25; line++) {
        for (let step = 0; step < 100; step++) {
          const longitude = (line * Math.PI * 2) / 25;
          const latitude = (step * Math.PI) / 100 - Math.PI / 2;
          const a = project(latitude, longitude),
            b = project(latitude + Math.PI / 100, longitude);
          ctx.strokeStyle = `rgba(255,255,255,${0.09 + (a.z + 1) * 0.3})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (let line = 1; line < 15; line++) {
        for (let step = 0; step < 100; step++) {
          const latitude = (line * Math.PI) / 15 - Math.PI / 2;
          const a = project(latitude, (step * Math.PI * 2) / 100);
          const b = project(latitude, ((step + 1) * Math.PI * 2) / 100);
          ctx.strokeStyle = `rgba(255,255,255,${0.08 + (a.z + 1) * 0.27})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const point = project(0.28, 1.2);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    let previous = 0;
    function tick(time: number) {
      if (visible && !document.hidden && time - previous > 32) {
        angle += 0.003;
        draw();
        previous = time;
      }
      frame = requestAnimationFrame(tick);
    }
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      };
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(canvas);
    const motion = () => {
      cancelAnimationFrame(frame);
      draw();
      if (!reduced.matches) frame = requestAnimationFrame(tick);
    };
    canvas.addEventListener("pointermove", move);
    reduced.addEventListener("change", motion);
    resize();
    motion();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("pointermove", move);
      reduced.removeEventListener("change", motion);
    };
  }, []);
  return (
    <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
  );
}
