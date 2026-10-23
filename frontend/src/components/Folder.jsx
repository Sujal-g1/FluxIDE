
import { motion } from "framer-motion";
import { ChevronRight, FolderClosed, FolderOpen } from "lucide-react";
import { useState } from "react";
import { getFolderColor } from "../utils/customisedIcon";

const Folder = ({ projectId, node, tree, reloadTree}) => {

    const [open, setOpen] = useState(false)
    const folderColor = getFolderColor(node?.name)

  return (
    <div className='relative'>
    <motion.div 
    whileHover={{ x:2}}
    transition={{ duration:0.15, ease:"easeOut"}}
    className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
   >

    <div className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5"
    onClick={()=> setOpen(!open)}>

    <motion.div
    animate={{rotate: open ? 90 : 0}}
    transition={{ duration:0.15, ease:"easeOut"}}
    className="shrink-0"
    >
        <ChevronRight 
        size={14} className="text-zinc-500"/>
    </motion.div>

    {
        open ?  <FolderOpen size={16}  className={`shrink-0 ${folderColor}`}/> : <FolderClosed  size={16} className={`shrink-0 ${folderColor}`}/>  
    }
     
    </div>

    </motion.div>

    </div>
  )
}

export default Folder