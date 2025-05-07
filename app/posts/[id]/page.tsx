import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Post from "@/components/post/post";
import { Home, FileText } from "lucide-react";

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <Container className="container max-w-2xl mx-auto px-4 py-8 mt-16">
      <BackButton href="/" />
      <div className="mb-4">
        <Breadcrumbs
          items={[
            {
              title: "",
              href: "/",
              icon: <Home className="h-3.5 w-3.5" />,
            },
            {
              title: "Posts",
              href: "/posts",
              icon: <FileText className="h-3.5 w-3.5" />,
            },
            {
              title: `Post #${params.id}`,
              disabled: true,
            },
          ]}
          className="mb-2"
        />
      </div>
      <Post id={params.id} />
    </Container>
  );
}
