import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  Folder,
  Plus,
  Sparkles,
  ArrowUpRight,
  Code2,
  Star,
  Layers3,
  Menu,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LoginPage from "./LoginPage";
import { getProjects, getStarredProjects } from "../features/project";
import { setProjects, setStarredProjects } from "../redux/projectSlice";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import CreateProjectModel from "../components/CreateProjectModel";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const Dashboard = () => {
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [error, setError] = useState("");
  const [activeSession, setActiveSession] = useState("projects");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const projectState = useSelector((state) => state.project);
  const reduceMotion = useReducedMotion();

  const projects = Array.isArray(projectState?.projects) ? projectState.projects : [];
  const starredProjects = Array.isArray(projectState?.starredProjects)
    ? projectState.starredProjects
    : [];

  const displayedProjects =
    activeSession === "starred" ? starredProjects : projects;

  const fetchAllProjects = async () => {
    setLoadingProjects(true);
    setError("");
    try {
      const data = await getProjects();
      dispatch(setProjects(Array.isArray(data) ? data : []));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects.");
      dispatch(setProjects([]));
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchStarredProjects = async () => {
    setLoadingProjects(true);
    setError("");
    try {
      const data = await getStarredProjects();
      dispatch(setStarredProjects(Array.isArray(data) ? data : []));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load starred projects.");
      dispatch(setStarredProjects([]));
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    if (!userData) return;
    if (activeSession === "projects") fetchAllProjects();
    else if (activeSession === "starred") fetchStarredProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession, userData]);

  if (!userData) return <LoginPage />;

  const firstName = (userData?.name || "Developer").split(" ")[0];

  const tabs = [
    { id: "projects", label: "Projects", icon: Folder, count: projects.length },
    { id: "starred", label: "Starred", icon: Star, count: starredProjects.length },
  ];

  return (
    <div className="relative flex h-dvh min-h-[560px] w-full flex-col overflow-hidden bg-[#08090d] text-zinc-100">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-56 left-[18%] h-[520px] w-[520px] rounded-full bg-blue-600/[0.07] blur-[140px]" />
        <div className="absolute -bottom-64 right-[-10%] h-[520px] w-[520px] rounded-full bg-fuchsia-600/[0.05] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)",
          }}
        />
      </div>

      {/* Navbar */}
      <div className="relative z-40 shrink-0">
        <Navbar
          onMenuClick={() => setMobileNavOpen(true)}
          activeSession={activeSession}
        />
      </div>

      {/* Workspace */}
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden shrink-0 md:flex">
          <Sidebar activeSession={activeSession} setActiveSession={setActiveSession} />
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileNavOpen && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileNavOpen(false)}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
                aria-hidden
              />
              <motion.div
                key="drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
                className="fixed inset-y-0 left-0 z-[61] w-[280px] md:hidden"
              >
                <Sidebar
                  activeSession={activeSession}
                  setActiveSession={(id) => {
                    setActiveSession(id);
                    setMobileNavOpen(false);
                  }}
                  onClose={() => setMobileNavOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.12)_transparent]">
          <motion.div
            variants={pageVariants}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="mx-auto w-full max-w-[1520px] px-4 pb-12 pt-5 sm:px-6 sm:pt-7 lg:px-10 lg:pt-9"
          >
            {/* Hero */}
            <motion.section
              variants={sectionVariants}
              className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center"
            >
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-blue-300">
                    <Sparkles size={10} />
                    WORKSPACE
                  </span>
                  <span className="hidden text-[11px] text-zinc-600 sm:inline">
                    / Dashboard
                  </span>
                </div>

                <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-white sm:text-[30px]">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                    {firstName}
                  </span>
                </h1>
                <p className="mt-1.5 text-[13px] text-zinc-500">
                  Pick up where you left off, or start something new.
                </p>
              </div>

              <motion.button
                type="button"
                whileHover={reduceMotion ? undefined : { y: -1.5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenModel(true)}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#08090d] shadow-lg shadow-white/[0.06] transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 sm:w-auto"
              >
                <Plus
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                New project
              </motion.button>
            </motion.section>

            {/* Stats */}
            <motion.section
              variants={sectionVariants}
              className="mb-7 grid grid-cols-2 gap-3 sm:mb-8"
            >
              <StatTile
                label="Total projects"
                value={projects.length}
                icon={<Code2 size={16} />}
                accent="blue"
              />
              <StatTile
                label="Starred"
                value={starredProjects.length}
                icon={<Star size={16} />}
                accent="amber"
              />
            </motion.section>

            {/* Mobile tabs */}
            <motion.div
              variants={sectionVariants}
              className="mb-6 md:hidden"
              role="tablist"
              aria-label="Project filter"
            >
              <div className="flex items-center gap-1 rounded-xl border border-white/[0.07] bg-white/[0.025] p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeSession === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveSession(tab.id)}
                      className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-400 ${
                        isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobile-tab-pill"
                          className="absolute inset-0 rounded-lg border border-white/[0.08] bg-white/[0.06]"
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                      )}
                      <Icon
                        size={14}
                        className={`relative ${
                          isActive
                            ? tab.id === "starred"
                              ? "text-amber-300"
                              : "text-blue-300"
                            : ""
                        }`}
                      />
                      <span className="relative">{tab.label}</span>
                      <span className="relative rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[10px] tabular-nums opacity-80">
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.section variants={sectionVariants}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[15px] font-semibold tracking-tight text-white">
                      {activeSession === "starred" ? "Starred projects" : "Your projects"}
                    </h2>
                    <span className="rounded-md border border-white/[0.07] bg-white/[0.035] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-zinc-400">
                      {displayedProjects.length}
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] text-zinc-500">
                    {activeSession === "starred"
                      ? "Your favorite workspaces, all in one place."
                      : "All your development workspaces."}
                  </p>
                </div>

                <div className="hidden items-center gap-1.5 text-[10.5px] text-zinc-500 sm:flex">
                  <Layers3 size={12} />
                  {displayedProjects.length}{" "}
                  {displayedProjects.length === 1 ? "workspace" : "workspaces"}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {loadingProjects ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <ProjectCardSkeleton key={i} />
                    ))}
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-400/20 bg-red-400/[0.05] p-5"
                  >
                    <p className="text-[13px] font-semibold text-red-300">
                      Unable to load projects
                    </p>
                    <p className="mt-1 text-[12px] text-red-300/70">{error}</p>
                    <button
                      type="button"
                      onClick={() =>
                        activeSession === "starred"
                          ? fetchStarredProjects()
                          : fetchAllProjects()
                      }
                      className="mt-3 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-[11.5px] font-medium text-red-200 transition hover:bg-red-400/20"
                    >
                      Try again
                    </button>
                  </motion.div>
                ) : displayedProjects.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] px-6 py-10 text-center"
                  >
                    <div className="pointer-events-none absolute -top-28 h-56 w-56 rounded-full bg-blue-500/[0.08] blur-[80px]" />

                    <motion.div
                      initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.09] bg-white/[0.04]"
                    >
                      {activeSession === "starred" ? (
                        <Star size={22} className="text-amber-300" />
                      ) : (
                        <Folder size={22} className="text-blue-300" />
                      )}
                    </motion.div>

                    <h3 className="relative text-[14px] font-semibold text-white">
                      {activeSession === "starred"
                        ? "No starred projects yet"
                        : "Create your first project"}
                    </h3>
                    <p className="relative mt-1.5 max-w-xs text-[12px] leading-5 text-zinc-500">
                      {activeSession === "starred"
                        ? "Star a project to keep important work close at hand."
                        : "Start with a blank workspace and bring your next idea to life."}
                    </p>

                    {activeSession === "projects" && (
                      <button
                        type="button"
                        onClick={() => setOpenModel(true)}
                        className="relative mt-4 inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.07] px-3.5 py-2 text-[11.5px] font-medium text-white transition hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                      >
                        <Plus size={13} />
                        Create project
                        <ArrowUpRight size={12} className="text-zinc-500" />
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeSession}
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                  >
                    {displayedProjects.map((project) => (
                      <motion.div
                        key={project._id}
                        variants={sectionVariants}
                        className="min-w-0"
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Footer */}
            {!loadingProjects && !error && displayedProjects.length > 0 && (
              <div className="mt-10 flex items-center justify-center gap-2 border-t border-white/[0.05] pt-6">
                <Sparkles size={11} className="text-blue-400/70" />
                <p className="text-[10px] tracking-[0.14em] text-zinc-600">
                  BUILT FOR CREATORS · POWERED BY FLUX
                </p>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {openModel && (
        <CreateProjectModel openModel={openModel} onClose={() => setOpenModel(false)} />
      )}
    </div>
  );
};

const StatTile = ({ label, value, icon, accent }) => {
  const accents = {
    blue: "border-blue-400/20 bg-blue-400/[0.08] text-blue-300",
    amber: "border-amber-400/20 bg-amber-400/[0.08] text-amber-300",
  };
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 transition-colors hover:bg-white/[0.045]"
    >
      <div>
        <p className="text-[10.5px] font-medium uppercase tracking-wider text-zinc-500">
          {label}
        </p>
        <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums text-white">
          {value}
        </p>
      </div>
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg border ${accents[accent]}`}
      >
        {icon}
      </div>
    </motion.div>
  );
};

export default Dashboard;