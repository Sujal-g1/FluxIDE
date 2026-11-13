
import { Folder, Code2, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Topbar = ({ showPreview, setShowPreview }) => {
  const currentProject = useSelector(
    (state) => state.project.currentProject
  );

  const navigate = useNavigate();

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#09090B] px-4">
      {/* Left side */}
      <div className="flex min-w-0 items-center gap-4">
        {/* Brand */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex shrink-0 items-center gap-2 rounded-md outline-none transition-opacity hover:opacity-80"
          title="Go to dashboard"
        >
          <span className="text-base font-semibold tracking-tight text-zinc-100">
            flux<span className="text-[#0057FF]">.ide</span>
          </span>
        </button>

        <div className="h-5 w-px shrink-0 bg-white/[0.09]" />

        {/* Current project */}
        <div className="flex min-w-0 items-center gap-2">
          <Folder
            size={15}
            strokeWidth={1.8}
            className="shrink-0 text-zinc-500"
          />

          <span className="max-w-[220px] truncate text-xs font-medium text-zinc-300">
            {currentProject?.name || "No project selected"}
          </span>
        </div>
      </div>

    </header>
  );
};

export default Topbar;
