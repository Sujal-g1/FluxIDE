
import { motion, useReducedMotion } from "framer-motion";

const ShimmerBlock = ({ className = "" }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`relative isolate overflow-hidden rounded-md bg-[#1C1C1C] ${className}`}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.16), transparent)",
          }}
        />
      )}
    </div>
  );
};

const ProjectCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex min-h-48 flex-col overflow-hidden rounded-2xl border border-[#292929] bg-[#141414] p-5"
    >
      {/* Top row: Project icon + Actions */}
      <div className="mb-5 flex items-start justify-between">
        <ShimmerBlock className="h-11 w-11 rounded-lg" />

        <div className="flex items-center gap-1.5">
          {/* Star action */}
          <ShimmerBlock className="h-8 w-8 rounded-full" />

          {/* Delete action */}
          <ShimmerBlock className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Project title */}
      <ShimmerBlock className="mb-2 h-4 w-2/3" />

      {/* Project description: two-line layout */}
      <div className="min-h-10 space-y-1.5">
        <ShimmerBlock className="h-3 w-full" />
        <ShimmerBlock className="h-3 w-4/5" />
      </div>

      {/* Updated date footer */}
      <div className="mt-5 border-t border-[#292929] pt-3">
        <ShimmerBlock className="h-3 w-28" />
      </div>
    </motion.div>
  );
};

export default ProjectCardSkeleton;
