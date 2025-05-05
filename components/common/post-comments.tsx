"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Post as PostProps } from "@/lib/schemas/post";
import { Input } from "@/components/ui/input";
import { Loader2, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileAvatar from "./profile-avatar";
import { useCheckLogin } from "@/hooks/use-check-login";
import { useAddComent } from "@/hooks/use-add-comment";

export default function PostComments({ data }) {
  const searchParams = useSearchParams();
  const post: PostProps = data?.data;
  const [commentContent, setCommentContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: currentUser } = useCheckLogin();
  const { mutate: addComment, isPending } = useAddComent();

  useEffect(() => {
    if (searchParams.get("comments")) setIsOpen(true);
  }, []);

  function handleAddComment(e) {
    e.preventDefault();

    if (!commentContent.trim()) return;

    const comment = {
      body: commentContent,
      token: currentUser.userData.token,
      id: post.id,
    };

    addComment(comment, {
      onSuccess: (result) => {
        setCommentContent(""); // Clear input after successful submission
        setIsOpen(false);
      },
      onError: (error) => {
        // Could add error handling here
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 hover:bg-primary/5 hover:text-primary transition-colors text-muted-foreground px-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="font-medium">{post.comments_count}</span>
          <span>Comments</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>
            Engage with the post by leaving your comment below
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          {post.comments?.length > 0 ? (
            post.comments.map((comment, index) => {
              return (
                <div
                  key={comment.id}
                  className={`flex gap-3 pb-3 ${
                    index !== post.comments.length - 1 ? "border-b" : ""
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
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">
                        {comment.author.name}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        @{comment.author.username}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.body}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>

        {currentUser?.userData?.user && (
          <div className="pt-2 border-t">
            <form
              className="flex items-center gap-2"
              onSubmit={handleAddComment}
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
              <Input
                placeholder="Write a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.currentTarget.value)}
                className="flex-1"
                disabled={isPending}
              />
              <Button
                type="submit"
                size="sm"
                disabled={isPending || !commentContent.trim()}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
