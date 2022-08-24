import classNames from 'classnames/bind';
import Link from 'next/link';

import { NavigateNextIcon } from 'src/components/Icons';
import styles from './BreadcrumbItem.module.css';

const mk = classNames.bind(styles);

export default function BreadcrumbItem({ href, isFirst, isCurrent, children, ...passProps }) {
  const classItem = mk('item', {});
  const classHighlightItem = mk('item-highlight', 'subtitle-1', 'text-neutral-2', {});

  return (
    <li {...passProps}>
      <Link href={href} passHref>
        <a
          className={isCurrent ? classHighlightItem : classItem}
          aria-current={isCurrent ? 'page' : 'false'}
        >
          {!isFirst && (
            <span>
              <NavigateNextIcon />
            </span>
          )}
          {children}
        </a>
      </Link>
    </li>
  );
}
