import { forwardRef } from "react";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, ExternalLink } from "lucide-react";

import { Post as PostProps } from "@/lib/schemas/posts";
import ImagePost from "../common/image-post";
import ProfileAvatar from "../common/profile-avatar";

export const Post = forwardRef<HTMLDivElement, { post: PostProps }>(
  (
    { post: { id, title, body, image, author, created_at, comments_count } },
    ref
  ) => {
    return (
      <Card
        className="w-full max-w-2xl mx-auto mb-5 border border-border/40 hover:border-border/80 transition-colors duration-200"
        ref={ref}
      >
        <CardHeader className="flex-row items-center p-3 pb-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2.5">
              <Link href={`/users/${author.id}`}>
                <ProfileAvatar
                  iconSize={5}
                  className="h-10 w-10 rounded-full ring-2 ring-primary/10 flex items-center justify-center"
                  condition={
                    typeof author.profile_image == "string" &&
                    author.profile_image != ""
                  }
                  src={author.profile_image}
                  alt={author.name}
                />
              </Link>
              <div className="ml-0.5">
                <Link href={`/users/${author.id}`}>
                  <p className="font-bold text-foreground hover:text-primary transition-colors duration-150">
                    {author.name}
                  </p>
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  @{author.username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/40 px-2.5 py-0.5 rounded-full">
              <Calendar className="w-3 h-3 mr-0.5" />
              <span>{created_at}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-3 pt-1.5 pb-3">
          {title && (
            <h2 className="text-xl font-bold text-foreground/90 pb-1">
              {title}
            </h2>
          )}
          {body && (
            <Link href={`/posts/${id}`} className="block group">
              <p className="text-foreground/90 px-0.5 group-hover:text-foreground transition-colors">
                {body}
              </p>
            </Link>
          )}
          {image != "" && image.length && (
            <Link href={`/posts/${id}`} className="block">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border/20 mt-2">
                <ImagePost
                  src={image}
                  alt={body}
                  className="object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </Link>
          )}
        </CardContent>
        <CardFooter className="px-3 py-2 border-t border-border/20 flex justify-between">
          <Link href={`/posts/${id}?comments=open`}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 hover:bg-primary/5 hover:text-primary transition-colors text-muted-foreground px-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium">{comments_count}</span>
              <span>Comments</span>
            </Button>
          </Link>

          <Link href={`/posts/${id}`} className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-primary transition-colors gap-1"
            >
              <span>View Post</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
);

Post.displayName = "Post";
