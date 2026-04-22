import Link from 'next/link';

export type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol className="flex flex-wrap items-center gap-2 font-label font-bold uppercase text-xs sm:text-sm text-on-surface/70">
        <li>
          <Link href="/" className="hover:text-black hover:underline">
            Início
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {isLast || !item.href ? (
                <span className={isLast ? 'text-black' : ''} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-black hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
