"use client";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-2xl ${className}`}></div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-[3rem] border-2 border-gray-100 shadow-sm space-y-6">
      <Skeleton className="aspect-square w-full rounded-[2.5rem]" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-10 w-1/4 rounded-xl" />
      </div>
    </div>
  );
}

export function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-12 w-32 rounded-2xl" />
      </div>
      <Skeleton className="w-full h-[500px] md:h-[600px] rounded-[3rem]" />
    </div>
  );
}
