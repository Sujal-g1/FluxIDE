import { motion } from "framer-motion";
import { Folder, Star, Zap, Sparkles, ChevronRight, X, Settings, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ activeSession, setActiveSession, onClose }) => {
  const navigate = useNavigate();
  const {userData} =  useSelector(state=> state.user)
  const projectState = useSelector((s) => s.project);
  const projects = projectState?.projects || [];
  const starred = projectState?.starredProjects || [];

  const navItems = [
    {
      id: "projects",
      label: "Projects",
      description: "Your workspaces",
      icon: Folder,
      count: projects.length,
    },
    {
      id: "starred",
      label: "Starred",
      description: "Quick access",
      icon: Star,
      count: starred.length,
    },
  ];

  return (
    <aside className="relative flex h-full w-[264px] shrink-0 flex-col overflow-hidden border-r border-white/[0.06] bg-[#0a0b10]/95 px-3.5 py-4 backdrop-blur-xl">
      {/* Ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 h-48 w-48 rounded-full bg-blue-500/[0.08] blur-3xl"
      />

      {/* Mobile close */}
      {onClose && (
        <div className="mb-2 flex items-center justify-between px-1 md:hidden">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      {/* <div className="mb-3 px-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Workspace
        </p>
      </div> */}

      {/* Nav */}
      <nav className="relative flex flex-col gap-1" aria-label="Workspace">
        {navItems.map((item) => {
          const isActive = activeSession === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={{ scale: 0.985 }}
              onClick={() => setActiveSession(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-400 ${
                isActive
                  ? "border border-white/[0.1] bg-white/[0.07] text-white"
                  : "border border-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-gradient-to-b from-blue-400 to-fuchsia-400"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? "bg-white/[0.09] text-blue-300"
                    : "bg-white/[0.04] text-zinc-400 group-hover:bg-white/[0.07] group-hover:text-zinc-200"
                }`}
              >
                <Icon size={16} strokeWidth={1.9} />
              </div>

              <div className="relative min-w-0 flex-1">
                <p className="text-[13px] font-semibold tracking-[-0.01em]">
                  {item.label}
                </p>
                <p className="mt-0.5 text-[10.5px] text-zinc-500">
                  {item.description}
                </p>
              </div>

              {item.count > 0 && (
                <span className="relative shrink-0 rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-zinc-400">
                  {item.count}
                </span>
              )}

              <ChevronRight
                size={14}
                className={`relative shrink-0 transition-all duration-200 ${
                  isActive
                    ? "translate-x-0 opacity-70"
                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                }`}
              />
            </motion.button>
          );
        })}
      </nav>

      <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Quick links */}
      <div className="space-y-1">
        {/* <button
          type="button"
          onClick={() => navigate("/plan")}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-200"
        >
          <Zap size={14} />
          Plans & Billing
        </button> */}
        <button
          type="button"
          // onClick={() => navigate("/settings")}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] text-zinc-400 transition hover:bg-white/[0.04] hover:text-zinc-200"
        >
          <Settings size={14} />
          Settings
        </button>
      </div>

     
{/* Credits Balance */}
<div className="relative mt-auto mb-2 overflow-hidden rounded-xl border border-blue-400/15 bg-gradient-to-br from-[#151b29] via-[#111722] to-[#101a30] px-3 py-2.5">

  {/* Ambient glow */}
  <div
    aria-hidden
    className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl"
  />

  <div className="relative flex items-center gap-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10 text-blue-300">
      <Coins size={16} />
    </div>

    <div className="flex items-baseline gap-1.5">
      <span className="text-xl font-bold tracking-tight text-white tabular-nums">
        {(userData?.credits || 0).toLocaleString()}
      </span>
      <span className="text-[10px] font-medium text-blue-300">
        credits
      </span>
    </div>
  </div>

</div>


{/* Upgrade Card */}
<div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#171820] via-[#12131a] to-blue-950/30 p-4">

<div
  aria-hidden
  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/20 blur-3xl"
/>

<div className="relative">
  <div className="mb-3 flex items-center justify-between">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
      <Sparkles size={16} />
    </div>

    <span className="rounded-full border border-blue-400/25 bg-blue-400/10 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-blue-300">
      Pro
    </span>
  </div>

  <h3 className="text-[13px] font-semibold tracking-tight text-white">
    Unlock your potential
  </h3>

  <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
    More AI credits, unlimited projects, and powerful tools.
  </p>

  <motion.button
    type="button"
    whileHover={{ scale: 1.02, y: -1 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => navigate("/plan")}
    className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-[12px] font-semibold text-[#08090d] transition hover:bg-zinc-100"
  >
    <Zap size={13} fill="currentColor" />
    Upgrade to Pro
  </motion.button>
</div>
</div>


      <div className="relative mt-4 flex items-center justify-center gap-2 px-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        <span className="text-[10px] font-medium tracking-wide text-zinc-500">
          Online
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;