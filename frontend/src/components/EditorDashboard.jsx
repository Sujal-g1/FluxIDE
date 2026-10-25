import { AnimatePresence, motion } from "framer-motion";
import { getFileIcon, getFolderIcon } from "../utils/customisedIcon";
import { Check, Loader2, Save, X, Code2 } from "lucide-react";
import { useState } from "react";
import { updateFile } from "../features/file";

import {
  setupMonaco,
  syncMonacoFileNames,
  getEditorLanguage,
} from "../monaco/monacoConfig";


import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react"; 


const EditorDashboard = ({ activeTab,
    openTabs,
    setOpenTabs,
    setActiveTab }) => {

    const [saving, setSaving] = useState(false)
    const [justSaved, setJustSaved] = useState(false)
    const [code, setCode] = useState("")

    useEffect(() => {
      setCode(activeTab?.content || "");
    }, [activeTab?._id, activeTab?.content]);


    const ActiveIcon = getFolderIcon(activeTab?.name).icon
    const activeColor = getFileIcon(activeTab?.name).color

    // const handleCloseTab = (id) => {
    //   const remainingTabs = openTabs.filter(
    //     (tab) => String(tab._id) !== String(id)
    //   );
    
    //   setOpenTabs(remainingTabs);
    
    //   if (String(activeTab?._id) === String(id)) {
    //     setActiveTab(
    //       remainingTabs.length > 0
    //         ? remainingTabs[remainingTabs.length - 1]
    //         : null
    //     );
    //   }
    // };

    const handleCloseTab = (id) => {
      console.log("1. Close button clicked:", id);
      console.log("2. Tabs before closing:", openTabs);
    
      const remainingTabs = openTabs.filter(
        (tab) => String(tab._id) !== String(id)
      );
    
      console.log("3. Tabs after filtering:", remainingTabs);
    
      setOpenTabs(remainingTabs);
    
      if (String(activeTab?._id) === String(id)) {
        setActiveTab(
          remainingTabs.length > 0
            ? remainingTabs[remainingTabs.length - 1]
            : null
        );
      }
    };

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

    useEffect(() => {
      syncMonacoFileNames(openTabs);
    }, [openTabs]);
     

    console.log("openTabs:", openTabs);
console.log("openTabs length:", openTabs?.length);
console.log("activeTab:", activeTab);

  return (

    <div className="flex flex-1 flex-col bg-[radial-gradient(ellipse_at_top_left,rgba(79,70,229,0.08),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.04),transparent_40%),linear-gradient(135deg,#0c0c12_0%,#09090d_55%,#10101a_100%)]">

    {/* tabs */}
   {/* <div className="flex h-10 shrink-0 items-center overflow-x-auto border-b border-white/[0.06] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.14),transparent_70%),linear-gradient(135deg,#12121f_0%,#0d0d16_55%,#151522_100%)]">
    <AnimatePresence initial={false}>
    {openTabs.map((tab, idx)=>{
        const active = activeTab?._id == tab?._id
        const { icon:Icon, color} = getFileIcon(tab?.name)

        return(
            <motion.div
            key={tab._id || `${tab.name}-${idx}`}
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
    </div> */}

  

<div className="flex h-10 shrink-0 items-center overflow-x-auto border-b border-white/[0.06] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.14),transparent_70%),linear-gradient(135deg,#12121f_0%,#0d0d16_55%,#151522_100%)]">
  <AnimatePresence initial={false} mode="popLayout">
    {openTabs.map((tab, idx) => {
      const active = String(activeTab?._id) === String(tab?._id);
      const { icon: Icon, color } = getFileIcon(tab?.name);

      return (
        <motion.div
          key={tab._id || `${tab.name}-${idx}`}
          layout
          initial={{ opacity: 0, x: 12, width: 0 }}
          animate={{ opacity: 1, x: 0, width: "auto" }}
          exit={{ opacity: 0, x: -10, width: 0 }}
          transition={{
            opacity: { duration: 0.16 },
            x: { type: "spring", stiffness: 400, damping: 30 },
            width: { duration: 0.2, ease: "easeInOut" },
            layout: { type: "spring", stiffness: 420, damping: 35 },
          }}
          onClick={() => setActiveTab(tab)}
          className={`group relative flex h-full shrink-0 cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap border-r border-white/[0.06] px-3.5 transition-colors duration-200 ${
            active
              ? "bg-[#0a0a0c] text-white"
              : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
          }`}
        >
          <Icon size={14} className={`${color} shrink-0`} />

          <motion.span
            layout="position"
            className="text-[13px]"
          >
            {tab?.name}
          </motion.span>

          <motion.button
            type="button"
            initial={false}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.stopPropagation();
              handleCloseTab(tab._id);
            }}
            className="rounded p-0.5 text-zinc-500 opacity-0 transition-colors hover:bg-white/10 hover:text-white group-hover:opacity-100"
            aria-label={`Close ${tab.name}`}
            title={`Close ${tab.name}`}
          >
            <X size={13} />
          </motion.button>

          <AnimatePresence>
            {active && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-sky-400 to-violet-400"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      );
    })}
  </AnimatePresence>
</div>



    {/* save button */}
   <div className="flex h-10 shrink-0 items-center gap-4 border-b border-white/[0.06] px-4">

   {activeTab && (
    <div className="flex items-center gap-2 text-zinc-400">
    <ActiveIcon size={14} className={`${activeColor}`} />
    <span className="text-[13px]"> {activeTab?.name} </span>
    </div>
   )}

    {activeTab && (
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
    )}
   </div>

   {/* editor area */}
   
{/* Editor area */}
<div className="relative min-h-0 flex-1 overflow-hidden bg-[#0a0a0c]">
  {openTabs.length === 0 ? (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <Code2 size={30} className="text-violet-400" />
      </div>

      <h2 className="text-lg font-semibold tracking-tight text-zinc-200">
        No files open
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
        Open a file from the Explorer to start coding.
        Your workspace is waiting for you.
      </p>

      <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-zinc-500">
        <span className="text-violet-400">Tip</span>
        <span>Select any file from the sidebar to get started.</span>
      </div>
    </div>
  ) : activeTab ? (
    <Editor
      height="100%"
      theme="flux-dark"
      path={String(activeTab._id)}
      language={getEditorLanguage(activeTab.name)}
      value={code}
      beforeMount={setupMonaco}
      onChange={(value) => setCode(value ?? "")}
      options={{
        fontSize: 14,
        automaticLayout: true,
        minimap: { enabled: false },
        wordWrap: "on",
        scrollBeyondLastLine: false,
        padding: { top: 12 },
        quickSuggestions: {
          other: true,
          comments: false,
          strings: true,
        },
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: "on",
        tabCompletion: "on",
        wordBasedSuggestions: "currentDocument",
        snippetSuggestions: "inline",
        parameterHints: { enabled: true },
        hover: { enabled: true },
        lightbulb: { enabled: true },
      }}
    />
  ) : (
    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
      Select a file to continue.
    </div>
  )}
</div>



    </div> 
  )
}

export default EditorDashboard