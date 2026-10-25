
import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { login } from "../features/login"; 
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LoginPage from "./LoginPage";
import { Folder, Loader2, Plus } from "lucide-react";
import { getProjects, getStarredProjects } from "../features/project";
import { setProjects , setStarredProjects } from "../redux/projectSlice";
import ProjectCard from "../components/ProjectCard";
import CreateProjectModel from "../components/CreateProjectModel";


const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [openModel, setOpenModel] = useState(false)
  const [error, setError] = useState(""); 
  const [activeSession, setActiveSession] = useState("projects")
  const dispatch = useDispatch()
  const {userData} = useSelector((state) => state.user)

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
  
      dispatch(
        setStarredProjects(Array.isArray(data) ? data : [])
      );
    } catch (error) {
      console.error("Failed to fetch starred projects:", error);
  
      setError(
        error.response?.data?.message ||
          "Failed to load starred projects."
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


  if(!userData){
    return <LoginPage />  
   }
 

  return(
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#07070c]">

    <div className="pointer-events-none absolute -top-40 left-1/3 hidden h-[700px] w-[700px] rounded-full bg-white/[0.05] blur-[140px] dark:block "/>
    <div className="pointer-events-none absolute top-1/3 right-0 hidden h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-[130px] dark:block "/>

    <div className="relative flex min-h-0 flex-1 flex-col">
    <Navbar />

    <div className="flex min-h-0 flex-1">
        <Sidebar activeSession={activeSession} setActiveSession={setActiveSession}/>

          {/* working area*/}
    <div className="min-h-0 flex-1 overflow-y-auto px-8 py-8 [scrollbar-width:thin] [scrollbar-color:rgba(100,116,139,0.35)_transparent]]">

    <div className="mb-8 flex items-start justify-between">
    <div>
    <h1 className="flex items-center gap-2 text-[26px] font-bold text-slate-900 dark:text-white ">
    Welcome Back, {" "}
    {(userData?.name || "User").split(" ")[0]}
    <span>👋</span>
    </h1>

    <p
    className="mt-1 text-[13.5px] text-slate-500 dark:text-slate-400"
    >Ready to build something amazing today</p>

    </div>

    <button 
    onClick={()=>setOpenModel(true)}
    className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-sm transition-opacity duration-150 hover:opacity-90 dark:bg-white dark:text-slate-900">
    <Plus size={16}/>
    New Project
    </button>

    </div>
  {/* show projects and starred projects */}
    <div className="mb-4 flex items-center justify-between">
    <h2 className="text-[16px] font-semibold text-slate-900 dark:text-white">
    {activeSession == "starred" ? "Starred Projects" : "Recent Projects"}
    </h2>
    </div>

 
{loadingProjects ? (
  <div className="flex min-h-[300px] items-center justify-center">
    <Loader2
      size={28}
      className="animate-spin text-slate-400 dark:text-slate-500"
    />
  </div>
) : error ? (
  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-400/20 dark:bg-red-400/5 dark:text-red-300">
    {error}
  </div>
) : displayedProjects.length === 0 ? (
  <div className="mb-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/40 py-16 text-center dark:border-white/[0.1] dark:bg-white/[0.01]">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/5 dark:bg-white/10">
      <Folder size={24} className="text-slate-500 dark:text-white" />
    </div>

    <h3 className="mb-1.5 text-base font-semibold text-slate-900 dark:text-white">
      {activeSession === "starred"
        ? "No starred projects"
        : "No projects yet"}
    </h3>

    <p className="mb-5 max-w-xs text-[13px] text-slate-500 dark:text-slate-400">
      {activeSession === "starred"
        ? "Star a project to see it here."
        : "Create your first project and start building something amazing!"}
    </p>
  </div>
) : (
  <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {displayedProjects.map((project) => (
      <ProjectCard key={project._id} project={project} />
    ))}
  </div>
)}

    </div>
    </div>

    </div>

   { openModel &&
    <CreateProjectModel 
    openModel={openModel}
    onClose={()=>setOpenModel(false)}
    />
    }
      
    </div>
  )


 
};

export default Dashboard;
