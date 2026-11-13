import { motion } from "framer-motion";
import { FolderTree, RefreshCcw } from "lucide-react";
import Folder from "./Folder";

const Explorer = ({ projectId,
  tree,
  reloadTree,
  openFile,
  width = 288,
  onResizeStart,}) => {
  return (
    <motion.div
    initial={{ opacity: 0, x: -16, width: 0 }}
    animate={{ opacity: 1, x: 0, width }}
    exit={{ opacity: 0, x: -16, width: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="relative flex h-full shrink-0 flex-col overflow-hidden rounded-r-4xl border-r border-white/[0.08] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.035),transparent_55%),linear-gradient(160deg,#111113_0%,#09090b_50%,#050506_100%)] backdrop-blur-xl"
  >
    {/* className='flex flex-col overflow-hidden border-r border-white/[0.06] bg-[#111113]/90 backdrop-blur-xl'> */}

      {/* top bar */}
    <div className="flex h-10 w-full shrink-0 items-center justify-between border-b border-white/[0.06] px-3">
    <span className="text-[11px] font-semibold tracking-wider text-zinc-500">
      Explorer
    </span>

    <motion.button
    whileHover={{ rotate:60}}
    whileTap={{ scale: 0.9 }}
    transition={ {duration:0.2}}
    onClick={reloadTree}
    className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
    title="Refresh"
    >
    <RefreshCcw  size={14}/>
    </motion.button>

    </div>

    <div 
    className="w-full min-w-0 flex-1 overflow-y-auto px-1 py-2
    [&:: -webkit-scrollbar]:w-1.5
    [&:: -webkit-scrollbar-track]:bg-transparent
    [&:: -webkit-scrollbar-thumb]:rounded-full
    [&:: -webkit-scrollbar-thumb]:bg-white/[0.08]
    hover:[&:: -webkit-scrollbar-thumb]:bg-white/[0.15]
    [&:: -webkit-scrollbar-thumb]:transition-colors
     "
     style={{ scrollbarWidth: "thin", scrollbarColor:" rgba(255,255,255,0.1) transparent"}}
     >
      { tree.length == 0 ? (
        <div className="flex flex-col items-center gap-2 px-3 py-10 text-center">
        <FolderTree 
        size={22} className="text-zinc-700"/>
        <span className="text-[12px] text-zinc-600">
          Empty WorkSpace
        </span>

        </div>
      ):
      (
       tree.map((node)=>(
        <Folder
        key={node._id}
      projectId={projectId}
      node={node}
     tree={tree}
     openFile={openFile}
     reloadTree={reloadTree}
         />
       ))
      )
      }
    </div>

    {/* Horizontal resize handle */}
    <div
      onPointerDown={onResizeStart}
      className="group absolute right-0 top-0 z-40 flex h-full w-1 cursor-col-resize touch-none items-center justify-center"
    >
      <motion.div
        className="h-full w-[2px] bg-gradient-to-b from-sky-400 via-blue-500 to-fuchsia-400 opacity-0 shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-opacity duration-200 group-hover:opacity-80"
      />
    </div>
    
    </motion.div>
  )
}

export default Explorer