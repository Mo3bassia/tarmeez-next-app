"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, FileText, MessageSquare } from "lucide-react";
import ProfileAvatar from "../common/profile-avatar";
import { User as UserProps } from "@/lib/schemas/user";

export function User({ user, ref }: { user: UserProps }) {
  const {
    id,
    username,
    name,
    email,
    profile_image,
    comments_count,
    posts_count,
  } = user;

  return (
    <Card
      className="w-full max-w-2xl mx-auto mb-5 border border-border/40 hover:border-border/80 hover:shadow-md transition-all duration-200"
      ref={ref}
    >
      <CardHeader className="flex-row items-center p-3 pb-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-3">
            <Link href={`/users/${id}`}>
              <ProfileAvatar
                iconSize={5}
                className="h-12 w-12 rounded-full ring-2 ring-primary/10 flex items-center justify-center"
                condition={
                  typeof profile_image === "string" && profile_image !== ""
                }
                src={profile_image}
                alt={name}
              />
            </Link>
            <div className="ml-0.5">
              <Link href={`/users/${id}`}>
                <h3 className="font-bold text-lg text-foreground hover:text-primary transition-colors duration-150">
                  {name}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground">@{username}</p>
              {email && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Mail className="w-3 h-3" />
                  <span>{email}</span>
                </div>
              )}
            </div>
          </div>

          <Badge variant="outline" className="bg-background/80 hidden md:block">
            User #{id}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">{posts_count}</div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>Posts</span>
            </div>
          </div>

          <div className="bg-muted/30 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">
              {comments_count}
            </div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              <span>Comments</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-3 py-2 border-t border-border/20">
        <Link href={`/users/${id}`} className="w-full">
          <div className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors duration-150">
            View Full Profile
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default User;
