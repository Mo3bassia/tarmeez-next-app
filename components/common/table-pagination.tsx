"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface TablePaginationProps {
  pageSize: number;
  isPending: boolean;
  currentPage: number;
  totalPages: number;
  setPageSize: (size: number) => void;
}

export const TablePagination = ({
  pageSize,
  isPending,
  currentPage,
  totalPages,
  setPageSize,
}: TablePaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNum.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("size", size.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-end gap-3 flex-wrap mt-8">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            handlePageSizeChange(+value);
          }}
          disabled={isPending}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-center text-sm font-medium">
        {`Page ${currentPage} of ${totalPages}`}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          disabled={currentPage <= 1}
          className="h-8 w-8 p-0"
          variant="outline"
          asChild
        >
          <Link
            href={createPageUrl(1)}
            className={cn("", {
              "pointer-events-none opacity-40": currentPage <= 1,
            })}
          >
            <Icons.chevronsLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          disabled={currentPage <= 1}
          className="h-8 w-8 p-0"
          variant="outline"
          asChild
        >
          <Link
            href={createPageUrl(currentPage - 1)}
            className={cn("", {
              "pointer-events-none opacity-40": currentPage <= 1,
            })}
          >
            <Icons.chevronLeft className="h-4 w-4" />
          </Link>
        </Button>

        <Button
          disabled={currentPage >= totalPages}
          className="h-8 w-8 p-0"
          variant="outline"
          asChild
        >
          <Link
            href={createPageUrl(currentPage + 1)}
            className={cn("", {
              "pointer-events-none opacity-40": currentPage >= totalPages,
            })}
          >
            <Icons.chevronRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          disabled={currentPage >= totalPages}
          className="h-8 w-8 p-0"
          variant="outline"
          asChild
        >
          <Link
            href={createPageUrl(totalPages)}
            className={cn("", {
              "pointer-events-none opacity-40": currentPage >= totalPages,
            })}
          >
            <Icons.chevronsRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
