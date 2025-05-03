import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonUser() {
  return (
    <Card className="max-w-4xl mx-auto shadow-md">
      <CardHeader className="pb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Skeleton className="h-32 w-32 rounded-full border-4 border-primary/5" />

          <div className="flex flex-col items-center md:items-start">
            <Skeleton className="h-8 w-40 mb-2" />

            <div className="flex items-center gap-1 mb-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-5 w-28" />
            </div>

            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-36" />
            </div>

            <div className="flex gap-6 mt-4">
              <div className="flex flex-col items-center">
                <Skeleton className="h-8 w-12 mb-1" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-3 w-3 rounded-sm" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Skeleton className="h-8 w-12 mb-1" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-3 w-3 rounded-sm" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default SkeletonUser;
