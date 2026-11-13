const ProjectCardSkeleton = () => (
    <div className="relative flex min-h-[200px] animate-pulse flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
      <div className="mb-5 flex items-start justify-between">
        <div className="h-11 w-11 rounded-xl bg-white/[0.06]" />
        <div className="flex gap-1">
          <div className="h-8 w-8 rounded-lg bg-white/[0.05]" />
          <div className="h-8 w-8 rounded-lg bg-white/[0.05]" />
        </div>
      </div>
      <div className="mb-2 h-4 w-3/4 rounded bg-white/[0.07]" />
      <div className="mb-1.5 h-3 w-full rounded bg-white/[0.04]" />
      <div className="h-3 w-2/3 rounded bg-white/[0.04]" />
      <div className="mt-auto border-t border-white/[0.04] pt-3">
        <div className="h-3 w-24 rounded bg-white/[0.04]" />
      </div>
    </div>
  );
  
  export default ProjectCardSkeleton;