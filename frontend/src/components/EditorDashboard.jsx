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
     

//     console.log("openTabs:", openTabs);
// console.log("openTabs length:", openTabs?.length);
// console.log("activeTab:", activeTab);

  return (

    <div className="flex flex-1 flex-col bg-[#09090B]">  

    <div className="flex h-10 shrink-0 items-center overflow-x-auto border-b border-white/[0.07] bg-[#09090B] [&::-webkit-scrollbar]:h-0">
      <AnimatePresence initial={false} mode="popLayout">
        {openTabs.map((tab, idx) => {
          const active =
            String(activeTab?._id) === String(tab?._id);

          const { icon: Icon, color } = getFileIcon(tab?.name);

          return (
            <motion.div
              key={tab._id || `${tab.name}-${idx}`}
              layout
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{
                duration: 0.14,
                layout: { type: "spring", stiffness: 400, damping: 32 },
              }}
              onClick={() => setActiveTab(tab)}
              className={`group relative flex h-full shrink-0 cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap border-r border-white/[0.06] px-3 transition-colors ${
                active
                  ? "bg-[#111113] text-zinc-100"
                  : "text-zinc-500 hover:bg-white/[0.035] hover:text-zinc-300"
              }`}
            >
              <Icon
                size={14}
                strokeWidth={1.8}
                className={`${color} shrink-0`}
              />

              <span className="max-w-[180px] truncate text-xs">
                {tab?.name}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseTab(tab._id);
                }}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded transition-colors hover:bg-white/[0.08] hover:text-zinc-100 ${
                  active
                    ? "text-zinc-500"
                    : "text-zinc-600 opacity-0 group-hover:opacity-100"
                }`}
                aria-label={`Close ${tab.name}`}
                title={`Close ${tab.name}`}
              >
                <X size={12} />
              </button>

              {active && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-[#0057FF]"
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>

    {/* save button */}
    <div className="flex h-10 shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#09090B] px-3 sm:px-4">
  <div className="flex min-w-0 items-center gap-2">
  {activeTab && (
  <motion.button
    type="button"
    whileTap={{ scale: 0.96 }}
    onClick={save}
    disabled={saving}
    title={saving ? "Saving..." : justSaved ? "Saved" : "Save changes"}
    aria-label="Save changes"
    className="flex h-7 items-center gap-2 rounded-md px-2.5 text-[11px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {/* Green status dot */}
    <span className={`h-1.5 w-1.5 rounded-full transition-colors ${
        justSaved
          ? "bg-emerald-400"
          : saving
            ? "animate-pulse bg-amber-400"
            : "bg-emerald-400"
      }`}
    />

    <AnimatePresence mode="wait" initial={false}>
      {saving ? (
        <motion.span
          key="saving"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Saving...
        </motion.span>
      ) : justSaved ? (
        <motion.span
          key="saved"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Saved
        </motion.span>
      ) : (
        <motion.span
          key="save"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Save
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
)}
  </div>

  </div>

   {/* editor area */}
   
{/* Editor area */}
<div className="relative min-h-0 flex-1 overflow-hidden bg-[#0a0a0c]">
  {openTabs.length === 0 ? (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <Code2 size={30} className="text-blue-400" />
      </div>

      <h2 className="text-lg font-semibold tracking-tight text-zinc-200">
        No files open
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
        Open a file from the Explorer to start coding.
        Your workspace is waiting for you.
      </p>

      <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-zinc-500">
        <span className="text-blue-400">Tip</span>
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