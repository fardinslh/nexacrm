import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 p-2 md:p-4 animate-in fade-in-50 duration-300">
      
      {/* Header Skeleton with Persian Loading Spinner */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 animate-spin">
            <Loader2 className="size-5" />
          </div>
          <div className="flex flex-col gap-1 text-start">
            <Skeleton className="h-6 w-36 rounded-lg bg-slate-200" />
            <Skeleton className="h-3 w-56 rounded-md bg-slate-100" />
          </div>
        </div>
        <Skeleton className="h-9 w-28 rounded-xl bg-slate-200" />
      </div>

      {/* KPI Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20 rounded-md bg-slate-100" />
              <Skeleton className="size-8 rounded-lg bg-slate-100" />
            </div>
            <Skeleton className="h-7 w-28 rounded-lg bg-slate-200" />
            <Skeleton className="h-3 w-32 rounded-md bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Content Table Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <Skeleton className="h-9 w-64 rounded-xl bg-slate-100" />
          <Skeleton className="h-8 w-24 rounded-lg bg-slate-100" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((row) => (
            <div key={row} className="flex items-center justify-between py-3 border-b border-slate-50 gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-full bg-slate-100" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32 rounded-md bg-slate-200" />
                  <Skeleton className="h-3 w-24 rounded-md bg-slate-100" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full bg-slate-100" />
              <Skeleton className="h-4 w-28 rounded-md bg-slate-100" />
              <Skeleton className="size-7 rounded-lg bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
