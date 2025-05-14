import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import ProfileAvatar from "../common/profile-avatar";
import ImagePost from "../common/image-post";
import { Post as PostProps } from "@/lib/validations/post";
import PostError from "./post-error";
import { SkeletonPost } from "../common/skeleton-post";
import PostComments from "./post-comments";
import { postSchema } from "@/lib/validations/post";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PostAutoRefresh from "./post-auto-refresh";

export default async function PostProfile({ id }: { id: string }) {
  try {
    const res = await fetch(`https://tarmeezacademy.com/api/v1/posts/${id}`, {
      next: {
        tags: [`post-${id}`],
        revalidate: 0, 
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status}`);
    }

    const data = await res.json();
    const validationResult = postSchema.safeParse(data.data);
    if (!validationResult.success) {
      throw new Error("Invalid post data structure");
    }

    const post: PostProps = data.data;

    if (!post) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4">
        <PostAutoRefresh id={id} />
        <Suspense fallback={<SkeletonPost />}>
          <Card className="w-full max-w-2xl mx-auto mb-5 border border-border/40 hover:border-border/80 transition-colors duration-200">
            <CardHeader className="flex-row items-center p-3 pb-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2.5">
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
                  <div className="ml-0.5">
                    <p className="font-bold text-foreground">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      @{post.author.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/40 px-2.5 py-0.5 rounded-full">
                  <Icons.calendar className="w-3 h-3 mr-0.5" />
                  <span>{post.created_at}</span>
                </div>
              </div>
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

            <CardFooter className="px-3 py-2 border-t border-border/20">
              <PostComments data={data} />
            </CardFooter>
          </Card>
        </Suspense>
      </div>
    );
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Unknown error occurred");
    return <PostError error={error} />;
  }
}
