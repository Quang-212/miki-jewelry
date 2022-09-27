import classNames from 'classnames/bind';
import React from 'react';

import styles from './Badge.module.css';

const mk = classNames.bind(styles);

const Badge = React.forwardRef(({ badgeContent = '', children, wrapper }, ref) => {
  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  return (
    <div ref={ref} className={classWrapper}>
      <div className="absolute -top-2 left-4 w-fit h-5 px-2 rounded-full text-center leading-5 bg-primary-2 text-neutral-5 caption">
        {badgeContent}
      </div>
      {children}
    </div>
  );
});

export default Badge;
