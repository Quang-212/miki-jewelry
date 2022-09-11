import styles from './ListItemButton.module.css';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';

const mk = classNames.bind(styles);

const ListItemButton = forwardRef(({ children, className, ...other }, ref) => {
  const classRoot = mk('root', {
    [className]: className,
  });
  return (
    <div className={classRoot} ref={ref} {...other}>
      {children}
    </div>
  );
});

export default ListItemButton;
