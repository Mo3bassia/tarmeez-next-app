"use client";
import { PostCommentsDialog } from "@/components/posts/post-comments-dialog";
import { usePost } from "@/hooks/use-post";
import { use } from "react";

export default function CommentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { data } = usePost(resolvedParams.id);

  return (
    <>
      <PostCommentsDialog data={data} />
    </>
  );
}
