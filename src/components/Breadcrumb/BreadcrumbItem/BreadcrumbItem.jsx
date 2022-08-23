import Link from 'next/link';

export default function BreadcrumbItem({ href, isCurrent, children, ...passProps }) {
  return (
    <li {...passProps}>
      <Link href={href} passHref>
        <a
          className={isCurrent ? 'subtitle-1' : undefined}
          aria-current={isCurrent ? 'page' : 'false'}
        >
          {children}
        </a>
      </Link>
    </li>
  );
}
