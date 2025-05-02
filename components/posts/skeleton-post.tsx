import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonPost() {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-5 border border-border/40">
      <CardHeader className="flex-row items-center p-3 pb-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2.5">
            {/* Avatar Skeleton */}
            <Skeleton className="h-10 w-10 rounded-full" />

            {/* Name and Username Skeletons */}
            <div className="ml-0.5">
              <Skeleton className="h-5 w-28 mb-1" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          </div>

          {/* Date Skeleton */}
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-3 pt-1.5 pb-3">
        {/* Post Text Skeletons */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[65%]" />

        {/* Post Image Skeleton */}
        <Skeleton className="h-[200px] w-full rounded-lg mt-2" />
      </CardContent>

      <CardFooter className="px-3 py-2 border-t border-border/20">
        {/* Comments Button Skeleton */}
        <Skeleton className="h-8 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
}
