
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, File, FileIcon, FilePlus, FilePlus2, FolderClosed, FolderOpen, FolderPlus, FolderPlusIcon, Pencil, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import { getFolderIcon, getFileIcon } from "../utils/customisedIcon";
import { createFile, createFolder, renameFolder, updateFile, deleteFile, deleteFolder } from "../features/file";
import { createPortal } from "react-dom"

const Folder = ({ projectId, node, tree, reloadTree, openFile}) => {

    const [open, setOpen] = useState(false)
    const [folderName, setFolderName] = useState("")
    const [fileName, setFileName] = useState("")
    const [creatingFolderIn, setCreatingFolderIn] = useState(null)
    const [creatingFileIn, setCreatingFileIn] = useState(null)
    const [menu, setMenu] = useState(null)
    const [renaming, setRenaming] = useState(false)
    const [renameValue, setRenameValue] = useState("")

    const { icon: FolderTypeIcon, color: folderColor } =
        getFolderIcon(node?.name, open);

    const handleCreateFolder= async()=>{
        const trimmedName = folderName.trim();
        if (!trimmedName) {
            return;
          }

        try {
            const result = await createFolder({
              projectId,
              name: folderName.trim(),  
              parentId: node._id,
        });

        console.log("Create folder response:", result);
        await reloadTree();

        setFolderName("");
        setCreatingFolderIn(null);
        setOpen(true);
    }catch (error) {
        console.error(
          "Failed to create folder:",
          error.response?.data || error.message
        );
      }
    } 

    const handleCreateFile = async () => {
    const name = fileName.trim();

    if (!name) {
        return;
    }

    try {
        const result = await createFile({
        projectId,
        name,
        parentId: node._id,
        });

        console.log("Create file response:", result);

        await reloadTree();

        setFileName("");
        setCreatingFileIn(null);
        setOpen(true);
    } catch (error) {
        console.error(
        "Failed to create file:",
        error.response?.data || error.message
        );
    }
    };


    const handleRenameFile = async () => {
        const name = renameValue.trim();
      
        if (!name || name === node?.name) {
          setRenaming(false);
          setRenameValue("");
          return;
        }
      
        try {
          if (node.type === "folder") {
            await renameFolder({
              id: node._id,
              name,
            });
          } else {
            await updateFile({
              id: node._id,
              name,
            });
          }
      
          await reloadTree();
      
          setRenameValue("");
          setRenaming(false);
          setOpen(true);
        } catch (error) {
          console.error(
            "Failed to rename item:",
            error.response?.data || error.message
          );
        }
      };

      const handleDeleteItem = async () => {
        try {
          if (node.type === "folder") {
            await deleteFolder(node._id);
          } else {
            await deleteFile(node._id);
          }
      
          setMenu(null);
          await reloadTree();
        } catch (error) {
          console.error(
            "Failed to delete item:",
            error.response?.data || error.message
          );
        }
      };

    const handleNewFolder= async(folder)=>{
        setCreatingFolderIn(folder._id)
        setCreatingFileIn(null)
    }

    const handleNewFile = async(folder)=>{
        setCreatingFileIn(folder._id)
        setCreatingFolderIn(null)
    }


    // file
   if(node.type == "file"){

    const { icon: FileTypeIcon, color: fileColor } = getFileIcon(
        node.name
      );
    return(
        <div className='relative'>
        <motion.div 
        onContextMenu={(e)=>{
            e.preventDefault()
            setMenu({x:e.clientX, y:e.clientY})
        }}
        onClick={()=> openFile(node)}
        className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
       >
    
        {/* root folder name with plus icon */}
        <div className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5">
            
        <FileTypeIcon size={15} className={`shrink-0 ${fileColor}`} />    
        
         <span
         className="truncate text-[13px] text-zinc-300 transition-colors group-hover:text-white "
         >{node?.name}</span>
    
        </div>

        </motion.div>
    
        { menu &&  createPortal (
        <>
        <motion.div 
        className="fixed inset-0 z-40"
        onClick={()=> setMenu(null)}
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}} />
    
        <motion.div
        initial={{ opacity:0, scale:0.96, y:-6}}
        animate={{opacity:1, scale:1, y:0}}
        exit={{ opacity:0, scale:0.96, y:-6}}
        transition={{ duration:0.14, ease:"easeOut"}}
        className="fixed z-50 w-55 rounded-xl border border-white/[0.08] bg-[#1717a]/96 py-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
        style={{ left: menu.x, top: menu.y}}
        >
    
    
        <button
        className="mx-1 flex w-[cal(100%-8px)] items-center gap-2 rounded-md px-3 py-1 text-left text-[12px] text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
        onClick={()=>{setMenu(null)
        setRenameValue(node?.name || "");
        setRenaming(true);
        }}
        >
            <Pencil size={13}/>
            Rename   
        </button>
    
      
         <button
         className="mx-1 flex w-[cal(100%-8px)] items-center gap-2 rounded-md px-3 py-1 text-left text-[12px] text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
        onClick={handleDeleteItem}>
             <Trash  size={13}/>
             Delete  
         </button>
    
        </motion.div>
        </>, document.body 
            )}
        
        { open && (
          <motion.div
          initial={ {opacity:0, height: 0}}
          animate={{ opacity:1, height:'auto'}}
          exit={{ opacity:0, height:0}}
          transition={{ duration:0.16, ease:"easeOut"}}
          className="ml-5 overflow-hidden border-1 border-white/[0.05] pl-1"
          >
            { node.children.map((child)=>(
                 <Folder 
                projectId={projectId} node={child} tree={tree} reloadTree={reloadTree}
                 />
            ))}
    
          </motion.div>   
        )}
    
        {/* folder creation in context menu */}
        { (creatingFolderIn === node._id) && (
        <div className=" py-1 pl-1">
            <motion.input
            initial={{ opacity:0, y:-4}}
            animate={{ opacity:1, y:0}}
            autoFocus
            value={folderName}
            placeholder="folder name"
            className="w-full rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-[13px] text-white placeholder-zinc-500 outline-none transition-all focus:border-sky-400/50 focus:ring-sky-400/15"
            onChange={(e)=> setFolderName(e.target.value)}
            onKeyDown={(e)=>{
                if( e.key === "Enter") {
                    handleCreateFolder()
                    setFolderName("")
                    setCreatingFolderIn(null )
                }
                if( e.key === "Escape") {
                    setFolderName("")
                    setCreatingFolderIn(null)
                }
            }}
            />
         </div>
        )}
    
         {/* file creation in context menu */}
         { ( creatingFileIn === node._id) && ( 
        <div className=" py-1 pl-1">
            <motion.input
            initial={{ opacity:0, y:-4}}
            animate={{ opacity:1, y:0}}
            autoFocus
            value={fileName}
            placeholder="file name"
            className="w-full rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-[13px] text-white placeholder-zinc-500 outline-none transition-all focus:border-sky-400/50 focus:ring-sky-400/15"
            onChange={(e)=> setFileName(e.target.value)}
            onKeyDown={(e)=>{
                if( e.key === "Enter") {
                    handleCreateFile()
                    setFileName("")
                    setCreatingFileIn(null )
                }
                if( e.key === "Escape") {
                    setFileName("")
                    setCreatingFileIn(null)
                }
            }}
            />
         </div>
        )}

        {/* ------- */}
        {  renaming  && ( 
        <div className=" py-1 pl-1">
            <motion.input
            initial={{ opacity:0, y:-4}}
            animate={{ opacity:1, y:0}}
            autoFocus
            value={renameValue}
            placeholder={node?.name}
            className="w-full rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-[13px] text-white placeholder-zinc-500 outline-none transition-all focus:border-sky-400/50 focus:ring-sky-400/15"
            onChange={(e)=> setRenameValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleRenameFile();
                }
              
                if (e.key === "Escape") {
                  setRenameValue("");
                  setRenaming(false);
                }
              }}
            />
         </div>
        )}
         
    
        </div>
    )
   }

//    folder 
  return (
    <div className='relative'>
    <motion.div 
    // whileHover={{ x:2}}
    // transition={{ duration:0.15, ease:"easeOut"}}
    onContextMenu={(e)=>{
        e.preventDefault()
        setMenu({x:e.clientX, y:e.clientY})
    }}
    className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.05] transition-colors"
   >

    {/* root folder name with plus icon */}
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
        open ?  <FolderTypeIcon size={16}  className={`shrink-0 ${folderColor}`}/> : <FolderClosed  size={16} className={`shrink-0 ${folderColor}`}/>  
    }
     <span
     className="truncate text-[13px] text-zinc-300 transition-colors group-hover:text-white "
     >{node?.name}</span>

    </div>

    {/* folder & file creation */}
    <div className="hidden items-center gap-0.5 group-hover:flex">
    <motion.button
    whileHover={{ scale:1.1}}
    whileTap={{scale:0.92}}
    className="rounded-md p-1 text-zinc-500 hover:bg-white/10 hover:text-white"
    onClick={(e)=>{
        e.stopPropagation()
        handleNewFile(node)
        setOpen(true)
    }}>
         <FilePlus2 size={15}/>
    </motion.button>

    <motion.button
    whileHover={{ scale:1.1}}
    whileTap={{scale:0.92}}
    className="rounded-md p-1 text-zinc-500 hover:bg-white/10 hover:text-white"
    onClick={(e)=>{
        e.stopPropagation()
        handleNewFolder(node)
        setOpen(true)
    }}>
         <FolderPlus size={15}/>
    </motion.button>
    </div>


   
    </motion.div>

    { menu &&  createPortal (
    <>
    <motion.div 
    className="fixed inset-0 z-40"
    onClick={()=> setMenu(null)}
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}} />

    <motion.div
    initial={{ opacity:0, scale:0.96, y:-6}}
    animate={{opacity:1, scale:1, y:0}}
    exit={{ opacity:0, scale:0.96, y:-6}}
    transition={{ duration:0.14, ease:"easeOut"}}
    className="fixed z-50 w-55 rounded-xl border border-white/[0.08] bg-[#1717a]/96 py-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
    style={{ left: menu.x, top: menu.y}}
    >

    <button
    className="mx-1 flex w-[cal(100%-8px)] items-center gap-2 rounded-md px-3 py-1 text-left text-[12px] text-zinc-300 transition-colors hover:bg-white/[0.06]"
    onClick={()=>{
        setMenu(null)
        handleNewFile(node)
    }}>
        <FilePlus2 size={13}/>
        New File
    </button>

    <button
    className="mx-1 flex w-[cal(100%-8px)] items-center gap-2 rounded-md px-3 py-1 text-left text-[12px] text-zinc-300 transition-colors hover:bg-white/[0.06]"
    onClick={()=>{
        setMenu(null)
        handleNewFolder(node)
    }}>
        <FolderPlusIcon size={13}/>
        New Folder
    </button>

    <div className="my-1 h-px bg-white/[0.08]"/>

    <button
    className="mx-1 flex w-[cal(100%-8px)] items-center gap-2 rounded-md px-3 py-1 text-left text-[12px] text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
    onClick={()=>{
        setMenu(null)
        setRenameValue(node?.name || "");
        setRenaming(true);
    }}>
        <Pencil size={13}/>
        Rename
    </button>


 { node.parentId!= null && (
    <button
    className="mx-1 flex w-[cal(100%-8px)] items-center gap-2 rounded-md px-3 py-1 text-left text-[12px] text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
       onClick={handleDeleteItem}
        >
        <Trash  size={13}/>
        Delete  
    </button>
 )}

    </motion.div>
    </>, document.body 
        )}
    
    { open && (
      <motion.div
      initial={ {opacity:0, height: 0}}
      animate={{ opacity:1, height:'auto'}}
      exit={{ opacity:0, height:0}}
      transition={{ duration:0.16, ease:"easeOut"}}
      className="ml-5 overflow-hidden border-1 border-white/[0.05] pl-1"
      >
        { node.children.map((child)=>(
             <Folder 
             key={child._id}
            projectId={projectId} node={child} tree={tree} reloadTree={reloadTree}
             />
        ))}

      </motion.div>   
    )}

    {/* folder creation in context menu */}
    { (creatingFolderIn === node._id) && (
    <div className=" py-1 pl-1">
        <motion.input
        initial={{ opacity:0, y:-4}}
        animate={{ opacity:1, y:0}}
        autoFocus
        value={folderName}
        placeholder="folder name"
        className="w-full rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-[13px] text-white placeholder-zinc-500 outline-none transition-all focus:border-sky-400/50 focus:ring-sky-400/15"
        onChange={(e)=> setFolderName(e.target.value)}
        onKeyDown={(e)=>{
            if( e.key === "Enter") {
                handleCreateFolder()
                setFolderName("")
                setCreatingFolderIn(null )
            }
            if( e.key === "Escape") {
                setFolderName("")
                setCreatingFolderIn(null)
            }
        }}
        />
     </div>
    )}

     {/* file creation in context menu */}
     { ( creatingFileIn === node._id) && ( 
    <div className=" py-1 pl-1">
        <motion.input
        initial={{ opacity:0, y:-4}}
        animate={{ opacity:1, y:0}}
        autoFocus
        value={fileName}
        placeholder="file name"
        className="w-full rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-[13px] text-white placeholder-zinc-500 outline-none transition-all focus:border-sky-400/50 focus:ring-sky-400/15"
        onChange={(e)=> setFileName(e.target.value)}
        onKeyDown={(e)=>{
            if( e.key === "Enter") {
                handleCreateFile()
                setFileName("")
                setCreatingFileIn(null )
            }
            if( e.key === "Escape") {
                setFileName("")
                setCreatingFileIn(null)
            }
        }}
        />
     </div>
    )}

    {  renaming  && ( 
        <div className=" py-1 pl-1">
            <motion.input
            initial={{ opacity:0, y:-4}}
            animate={{ opacity:1, y:0}}
            autoFocus
            value={renameValue}
            placeholder={node?.name}
            className="w-full rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-[13px] text-white placeholder-zinc-500 outline-none transition-all focus:border-sky-400/50 focus:ring-sky-400/15"
            onChange={(e)=> setRenameValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleRenameFile();
                }
              
                if (e.key === "Escape") {
                  setRenameValue("");
                  setRenaming(false);
                }
              }}
            />
         </div>
        )}
     

    </div>
  )
}

export default Folder;