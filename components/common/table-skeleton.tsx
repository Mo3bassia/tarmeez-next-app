import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface TableSkeletonProps {
  headers?: string[];
  rowCount?: number;
  columnCount?: number;
  className?: string;
}

export function TableSkeleton({
  headers,
  rowCount = 5,
  columnCount,
  className,
}: TableSkeletonProps) {
  // If headers are provided, use their length for column count
  const cols = columnCount || headers?.length || 5;

  return (
    <div
      className={`bg-background overflow-hidden rounded-md border ${className}`}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            {headers
              ? headers.map((header, index) => (
                  <TableHead key={index} className="text-center">
                    {header}
                  </TableHead>
                ))
              : Array(cols)
                  .fill(0)
                  .map((_, i) => (
                    <TableHead key={i} className="text-center">
                      <Skeleton className="h-4 w-1/2 mx-auto" />
                    </TableHead>
                  ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(rowCount)
            .fill(0)
            .map((_, i) => (
              <TableRow key={i}>
                {Array(cols)
                  .fill(0)
                  .map((_, j) => (
                    <TableCell key={j} className="text-center">
                      <Skeleton className="h-4 w-3/4 mx-auto" />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
