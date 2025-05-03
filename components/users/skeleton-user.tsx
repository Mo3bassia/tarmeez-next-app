import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonUser() {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-5 border border-border/40">
      <CardHeader className="flex-row items-center p-3 pb-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />

            <div className="ml-0.5">
              <Skeleton className="h-6 w-32 mb-1" />
              <Skeleton className="h-4 w-24 mb-1" />
              <div className="flex items-center gap-1 mt-1">
                <Skeleton className="w-3 h-3" />
                <Skeleton className="h-3 w-28" />
              </div>
            </div>
          </div>

          <Skeleton className="h-5 w-16 rounded-full hidden md:block" />
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 p-3 rounded-lg text-center">
            <Skeleton className="h-8 w-12 mx-auto" />
            <div className="flex items-center justify-center gap-1 mt-1">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          <div className="bg-muted/30 p-3 rounded-lg text-center">
            <Skeleton className="h-8 w-12 mx-auto" />
            <div className="flex items-center justify-center gap-1 mt-1">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-3 py-2 border-t border-border/20">
        <Skeleton className="h-4 w-32 mx-auto" />
      </CardFooter>
    </Card>
  );
}

export default SkeletonUser;
