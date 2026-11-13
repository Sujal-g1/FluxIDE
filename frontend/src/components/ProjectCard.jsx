import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star, Trash2, FolderCode, ArrowUpRight } from "lucide-react";
import { deleteProject, toggleStar } from "../features/project";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { upsertProject, removeProject } from "../redux/projectSlice";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const [loadingStar, setLoadingStar] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();

  const handleToggleStar = async (e) => {
    e.stopPropagation();
    if (loadingStar) return;
    setLoadingStar(true);
    try {
      const updatedProject = await toggleStar(project._id);
      dispatch(upsertProject(updatedProject));
    } catch (err) {
      console.error("Failed to toggle star:", err);
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
    } catch (err) {
      console.error("Failed to delete project:", err.response?.data || err.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleCancelDelete = () => {
    if (loadingDelete) return;
    setShowDeleteModal(false);
  };

  const handleOpen = () => navigate(`/project/${project._id}`);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  const updatedLabel = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "recently";

  return (
    <>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Open project ${project.name}`}
        className="group relative flex min-h-[200px] cursor-pointer flex-col rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.015] p-5 shadow-sm transition-all duration-200 hover:border-white/[0.14] hover:from-white/[0.055] hover:to-white/[0.025] hover:shadow-[0_8px_32px_-8px_rgba(139,92,246,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        {/* Hover glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(139,92,246,0.08), transparent 40%)",
          }}
        />

        <div className="relative mb-5 flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300 ring-1 ring-blue-400/20">
            <FolderCode size={21} />
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleToggleStar}
              disabled={loadingStar}
              aria-label={project.starred ? "Unstar project" : "Star project"}
              aria-pressed={project.starred}
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-amber-400/10 hover:text-amber-300 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-amber-400"
            >
              <Star
                size={17}
                fill={project.starred ? "currentColor" : "none"}
                className={project.starred ? "text-amber-400" : ""}
              />
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={loadingDelete}
              aria-label="Delete project"
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-rose-400/10 hover:text-rose-300 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-rose-400"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>

        <h3 className="relative mb-1.5 break-words pr-1 text-[15px] font-semibold tracking-tight text-white">
          {project.name}
        </h3>

        <p className="relative line-clamp-2 min-h-9 break-words text-[12.5px] leading-[1.45] text-zinc-400">
          {project.description || "No description provided."}
        </p>

        <div className="relative mt-auto flex items-center justify-between border-t border-white/[0.06] pt-3 text-[11px] text-zinc-500">
          <span>Updated {updatedLabel}</span>
          <span className="flex items-center gap-1 text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
            Open <ArrowUpRight size={12} />
          </span>
        </div>
      </motion.div>

      {/* Delete confirmation */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget && !loadingDelete) handleCancelDelete();
            }}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-project-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="w-full max-w-md rounded-t-2xl border border-white/[0.08] bg-[#131419] p-5 shadow-2xl sm:rounded-2xl"
            >
              <h2 id="delete-project-title" className="text-[15px] font-semibold text-white">
                Delete project?
              </h2>
              <p className="mt-2 text-[12.5px] leading-6 text-zinc-400">
                Are you sure you want to delete{" "}
                <span className="font-medium text-zinc-100">"{project.name}"</span>? This
                action cannot be undone.
              </p>

              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  disabled={loadingDelete}
                  className="rounded-lg border border-white/[0.1] px-4 py-2 text-[12.5px] text-zinc-300 transition hover:bg-white/[0.05] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={loadingDelete}
                  className="rounded-lg bg-rose-500 px-4 py-2 text-[12.5px] font-semibold text-white transition hover:bg-rose-400 disabled:opacity-60"
                >
                  {loadingDelete ? "Deleting…" : "Delete project"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;