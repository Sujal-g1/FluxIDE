
import { motion } from "framer-motion";
import { FolderTree, RefreshCw } from "lucide-react";
import Folder from "./Folder";

const Explorer = ({
  projectId,
  tree = [],
  reloadTree,
  openFile,
  width = 288,
  onResizeStart,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12, width: 0 }}
      animate={{ opacity: 1, x: 0, width }}
      exit={{ opacity: 0, x: -12, width: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative flex h-full shrink-0 flex-col overflow-hidden border-r border-white/[0.07] bg-[#09090B]"
    >
      {/* Explorer header */}
      <div className="flex h-11 w-full shrink-0 items-center justify-between border-b border-white/[0.07] px-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-wide text-zinc-400">
            EXPLORER
          </span>
        </div>

        <motion.button
          type="button"
          whileHover={{ rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={reloadTree}
          className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-200"
          title="Refresh Explorer"
          aria-label="Refresh Explorer"
        >
          <RefreshCw size={14} strokeWidth={1.8} />
        </motion.button>
      </div>

      {/* File tree */}
      <div
        className="w-full min-w-0 flex-1 overflow-y-auto px-2 py-3
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/[0.08]
          hover:[&::-webkit-scrollbar-thumb]:bg-white/[0.16]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent",
        }}
      >
        {tree.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-3 py-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025]">
              <FolderTree
                size={19}
                strokeWidth={1.5}
                className="text-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-zinc-300">
                No files found
              </p>
              <p className="text-[11px] leading-5 text-zinc-600">
                Your workspace is empty.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {tree.map((node) => (
              <Folder
                key={node._id}
                projectId={projectId}
                node={node}
                tree={tree}
                openFile={openFile}
                reloadTree={reloadTree}
              />
            ))}
          </div>
        )}
      </div>

      {/* Resize handle */}
      <div
        onPointerDown={onResizeStart}
        className="group absolute right-0 top-0 z-40 flex h-full w-1 cursor-col-resize touch-none items-center justify-center"
      >
        <div className="h-full w-[2px] bg-[#0057FF] opacity-0 transition-opacity duration-150 group-hover:opacity-70" />
      </div>
    </motion.div>
  );
};

export default Explorer;
