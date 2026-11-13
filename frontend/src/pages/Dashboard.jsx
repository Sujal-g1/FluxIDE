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
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LoginPage from "./LoginPage";
import { getProjects, getStarredProjects } from "../features/project";
import { setProjects, setStarredProjects } from "../redux/projectSlice";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import CreateProjectModel from "../components/CreateProjectModel";
import { EASE } from "../lib/motion";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const Dashboard = () => {
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [error, setError] = useState("");
  const [activeSession, setActiveSession] = useState("projects");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const projectState = useSelector((state) => state.project);
  const reduceMotion = useReducedMotion();

  const projects = Array.isArray(projectState?.projects) ? projectState.projects : [];
  const starredProjects = Array.isArray(projectState?.starredProjects)
    ? projectState.starredProjects
    : [];

  const displayedProjects = activeSession === "starred" ? starredProjects : projects;

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
  const words = `Welcome back, ${firstName}`.split(" ");

  const tabs = [
    { id: "projects", label: "Projects", icon: Folder, count: projects.length },
    { id: "starred", label: "Starred", icon: Star, count: starredProjects.length },
  ];

  return (
    <div className="relative flex h-dvh min-h-[560px] w-full flex-col overflow-hidden bg-[#0A0A0A] text-[#FAFAFA]">
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
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <motion.div
            variants={pageVariants}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="mx-auto w-full max-w-[1520px] px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-12"
          >
            {/* Hero */}
            <motion.section
              variants={sectionVariants}
              className="mb-8 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end"
            >
              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#262626] bg-[#141414] px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-[#60A5FA]">
                    <Sparkles size={10} strokeWidth={2} />
                    WORKSPACE
                  </span>
                  <span className="hidden text-[11px] text-[#8B8B8B] sm:inline">
                    / Dashboard
                  </span>
                </div>


                <h1 className="...">
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block text-[32px] font-[450] leading-[1.1] "
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.08 * i }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </h1>
                <p className="mt-3 max-w-md text-[15px] leading-6 text-[#8B8B8B]">
                  Pick up where you left off, or start something new.
                </p>
              </div>

              <motion.button
                type="button"
                onClick={() => setOpenModel(true)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-transparent hover:border-1 sm:w-auto"
              >
                <Plus
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                New project
              </motion.button>
            </motion.section>

          
       {/* Stats */}
<motion.section
  variants={sectionVariants}
  className="mb-8 grid grid-cols-2 gap-3 sm:mb-12"
>
  {/* Total Projects */}
  <motion.div
    onHoverStart={() => setIsHovered(true)}
    onHoverEnd={() => setIsHovered(false)}
    className="group relative isolate overflow-hidden rounded-xl p-[1px]"
  >

  <motion.div aria-hidden="true"
            className="pointer-events-none absolute -inset-[100%] z-0"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 290deg, #2563eb 315deg, #60a5fa 325deg, #ffffff 330deg, #2563eb 338deg, transparent 355deg)",
            }}
            animate={
              reduceMotion || !isHovered
                ? {
                    rotate: 0,
                    opacity: 0,
                  }
                : {
                    rotate: 360,
                    opacity: 1,
                  }
            }
            transition={{
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: {
                duration: 0.25,
              },
            }}
          />

    <div className="relative z-10 flex h-full min-h-[110px] flex-col justify-between rounded-[11px] border border-[#292929] bg-[#141414] p-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400 group-hover:text-blue-300">
          Total projects
        </span>
        <Code2
          size={16}
          strokeWidth={1.75}
          className="text-gray-500 transition-colors group-hover:text-blue-400"
        />
      </div>

      <span className="text-2xl font-semibold tracking-tight text-white">
        {projects.length}
      </span>
    </div>
  </motion.div>

  {/* Starred Projects */}
  <motion.div
    onHoverStart={() => setIsHovered(true)}
    onHoverEnd={() => setIsHovered(false)}
    className="group relative isolate overflow-hidden rounded-xl p-[1px]"
  >
   <motion.div aria-hidden="true"
          className="pointer-events-none absolute -inset-[100%] z-0"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 290deg, #2563eb 315deg, #60a5fa 325deg, #ffffff 330deg, #2563eb 338deg, transparent 355deg)",
          }}
          animate={
            reduceMotion || !isHovered
              ? {
                  rotate: 0,
                  opacity: 0,
                }
              : {
                  rotate: 360,
                  opacity: 1,
                }
          }
          transition={{
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 0.25,
            },
          }}
        />

    <div className="relative z-10 flex h-full min-h-[110px] flex-col justify-between rounded-[11px] border border-[#292929] bg-[#141414] p-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400 group-hover:text-blue-300">
          Starred
        </span>
        <Star
          size={16}
          strokeWidth={1.75}
          className="text-gray-500 transition-colors group-hover:text-blue-400"
        />
      </div>

      <span className="text-2xl font-semibold tracking-tight text-white">
        {starredProjects.length}
      </span>
    </div>
  </motion.div>
</motion.section>


            {/* Mobile tabs */}
            <motion.div
              variants={sectionVariants}
              className="mb-6 md:hidden"
              role="tablist"
              aria-label="Project filter"
            >
              <div className="flex items-center gap-1 rounded-full border border-[#262626] bg-[#141414] p-1">
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
                      className={`relative flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[12px] font-medium transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-[#8B8B8B] hover:text-[#FAFAFA]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobile-tab-pill"
                          className="absolute inset-0 rounded-full bg-[#3B82F6]"
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                      )}
                      <Icon size={14} strokeWidth={1.75} className="relative" />
                      <span className="relative">{tab.label}</span>
                      <span
                        className={`relative rounded-md px-1.5 py-0.5 text-[10px] tabular-nums ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#1C1C1C] text-[#8B8B8B]"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.section variants={sectionVariants}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[15px] font-medium tracking-tight text-[#FAFAFA]">
                      {activeSession === "starred" ? "Starred projects" : "Your projects"}
                    </h2>
                    <span className="rounded-md border border-[#262626] bg-[#141414] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-[#8B8B8B]">
                      {displayedProjects.length}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] text-[#8B8B8B]">
                    {activeSession === "starred"
                      ? "Your favorite workspaces, all in one place."
                      : "All your development workspaces."}
                  </p>
                </div>

                <div className="hidden items-center gap-1.5 text-[11px] text-[#8B8B8B] sm:flex">
                  <Layers3 size={12} strokeWidth={1.75} />
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
                    className="rounded-lg border border-[#F87171]/20 bg-[#F87171]/[0.06] p-5"
                  >
                    <p className="text-[13px] font-medium text-[#F87171]">
                      Unable to load projects
                    </p>
                    <p className="mt-1 text-[12px] text-[#F87171]/80">{error}</p>
                    <button
                      type="button"
                      onClick={() =>
                        activeSession === "starred"
                          ? fetchStarredProjects()
                          : fetchAllProjects()
                      }
                      className="mt-3 rounded-full bg-[#F87171] px-3.5 py-1.5 text-[11.5px] font-medium text-[#0A0A0A] transition-colors hover:bg-[#FCA5A5]"
                    >
                      Try again
                    </button>
                  </motion.div>
                ) : displayedProjects.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-[#333333] bg-[#141414] px-6 py-10 text-center"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-[#262626] bg-[#0A0A0A]">
                      {activeSession === "starred" ? (
                        <Star size={22} strokeWidth={1.75} className="text-[#3B82F6]" />
                      ) : (
                        <Folder size={22} strokeWidth={1.75} className="text-[#3B82F6]" />
                      )}
                    </div>

                    <h3 className="text-[14px] font-medium text-[#FAFAFA]">
                      {activeSession === "starred"
                        ? "No starred projects yet"
                        : "Create your first project"}
                    </h3>
                    <p className="mt-1.5 max-w-xs text-[12px] leading-5 text-[#8B8B8B]">
                      {activeSession === "starred"
                        ? "Star a project to keep important work close at hand."
                        : "Start with a blank workspace and bring your next idea to life."}
                    </p>

                    {activeSession === "projects" && (
                      <button
                        type="button"
                        onClick={() => setOpenModel(true)}
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#1C1C1C] px-3.5 py-2 text-[11.5px] font-medium text-[#FAFAFA] transition-colors hover:border-[#333333] hover:bg-[#262626]"
                      >
                        <Plus size={13} strokeWidth={2} />
                        Create project
                        <ArrowUpRight size={12} strokeWidth={1.75} className="text-[#8B8B8B]" />
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
              <div className="mt-12 flex items-center justify-center gap-2 border-t border-[#262626] pt-6">
                <Sparkles size={11} strokeWidth={2} className="text-[#3B82F6]" />
                <p className="text-[10px] tracking-[0.14em] text-[#8B8B8B]">
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

const StatTile = ({ label, value, icon }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#262626] bg-[#141414] px-4 py-3.5 transition-colors hover:border-[#333333]">
      <div>
        <p className="text-[10.5px] font-medium uppercase tracking-wider text-[#8B8B8B]">
          {label}
        </p>
        <p className="mt-1 text-2xl font-medium tracking-tight tabular-nums text-[#FAFAFA]">
          {value}
        </p>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#262626] bg-[#0A0A0A] text-[#3B82F6]">
        {icon}
      </div>
    </div>
  );
};

export default Dashboard;