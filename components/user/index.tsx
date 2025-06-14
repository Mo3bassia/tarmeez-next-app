"use client";
import { useUser } from "@/hooks/use-user";
import { Card, CardHeader } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import ProfileAvatar from "../common/profile-avatar";
import { User as UserProps } from "@/lib/validations/user";
import UserError from "./user-error";
import SkeletonUser from "./skeleton-user";

export default function UserProfile({ id }: { id: string }) {
  const { data, error, isLoading, isFetching } = useUser(id);

  if (isLoading || isFetching) {
    return <SkeletonUser />;
  }

  const user: UserProps = data?.data;

  if (!user) return <UserError error={error} />;

  return (
    <div className="">
      <Card className="max-w-4xl mx-auto shadow-md">
        <CardHeader className="pb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <ProfileAvatar
              iconSize={16}
              className="h-32 w-32 flex items-center justify-center border-4 border-primary/10 rounded-full"
              condition={
                typeof user.profile_image == "string" &&
                user.profile_image != ""
              }
              src={user.profile_image}
              alt={user.name}
            />

            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground flex items-center gap-1">
                <Icons.user className="h-4 w-4" />@{user.username}
              </p>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                <Icons.mail className="h-4 w-4" />
                {user.email || "No email provided"}
              </p>

              <div className="flex gap-6 mt-4">
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-bold">{user.posts_count}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icons.fileText className="h-3 w-3" /> Posts
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-bold">{user.comments_count}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icons.messageSquare className="h-3 w-3" /> Comments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
