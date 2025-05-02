import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import User from "@/components/user";

export default async function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Container className="container mx-auto px-4 py-8 mt-16">
      <BackButton href={"/users"} />
      <User id={id} />
    </Container>
  );
}
