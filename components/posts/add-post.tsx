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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckLogin } from "@/hooks/use-check-login";
import { AlertCircle, ImageIcon, Loader2, PlusIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useAddPost } from "@/hooks/use-add-post";

export function AddPost() {
  const { data } = useCheckLogin();
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setErrors] = useState(null);

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imageName, setImageName] = useState("");

  const { mutate: addPost, isPending } = useAddPost();

  const imageInput = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const removeImage = () => {
    setImageName("");
    if (imageInput.current) {
      imageInput.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("body", caption);
    formData.append("title", title);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
      setImageName(imageInput.current.files[0].name);
    }
    formData.append("token", data.userData.token);

    addPost(formData, {
      onSuccess: (result) => {
        setErrors(null);
        setIsOpen(false);
      },
      onError: (error) => {
        setErrors(
          error.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      },
    });
  };

  if (!isClient) return null;

  if (!data?.userData || typeof window === "undefined") {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="rounded-full h-14 w-14 fixed bottom-6 right-6 shadow-lg z-10"
          variant="default"
        >
          <PlusIcon className="h-6 w-6" />
          <span className="sr-only">Add post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Share your thoughts with the community. Click post when you're
              done.
            </DialogDescription>

            {error && (
              <div className="w-full mt-2 col-span-4 bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter post title"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isPending}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="caption" className="text-right">
                Caption
              </Label>
              <Textarea
                id="caption"
                placeholder="What's on your mind?"
                className="col-span-3 min-h-[100px]"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                disabled={isPending}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <div className="col-span-3">
                {!imageName ? (
                  <label
                    htmlFor="image"
                    className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/20"
                  >
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Choose an image (optional)
                    </span>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      ref={imageInput}
                      className="hidden"
                      disabled={isPending}
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-2 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-gray-500" />
                      <span
                        className="text-sm text-gray-800 font-medium truncate max-w-[200px]"
                        title={imageName}
                      >
                        {imageName}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-gray-200"
                      onClick={removeImage}
                      disabled={isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Post...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
