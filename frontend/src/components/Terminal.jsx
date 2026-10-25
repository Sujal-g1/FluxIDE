import { motion } from "framer-motion";
import { Terminal as TerminalIcon, GripHorizontal } from "lucide-react";

const Terminal = ({ projectId, height = 256, isResizing = false, onResizeStart }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={isResizing ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
      className="relative flex w-full shrink-0 flex-col overflow-hidden border-t border-white/[0.08] bg-[#0b0b0d] text-zinc-300"
    >
      {/* Resize handle */}
      <div
        onPointerDown={onResizeStart}
        className="group absolute inset-x-0 top-0 z-30 flex h-3 cursor-row-resize touch-none items-center justify"
        title="Drag to resize terminal"
      >
        <motion.div
  className="h-[2px] w-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-400 opacity-0 shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-opacity duration-300 group-hover:opacity-80"
/>
        <GripHorizontal
          size={14}
          className="text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>

      {/* Header */}
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/[0.06] px-3 pt-1">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
          <TerminalIcon size={14} className="text-violet-400" />
          <span>Terminal</span>
          {projectId && <span className="text-zinc-600">/ Project workspace</span>}
        </div>
        <span className="text-[10px] text-zinc-600">{Number(height).toFixed(2)}px</span>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-auto p-3 font-mono text-xs">
        <div className="text-zinc-500">Ready.</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-emerald-400">➜</span>
          <span className="text-sky-300">workspace</span>
          <span className="text-zinc-500">›</span>
          <span className="animate-pulse text-zinc-400">_</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;