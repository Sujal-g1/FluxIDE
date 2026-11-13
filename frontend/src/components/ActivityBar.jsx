
import { Bot, Files, SquareTerminal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function ActivityIcon({ icon: Icon, label, active, onClick }) {
  return (
    <div className="group relative flex w-full justify-center">
      <motion.button
        type="button"
        aria-label={label}
        aria-pressed={active}
        title={label}
        onClick={onClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.16 }}
        className={`relative flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-150 ${
          active
            ? "border-white/[0.09] bg-[#1C1C1F] text-white"
            : "border-transparent text-zinc-500 hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-zinc-200"
        }`}
      >
        <Icon
          size={20}
          strokeWidth={active ? 2 : 1.7}
          className="relative z-10"
        />

        <AnimatePresence>
          {active && (
            <motion.span
              layoutId="flux-activity-indicator"
              initial={{ opacity: 0, scaleY: 0.5 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 32,
              }}
              className="absolute -left-[15px] h-5 w-[3px] origin-center rounded-r-full bg-[#0057FF]"
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip */}
      <div className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[100] -translate-y-1/2 translate-x-1 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
        <div className="whitespace-nowrap rounded-md border border-white/[0.1] bg-[#18181B] px-3 py-2 shadow-xl shadow-black/20">
          <p className="text-xs font-medium text-zinc-200">
            {label}
          </p>
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
  const { userData } = useSelector((state) => state.user);
  const [isSwapped, setIsSwapped] = useState(false);

  const initialLetter = (userData?.name || "User")
    .trim()
    .charAt(0)
    .toUpperCase();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isModifierPressed = e.ctrlKey || e.metaKey;

      if (isModifierPressed) {
        switch (e.key.toLowerCase()) {
          case "o":
            e.preventDefault();
            setShowExplorer((v) => !v);
            break;

          case "i":
            e.preventDefault();
            setShowTerminal((v) => !v);
            break;

          case "p":
            e.preventDefault();
            setShowAiChat((v) => !v);
            break;

          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowExplorer, setShowTerminal, setShowAiChat]);

  return (
    <aside className="relative z-30 flex h-full w-16 shrink-0 flex-col items-center border-r border-white/[0.07] bg-[#09090B] py-4">

      {/* Main navigation */}
      <div className="flex w-full flex-col items-center gap-2 px-2">
        <ActivityIcon
          icon={Files}
          label="Explorer (Cmd+B)"
          active={showExplorer}
          onClick={() => setShowExplorer((v) => !v)}
        />

        <ActivityIcon
          icon={Bot}
          label="AI Assistant (Cmd+I)"
          active={showAiChat}
          onClick={() => setShowAiChat((v) => !v)}
        />
      </div>

      {/* Bottom utilities */}
      <div className="mt-auto flex w-full flex-col items-center gap-3 px-2">

        <div className="mb-1 h-px w-8 bg-white/[0.08]" />

        <ActivityIcon
          icon={SquareTerminal}
          label="Terminal (Cmd+J)"
          active={showTerminal}
          onClick={() => setShowTerminal((v) => !v)}
        />

       
<motion.p
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.2 }}
  title={userData?.name || "User"}
  onClick={() => setIsSwapped((prev) => !prev)}
  className="flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.03] py-1 pl-1.5 pr-2 text-sm font-medium text-zinc-100 shadow-lg shadow-black/10 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.08]">
  <AnimatePresence mode="popLayout" initial={false}>
    {isSwapped ? (
      <>
        <motion.span
          key="dot"
          layout
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
        />

        <motion.span
          key="avatar"
          layout
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-zinc-500/30 to-zinc-800/60 text-xs font-semibold text-white ring-1 ring-white/15"
        >
          {initialLetter}
        </motion.span>
      </>
    ) : (
      <>
        <motion.span
          key="avatar"
          layout
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-zinc-500/30 to-zinc-800/60 text-xs font-semibold text-white ring-1 ring-white/15"
        >
          {initialLetter}
        </motion.span>

        <motion.span
          key="dot"
          layout
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
        />
      </>
    )}
  </AnimatePresence>
</motion.p>

       
      </div>
    </aside>
  );
};

export default ActivityBar;
