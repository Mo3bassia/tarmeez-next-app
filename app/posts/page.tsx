import { Container } from "@/components/container";
import Posts from "@/components/posts/posts";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Home, FileText } from "lucide-react";
import { AddPost } from "@/components/posts/add-post";

export default function PostsPage() {
  return (
    <Container className="container max-w-2xl mx-auto px-4 py-8">
      <div className="mb-4 mt-20 ">
        <Breadcrumbs
          items={[
            {
              title: "",
              href: "/",
              icon: <Home className="h-3.5 w-3.5" />,
            },
            {
              title: "Posts",
              disabled: true,
            },
          ]}
          className="mb-2"
        />
      </div>
      <AddPost />
      <Posts />
    </Container>
  );
}
