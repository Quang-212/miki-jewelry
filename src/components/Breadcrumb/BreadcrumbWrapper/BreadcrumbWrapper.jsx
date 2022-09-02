import { Children, Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './BreadcrumbWrapper.module.css';

const mk = classNames.bind(styles);

const BreadcrumbNavigation = 'nav';
const BreadcrumbOrderList = 'ol';

export default function BreadcrumbWrapper({ children, className }) {
  const childrenArray = Children.toArray(children);
  // console.log(childrenArray);

  const childrenWithSeparators = childrenArray.map((child, index) => {
    if (index !== children.length - 1) {
      return <Fragment key={index}>{child}</Fragment>;
    }
    return child;
  });
  // console.log(childrenWithSeparators);

  return (
    <BreadcrumbNavigation aria-label="breadcrumb" className={className}>
      <BreadcrumbOrderList className={mk('order-list')}>
        {childrenWithSeparators}
      </BreadcrumbOrderList>
    </BreadcrumbNavigation>
  );
}
