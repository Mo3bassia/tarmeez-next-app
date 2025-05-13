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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define post schema
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Caption is required"),
});

type PostFormValues = z.infer<typeof postSchema>;

export function AddPost() {
  const { data } = useCheckLogin();
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setErrors] = useState(null);

  // File handling state
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const imageInput = useRef(null);

  const { mutate: addPost, isPending } = useAddPost();

  // Initialize form
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const removeImage = () => {
    setImageName("");
    setSelectedFile(null);
    if (imageInput.current) {
      imageInput.current.value = "";
    }
  };

  const handleFileChange = () => {
    if (
      imageInput.current &&
      imageInput.current.files &&
      imageInput.current.files[0]
    ) {
      const file = imageInput.current.files[0];
      setImageName(file.name);
      setSelectedFile(file);
    }
  };

  const onSubmit = (values: PostFormValues) => {
    const formData = new FormData();
    formData.append("body", values.body);
    formData.append("title", values.title);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    addPost(formData, {
      onSuccess: () => {
        setErrors(null);
        setIsOpen(false);
        form.reset();
        setImageName("");
        setSelectedFile(null);
      },
      onError: (error) => {
        setErrors(
          error.response?.data?.message ||
            "Failed to create post. Please try again."
        );
      },
    });
  };

  if (!isClient || !data?.userData || typeof window === "undefined") {
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
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Share your thoughts with the community. Click post when you're done.
          </DialogDescription>

          {error && (
            <div className="w-full mt-2 bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Title</FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      placeholder="Enter post title"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Caption</FormLabel>
                  <FormControl className="col-span-3">
                    <Textarea
                      placeholder="What's on your mind?"
                      className="min-h-[100px]"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />

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
                      onChange={handleFileChange}
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
