"use client";
import { useState, useEffect } from "react";

export default function WindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const getBreakpoint = (width: number) => {
    if (width < 640) return { name: "xs", color: "bg-red-500" };
    if (width < 768) return { name: "sm", color: "bg-orange-500" };
    if (width < 1024) return { name: "md", color: "bg-yellow-500" };
    if (width < 1280) return { name: "lg", color: "bg-green-500" };
    if (width < 1536) return { name: "xl", color: "bg-blue-500" };
    return { name: "2xl", color: "bg-purple-500" };
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const breakpoint = getBreakpoint(dimensions.width);

  return (
    <div className="fixed right-4 bottom-4 z-99 rounded-lg border border-white/20 bg-black/90 p-3 font-mono text-xl text-white shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-gray-400">W:</span>
          <span className="font-bold">{dimensions.width}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-400">H:</span>
          <span className="font-bold">{dimensions.height}</span>
        </div>
        <div className={`${breakpoint.color} rounded px-2 py-0.5 font-bold text-white`}>
          {breakpoint.name}
        </div>
      </div>
    </div>
  );
}
