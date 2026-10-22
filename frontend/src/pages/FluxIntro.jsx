
import { useEffect, useState } from "react";

const FluxIntro = () => {
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTagline(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090a] text-white">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff12 1px, transparent 1px), linear-gradient(90deg, #ffffff12 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-amber-500/[0.12] blur-[100px] sm:h-[440px] sm:w-[440px]" />

      <section className="relative flex flex-col items-center px-6 text-center">
        {/* Animated logo */}
        <div className="relative mb-8 flex h-[76px] w-[76px] animate-[introLogo_800ms_ease-out_both] items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.035] shadow-[0_0_60px_rgba(245,158,11,0.08)]">
          <div className="absolute inset-2 rounded-[18px] border border-amber-300/15" />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-9 w-9 text-amber-200"
          >
            <path d="m8 8-4 4 4 4" />
            <path d="m16 8 4 4-4 4" />
            <path d="m14 4-4 16" />
          </svg>

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.8)]" />
        </div>

        {/* Brand */}
        <h1 className="animate-[introText_900ms_ease-out_both] text-5xl font-medium tracking-[-0.075em] sm:text-7xl">
          flux<span className="text-zinc-500">.ide</span>
        </h1>

        {/* Tagline */}
        <p
          className={`mt-4 text-xs tracking-[0.32em] text-zinc-500 transition-all duration-700 sm:text-sm ${
            showTagline
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          CODE IN MOTION.
        </p>

        {/* Loading indicator */}
        <div className="mt-14 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-300/60" />

          <div className="flex gap-1.5">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-200"
                style={{ animationDelay: `${dot * 180}ms` }}
              />
            ))}
          </div>

          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-300/60" />
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-zinc-600">
          Preparing your environment
        </p>
      </section>

      {/* Bottom status */}
      <footer className="absolute inset-x-0 bottom-7 flex items-center justify-center gap-2 text-[10px] tracking-wider text-zinc-600">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        FLUX ENGINE INITIALIZING
      </footer>

      <style>{`
        @keyframes introLogo {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.88);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes introText {
          from {
            opacity: 0;
            transform: translateY(12px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </main>
  );
};

export default FluxIntro;
