"use client";
import ImagePost from "@/components/common/image-post";
import ProfileAvatar from "@/components/common/profile-avatar";
import { SkeletonPost } from "@/components/common/skeleton-post";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { usePost } from "@/hooks/use-post";
import React, { use } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icons } from "@/components/icons";
import { useCheckLogin } from "@/hooks/use-check-login";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddComent } from "@/hooks/use-add-comment";
import Link from "next/link";
import { toast } from "sonner";

const commentSchema = z.object({
  body: z.string().min(1, "Comment cannot be empty"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

export default function Comments({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { data, isLoading, error } = usePost(resolvedParams.id);
  const { data: currentUser } = useCheckLogin();
  const { mutate: addComment, isPending } = useAddComent();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
    },
  });

  const post = data?.data;

  if (isLoading) {
    return <SkeletonPost />;
  }

  if (error) {
    return <div>Error loading post</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  function handleAddComment(values: CommentFormValues) {
    const comment = {
      body: values.body,
      id: post.id,
    };

    addComment(comment, {
      onSuccess: (result) => {
        form.reset();
        toast("Comment added successfully", {
          description: "Your comment has been added.",
        });
      },
      onError: (error) => {
        toast.error("Failed to add comment: " + error.message);
      },
    });
  }

  return (
    <div className="container mx-auto px-4 mt-25">
      <div className="mb-4">
        <Breadcrumbs
          items={[
            {
              title: "",
              href: "/",
              icon: <Icons.home className="h-3.5 w-3.5" />,
            },
            {
              title: "Posts",
              href: "/posts",
              icon: <Icons.fileText className="h-3.5 w-3.5" />,
            },
            {
              title: `Post #${resolvedParams.id}`,
              href: `/posts/${resolvedParams.id}`,
              icon: <Icons.fileText className="h-3.5 w-3.5" />,
            },
            {
              title: `Comments`,
              disabled: true,
            },
          ]}
          className="mb-2"
        />
      </div>
      <Card className="w-full max-w-2xl mx-auto mb-5 border border-border/40 shadow-sm">
        <CardHeader className="flex-row items-center p-3 pb-2">
          <Link href={`/users/${post.author.id}`}>
            <div className="flex items-center gap-3">
              <ProfileAvatar
                iconSize={5}
                className="h-10 w-10 rounded-full ring-2 ring-primary/10 flex items-center justify-center"
                condition={
                  typeof post.author.profile_image == "string" &&
                  post.author.profile_image != ""
                }
                src={post.author.profile_image}
                alt={post.author.name}
              />
              <div>
                <p className="font-bold text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  @{post.author.username}
                </p>
              </div>
            </div>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3 px-3 pt-1.5 pb-3">
          {post.title && (
            <h2 className="text-xl font-bold text-foreground/90 pb-1">
              {post.title}
            </h2>
          )}
          {post.body && (
            <p className="text-foreground/90 px-0.5">{post.body}</p>
          )}
          {post.image != "" && post.image.length && (
            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border/20 mt-2">
              <ImagePost
                src={post.image}
                alt={post.body}
                className="object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>
      <h3 className="text-lg font-semibold text-foreground mb-3 max-w-2xl mx-auto">
        Comments
      </h3>
      <ScrollArea className="w-full max-w-2xl mx-auto h-[300px] pr-4 mt-2 border border-border/20 rounded-lg bg-muted/10">
        <div className="flex flex-col gap-3 p-4">
          {post.comments?.length > 0 ? (
            post.comments.map((comment, index) => (
              <div
                key={comment.id}
                className={`flex gap-3 ${
                  index !== post.comments.length - 1 ? "border-b pb-3 mb-3" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="h-9 w-9 rounded-full overflow-hidden">
                    <ProfileAvatar
                      iconSize={5}
                      className="h-8 w-8 rounded-full ring-2 ring-primary/10 flex items-center justify-center"
                      condition={
                        typeof comment.author.profile_image === "string" &&
                        comment.author.profile_image !== ""
                      }
                      src={
                        typeof comment.author.profile_image === "string"
                          ? comment.author.profile_image
                          : ""
                      }
                      alt={comment.author.name}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Link href={`/users/${comment.author.id}`}>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">
                        {comment.author.name}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        @{comment.author.username}
                      </span>
                    </div>
                  </Link>
                  <p className="text-sm mt-1">{comment.body}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </ScrollArea>
      {currentUser?.userData?.user && (
        <div className="pt-7 border-t">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddComment)}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                <ProfileAvatar
                  iconSize={5}
                  className="h-8 w-8 rounded-full ring-2 ring-primary/10 flex items-center justify-center"
                  condition={
                    typeof currentUser?.userData?.user.profile_image ===
                      "string" &&
                    currentUser?.userData?.user.profile_image !== ""
                  }
                  src={
                    typeof currentUser?.userData?.user.profile_image ===
                    "string"
                      ? currentUser?.userData?.user.profile_image
                      : ""
                  }
                  alt={currentUser?.userData?.user.name}
                />
              </div>

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="flex-1 m-0">
                    <FormControl>
                      <Input
                        placeholder="Write a comment..."
                        className="flex-1"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" size="sm" disabled={isPending}>
                {isPending ? (
                  <>
                    <Icons.loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
