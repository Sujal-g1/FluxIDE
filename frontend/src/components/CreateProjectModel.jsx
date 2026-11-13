
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  X,
  FolderPlus,
  Loader2,
  AlertCircle,
  ArrowRight,
  FileCode2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewProject } from "../redux/projectSlice";
import { createProject } from "../features/project";
import { createRootFolder } from "../features/file";

const CreateProjectModel = ({ openModel, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!openModel) return;

    const timer = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(timer);
  }, [openModel]);

  useEffect(() => {
    if (!openModel) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openModel, loading, onClose]);

  useEffect(() => {
    if (!openModel) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openModel]);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (!name.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const project = await createProject(
        name.trim(),
        description.trim()
      );

      if (!project?._id) {
        throw new Error("Project creation failed");
      }

      await createRootFolder({
        projectId: project._id,
        projectName: project.name,
      });

      dispatch(addNewProject(project));

      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Create project failed:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {openModel && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
            onClick={() => !loading && onClose()}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-project-title"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 30, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 32,
            }}
            className="relative flex max-h-[92dvh] w-full max-w-[470px] flex-col overflow-hidden rounded-t-[24px] border border-white/[0.09] bg-[#111217] shadow-2xl shadow-black/50 sm:rounded-[22px]"
          >
            {/* Mobile drag indicator */}
            <div className="flex justify-center pt-2.5 sm:hidden">
              <div className="h-1 w-9 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
              <div className="flex min-w-0 items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/[0.10] text-blue-300">
                  <FolderPlus size={20} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-blue-400">
                      New workspace
                    </span>
                  </div>

                  <h2
                    id="create-project-title"
                    className="text-lg font-semibold tracking-tight text-white"
                  >
                    Create a project
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Give your next idea a place to grow.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                aria-label="Close dialog"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
              >
                <X size={17} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleCreateProject}
              className="min-h-0 overflow-y-auto px-5 py-5 sm:px-6"
            >
              <div className="space-y-5">
                {/* Project name */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="project-name"
                      className="text-xs font-medium text-zinc-300"
                    >
                      Project name{" "}
                      <span className="text-blue-400">*</span>
                    </label>

                    <span className="text-[10px] tabular-nums text-zinc-600">
                      {name.length}/60
                    </span>
                  </div>

                  <div className="group relative">
                    <FileCode2
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-blue-400"
                    />

                    <input
                      ref={inputRef}
                      id="project-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (error) setError("");
                      }}
                      maxLength={60}
                      placeholder="e.g. my-awesome-project"
                      disabled={loading}
                      required
                      className="h-11 w-full rounded-xl border border-white/[0.09] bg-white/[0.035] pl-11 pr-4 text-[13px] text-white outline-none transition-all placeholder:text-zinc-600 focus:border-blue-400/50 focus:bg-white/[0.05] focus:ring-[3px] focus:ring-blue-400/10 disabled:opacity-50"
                    />
                  </div>

                  <p className="mt-2 text-[11px] text-zinc-600">
                    Choose a recognizable name for your workspace.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="project-description"
                      className="text-xs font-medium text-zinc-300"
                    >
                      Description{" "}
                      <span className="font-normal text-zinc-600">
                        (optional)
                      </span>
                    </label>

                    <span className="text-[10px] tabular-nums text-zinc-600">
                      {description.length}/200
                    </span>
                  </div>

                  <textarea
                    id="project-description"
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    rows={3}
                    maxLength={200}
                    placeholder="A short description of what you're building..."
                    disabled={loading}
                    className="w-full resize-none rounded-xl border border-white/[0.09] bg-white/[0.035] px-3.5 py-3 text-[13px] leading-6 text-white outline-none transition-all placeholder:text-zinc-600 focus:border-blue-400/50 focus:bg-white/[0.05] focus:ring-[3px] focus:ring-blue-400/10 disabled:opacity-50"
                  />
                </div>

                {/* Workspace info */}
                <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-400/10 text-blue-300">
                    <FolderPlus size={14} />
                  </div>

                  <div>
                    <p className="text-[11.5px] font-medium text-zinc-300">
                      Ready-to-code workspace
                    </p>

                    <p className="mt-1 text-[11px] leading-[18px] text-zinc-500">
                      FluxIDE will initialize your project and
                      create its root folder automatically.
                    </p>
                  </div>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      role="alert"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-500/[0.08] p-3"
                    >
                      <AlertCircle
                        size={15}
                        className="mt-0.5 shrink-0 text-red-400"
                      />

                      <p className="text-xs leading-5 text-red-300">
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-white/[0.07] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-white/[0.09] px-5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 text-xs font-semibold text-white shadow-lg shadow-blue-500/10 transition-all hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create project
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Bottom accent */}
            <div className="h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateProjectModel;
