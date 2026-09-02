export default function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="skeleton h-52 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-20 rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="flex gap-3 pt-3 border-t border-white/5">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-3 w-12 rounded" />
          <div className="skeleton h-3 w-10 rounded" />
        </div>
      </div>
    </div>
  );
}
