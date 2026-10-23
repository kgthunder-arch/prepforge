import React from "react";

interface ParticleConfig {
  top: string;
  left: string;
  size: number;
  drift: "a" | "b" | "c";
  delay: string;
  duration: string;
  colorVar: string;
  glow?: boolean;
}

// 20 sparse, widely spaced particles across the hero section
const PARTICLES: ParticleConfig[] = [
  // Upper left quadrant
  { top: "10%", left: "7%", size: 3, drift: "a", delay: "0s", duration: "14s", colorVar: "var(--accent-primary)" },
  { top: "22%", left: "22%", size: 2, drift: "b", delay: "2.4s", duration: "17s", colorVar: "var(--accent-gold)" },
  { top: "34%", left: "11%", size: 2, drift: "a", delay: "1.2s", duration: "15s", colorVar: "var(--accent-gold)" },
  { top: "8%", left: "36%", size: 3, drift: "c", delay: "3.5s", duration: "16s", colorVar: "var(--accent-primary)" },
  
  // Mid & lower left quadrant
  { top: "48%", left: "30%", size: 3, drift: "b", delay: "5.5s", duration: "20s", colorVar: "var(--accent-primary)" },
  { top: "64%", left: "16%", size: 2, drift: "c", delay: "3.2s", duration: "13s", colorVar: "var(--accent-gold)" },
  { top: "79%", left: "26%", size: 4, drift: "a", delay: "6.0s", duration: "18s", colorVar: "var(--accent-primary)", glow: true },
  { top: "88%", left: "9%", size: 2, drift: "b", delay: "0.8s", duration: "19s", colorVar: "var(--accent-primary)" },

  // Center column
  { top: "16%", left: "50%", size: 4, drift: "c", delay: "4.1s", duration: "19s", colorVar: "var(--accent-primary)", glow: true },
  { top: "42%", left: "54%", size: 2, drift: "b", delay: "6.4s", duration: "22s", colorVar: "var(--accent-gold)" },
  { top: "70%", left: "46%", size: 5, drift: "a", delay: "1.5s", duration: "16s", colorVar: "var(--accent-primary)", glow: true },
  { top: "89%", left: "56%", size: 2, drift: "c", delay: "4.0s", duration: "17s", colorVar: "var(--accent-primary)" },

  // Upper right quadrant
  { top: "9%", left: "67%", size: 2, drift: "c", delay: "1.7s", duration: "15s", colorVar: "var(--accent-gold)" },
  { top: "17%", left: "84%", size: 3, drift: "a", delay: "4.8s", duration: "18s", colorVar: "var(--accent-primary)" },
  { top: "27%", left: "93%", size: 2, drift: "b", delay: "2.1s", duration: "14s", colorVar: "var(--accent-gold)" },
  
  // Mid & lower right quadrant
  { top: "39%", left: "68%", size: 4, drift: "c", delay: "0.5s", duration: "21s", colorVar: "var(--accent-primary)", glow: true },
  { top: "54%", left: "81%", size: 2, drift: "a", delay: "3.9s", duration: "16s", colorVar: "var(--accent-primary)" },
  { top: "67%", left: "91%", size: 3, drift: "b", delay: "7.2s", duration: "19s", colorVar: "var(--accent-gold)" },
  { top: "79%", left: "72%", size: 2, drift: "c", delay: "2.8s", duration: "15s", colorVar: "var(--accent-primary)" },
  { top: "91%", left: "86%", size: 3, drift: "a", delay: "5.1s", duration: "18s", colorVar: "var(--accent-gold)" }
];

export const HeroParticles: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {PARTICLES.map((p, idx) => (
        <span
          key={idx}
          className={`hero-particle hero-particle-drift-${p.drift}`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.colorVar,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: p.glow ? `0 0 ${p.size * 2}px ${p.colorVar}` : undefined,
          }}
        />
      ))}
    </div>
  );
};
