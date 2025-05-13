"use client";
import { Post } from "./post";
import { usePosts } from "@/hooks/use-posts";
import { useCallback, useRef } from "react";
import { SkeletonPost } from "../common/skeleton-post";

import { Post as PostProps } from "@/lib/validations/posts";
import { PostsError } from "./posts-error";

export default function Posts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePosts();

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
      <div className="grid grid-cols-1 items-center justify-center space-y-5">
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
      </div>
    );
  }

  if (error) {
    return <PostsError error={error} reset={() => fetchNextPage()} />;
  }

  const hasAnyPosts = data?.pages?.some(
    (page) => page.data && page.data.length > 0
  );

  if (!hasAnyPosts && !isLoading) {
    return (
      <div className=" flex flex-col items-center justify-center py-10">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-xl font-medium mb-2">No Posts Available</h3>
        <p className="text-center text-muted-foreground">
          There are no posts to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="">
      {data?.pages.map((page, pageIndex) =>
        page.data && page.data.length > 0
          ? page.data.map((post: PostProps, postIndex: number) => {
              const isLastPage = pageIndex === data.pages.length - 1;
              const isLastPost = postIndex === page.data.length - 1;
              const isLastElement = isLastPage && isLastPost;

              return (
                <Post
                  key={post.id}
                  post={post}
                  ref={isLastElement ? lastElementRef : null}
                />
              );
            })
          : null
      )}

      {hasNextPage && (
        <div className="flex flex-col items-center justify-center py-6">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <p className="text-sm text-muted-foreground">
                Loading more posts...
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Scroll for more</p>
          )}
        </div>
      )}

      {!hasNextPage && !isLoading && data?.pages[0]?.data?.length > 0 && (
        <div className="text-center py-6 text-muted-foreground text-sm">
          You&apos;ve reached the end!
        </div>
      )}
    </div>
  );
}
