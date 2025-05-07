"use client";
import { useUsers } from "@/hooks/use-users";
import { useState } from "react";
import { User as UserProps } from "@/lib/schemas/users";
import { UsersError } from "./users-error";
import { TablePagination } from "@/components/common/table-pagination";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TableSkeleton } from "@/components/common/table-skeleton";

export default function Users() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || "1");
  const [pageSize, setPageSize] = useState(10);

  const {
    data,
    isLoading,
    isError,
    error,
    isPending,
    isRefetching,
    totalPages,
  } = useUsers({
    page: currentPage,
    pageSize: pageSize,
  });

  if (isLoading) {
    return (
      <div className="mt-20">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Users List</h1>
            <div className="text-sm text-muted-foreground">
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <Breadcrumbs
            items={[
              {
                title: "",
                href: "/",
                icon: <Home className="h-3.5 w-3.5" />,
              },
              {
                title: "Users",
                disabled: true,
              },
            ]}
            className="mt-4"
          />
        </div>

        <TableSkeleton
          headers={[
            "ID",
            "Name",
            "Username",
            "Email",
            "Posts Count",
            "Comments Count",
            "",
          ]}
          rowCount={5}
        />
      </div>
    );
  }

  if (isError) {
    return <UsersError error={error} reset={() => router.refresh()} />;
  }

  return (
    <div className="mt-20">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Users List</h1>
          <div className="text-sm text-muted-foreground">
            Total: {data?.meta.pagination.total || 0} users
          </div>
        </div>

        <Breadcrumbs
          items={[
            {
              title: "",
              href: "/",
              icon: <Home className="h-3.5 w-3.5" />,
            },
            {
              title: "Users",
              disabled: true,
            },
          ]}
          className="mt-4"
        />
      </div>

      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Username</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Posts Count</TableHead>
              <TableHead className="text-center">Comments Count</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!data?.data || data.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((user: UserProps) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell className="text-center">
                      <Link
                        href={`/users/${user.id}`}
                        className="text-blue-500 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        {user.id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">{user.name}</TableCell>
                    <TableCell className="text-center">
                      {user.username}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.email ? (
                        <Badge variant="outline">{user.email}</Badge>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.posts_count || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.comments_count || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel className="text-primary">
                            Actions
                          </DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/users/${user.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data?.data && data.data.length > 0 && (
        <TablePagination
          pageSize={pageSize}
          isPending={isPending || isRefetching}
          currentPage={currentPage}
          totalPages={totalPages}
          setPageSize={setPageSize}
        />
      )}
    </div>
  );
}
