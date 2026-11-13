
import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  FolderClosed,
  FolderPlus,
  FilePlus2,
  Pencil,
  Trash2,
} from "lucide-react";

import { getFolderIcon, getFileIcon } from "../utils/customisedIcon.js";

import {
  createFile,
  createFolder,
  renameFolder,
  updateFile,
  deleteFile,
  deleteFolder,
} from "../features/file";

const Folder = ({
  projectId,
  node,
  tree,
  reloadTree,
  openFile,
}) => {
  const [open, setOpen] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");

  const [creatingFolderIn, setCreatingFolderIn] = useState(null);
  const [creatingFileIn, setCreatingFileIn] = useState(null);

  const [menu, setMenu] = useState(null);

  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const isFile = node.type === "file";

  const { icon: FolderTypeIcon, color: folderColor } =
    getFolderIcon(node?.name, open);

  const { icon: FileTypeIcon, color: fileColor } = isFile
    ? getFileIcon(node.name)
    : {};

  // Create folder
  const handleCreateFolder = async () => {
    const name = folderName.trim();

    if (!name) return;

    try {
      await createFolder({
        projectId,
        name,
        parentId: node._id,
      });

      await reloadTree();

      setFolderName("");
      setCreatingFolderIn(null);
      setOpen(true);
    } catch (error) {
      console.error(
        "Failed to create folder:",
        error.response?.data || error.message
      );
    }
  };

  // Create file
  const handleCreateFile = async () => {
    const name = fileName.trim();

    if (!name) return;

    try {
      await createFile({
        projectId,
        name,
        parentId: node._id,
      });

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

  // Rename file or folder
  const handleRenameItem = async () => {
    const name = renameValue.trim();

    if (!name || name === node?.name) {
      setRenaming(false);
      setRenameValue("");
      return;
    }

    try {
      if (isFile) {
        await updateFile({
          id: node._id,
          name,
        });
      } else {
        await renameFolder({
          id: node._id,
          name,
        });
      }

      await reloadTree();

      setRenameValue("");
      setRenaming(false);
    } catch (error) {
      console.error(
        "Failed to rename item:",
        error.response?.data || error.message
      );
    }
  };

  // Delete file or folder
  const handleDeleteItem = async () => {
    try {
      if (isFile) {
        await deleteFile(node._id);
      } else {
        await deleteFolder(node._id);
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

  const handleNewFolder = () => {
    setCreatingFolderIn(node._id);
    setCreatingFileIn(null);
    setFolderName("");
    setOpen(true);
    setMenu(null);
  };

  const handleNewFile = () => {
    setCreatingFileIn(node._id);
    setCreatingFolderIn(null);
    setFileName("");
    setOpen(true);
    setMenu(null);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();

    setMenu({
      x: Math.min(event.clientX, window.innerWidth - 190),
      y: Math.min(event.clientY, window.innerHeight - 190),
    });
  };

  const inputClass =
    "w-full rounded-md border border-white/[0.09] bg-[#111113] px-2.5 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors focus:border-[#0057FF]/60";

  const menuItemClass =
    "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-100";

  const renderContextMenu = () =>
    menu &&
    createPortal(
      <AnimatePresence>
        <>
          <motion.div
            key="context-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenu(null)}
            className="fixed inset-0 z-[100]"
          />

          <motion.div
            key="context-menu"
            initial={{ opacity: 0, scale: 0.97, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            style={{
              left: menu.x,
              top: menu.y,
            }}
            className="fixed z-[101] w-44 rounded-lg border border-white/[0.09] bg-[#111113] p-1.5 shadow-xl shadow-black/40"
          >
            {!isFile && (
              <>
                <button
                  type="button"
                  className={menuItemClass}
                  onClick={handleNewFile}
                >
                  <FilePlus2 size={14} />
                  New File
                </button>

                <button
                  type="button"
                  className={menuItemClass}
                  onClick={handleNewFolder}
                >
                  <FolderPlus size={14} />
                  New Folder
                </button>

                <div className="my-1 h-px bg-white/[0.07]" />
              </>
            )}

            <button
              type="button"
              className={menuItemClass}
              onClick={() => {
                setMenu(null);
                setRenameValue(node?.name || "");
                setRenaming(true);
              }}
            >
              <Pencil size={14} />
              Rename
            </button>

            {(isFile || node.parentId != null) && (
              <button
                type="button"
                className={`${menuItemClass} hover:!bg-red-500/10 hover:!text-red-400`}
                onClick={handleDeleteItem}
              >
                <Trash2 size={14} />
                Delete
              </button>
            )}
          </motion.div>
        </>
      </AnimatePresence>,
      document.body
    );

  // Input field
  const renderInput = (value, setValue, placeholder, onSubmit, onCancel) => (
    <motion.div
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-1 pl-5 pr-1"
    >
      <input
        autoFocus
        value={value}
        placeholder={placeholder}
        className={inputClass}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onSubmit();
          }

          if (event.key === "Escape") {
            onCancel();
          }
        }}
      />
    </motion.div>
  );

  // File item
  if (isFile) {
    return (
      <div className="relative min-w-0">
        <motion.div
          onContextMenu={handleContextMenu}
          onClick={() => openFile(node)}
          className="group flex min-w-0 cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-white/[0.045]"
        >
          <FileTypeIcon
            size={15}
            className={`shrink-0 ${fileColor}`}
            strokeWidth={1.8}
          />

          <span className="min-w-0 flex-1 truncate text-[12px] text-zinc-400 transition-colors group-hover:text-zinc-200">
            {node?.name}
          </span>
        </motion.div>

        {renderContextMenu()}

        {renaming &&
          renderInput(
            renameValue,
            setRenameValue,
            node?.name,
            handleRenameItem,
            () => {
              setRenameValue("");
              setRenaming(false);
            }
          )}
      </div>
    );
  }

  // Folder item
  return (
    <div className="relative min-w-0">
      <motion.div
        onContextMenu={handleContextMenu}
        className="group flex min-w-0 items-center gap-1 rounded-md px-2 py-1.5 transition-colors hover:bg-white/[0.045]"
      >
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5"
        >
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.12 }}
            className="shrink-0 text-zinc-600"
          >
            <ChevronRight size={13} />
          </motion.span>

          {open ? (
            <FolderTypeIcon
              size={16}
              className={`shrink-0 ${folderColor}`}
              strokeWidth={1.8}
            />
          ) : (
            <FolderClosed
              size={16}
              className={`shrink-0 ${folderColor}`}
              strokeWidth={1.8}
            />
          )}

          <span className="min-w-0 truncate text-[12px] font-medium text-zinc-300 transition-colors group-hover:text-zinc-100">
            {node?.name}
          </span>
        </div>

        {/* Folder actions */}
        <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            title="New file"
            onClick={handleNewFile}
            className="flex h-6 w-6 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-white/[0.07] hover:text-zinc-200"
          >
            <FilePlus2 size={13} />
          </button>

          <button
            type="button"
            title="New folder"
            onClick={handleNewFolder}
            className="flex h-6 w-6 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-white/[0.07] hover:text-zinc-200"
          >
            <FolderPlus size={13} />
          </button>
        </div>
      </motion.div>

      {renderContextMenu()}

      {/* Folder children */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="ml-[13px] overflow-hidden border-l border-white/[0.07] pl-2"
          >
            {node.children?.map((child) => (
              <Folder
                key={child._id}
                projectId={projectId}
                node={child}
                tree={tree}
                reloadTree={reloadTree}
                openFile={openFile}
              />
            ))}

            {!node.children?.length &&
              !creatingFileIn &&
              !creatingFolderIn && (
                <p className="px-2 py-1.5 text-[11px] text-zinc-600">
                  Empty folder
                </p>
              )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create folder input */}
      {creatingFolderIn === node._id &&
        renderInput(
          folderName,
          setFolderName,
          "Folder name",
          handleCreateFolder,
          () => {
            setFolderName("");
            setCreatingFolderIn(null);
          }
        )}

      {/* Create file input */}
      {creatingFileIn === node._id &&
        renderInput(
          fileName,
          setFileName,
          "File name",
          handleCreateFile,
          () => {
            setFileName("");
            setCreatingFileIn(null);
          }
        )}

      {/* Rename input */}
      {renaming &&
        renderInput(
          renameValue,
          setRenameValue,
          node?.name,
          handleRenameItem,
          () => {
            setRenameValue("");
            setRenaming(false);
          }
        )}
    </div>
  );
};

export default Folder;
