import React from 'react';
import styles from './Collapse.module.css';
import classNames from 'classnames/bind';

const mk = classNames.bind(styles);
export default function Collapse({ open, children }) {
  return (
    <div className={`${mk('root')}`}>
      {open && <div className={`transition-all duration-1000`}>{children}</div>}
    </div>
  );
}
