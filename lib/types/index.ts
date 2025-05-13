import { Icons } from "@/components/icons";

export type BreadcrumbNavItem = {
  title?: string;
  href?: string;
  disabled?: boolean;
  icon?: keyof typeof Icons;
};
