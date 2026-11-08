// Pure SVG Arc Reactor — server-renderable, CSS-driven animation.
export default function ArcReactor({ size = 420 }: { size?: number }) {
  const C = 210;
  const coils = Array.from({ length: 10 }, (_, i) => i * 36);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 420 420"
        width={size}
        height={size}
        role="img"
        aria-label="Arc reactor visualization"
      >
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#eafcff" />
            <stop offset="35%" stopColor="#7fe9ff" />
            <stop offset="70%" stopColor="#1aa7d6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0a6e96" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#3ae0ff" stopOpacity="0" />
            <stop offset="82%" stopColor="#3ae0ff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#3ae0ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="coilGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9cecff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1d8fb8" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* halo */}
        <circle cx={C} cy={C} r={205} fill="url(#haloGrad)" />

        {/* outer rotating dashed ring */}
        <g style={{ transformOrigin: "210px 210px", animation: "spin-slow-kf 26s linear infinite" }}>
          <circle
            cx={C} cy={C} r={196} fill="none"
            stroke="rgba(58,224,255,0.35)" strokeWidth="1.2"
            strokeDasharray="3 14"
          />
          <circle
            cx={C} cy={C} r={184} fill="none"
            stroke="rgba(58,224,255,0.2)" strokeWidth="1"
            strokeDasharray="42 10"
          />
        </g>

        {/* counter-rotating tick ring */}
        <g style={{ transformOrigin: "210px 210px", animation: "spin-slow-kf 38s linear infinite reverse" }}>
          <circle
            cx={C} cy={C} r={168} fill="none"
            stroke="rgba(242,176,76,0.4)" strokeWidth="6"
            strokeDasharray="2 18.6"
          />
        </g>

        {/* copper-ish winding */}
        <circle cx={C} cy={C} r={150} fill="none" stroke="rgba(242,176,76,0.22)" strokeWidth="3" />
        <circle cx={C} cy={C} r={143} fill="none" stroke="rgba(58,224,255,0.16)" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash-flow" />

        {/* 10 energy coils */}
        {coils.map((deg) => {
          const rad = ((deg - 90) * Math.PI) / 180;
          const tipR = 136;
          const baseR = 84;
          const halfArc = 9; // degrees half-width at base
          const a1 = rad - (halfArc * Math.PI) / 180;
          const a2 = rad + (halfArc * Math.PI) / 180;
          const tx = C + tipR * Math.cos(rad);
          const ty = C + tipR * Math.sin(rad);
          const b1x = C + baseR * Math.cos(a1);
          const b1y = C + baseR * Math.sin(a1);
          const b2x = C + baseR * Math.cos(a2);
          const b2y = C + baseR * Math.sin(a2);
          return (
            <polygon
              key={deg}
              points={`${tx},${ty} ${b1x},${b1y} ${b2x},${b2y}`}
              fill="rgba(58,224,255,0.07)"
              stroke="url(#coilGrad)"
              strokeWidth="1.4"
            />
          );
        })}

        {/* inner ring */}
        <circle cx={C} cy={C} r={76} fill="none" stroke="rgba(156,236,255,0.6)" strokeWidth="1.6" />
        <circle cx={C} cy={C} r={70} fill="none" stroke="rgba(58,224,255,0.25)" strokeWidth="8" strokeDasharray="10 6" className="animate-dash-flow" />

        {/* core */}
        <circle cx={C} cy={C} r={58} fill="url(#coreGrad)" className="animate-pulse-core" />
        <circle cx={C} cy={C} r={20} fill="#eafcff" opacity="0.95" className="animate-pulse-core" style={{ animationDelay: "0.4s" }} />

        {/* orbiting gold indicator */}
        <g style={{ transformOrigin: "210px 210px", animation: "spin-slow-kf 12s linear infinite" }}>
          <circle cx={C + 150} cy={C} r={3.4} fill="#f2b04c">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      {/* readout */}
      <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
        <p className="font-mono text-[9.5px] tracking-[0.42em] text-cyan-glow/80">
          CORE OUTPUT: 3.4 GJ/S
        </p>
        <p className="font-mono text-[8.5px] tracking-[0.3em] text-dim">
          PALLADIUM-FREE · OPERATOR-POWERED
        </p>
      </div>
    </div>
  );
}
