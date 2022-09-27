import styles from './Popover.module.css';
import classNames from 'classnames/bind';
import { useState } from 'react';

const mk = classNames.bind(styles);

export default function Popover({ children, renderContent }) {
  const rootClass = mk('root');

  const contentClass = mk('content');

  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-header bg-transparent"
          onClick={() => {
            setOpen(false);
          }}
        />
      )}
      <div className={rootClass} onClick={() => setOpen(true)}>
        {open && <div className={contentClass}>{renderContent}</div>}
        {children}
      </div>
    </>
  );
}
