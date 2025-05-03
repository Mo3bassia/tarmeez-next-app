"use client";
import { User } from "./user";
import { useUsers } from "@/hooks/use-users";
import { useCallback, useEffect, useRef } from "react";
import { SkeletonUser } from "./skeleton-user";

import { User as UserProps } from "@/lib/schemas/users";
import { UsersError } from "./users-error";

export default function Posts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // status,
    // isFetching,
    isLoading,
  } = useUsers();
  useEffect(() => {
    if (error) {
      return <UsersError error={error} reset={() => fetchNextPage()} />;
    }
  }, [error, data]);

  const observer = useRef(null);
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  if (isLoading) {
    return (
      <div className="mt-20 grid grid-cols-1 items-center justify-center space-y-5">
        <SkeletonUser />
        <SkeletonUser />
        <SkeletonUser />
        <SkeletonUser />
      </div>
    );
  }

  if (error) {
    return <UsersError error={error} reset={() => fetchNextPage()} />;
  }

  return (
    <div className="mt-20">
      {data?.pages.map((page, pageIndex) =>
        page.data.map((user: UserProps, postIndex: number) => {
          const isLastPage = pageIndex === data.pages.length - 1;
          const isLastPost = postIndex === page.data.length - 1;
          const isLastElement = isLastPage && isLastPost;

          return (
            <User
              key={user.id}
              user={user}
              ref={isLastElement ? lastElementRef : null}
            />
          );
        })
      )}
      {hasNextPage && (
        <div className="flex flex-col items-center justify-center py-6">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <p className="text-sm text-muted-foreground">
                Loading more users...
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Scroll for more</p>
          )}
        </div>
      )}

      {!hasNextPage && !isLoading && data?.pages[0]?.data.length > 0 && (
        <div className="text-center py-6 text-muted-foreground text-sm">
          You&apos;ve reached the end!
        </div>
      )}
    </div>
  );
}
