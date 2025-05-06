"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useEditPost } from "@/hooks/use-edit-post";
import { Loader2, Pencil } from "lucide-react";

export default function EditPostDialog({ postId, initialBody, token }) {
  const [postBody, setPostBody] = useState(initialBody || "");
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: editPost, isPending } = useEditPost();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!postBody.trim()) return;

    editPost(
      { id: postId, body: postBody, token },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-blue-500 transition-colors"
          title="Edit post"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>
              Make changes to your post content. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-1.5">
            <Label htmlFor="postBody" className="text-sm font-medium">
              Content
            </Label>
            <Textarea
              id="postBody"
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[150px] resize-none focus-visible:ring-primary/50 text-base"
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              {postBody.length} characters
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-8"
              disabled={isPending || !postBody.trim()}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
