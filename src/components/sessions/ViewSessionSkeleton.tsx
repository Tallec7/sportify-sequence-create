
export const ViewSessionSkeleton = () => {
  return (
    <div className="container py-8 space-y-8" data-testid="view-session-skeleton">
      <div className="space-y-4">
        <div className="h-8 w-64 bg-muted animate-pulse rounded"></div>
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
          <div className="h-6 w-24 bg-muted animate-pulse rounded"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
        <div className="h-24 bg-muted animate-pulse rounded"></div>
      </div>
      
      <div className="space-y-4">
        <div className="h-6 w-24 bg-muted animate-pulse rounded"></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-20 bg-muted animate-pulse rounded"></div>
          <div className="h-20 bg-muted animate-pulse rounded"></div>
          <div className="h-20 bg-muted animate-pulse rounded"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="h-6 w-28 bg-muted animate-pulse rounded"></div>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded"></div>
          <div className="h-32 bg-muted animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  )
}
