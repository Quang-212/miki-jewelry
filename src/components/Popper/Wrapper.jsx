import classNames from 'classnames/bind';
import styles from './Popper.module.css';

const mk = classNames.bind(styles);

export default function Wrapper({ children, className }) {
  return <div className={mk('wrapper', className)}>{children}</div>;
}
