
import { motion } from "framer-motion";
import { Folder, Star, Zap, Sparkles, ChevronRight } from "lucide-react";

const Sidebar = ({ activeSession, setActiveSession }) => {
  const navItems = [
    {
      id: "projects",
      label: "Projects",
      icon: Folder,
      description: "Your workspaces",
    },
    {
      id: "starred",
      label: "Starred",
      icon: Star,
      description: "Quick access",
    },
  ];

  return (
    <aside className="relative flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-slate-200/70 bg-white/70 px-3.5 py-5 font-sans backdrop-blur-2xl transition-colors duration-300 dark:border-white/[0.06] dark:bg-[#0b0c10]/80">

      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-20 top-20 h-40 w-40 rounded-full bg-violet-500/[0.04] blur-3xl dark:bg-violet-500/[0.07]" />

      {/* Navigation */}
      <div className="relative">
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
            Workspace
          </p>
        </div>

        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeSession === item.id;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.id}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSession(item.id)}
                className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "border border-slate-200/80 bg-slate-100/80 text-slate-900 shadow-sm dark:border-white/[0.09] dark:bg-white/[0.07] dark:text-white"
                    : "border border-transparent text-slate-500 hover:bg-slate-100/70 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-violet-500 dark:bg-violet-400"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <div
                  className={`relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-violet-600 shadow-sm dark:bg-white/[0.09] dark:text-violet-300"
                      : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-700 dark:bg-white/[0.04] dark:text-slate-400 dark:group-hover:bg-white/[0.07] dark:group-hover:text-slate-200"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.9} />
                </div>

                <div className="relative min-w-0 flex-1">
                  <p className="text-[13px] font-semibold tracking-[-0.01em]">
                    {item.label}
                  </p>
                  <p
                    className={`mt-0.5 text-[10.5px] ${
                      isActive
                        ? "text-slate-500 dark:text-slate-400"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

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
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/[0.08]" />

      {/* Upgrade card */}
      <div className="relative mt-auto overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-violet-50/70 p-4 shadow-sm dark:border-white/[0.08] dark:from-[#171820] dark:via-[#12131a] dark:to-violet-950/20 dark:shadow-none">

        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-500/20" />

        <div className="relative">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-200/70 bg-violet-100/80 text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
              <Sparkles size={17} />
            </div>

            <span className="rounded-full border border-violet-200/70 bg-violet-100/70 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
              Pro
            </span>
          </div>

          <h3 className="text-[13px] font-semibold tracking-tight text-slate-900 dark:text-white">
            Unlock your potential
          </h3>

          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Get more AI credits and powerful tools to build without limits.
          </p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-[11.5px] font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:shadow-none dark:hover:bg-slate-200"
          >
            <Zap size={13} fill="currentColor" />
            Upgrade to Pro
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-4 flex items-center justify-center gap-2 px-2">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        <span className="text-[10px] font-medium tracking-wide text-slate-400 dark:text-slate-500">
          FluxIDE Workspace
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
