
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Star,
  Trash2,
  FolderCode,
  ArrowUpRight,
} from "lucide-react";

import { deleteProject, toggleStar } from "../features/project";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { upsertProject, removeProject } from "../redux/projectSlice";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const [loadingStar, setLoadingStar] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hovered, setHovered] = useState(false);

  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();

  // Toggle project star
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

  // Open delete confirmation
  const handleDelete = (e) => {
    e.stopPropagation();

    if (loadingDelete) return;

    setShowDeleteModal(true);
  };

  // Confirm project deletion
  const handleConfirmDelete = async () => {
    if (loadingDelete) return;

    setLoadingDelete(true);

    try {
      await deleteProject(project._id);
      dispatch(removeProject(project._id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error(
        "Failed to delete project:",
        err.response?.data || err.message
      );
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleCancelDelete = () => {
    if (loadingDelete) return;
    setShowDeleteModal(false);
  };

  // Open project
  const handleOpen = () => {
    navigate(`/project/${project._id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  // Updated date
  const updatedLabel = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "recently";

    /* ---------- cursor-tracked sparkle ---------- */

    const handleMouseMove = (e) => {
      if (reduceMotion) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      // CSS variables used for the radial glow + border highlight
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
  
      // Sparkle dot follows the cursor (only inside the card)
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
        glowRef.current.style.opacity = "1";
      }
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };
  
    const handleMouseEnter = () => {
      setHovered(true);
    };
  

  return (
    <>
      {/* ========================================
          PROJECT CARD
      ======================================== */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 22,
                scale: 0.96,
                filter: "blur(8px)",
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        exit={
          reduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                scale: 0.96,
                filter: "blur(5px)",
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 180,
                damping: 22,
                mass: 0.8,
              }
        }
        ref={cardRef}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`Open project ${project.name}`}
        className="group relative isolate flex min-h-[200px] cursor-pointer flex-col overflow-hidden rounded-lg border border-[#292929] bg-[#141414] p-5 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
      >
        {/* Animated blue border beam */}
        <motion.div aria-hidden="true"
          className="pointer-events-none absolute -inset-[100%] z-0"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 290deg, #2563eb 315deg, #60a5fa 325deg, #ffffff 330deg, #2563eb 338deg, transparent 355deg)",
          }}
          animate={
            reduceMotion || !isHovered
              ? {
                  rotate: 0,
                  opacity: 0,
                }
              : {
                  rotate: 360,
                  opacity: 1,
                }
          }
          transition={{
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 0.25,
            },
          }}
        />

 {/* Sparkle dot that follows the cursor */}
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#60A5FA] opacity-0 transition-opacity duration-300"
          style={{
            boxShadow:
              "0 0 10px 2px rgba(96,165,250,0.55), 0 0 24px 6px rgba(59,130,246,0.20)",
          }}
        />

        {/* Inner dark surface */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1px] z-[1] rounded-[7px] bg-[#141414]"
        />

        {/* Ambient blue glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 z-[2] h-48 w-48 rounded-full bg-blue-500/20 blur-[80px]"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 0.7,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Card content */}
        <div className="relative z-10 flex min-h-[158px] flex-1 flex-col">

          {/* Top section */}
          <div className="relative mb-5 flex items-start justify-between">

            {/* Project icon */}
            <motion.div
              // animate={
              //   reduceMotion
              //     ? {}
              //     : {
              //         scale: isHovered ? 1.08 : 1,
              //         rotate: isHovered ? -5 : 0,
              //       }
              // }
              // transition={{
              //   type: "spring",
              //   stiffness: 300,
              //   damping: 15,
              // }}
              className="flex h-11 w-11 items-center justify-center rounded-md bg-[#3B82F6]/10 text-[#60A5FA] ring-1 ring-[#3B82F6]/20 transition-colors duration-300 group-hover:bg-blue-500/20 group-hover:ring-blue-400/40"
            >
              <FolderCode size={21} strokeWidth={1.75} />
            </motion.div>

            {/* Actions */}
            <div className="flex items-center gap-1">

              {/* Star */}
              <button
                type="button"
                onClick={handleToggleStar}
                disabled={loadingStar}
                aria-label={
                  project.starred
                    ? "Unstar project"
                    : "Star project"
                }
                aria-pressed={project.starred}
                className="rounded-full p-2 text-[#8B8B8B] transition-colors hover:bg-[#FBBF24]/10 hover:text-[#FBBF24] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#FBBF24]"
              >
                <Star
                  size={17}
                  strokeWidth={1.75}
                  fill={project.starred ? "currentColor" : "none"}
                  className={
                    project.starred ? "text-[#FBBF24]" : ""
                  }
                />
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={handleDelete}
                disabled={loadingDelete}
                aria-label="Delete project"
                className="rounded-full p-2 text-[#8B8B8B] transition-colors hover:bg-[#F87171]/10 hover:text-[#F87171] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F87171]"
              >
                <Trash2 size={17} strokeWidth={1.75} />
              </button>

            </div>
          </div>

          {/* Project name */}
          <h3 className="relative mb-1.5 break-words pr-1 text-[15px] font-medium tracking-tight text-[#FAFAFA] transition-colors duration-200 group-hover:text-blue-100">
            {project.name}
          </h3>

          {/* Description */}
          <p className="relative line-clamp-2 min-h-9 break-words text-[12.5px] leading-[1.45] text-[#8B8B8B]">
            {project.description || "No description provided."}
          </p>

          {/* Footer */}
          <div className="relative mt-auto flex items-center justify-between border-t border-[#262626] pt-3 text-[11px] text-[#8B8B8B]">

            <span>Updated {updatedLabel}</span>

            <motion.span
              animate={
                reduceMotion
                  ? { opacity: 1, x: 0 }
                  : {
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -6,
                    }
              }
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1 text-blue-400"
            >
              Open
              <ArrowUpRight size={12} />
            </motion.span>

          </div>
        </div>
      </motion.div>

      {/* ========================================
          DELETE CONFIRMATION MODAL
      ======================================== */}

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (
                e.target === e.currentTarget &&
                !loadingDelete
              ) {
                handleCancelDelete();
              }
            }}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-project-title"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 24, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
              className="w-full max-w-md rounded-t-xl border border-[#262626] bg-[#141414] p-5 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.8)] sm:rounded-xl"
            >
              <h2
                id="delete-project-title"
                className="text-[15px] font-medium text-[#FAFAFA]"
              >
                Delete project?
              </h2>

              <p className="mt-2 text-[12.5px] leading-6 text-[#8B8B8B]">
                Are you sure you want to delete{" "}
                <span className="font-medium text-[#FAFAFA]">
                  "{project.name}"
                </span>
                ? This action cannot be undone.
              </p>

              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                {/* Cancel */}
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  disabled={loadingDelete}
                  className="rounded-full border border-[#262626] bg-[#0A0A0A] px-4 py-2 text-[12.5px] font-medium text-[#FAFAFA] transition-colors hover:border-[#333333] hover:bg-[#1C1C1C] disabled:opacity-50"
                >
                  Cancel
                </button>

                {/* Confirm */}
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={loadingDelete}
                  className="rounded-full bg-[#F87171] px-4 py-2 text-[12.5px] font-medium text-[#0A0A0A] transition-colors hover:bg-[#FCA5A5] disabled:opacity-60"
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
