import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface PostsErrorProps {
  error: Error;
  reset: () => void;
}

export function PostsError({ error, reset }: PostsErrorProps) {
  return (
    <div className="mt-20 flex flex-col items-center justify-center py-10 px-4 bg-card rounded-lg border border-border/50 max-w-2xl mx-auto shadow-sm">
      <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20 mb-4 animate-pulse">
        <Icons.alertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
      </div>

      <h2 className="text-2xl font-bold mb-2">Failed to load posts</h2>

      <p className="text-muted-foreground text-center mb-4 max-w-md">
        We couldn&apos;t load the posts at this moment. This might be due to
        network issues or the server might be temporarily unavailable.
      </p>

      <div className="bg-muted/50 p-3 rounded-md mb-6 w-full max-w-md">
        <p className="text-sm text-red-600 dark:text-red-400 font-mono break-words">
          {error?.props || "An unknown error occurred"}
        </p>
      </div>

      <Button onClick={reset} className="gap-2 group" variant="default">
        <Icons.refreshCw className="h-4 w-4 group-hover:animate-spin transition-all duration-150" />
        Try Again
      </Button>
    </div>
  );
}
