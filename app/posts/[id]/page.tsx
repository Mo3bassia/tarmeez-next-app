import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Post from "@/components/posts/post";
import { Icons } from "@/components/icons";

export const revalidate = 5;
export const dynamic = "force-dynamic";

async function getTopPosts() {
  const res = await fetch("https://tarmeezacademy.com/api/v1/posts?limit=10", {
    next: { revalidate: 5 },
    cache: "no-store",
  });
  const posts = await res.json();
  return posts;
}

export async function generateStaticParams() {
  const posts = await getTopPosts();

  console.log(
    posts.data.map((post) => ({
      id: post.id.toString(),
    }))
  );

  return posts.data.map((post) => ({
    id: post.id.toString(),
  }));
}

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
              icon: <Icons.home className="h-3.5 w-3.5" />,
            },
            {
              title: "Posts",
              href: "/posts",
              icon: <Icons.fileText className="h-3.5 w-3.5" />,
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
