import { useEffect, useState } from "react"
import ActivityBar from "../components/ActivityBar"
import Topbar from "../components/Topbar"
import {AnimatePresence, motion} from "framer-motion"
import Explorer from "../components/Explorer"
import { useParams } from "react-router-dom"
import { getProjectsById } from "../features/project"
import { useDispatch } from "react-redux"
import { setCurrentProject } from "../redux/projectSlice"
import { getTree } from "../features/file"


const ProjectPage = () => {
 
    const [showExplorer, setShowExplorer] = useState(false)
    const [showAiChat, setShowAiChat] = useState(false)
    const [showTerminal, setShowTerminal] = useState(false)
    const [showPreview, setShowPreview] = useState(false) 
    const [tree, setTree] = useState([])

    const { id } = useParams()
    const dispatch = useDispatch()

    const handleGetProject = async ()=>{
        const data = await getProjectsById(id)
        dispatch(setCurrentProject(data))
    }

    const loadTree = async()=>{
        if (!id) return;

        try {
            const data = await getTree({ projectId: id });
            setTree(data)
            console.log("Project file tree:", data);
        } catch (error) {
            console.error("Failed to load project tree:", error);
        }
    }

    useEffect(()=>{
        if (!id) return;
        handleGetProject()
        loadTree()
    },[id])

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#0a0a0c]">

    <div className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]"/>
    <div className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]"/>

    {/* topbar */}
    <Topbar 
    showPreview={showPreview}
    setShowPreview={setShowPreview}
    />

    <div className="flex flex-1 overflow-hidden">

        <ActivityBar 
        showAiChat={showAiChat}
        showExplorer={showExplorer}
        showTerminal={showTerminal}
        setShowAiChat={setShowAiChat}
        setShowExplorer={setShowExplorer}
        setShowTerminal={setShowTerminal}
        />

    <AnimatePresence initial={false}>
    {showExplorer &&
    <Explorer 
     projectId={id}
     tree={tree}
     reloadTree={loadTree}
     />
    }
    </AnimatePresence>

    </div>


    </div> 
  )
}

export default ProjectPage