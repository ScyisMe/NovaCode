"use client";

import { useEffect, useRef } from "react";

export function AnimatedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    let time = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR for perf
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastRender = 0;
    const targetInterval = 1000 / 30; // 30fps cap

    const render = (timestamp: number) => {
      frameRef.current = requestAnimationFrame(render);

      // Throttle to ~30fps
      if (timestamp - lastRender < targetInterval) return;
      lastRender = timestamp;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.525;

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Reduced point density: 0.22 step instead of 0.15 → ~60% fewer points
      const phiStep = 0.22;
      const thetaStep = 0.22;

      const points: { x: number; y: number; z: number; char: string }[] = [];

      for (let phi = 0; phi < Math.PI * 2; phi += phiStep) {
        for (let theta = 0; theta < Math.PI; theta += thetaStep) {
          const sinT = Math.sin(theta);
          const cosT = Math.cos(theta);
          const x = sinT * Math.cos(phi + time * 0.5);
          const y = sinT * Math.sin(phi + time * 0.5);
          const z = cosT;

          const rotY = time * 0.3;
          const cosRY = Math.cos(rotY);
          const sinRY = Math.sin(rotY);
          const newX = x * cosRY - z * sinRY;
          const newZ = x * sinRY + z * cosRY;

          const rotX = time * 0.2;
          const cosRX = Math.cos(rotX);
          const sinRX = Math.sin(rotX);
          const newY = y * cosRX - newZ * sinRX;
          const finalZ = y * sinRX + newZ * cosRX;

          const depth = (finalZ + 1) / 2;
          const charIndex = Math.floor(depth * (chars.length - 1));

          points.push({
            x: centerX + newX * radius,
            y: centerY + newY * radius,
            z: finalZ,
            char: chars[charIndex],
          });
        }
      }

      points.sort((a, b) => a.z - b.z);

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const alpha = 0.15 + (point.z + 1) * 0.35;
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillText(point.char, point.x, point.y);
      }

      time += 0.02;
    };

    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block", willChange: "contents" }}
    />
  );
}

