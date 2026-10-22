
import { motion } from "framer-motion";
import { Star, Trash2, FolderCode } from "lucide-react";
import { deleteProject, toggleStar } from "../features/project";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  upsertProject,
  removeProject,
} from "../redux/projectSlice";

const ProjectCard = ({ project }) => {
  const [loadingStar, setLoadingStar] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

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

  const handleDelete = async (e) => {
    e.stopPropagation();
  
    if (loadingDelete) return;
  
    const confirmed = window.confirm(
      `Delete "${project.name}"?`
    );
  
    if (!confirmed) return;
  
    setLoadingDelete(true);
  
    try {
      await deleteProject(project._id);
      dispatch(removeProject(project._id));
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setLoadingDelete(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
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
  );
};

export default ProjectCard;
