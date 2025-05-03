"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, RefreshCcw, AlertCircle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center space-y-4 py-8">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400 animate-pulse" />
          <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white shadow-lg animate-bounce">
            !
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Something went wrong!
        </h1>

        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          We apologize for the inconvenience. The page you&apos;re looking for
          encountered an error.
        </p>

        <div className="text-sm text-muted-foreground p-2 bg-muted/50 rounded-md max-w-[80%] overflow-auto">
          <code>{error.message || "An unexpected error occurred"}</code>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button onClick={reset} className="gap-2 group">
            <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <HomeIcon className="h-4 w-4" />
              Go home
            </Button>
          </Link>
        </div>
      </div>

      {error.digest && (
        <div className="mt-4 text-xs text-muted-foreground">
          <p>Error ID: {error.digest}</p>
        </div>
      )}
    </div>
  );
}
