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
import ProfileAvatar from "../common/profile-avatar";
import { useCheckLogin } from "@/hooks/use-check-login";
import { useAddComent } from "@/hooks/use-add-comment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

// Define comment schema
const commentSchema = z.object({
  body: z.string().min(1, "Comment cannot be empty"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

export default function PostComments({ data }) {
  const searchParams = useSearchParams();
  const post: PostProps = data?.data;
  const [isOpen, setIsOpen] = useState(false);
  const { data: currentUser } = useCheckLogin();
  const { mutate: addComment, isPending } = useAddComent();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
    },
  });

  useEffect(() => {
    if (searchParams.get("comments")) setIsOpen(true);
  }, []);

  function handleAddComment(values: CommentFormValues) {
    const comment = {
      body: values.body,
      token: currentUser.userData.token,
      id: post.id,
    };

    addComment(comment, {
      onSuccess: (result) => {
        setIsOpen(false);
        form.reset(); // Reset form after successful submission
      },
      onError: (error) => {},
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
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
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
      </DialogContent>
    </Dialog>
  );
}
