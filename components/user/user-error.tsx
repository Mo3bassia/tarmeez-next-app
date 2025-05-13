"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

interface UserErrorProps {
  error: Error;
  reset?: () => void;
}

export default function UserError({ error, reset }: UserErrorProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Card className="w-full max-w-md border-red-200 dark:border-red-800/30 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center animate-pulse">
              <Icons.alertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold mt-4">
            An Error Occurred
          </h2>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/10 rounded-md p-4 border border-red-200 dark:border-red-800/30">
            <p className="text-red-700 dark:text-red-300 text-sm font-medium break-words whitespace-pre-wrap">
              {error.message ||
                "An unexpected error occurred while loading data"}
            </p>
          </div>

          <p className="text-center text-muted-foreground text-sm">
            Please try again or return to the previous page
          </p>
        </CardContent>

        <CardFooter className="gap-2 flex justify-center">
          {reset && (
            <Button onClick={reset} variant="default" className="gap-2 group">
              <Icons.refreshCw className="h-4 w-4 transition-transform group-hover:animate-spin" />
              Try Again
            </Button>
          )}

          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.back()}
          >
            <Icons.arrowLeft className="h-4 w-4" />
            Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
