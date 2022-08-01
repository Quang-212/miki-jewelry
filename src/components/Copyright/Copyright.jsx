import classNames from 'classnames/bind';

import styles from './Copyright.module.css';

const mk = classNames.bind(styles);

export default function Copyright({ children }) {
  return <p className={mk('copyright')}>{children}</p>;
}
