
import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { login } from "../features/login";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LoginPage from "./LoginPage";
import {
  Folder,
  Loader2,
  Plus,
  Sparkles,
  ArrowUpRight,
  Code2,
  Star,
} from "lucide-react";
import { getProjects, getStarredProjects } from "../features/project";
import { setProjects, setStarredProjects } from "../redux/projectSlice";
import ProjectCard from "../components/ProjectCard";
import CreateProjectModel from "../components/CreateProjectModel";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [error, setError] = useState("");
  const [activeSession, setActiveSession] = useState("projects");

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const projectState = useSelector((state) => state.project);

  const projects = Array.isArray(projectState?.projects)
    ? projectState.projects
    : [];

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
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError(
        error.response?.data?.message || "Failed to load projects."
      );
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
    } catch (error) {
      console.error("Failed to fetch starred projects:", error);
      setError(
        error.response?.data?.message || "Failed to load starred projects."
      );
      dispatch(setStarredProjects([]));
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    if (!userData) return;

    if (activeSession === "projects") {
      fetchAllProjects();
    } else if (activeSession === "starred") {
      fetchStarredProjects();
    }
  }, [activeSession, userData]);

  if (!userData) {
    return <LoginPage />;
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#08090D] text-white">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -top-48 left-[25%] h-[650px] w-[650px] rounded-full bg-violet-500/[0.07] blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-60 right-0 h-[600px] w-[600px] rounded-full bg-indigo-500/[0.05] blur-[150px]" />
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] rounded-full bg-sky-500/[0.025] blur-[140px]" />

      <div className="relative flex min-h-0 flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        <div className="flex min-h-0 flex-1 overflow-hidden">

          {/* Sidebar */}
          <Sidebar
            activeSession={activeSession}
            setActiveSession={setActiveSession}
          />

          {/* Main content */}
          <main className="relative min-h-0 min-w-0 flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.12)_transparent]">

            <div className="mx-auto w-full max-w-[1700px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

              {/* Welcome section */}
              <section className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-6 items-center gap-1.5 rounded-full border border-violet-400/15 bg-violet-400/[0.07] px-2.5">
                      <Sparkles size={11} className="text-violet-400" />
                      <span className="text-[10px] font-semibold tracking-wider text-violet-300">
                        DEVELOPER WORKSPACE
                      </span>
                    </div>
                  </div>

                  <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[34px]">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                      {(userData?.name || "User").split(" ")[0]}
                    </span>
                    <span className="ml-2 inline-block">👋</span>
                  </h1>

                  <p className="mt-2 text-[13px] text-zinc-500 sm:text-sm">
                    Your ideas deserve great code. Let's build something.
                  </p>
                </div>

                <button
                  onClick={() => setOpenModel(true)}
                  className="group flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white px-5 py-3 text-[12px] font-semibold text-black shadow-[0_4px_24px_rgba(255,255,255,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] sm:self-center"
                >
                  <Plus size={16} className="transition-transform duration-200 group-hover:rotate-90" />
                  Create project
                </button>

              </section>

              {/* Project overview */}
              <section className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-colors hover:bg-white/[0.04]">
                  <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-violet-500/[0.07] blur-3xl" />

                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                        Total projects
                      </p>
                      <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                        {projects.length}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.08]">
                      <Code2 size={19} className="text-violet-300" />
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-colors hover:bg-white/[0.04]">
                  <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-amber-500/[0.06] blur-3xl" />

                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                        Starred projects
                      </p>
                      <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                        {starredProjects.length}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/15 bg-amber-400/[0.08]">
                      <Star size={19} className="text-amber-300" />
                    </div>
                  </div>
                </div>

              </section>

              {/* Project section heading */}
              <section>

                <div className="mb-5 flex flex-wrap items-center justify-between gap-4">

                  <div>
                    <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                      {activeSession === "starred"
                        ? "Starred projects"
                        : "Your projects"}
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                      {activeSession === "starred"
                        ? "Your pinned development workspaces."
                        : "Pick up where you left off."}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2">
                    <Folder size={13} className="text-zinc-500" />
                    <span className="text-[11px] font-medium text-zinc-400">
                      {displayedProjects.length}{" "}
                      {displayedProjects.length === 1 ? "workspace" : "workspaces"}
                    </span>
                  </div>

                </div>

                {/* Loading state */}
                {loadingProjects ? (
                  <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.015]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.04]">
                      <Loader2
                        size={22}
                        className="animate-spin text-violet-400"
                      />
                    </div>
                    <p className="text-xs text-zinc-500">
                      Loading your workspaces...
                    </p>
                  </div>

                ) : error ? (

                  /* Error state */
                  <div className="rounded-2xl border border-red-400/15 bg-red-400/[0.05] p-5">
                    <p className="text-sm font-medium text-red-300">
                      Unable to load projects
                    </p>
                    <p className="mt-1 text-xs text-red-300/70">
                      {error}
                    </p>
                  </div>

                ) : displayedProjects.length === 0 ? (

                  /* Empty state */
                  <div className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/[0.10] bg-white/[0.015] px-5 text-center">

                    <div className="pointer-events-none absolute -top-24 h-64 w-64 rounded-full bg-violet-500/[0.07] blur-[90px]" />

                    <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] shadow-xl shadow-black/20">
                      {activeSession === "starred" ? (
                        <Star size={25} className="text-amber-300" />
                      ) : (
                        <Folder size={25} className="text-violet-300" />
                      )}
                    </div>

                    <h3 className="relative text-base font-semibold text-white">
                      {activeSession === "starred"
                        ? "Nothing starred yet"
                        : "Your workspace starts here"}
                    </h3>

                    <p className="relative mt-2 max-w-sm text-[12px] leading-6 text-zinc-500">
                      {activeSession === "starred"
                        ? "Star your favorite projects to access them quickly whenever you need them."
                        : "Create your first project and turn your next idea into something real."}
                    </p>

                    {activeSession === "projects" && (
                      <button
                        onClick={() => setOpenModel(true)}
                        className="relative mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/[0.12]"
                      >
                        <Plus size={14} />
                        Create your first project
                        <ArrowUpRight size={13} className="text-zinc-500" />
                      </button>
                    )}

                  </div>

                ) : (

                  /* Project cards */
                  <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {displayedProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                      />
                    ))}
                  </div>

                )}

              </section>

              {/* Bottom note */}
              {!loadingProjects && !error && displayedProjects.length > 0 && (
                <div className="mt-10 flex items-center justify-center gap-2 border-t border-white/[0.05] pt-5">
                  <Sparkles size={12} className="text-violet-400/70" />
                  <p className="text-[10px] tracking-wide text-zinc-600">
                    BUILT FOR CREATORS. POWERED BY FLUX.
                  </p>
                </div>
              )}

            </div>
          </main>

        </div>
      </div>

      {/* Create project modal */}
      {openModel && (
        <CreateProjectModel
          openModel={openModel}
          onClose={() => setOpenModel(false)}
        />
      )}

    </div>
  );
};

export default Dashboard;
