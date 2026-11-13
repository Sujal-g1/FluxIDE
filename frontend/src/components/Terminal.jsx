
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, GripHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import TerminalMain from "./TerminalMain";

const Terminal = ({
  projectId,
  height = 256,
  isResizing = false,
  onResizeStart,
}) => {
  const { currentProject } = useSelector((state) => state.project);

  const activeProjectId = currentProject?._id || projectId;
  const projectName = currentProject?.name || "Project";
  const userId = currentProject?.owner;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={
        isResizing
          ? { duration: 0 }
          : { duration: 0.2, ease: "easeOut" }
      }
      className="relative flex w-full shrink-0 flex-col overflow-hidden border-t border-white/[0.08] bg-[#0b0b0d] text-zinc-300"
    >
      {/* Resize handle */}
      <div
        onPointerDown={onResizeStart}
        className="group absolute inset-x-0 top-0 z-30 flex h-3 cursor-row-resize touch-none items-center justify-center"
        title="Drag to resize terminal"
      >
        <motion.div className="h-[2px] w-full bg-[#0057FF] opacity-0 transition-opacity duration-300 group-hover:opacity-80" />

        <GripHorizontal
          size={14}
          className="text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>

      {/* Header */}
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/[0.06] px-3 pt-1">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
          <TerminalIcon size={14} className="text-blue-400" />

          <span>Terminal</span>

          {activeProjectId && (
            <span className="text-zinc-500">
              / {projectName}
            </span>
          )}
        </div>

        <span className="text-[10px] text-zinc-600">
          {Number(height).toFixed(2)}px
        </span>
      </div>

      {/* Terminal content */}
      <div className="min-h-0 flex-1">
        {activeProjectId && userId ? (
          <TerminalMain
            projectId={activeProjectId}
            projectName={projectName}
            userId={userId}
          />
        ) : (
          <div className="p-3 text-xs text-zinc-500">
            Select a project to start the terminal.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;
