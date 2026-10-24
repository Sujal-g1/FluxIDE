
import { AnimatePresence, motion } from "framer-motion";
import { Star, Trash2, FolderCode } from "lucide-react";
import { deleteProject, toggleStar } from "../features/project";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  upsertProject,
  removeProject,
  setCurrentProject,
} from "../redux/projectSlice";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const [loadingStar, setLoadingStar] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const handleToggleStar = async (e) => {
    e.stopPropagation();
  
    if (loadingStar) return;
  
    setLoadingStar(true);
  
    try {
      const updatedProject = await toggleStar(project._id);
      dispatch(upsertProject(updatedProject));
    } catch (error) {
      console.error("Failed to toggle star:", error);
    } finally {
      setLoadingStar(false);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (loadingDelete) return;
    setShowDeleteModal(true);
  };


  const handleConfirmDelete = async () => {
    if (loadingDelete) return;
  
    setLoadingDelete(true);
  
    try {
      await deleteProject(project._id);
      dispatch(removeProject(project._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error.response?.data || error.message
      );
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleCancelDelete = () => {
    if (loadingDelete) return;
    setShowDeleteModal(false);
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -3 }} 
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={()=> {
        navigate(`/project/${project._id}`)
      }}
      
      className="group relative min-h-48 cursor-pointer rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none dark:hover:border-white/[0.14] dark:hover:bg-white/[0.045]"
    >
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
          <FolderCode size={22} />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleStar}
            disabled={loadingStar}
            aria-label={
              project.starred ? "Unstar project" : "Star project"
            }
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-amber-50 hover:text-amber-500 disabled:opacity-50 dark:hover:bg-amber-400/10"
          >
            <Star
              size={18}
              fill={project.starred ? "currentColor" : "none"}
              className={project.starred ? "text-amber-400" : ""}
            />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loadingDelete}
            aria-label="Delete project"
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-400/10"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <h3 className="mb-2 break-words pr-1 text-base font-semibold text-zinc-900 dark:text-white">
        {project.name}
      </h3>

      <p className="line-clamp-2 min-h-10 break-words text-sm leading-5 text-zinc-500 dark:text-zinc-400">
        {project.description || "No description provided."}
      </p>

      <div className="mt-5 border-t border-black/[0.06] pt-3 text-xs text-zinc-400 dark:border-white/[0.08]">
        Updated{" "}
        {project.updatedAt
          ? new Date(project.updatedAt).toLocaleDateString()
          : "recently"}
      </div>
    </motion.div>
<AnimatePresence>
  {showDeleteModal && (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loadingDelete) {
          handleCancelDelete();
        }
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-project-title"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151518] p-5 shadow-2xl"
      >
        <h2
          id="delete-project-title"
          className="text-lg font-semibold text-white"
        >
          Delete project?
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Are you sure you want to delete{" "}
          <span className="font-medium text-zinc-200">
            "{project.name}"
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancelDelete}
            disabled={loadingDelete}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmDelete}
            disabled={loadingDelete}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 disabled:opacity-50"
          >
            {loadingDelete ? "Deleting..." : "Delete project"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
</>

);}


export default ProjectCard
