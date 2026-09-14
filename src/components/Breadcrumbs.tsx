import Link from "next/link";
import { Fragment } from "react";
import { ChevronLeft } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="container-x pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[14px]">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={item.label}>
              {i > 0 && (
                <ChevronLeft className="h-4 w-4 shrink-0 text-sage/60" aria-hidden="true" />
              )}
              <li>
                {item.href && !last ? (
                  <Link href={item.href} className="font-medium text-sage transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className="font-bold text-primary">
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
