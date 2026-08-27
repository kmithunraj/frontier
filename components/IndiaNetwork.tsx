"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const nodes = [
  { id: "del", cx: 38, cy: 26, label: "Delhi", r: 3.2 },
  { id: "mum", cx: 28, cy: 56, label: "Mumbai", r: 3.6 },
  { id: "blr", cx: 42, cy: 72, label: "Bengaluru", r: 4 },
  { id: "hyd", cx: 46, cy: 62, label: "Hyderabad", r: 2.8 },
  { id: "che", cx: 50, cy: 78, label: "Chennai", r: 2.6 },
  { id: "pun", cx: 32, cy: 60, label: "Pune", r: 2.4 },
  { id: "amd", cx: 30, cy: 44, label: "Ahmedabad", r: 2.2 },
  { id: "kol", cx: 62, cy: 48, label: "Kolkata", r: 2.8 },
];

const links = [
  ["del", "mum"],
  ["del", "kol"],
  ["mum", "blr"],
  ["mum", "pun"],
  ["blr", "hyd"],
  ["blr", "che"],
  ["hyd", "kol"],
  ["amd", "mum"],
  ["del", "hyd"],
  ["pun", "blr"],
];

type Props = {
  className?: string;
  showLabels?: boolean;
  interactive?: boolean;
};

export function IndiaNetwork({
  className,
  showLabels = true,
  interactive = false,
}: Props) {
  const reduce = useReducedMotion();
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className={cn("relative w-full h-full min-h-[280px]", className)}>
      <svg
        viewBox="0 0 100 100"
        className={cn(
          "w-full h-full overflow-visible",
          !reduce && "animate-drift"
        )}
        role="img"
        aria-label="Abstract network map of India's startup cities converging"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c6f04d" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c6f04d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c6f04d" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#c6f04d" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7a9bb8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Soft geographic silhouette suggestion */}
        <path
          d="M34 12 C40 10, 48 14, 52 22 C58 20, 66 28, 68 38 C72 42, 74 52, 70 60 C66 70, 58 78, 52 86 C46 92, 40 90, 36 84 C30 78, 26 68, 24 58 C20 48, 22 36, 26 28 C28 20, 30 14, 34 12 Z"
          fill="rgba(243,241,234,0.02)"
          stroke="rgba(243,241,234,0.08)"
          strokeWidth="0.3"
        />

        <circle cx="42" cy="55" r="28" fill="url(#glow)" opacity="0.5" />

        {links.map(([a, b], i) => {
          const n1 = byId[a];
          const n2 = byId[b];
          return (
            <line
              key={`${a}-${b}`}
              x1={n1.cx}
              y1={n1.cy}
              x2={n2.cx}
              y2={n2.cy}
              stroke="url(#lineGrad)"
              strokeWidth="0.35"
              className={!reduce ? "animate-draw-line" : undefined}
              style={!reduce ? { animationDelay: `${i * 0.12}s` } : undefined}
            />
          );
        })}

        {nodes.map((n, i) => (
          <g key={n.id}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r + 2.5}
              fill="rgba(198,240,77,0.08)"
              className={!reduce ? "animate-pulse-node" : undefined}
              style={!reduce ? { animationDelay: `${i * 0.35}s` } : undefined}
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="#c6f04d"
              className={interactive ? "cursor-pointer" : undefined}
            />
            {showLabels ? (
              <text
                x={n.cx + n.r + 1.5}
                y={n.cy + 0.8}
                fill="rgba(243,241,234,0.55)"
                fontSize="2.4"
                fontFamily="var(--font-jetbrains), monospace"
                letterSpacing="0.08"
              >
                {n.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
}
