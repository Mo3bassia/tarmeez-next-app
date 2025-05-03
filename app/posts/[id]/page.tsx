import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import Post from "@/components/post/post";

export default async function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Container className="container mx-auto px-4 py-8 mt-16">
      <BackButton href={"/posts"} />
      <Post id={id} />
    </Container>
  );
}
