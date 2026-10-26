import { useEffect, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ActivityBar from "../components/ActivityBar"
import Topbar from "../components/Topbar"
import Explorer from "../components/Explorer"
import { useParams } from "react-router-dom"
import { getProjectsById } from "../features/project"
import { useDispatch } from "react-redux"
import { setCurrentProject } from "../redux/projectSlice"
import { getTree } from "../features/file"
import { Code2, Eye, File, Maximize2, Minimize2 } from "lucide-react";
import Preview from "../components/Preview";
import Editor from "../components/EditorDashboard";
import Terminal from "../components/Terminal";
import AIChat from "../components/AIChat";



const ProjectPage = () => {
 
    const [showExplorer, setShowExplorer] = useState(false)
    const [showAiChat, setShowAiChat] = useState(false)
    const [showTerminal, setShowTerminal] = useState(false)
    const [showPreview, setShowPreview] = useState(false) 
    const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false)
    const [mobilePanel, setMobilePanel] = useState("explorer")
    const [tree, setTree] = useState([])
    const [openTabs, setOpenTabs] = useState([])
    const [activeTab, setActiveTab] = useState(null)
    const [showBottomPanel, setShowBottomPanel] = useState(false)
    const [terminalHeight, setTerminalHeight] = useState(500);
    const [resizeStart, setResizeStart] = useState(null);


    const { id } = useParams()
    const dispatch = useDispatch()

    const handleGetProject = async ()=>{
        const data = await getProjectsById(id)
        dispatch(setCurrentProject(data))
    }

    const isHtmlFile = activeTab?.name
    ?.trim()
    .toLowerCase()
    .endsWith(".html");

    const loadTree = async()=>{
        if (!id) return;

        try {
            const data = await getTree({ projectId: id });
            setTree(data.tree || [])
            console.log("Project file tree:", data);
        } catch (error) {
            console.error("Failed to load project tree:", error);
        }
    }

    const openFile = (file) => {
      const exists = openTabs.find(
        (tab) => String(tab._id) === String(file._id)
      );
    
      if (!exists) {
        setOpenTabs((prev) => [...prev, file]);
      }
    
      setActiveTab(file);
    
      if (!file?.name?.trim().toLowerCase().endsWith(".html")) {
        setShowPreview(false);
        setIsPreviewFullScreen(false);
      }
    };

    useEffect(()=>{
        if (!id) return;
        handleGetProject()
        loadTree()
    },[id]) 

    // terminal resize
    useEffect(() => {
      if (!resizeStart) return;

      const handlePointerMove = (event) => {
        const delta = resizeStart.y - event.clientY;

        // Keep the terminal within the available viewport height.
        const maxHeight = Math.floor(window.innerHeight * 0.75);

        setTerminalHeight(
          Math.min(
            maxHeight,
            Math.max(120, resizeStart.height + delta)
          )
        );
      };

      const handlePointerUp = () => {
        setResizeStart(null);
      };

      document.body.style.userSelect = "none";
      document.body.style.cursor = "row-resize";

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);

        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      };
    }, [resizeStart]);


  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#0a0a0c]">

    <div className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]"/>
    
    <div className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]"/>

    {/* topbar */}
    <Topbar 
    showPreview={showPreview}
    setShowPreview={setShowPreview}
    />

    <div className="flex flex-1 gap-2 overflow-hidden px-2 pb-2">

    <div className="hidden md:block ">
        <ActivityBar 
        showAiChat={showAiChat}
        showExplorer={showExplorer}
        showTerminal={showTerminal}
        setShowAiChat={setShowAiChat}
        setShowExplorer={setShowExplorer}
        setShowTerminal={setShowTerminal}
        />
        </div>

        <div className={`${
         mobilePanel === "explorer" ? "flex" : "hidden"} h-full shrink-0 md:flex md:w-auto`}>
        <AnimatePresence initial={false}>
        {showExplorer &&
        <Explorer 
        projectId={id}
        tree={tree}
        openFile={openFile}
        reloadTree={loadTree}
        />
        }
        </AnimatePresence>
    </div>


    {/* editor */}
 
    <div className={`${
    mobilePanel === "editor" ? "flex" : "hidden"} relative flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.06] md:flex`}>

    {/* max and min button, preview and editor buttons */}
    {isHtmlFile && (
    <motion.div
        layout
        className="pointer-events-none absolute right-2 top-2 z-40 flex items-center gap-1.5 sm:right-4 sm:top-3 sm:gap-2"
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
    >
      <AnimatePresence initial={false} mode="popLayout">
            { showPreview && (
        <motion.button
        key="preview-fullscreen"
        layout
        initial={{ opacity: 0, scale: 0.82, x: 10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.82, x: 10 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        type="button"
        onClick={()=> setIsPreviewFullScreen((v)=>!v)}
        title={ isPreviewFullScreen ? "Exit fullscreen ": "Fullscreen preview"}
        className="pointer-events-auto flex items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#111113]/95 p-1.5 text-zinc-400 shadow-lg shadow-black/40 backdrop-blur hover:text-white sm:p-2"
        >
        
        <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={isPreviewFullScreen ? "minimize" : "maximize"}
        initial={{ 
          opacity: 0, 
          y: isPreviewFullScreen ? 8 : -8, 
          scale: 0.7 
        }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1 
        }}
        exit={{ 
          opacity: 0, 
          y: isPreviewFullScreen ? -8 : 8, 
          scale: 0.7 
        }}
        transition={{
          type: "spring",
          stiffness: 680,
          damping: 30,
          mass:0.4 
        }}
        className="flex items-center justify-center origin-center"
      >
        {isPreviewFullScreen ? (
          <Minimize2 size={13} strokeWidth={1.8} />
        ) : (
          <Maximize2 size={13} strokeWidth={1.8} />
        )}
      </motion.span>
    </AnimatePresence>
        
        </motion.button>
        )}
      </AnimatePresence>

    <motion.div
        layout
        className="pointer-events-auto relative flex items-center gap-0.5 rounded-lg border border-white/10 bg-[#111113]/95 p-1 shadow-lg shadow-black/40 backdrop-blur"
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
    >
    <LayoutGroup id="editor-preview-toggle">

    {/* editor button */}
    <button
    onClick={()=>{
        setShowPreview(false)
        setIsPreviewFullScreen(false)
    }}
    className={`relative flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors duration-300 sm:px-3 sm:py-1.5 sm:text-xs ${!showPreview ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
    >
        { !showPreview && (
         <motion.div
         layoutId="editor-preview-pill"
         className="absolute inset-0 rounded-md bg-gradient-to-b from-zinc-700 to-zinc-800"
         transition={{ type: "spring", stiffness: 380, damping: 32 }}
         />
        )}

        <Code2  size={13} className="relative"/>
        <span className="relative hidden sm:inline">
        Editor
        </span>
    </button>

    {/* preview button */}
    <button
    onClick={()=> setShowPreview(true)}
    className={`relative flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors duration-300 sm:px-3 sm:py-1.5 sm:text-xs ${showPreview ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
    >
    { showPreview && (
    <motion.div
         layoutId="editor-preview-pill"
         className="absolute inset-0 rounded-md bg-gradient-to-b from-zinc-700 to-zinc-800"
         transition={{ type: "spring", stiffness: 380, damping: 32 }}
         />
    )}
    <Eye  size={13} className="relative"  />
    <span className="relative hidden sm:inline">
    Preview
    </span>

    </button>
    </LayoutGroup>

    </motion.div>


    </motion.div>
    )}

    {/* main screen */}
    <div className="flex min-h-0 flex-1 overflow-hidden">
    {
    showPreview ? (
    <Preview tree={tree}  activeTab={activeTab} /> ): 
    <Editor 
    activeTab={activeTab}
    openTabs={openTabs}
    setOpenTabs={setOpenTabs}
    setActiveTab={setActiveTab}
    />  } 
   </div>


{/*  bottom terminal */}
<AnimatePresence initial={false}>
  {showTerminal && (
    <Terminal
      key="project-terminal"
      projectId={id}
      height={terminalHeight}
      onResizeStart={(event) => {
        event.preventDefault();

        setResizeStart({
          y: event.clientY,
          height: terminalHeight,
        });
      }}
    />
  )}
</AnimatePresence>

    </div>

    {/* max min screen button working */}
    <AnimatePresence >
    { showPreview && isPreviewFullScreen && (
    <motion.div
    initial={{opacity:0, scale:0.98}}
    animate={{ opacity:1, scale:1}}
    exit={{ opacity:0, scale:0.98}} 
    transition={{ duration:0.18, ease:"easeOut"}}
    className="fixed inset-0 z-[100] bg-white"
    >

    <Preview 
    tree={tree}
    activeTab={activeTab}
    />

    <motion.button
    key="preview-fullscreen"
    layout
    initial={{ opacity: 0, scale: 0.82, x: 10 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    exit={{ opacity: 0, scale: 0.82, x: 10 }}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.94 }}
    transition={{ type: "spring", stiffness: 420, damping: 28 }}
    type="button"
    onClick={()=> setIsPreviewFullScreen(false)}
    className="absolute right-2 top-2 z-[110] flex items-center gap-1.5 rounded-lg border border-white/10  px-2.5 py-1.5 text-[11px] font-medium text-zinc-300 shadow-lg shadow-black/40 backdrop-blur hover:text-white sm:right-4 sm:top-3 sm:px-3 sm:text-xs"
    >
      <Minimize2 size={13} strokeWidth={1.8} />
    </motion.button>

  </motion.div>
    )}
  </AnimatePresence>

    {/* ai chat  */}
<div
  className={`${
    mobilePanel === "chat" ? "flex w-full" : "hidden"
  } h-full shrink-0 md:flex md:w-auto`}
>
  <AnimatePresence initial={false}>
    {showAiChat && <AIChat key="ai-chat" projectId={id} />}
  </AnimatePresence>
</div>
  
    </div>

  {/* <div className="flex items-center justify-around border-t border-white/[0.06] bg-[#0f0f12] py-2 md:hidden">
    <button
    onClick={()=> setMobilePanel("explorer")}
    className={`flex flex-col items-center gap-1 px-4 py-1 text-[11px] font-medium transition-colors ${mobilePanel === "explorer" ? "text-white" : "text-zinc-500"}`}
    > 
    <File  size={18}/>
    </button>

    <button>

    </button>

    <button>

    </button>
  </div> */}


    </div> 
  )
}

export default ProjectPage