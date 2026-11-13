import { motion } from "framer-motion";
import { Folder, Star, Sparkles, ChevronRight, X, Settings, Coins, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ activeSession, setActiveSession, onClose }) => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
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
    <aside className="relative flex h-full w-[264px] shrink-0 flex-col overflow-hidden border-r border-[#262626] bg-[#0A0A0A] px-3.5 py-4">
      {/* Mobile close */}
      {onClose && (
        <div className="mb-2 flex items-center justify-between px-1 md:hidden">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8B8B8B]">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-1.5 text-[#8B8B8B] transition-colors hover:bg-[#1C1C1C] hover:text-[#FAFAFA]"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="relative flex flex-col gap-1" aria-label="Workspace">
        {navItems.map((item) => {
          const isActive = activeSession === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveSession(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-full px-3 py-2.5 text-left transition-colors ${
                isActive
                  ? "bg-[#1C1C1C] text-[#FAFAFA]"
                  : "text-[#8B8B8B] hover:bg-[#141414] hover:text-[#FAFAFA]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[#3B82F6]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? "bg-[#141414] text-[#3B82F6] ring-1 ring-[#262626]"
                    : "text-[#8B8B8B] group-hover:text-[#FAFAFA]"
                }`}
              >
                <Icon size={16} strokeWidth={1.75} />
              </div>

              <div className="relative min-w-0 flex-1">
                <p className="text-[13px] font-medium tracking-[-0.01em]">
                  {item.label}
                </p>
                <p className="mt-0.5 text-[10.5px] text-[#8B8B8B]">
                  {item.description}
                </p>
              </div>

              {item.count > 0 && (
                <span className="relative shrink-0 rounded-md bg-[#141414] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-[#8B8B8B] ring-1 ring-[#262626]">
                  {item.count}
                </span>
              )}

              <ChevronRight
                size={14}
                strokeWidth={1.75}
                className={`relative shrink-0 transition-all duration-200 ${
                  isActive
                    ? "translate-x-0 opacity-60"
                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                }`}
              />
            </motion.button>
          );
        })}
      </nav>

      <div className="my-4 h-px bg-[#262626]" />

      {/* Quick links */}
      <div className="space-y-1">
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-full px-3 py-2 text-[12px] font-medium text-[#8B8B8B] transition-colors hover:bg-[#1C1C1C] hover:text-[#FAFAFA]"
        >
          <Settings size={14} strokeWidth={1.75} />
          Settings
        </button>
      </div>

      {/* Credits */}
      <div className="relative mt-auto mb-2 rounded-lg border border-[#262626] bg-[#141414] px-3 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A0A0A] text-[#3B82F6] ring-1 ring-[#262626]">
            <Coins size={16} strokeWidth={1.75} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-medium tracking-tight text-[#FAFAFA] tabular-nums">
              {(userData?.credits || 0).toLocaleString()}
            </span>
            <span className="text-[10px] font-medium text-[#8B8B8B]">
              credits
            </span>
          </div>
        </div>
      </div>

      {/* Upgrade */}
      <div className="relative rounded-lg border border-[#262626] bg-[#141414] p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#3B82F6] text-white">
            <Sparkles size={16} strokeWidth={1.75} />
          </div>
          <span className="rounded-full bg-[#3B82F6]/15 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-[#60A5FA]">
            Pro
          </span>
        </div>

        <h3 className="text-[13px] font-medium tracking-tight text-[#FAFAFA]">
          Unlock your potential
        </h3>
        <p className="mt-1 text-[11px] leading-relaxed text-[#8B8B8B]">
          More AI credits, unlimited projects, and powerful tools.
        </p>

        <button
          type="button"
          onClick={() => navigate("/plan")}
          className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-3 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-[#60A5FA]"
        >
          <Zap size={13} strokeWidth={1.75} />
          Upgrade to Pro
        </button>
      </div>

      <div className="relative mt-4 flex items-center justify-center gap-2 px-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-medium tracking-wide text-[#8B8B8B]">
          Online
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;