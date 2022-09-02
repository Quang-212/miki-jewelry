import classNames from 'classnames/bind';
import Link from 'next/link';

import { NavigateNextIcon } from 'src/components/Icons';
import styles from './BreadcrumbItem.module.css';

const mk = classNames.bind(styles);

export default function BreadcrumbItem({ href, isFirst, isCurrent, children, ...passProps }) {
  const classItem = mk('item');
  const classHighlightItem = mk('item-highlight', 'subtitle-1');

  const handleClick = (event) => {
    return isCurrent && event.preventDefault();
  };

  return (
    <li {...passProps}>
      <Link href={href} passHref>
        <a
          onClick={handleClick}
          aria-current={isCurrent ? 'page' : 'false'}
          className={isCurrent ? classHighlightItem : classItem}
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
