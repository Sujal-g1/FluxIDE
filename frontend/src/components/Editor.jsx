import { AnimatePresence, motion } from "framer-motion";
import { getFileIcon, getFolderIcon } from "../utils/customisedIcon";
import { Check, Loader2, Save, X } from "lucide-react";
import { useState } from "react";
import { updateFile } from "../features/file";

const Editor = ({ activeTab,
    openTabs,
    setOpenTabs,
    setActiveTab }) => {

    const [saving, setSaving] = useState(false)
    const [justSaved, setJustSaved] = useState(false)
    const [code, setCode] = useState("")

    const ActiveIcon = getFolderIcon(activeTab?.name).icon
    const activeColor = getFileIcon(activeTab?.name).color

    const handleCloseTab=(id)=>{
        const result = openTabs.filter(tab=> tab._id != id)
        setOpenTabs(result)
    }

    const save= async()=>{
        if(!activeTab) return
        try {
        setSaving(true)
        await updateFile({ id:activeTab?._id, name:activeTab?.name, content:code })
        setActiveTab({...activeTab, content:code })
        setOpenTabs((tabs)=> tabs .map((tab)=> tab._id == activeTab._id?{...tab, content:code}:tab))
        setSaving(false)
        setJustSaved(true)
        setTimeout(()=>{
        setJustSaved(false)
        },1500)
        } catch (error) {
            setSaving(false)
            console.log("save error",error);
        }
    }
     

  return (
    <div className="flex flex-1 flex-col bg-[radial-gradient(ellipse_at_top_left,_rgba(79,70,229,0.08),_transparent_45%),radial-gradient(ellipse_at_bottom_right,_rgba(56,189,248,0.04),_transparent_40%),linear-gradient(135deg,_#0c0c12_0%,_#09090d_55%,_#10101a_100%)]">

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
            onClick={() => setActiveTab(tab)}
            className={`group relative flex h-full cursor-pointer items-center gap-2 whitespace-nowrap border-r border-white/[0.06] px-3.5 transition-colors ${active ? "bg-[#0a0a0c] text-white" : "text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-300"}`}>
            <Icon size={14} className={`${color} shrink-0`} />  
            <span className="text-[13px]"> {tab?.name} </span>

            <button className="rounded p-0.5 text-zinc-500 opacity-0 hover:bg-white/10 hover:text-white group-hover:opacity-100"
            onClick={(e) => {
                e.stopPropagation();
                handleCloseTab(tab._id);
              }}
              >
             <X  size={13}/>
            </button>

        {active && (
        <motion.div 
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-sky-400 to-violet-400"
        transition={{ duration:0.2, ease:"easeOut"}}
        />    
        )}
        </motion.div>
        )
    })}
    </AnimatePresence>
    </div>


    {/* save button */}
   <div className="flex h-10 shrink-0 items-center gap-4 border-b border-white/[0.06] px-4">

    <div className="flex items-center gap-2 text-zinc-400">
    <ActiveIcon size={14} className={`${activeColor}`} />
    <span className="text-[13px]"> {activeTab?.name} </span>
    </div>

    <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={save}
    disabled={saving}
    className={`flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-b text-white shadow-[0_1px_0_rgba(255,255,255,0.2)_inset] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
      justSaved 
        ? "from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500" 
        : "from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500"
    }`}
  >

    <AnimatePresence mode="wait" initial={false} >
    {
    (
        saving?
        (
            <motion.span
            key="saving"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center justify-center"
          >
        <Loader2 size={10} className="animate-spin" />
        </motion.span>
        ):
        justSaved?(
            <motion.span
            key="saved"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center justify-center"
          >
            <Check size={10} strokeWidth={2.5} />
        </motion.span>
        ):(
        <motion.span
          key="save"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center justify-center"
        >
         </motion.span>
        )
     )
    }
    </AnimatePresence>

 
    </motion.div>
   </div>

    </div> 
  )
}

export default Editor