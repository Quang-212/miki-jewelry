import classNames from 'classnames';

import styles from './Copyright.module.css';

export default function Copyright({ className, children }) {
  return <p className={classNames(styles.root, className)}>{children}</p>;
}
