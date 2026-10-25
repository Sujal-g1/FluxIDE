
import { Folder, Code2, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import {motion} from "framer-motion"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({showPreview, setShowPreview}) => {
  const currentProject = useSelector(
    (state) => state.project.currentProject
  );

  const navigate= useNavigate()

  return (
    <header className="flex h-12 shrink-0 items-center justify-between bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.035),transparent_55%),linear-gradient(160deg,#111113_0%,#09090b_50%,#050506_100%)] px-4 backdrop-blur-xl">

        {/* left side */} 
      <div className="flex min-w-0 items-center gap-4"
      onClick={()=> navigate("/")}>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/15">
            <Code2 size={17} className="text-indigo-400" />
          </div>

          <span className="text-base font-semibold tracking-tight text-white">
            flux<span className="text-indigo-400">.ide</span>
          </span>
        </div>

        <div className="h-5 w-px shrink-0 bg-white/10" />

        <div className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5">
          <Folder size={16} className="shrink-0 text-indigo-300" />

          <span className="max-w-[220px] truncate text-sm font-medium text-zinc-200">
            {currentProject?.name || "No project selected"}
          </span>
        </div>
      </div>

     
     {/* right side */}
     {/* <div className="flex items-center gap-1.5">
        <motion.button
        whileHover={{scale: 1.05}}
        whileTap={{ scale: 0.95}}
        onClick={()=> setShowPreview?.((v)=> !v)}
        title={showPreview ? "Show Editor" : "Show Preview"}
        className={`relative flex items-center justify-center rounded-lg p-2 transition-colors ${showPreview ? "text-sky-400" : "text-zinc-400 hover:text-zinc-200"}`}
        >

     <motion.div
     className="absolute inset-0 rounded-lg bg-white/[0.06]"
     transition={{
        type:"spring",
        duration:0.35,
        bounce:0.15
     }} />

     { showPreview ? <Eye size={16} className="relative"/> : <Code2 size={16} className="relative"/> }

        </motion.button>

         
     </div> */}

    </header>
  );
};

export default Topbar;
