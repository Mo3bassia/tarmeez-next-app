import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import User from "@/components/user/user";
import { Home, Users } from "lucide-react";

export default async function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Container className="container mx-auto px-4 py-8 mt-16">
      <BackButton href={"/users"} />
      <div className="mb-4">
        <Breadcrumbs
          items={[
            {
              title: "",
              href: "/",
              icon: <Home className="h-3.5 w-3.5" />,
            },
            {
              title: "Users",
              href: "/users",
              icon: <Users className="h-3.5 w-3.5" />,
            },
            {
              title: `User #${id}`,
              disabled: true,
            },
          ]}
          className="mb-2"
        />
      </div>
      <User id={id} />
    </Container>
  );
}
