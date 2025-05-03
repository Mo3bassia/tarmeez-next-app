import Post from "@/components/post/post";
import { Container } from "@/components/container";
import { BackButton } from "@/components/back-button";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Container className="container mx-auto px-4 py-8 mt-16">
      <BackButton href={"/posts"} />
      <Post id={params.id} />
    </Container>
  );
}
