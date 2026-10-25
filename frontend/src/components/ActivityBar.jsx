import { Bot, Files, SquareTerminal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

function ActivityIcon({ icon: Icon, label, active, onClick }) {
  return (
    <div className="group relative flex w-full justify-center">
      <motion.button
        type="button"
        aria-label={label}
        aria-pressed={active}
        title={label}
        onClick={onClick}
        whileHover={{ scale: 1.06, x: 1 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
        className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ${
          active
            ? "bg-gradient-to-br from-sky-400/[0.16] to-violet-400/[0.10] text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.08)] ring-1 ring-sky-300/20"
            : "text-zinc-500 hover:bg-white/[0.055] hover:text-zinc-200"
        }`}
      >
        <AnimatePresence>
          {active && (
            <motion.span
              layoutId="flux-activity-active-bg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-400/[0.07] to-violet-400/[0.06]"
            />
          )}
        </AnimatePresence>

        <Icon
          size={21}
          strokeWidth={active ? 2 : 1.7}
          className="relative z-10"
        />

        <AnimatePresence>
          {active && (
            <motion.span
              initial={{ opacity: 0, scaleY: 0.4 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.4 }}
              transition={{ duration: 0.18 }}
              className="absolute -left-[9px] h-5 w-[3px] origin-center rounded-r-full bg-gradient-to-b from-sky-300 to-violet-400 shadow-[0_0_10px_rgba(56,189,248,0.45)]"
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hover tooltip */}
      <div className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[100] -translate-y-1/2 translate-x-1 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
        <div className="whitespace-nowrap rounded-lg border border-white/[0.09] bg-[#18181d]/95 px-3 py-2 shadow-xl shadow-black/40 backdrop-blur-xl">
          <p className="text-xs font-medium text-zinc-100">{label}</p>
        </div>
      </div>
    </div>
  );
}

const ActivityBar = ({
  showTerminal,
  showAiChat,
  showExplorer,
  setShowAiChat,
  setShowTerminal,
  setShowExplorer,
}) => {

  const {userData} = useSelector((state) => state.user)

  return (
    <aside className="relative z-30 flex h-full w-[68px] shrink-0 flex-col items-center bg-gradient-to-b from-[#111112] via-[#0c0c0e] to-[#080809] py-4">

      {/* Main navigation */}
      <div className="flex w-full flex-col items-center gap-3 px-2">
        <ActivityIcon
          icon={Files}
          label="Explorer"
          active={showExplorer}
          onClick={() => setShowExplorer((v) => !v)}
        />

        <ActivityIcon
          icon={Bot}
          label="AI Assistant"
          active={showAiChat}
          onClick={() => setShowAiChat((v) => !v)}
        />
      </div>

      {/* Bottom utilities */}
      <div className="mt-auto flex w-full flex-col items-center gap-3 px-2">
        <div className="mb-1 h-px w-8 bg-gradient-to-r from-transparent via-white/[0.13] to-transparent" />

        <ActivityIcon
          icon={SquareTerminal}
          label="Terminal"
          active={showTerminal}
          onClick={() => setShowTerminal((v) => !v)}
        />

    <motion.p
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      title={userData?.name || "User"}
      className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.03] py-1.5 pl-1.5 pr-3 text-sm font-medium text-zinc-100 shadow-lg shadow-black/10 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.08]"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-zinc-500/30 to-zinc-800/60 text-xs font-semibold text-white ring-1 ring-white/15">
        {(userData?.name || "User")
          .trim()
          .charAt(0)
          .toUpperCase()}
      </span>

      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
    </motion.p>

    {/* <div className="mt-2 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.35)]" /> */}
      </div>
    </aside>
  );
};

export default ActivityBar;