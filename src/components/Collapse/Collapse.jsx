import classNames from 'classnames/bind';

import styles from './Collapse.module.css';

const mk = classNames.bind(styles);

export default function Collapse({ open, children }) {
  return (
    <div className={`${mk('root')}`}>
      {open && <div className={`transition-all duration-1000`}>{children}</div>}
    </div>
  );
}
