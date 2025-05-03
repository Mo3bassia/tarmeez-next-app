"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileAvatar from "../common/profile-avatar";
import ImagePost from "../common/image-post";
import { Post as PostProps } from "@/lib/schemas/post";
import PostError from "./post-error";
import { usePost } from "@/hooks/use-post";
import { SkeletonPost } from "../common/skeleton-post";

export default function PostProfile({ id }: { id: string }) {
  const { data, error, isLoading, isFetching } = usePost(id);

  if (isLoading || isFetching) {
    return <SkeletonPost />;
  }

  const post: PostProps = data?.data;

  if (!post) return <PostError error={error} />;

  return (
    <div className="container mx-auto px-4">
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
                <p className="font-bold text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  @{post.author.username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/40 px-2.5 py-0.5 rounded-full">
              <Calendar className="w-3 h-3 mr-0.5" />
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
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 hover:bg-primary/5 hover:text-primary transition-colors text-muted-foreground px-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">{post.comments_count}</span>
            <span>Comments</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
