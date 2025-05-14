"use client";

import { useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function PostAutoRefresh({ id }: { id: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const triggerRevalidate = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/revalidate?path=${pathname}&tag=post-${id}`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      if (response.ok) {
        router.refresh();
        console.log("Revalidation successful");
      } else {
        console.error("Revalidation failed:", await response.text());
      }
    } catch (error) {
      console.error("Failed to revalidate:", error);
    }
  }, [pathname, router, id]);

  useEffect(() => {
    triggerRevalidate();

    const interval = setInterval(triggerRevalidate, 1000);

    return () => clearInterval(interval);
  }, [triggerRevalidate]);

  return <></>;
}
