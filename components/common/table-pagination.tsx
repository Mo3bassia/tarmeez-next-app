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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNum.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-end gap-3 flex-wrap mt-8">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            setPageSize(+value);
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
            <ChevronsLeft className="h-4 w-4" />
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
            <ChevronLeft className="h-4 w-4" />
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
            <ChevronRight className="h-4 w-4" />
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
            <ChevronsRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
