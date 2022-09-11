import React from 'react';
import styles from './Collapse.module.css';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

const mk = classNames.bind(styles);
export default function Collapse({ open, children }) {
  const variants = {
    open: { opacity: 1, display: 'block', x: 0 },
    closed: { opacity: 0, display: 'none', x: '-100%' },
  };
  // ${open ? 'block visible' : 'invisible hidden'}
  return (
    <motion.nav animate={open ? 'open' : 'closed'} variants={variants}>
      <div className={`${mk('root')} `}>
        <div className={`transition-all duration-1000`}>{children}</div>
      </div>
    </motion.nav>
  );
}
