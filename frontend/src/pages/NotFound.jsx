
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Code2, Terminal } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090a] px-5 py-12 text-white">
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
      <div className="pointer-events-none absolute left-1/2 top-[40%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.10] blur-[100px] sm:h-[440px] sm:w-[440px]" />

      <section className="relative w-full max-w-2xl">
        {/* Header */}
        <header className="mb-16 flex items-center justify-between sm:mb-20">
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] transition-colors group-hover:border-amber-300/30">
              <Code2 size={19} className="text-amber-200" />
            </div>

            <span className="text-lg font-medium tracking-[-0.06em]">
              flux<span className="text-zinc-500">.ide</span>
            </span>
          </Link>

          <span className="hidden font-mono text-[10px] tracking-[0.2em] text-zinc-600 sm:block">
            ROUTE RECOVERY
          </span>
        </header>

        {/* Error content */}
        <div className="animate-[notFoundEnter_700ms_ease-out_both]">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.6)]" />

            <span className="font-mono text-[10px] tracking-[0.25em] text-amber-200/80 sm:text-xs">
              ERROR 404 · ROUTE NOT FOUND
            </span>
          </div>

          {/* Large 404 */}
          <div className="relative">
            <div className="pointer-events-none absolute -left-6 -top-8 select-none font-mono text-[120px] font-bold leading-none tracking-tighter text-white/[0.025] sm:-left-10 sm:-top-12 sm:text-[180px]">
              404
            </div>

            <h1 className="relative font-mono text-[100px] font-medium leading-none tracking-[-0.09em] text-white sm:text-[150px]">
              4<span className="text-amber-200">0</span>4
            </h1>
          </div>

          <h2 className="mt-7 max-w-lg text-2xl font-medium tracking-tight text-zinc-100 sm:text-4xl">
            Looks like this path
            <span className="text-zinc-500"> lost its flow.</span>
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-500 sm:text-base">
            The page you're looking for doesn't exist in this workspace. It
            may have moved, been removed, or the URL might be incorrect.
          </p>

          {/* Terminal panel */}
          <div className="mt-9 overflow-hidden rounded-xl border border-white/[0.09] bg-[#0d0e10]/90 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-red-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-300/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />

              <span className="ml-2 font-mono text-[10px] text-zinc-600">
                flux-terminal
              </span>

              <Terminal size={14} className="ml-auto text-zinc-600" />
            </div>

            <div className="space-y-3 p-4 font-mono text-xs leading-5 sm:p-5 sm:text-sm">
              <p className="break-all text-zinc-500">
                <span className="text-amber-200">$</span>{" "}
                flux inspect-route "{location.pathname}"
              </p>

              <p className="text-red-300/90">
                <span className="mr-2 text-zinc-600">ERR</span>
                ROUTE_NOT_FOUND
              </p>

              <p className="text-zinc-500">
                No matching route was found in the current environment.
              </p>

              <p className="text-zinc-600">
                <span className="mr-2 text-amber-200">→</span>
                Check the URL or return to your workspace.
                <span className="ml-1 inline-block h-3.5 w-1 animate-pulse bg-amber-200/70 align-middle" />
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-200 px-5 py-3 text-sm font-medium text-[#17130a] transition duration-200 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-[#08090a]"
            >
              <Code2 size={16} />
              Back to Workspace
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-5 py-3 text-sm text-zinc-300 transition hover:border-amber-200/20 hover:bg-white/[0.05] hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-200/60"
            >
              <ArrowLeft size={15} />
              Go Back
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-5 font-mono text-[9px] tracking-[0.18em] text-zinc-600 sm:mt-20 sm:text-[10px]">
          <span>FLUX.IDE</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-200/70" />
            CODE IN MOTION.
          </span>
        </footer>
      </section>

      {/* Page animation */}
      <style>{`
        @keyframes notFoundEnter {
          from {
            opacity: 0;
            transform: translateY(14px);
            filter: blur(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
};

export default NotFound;
