import { AnimatePresence, motion } from "framer-motion";
import { getFileIcon } from "../utils/customisedIcon";

const Editor = ({ activeTab,
    openTabs,
    setOpenTabs,
    setActiveTab }) => {

        console.log(activeTab);
        console.log(openTabs);
        
        

  return (
    <div className='flex flex-1 flex-col bg-[#0a0a0c]'>

    {/* tabs */}
    <div className='flex h-10 shrink-0 items-center overflow-x-auto border-b border-white/[0.06] bg-[#111113]/90'>
    <AnimatePresence initial={false}>
    {openTabs.map((tab)=>{
        const active = activeTab?._id == tab?._id
        const { icon:Icon, color} = getFileIcon(tab?.name)

        return(
            <motion.div
            initial={{ opacity:0, width:0 }}
            animate={{ opacity:1, width:"auto"}}
            exit={{opacity:0, width:0}}
            transition={{duration:0.15}} 
            className={`group relative flex h-full cursor-pointer items-center gap-2 whitespace-nowrap border-r border-white/[0.06] px-3.5 transition-colors ${active ? "bg-[#0a0a0c] text-white" : "text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-300"}`}>
            <Icon size={14} className={`${color} shrink-0`} />
            <span className="text-[13px]"> {tab?.name} </span>
            </motion.div>
        )
    })}
    </AnimatePresence>
 
    </div>

    </div> 
  )
}

export default Editor