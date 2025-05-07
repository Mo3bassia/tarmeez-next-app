import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import Link from "next/link";

interface BreadcrumbItem {
  title: React.ReactNode;
  href?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <Breadcrumb className={cn("", className)}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {item.disabled ? (
                <BreadcrumbPage>
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.title}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild={!!item.href}>
                  {item.href ? (
                    <Link href={item.href} className="flex items-center">
                      {item.icon && <span className="mr-1">{item.icon}</span>}
                      {item.title}
                    </Link>
                  ) : (
                    <span className="flex items-center">
                      {item.icon && <span className="mr-1">{item.icon}</span>}
                      {item.title}
                    </span>
                  )}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
