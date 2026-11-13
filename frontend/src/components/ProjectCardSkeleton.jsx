const ShimmerBlock = ({ className = "" }) => (
  <div
    className={`relative overflow-hidden rounded bg-[#1C1C1C] ${className}`}
  >
    <div
      aria-hidden
      className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite]"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.10) 40%, rgba(59,130,246,0.18) 50%, rgba(59,130,246,0.10) 60%, transparent 100%)",
      }}
    />
  </div>
);

const ProjectCardSkeleton = () => (
  <div className="relative flex min-h-[200px] flex-col overflow-hidden rounded-lg border border-[#262626] bg-[#141414] p-5">
    {/* Soft corner glow to match loaded cards */}
    <div
      aria-hidden
      className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#3B82F6]/[0.04] blur-2xl"
    />

    <div className="mb-5 flex items-start justify-between">
      <ShimmerBlock className="h-11 w-11 rounded-md" />
      <div className="flex gap-1">
        <ShimmerBlock className="h-8 w-8 rounded-full" />
        <ShimmerBlock className="h-8 w-8 rounded-full" />
      </div>
    </div>

    <ShimmerBlock className="mb-2 h-4 w-3/4" />
    <ShimmerBlock className="mb-1.5 h-3 w-full" />
    <ShimmerBlock className="h-3 w-2/3" />

    <div className="mt-auto border-t border-[#262626] pt-3">
      <ShimmerBlock className="h-3 w-24" />
    </div>
  </div>
);

export default ProjectCardSkeleton;