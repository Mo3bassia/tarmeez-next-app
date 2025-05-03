"use client";
import { Post } from "./post";
import { usePosts } from "@/hooks/use-posts";
import { useCallback, useEffect, useRef } from "react";
import { SkeletonPost } from "./skeleton-post";
import { Button } from "../ui/button";

// export interface Post {
//   id: number;
//   title: string | null;
//   body: string;
//   author: {
//     id: number;
//     profile_image: string;
//     is_fake: boolean;
//     username: string;
//     name: string;
//     email: string | null;
//     email_verified_at: string | null;
//     remember_token: string | null;
//     created_at: string;
//     updated_at: string;
//   };
//   image?: string;
//   tags?: string[];
//   created_at: string;
//   comments_count: number;
// }
import { Post as PostProps } from "@/lib/schemas/posts";
import { PostsError } from "./posts-error";

export default function Posts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
    isLoading,
  } = usePosts();
  useEffect(() => {
    if (error) {
      return <PostsError error={error} reset={() => fetchNextPage()} />;
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

  return (
    <div className="mt-20">
      {data?.pages.map((page, pageIndex) =>
        page.data.map((post: PostProps, postIndex: number) => {
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

      {!hasNextPage && !isLoading && data?.pages[0]?.data.length > 0 && (
        <div className="text-center py-6 text-muted-foreground text-sm">
          You&apos;ve reached the end!
        </div>
      )}
    </div>
  );
}
