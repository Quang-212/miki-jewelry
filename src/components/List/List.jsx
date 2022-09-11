import styles from './List.module.css';
import classNames from 'classnames/bind';

const mk = classNames.bind(styles);

export default function List({ children, subheader, className, ...other }) {
  const classRoot = mk({
    [className]: className,
    root: 'root',
  });
  return (
    <ul className={classRoot} {...other}>
      {subheader && <li className={mk('sub-header')}>{subheader}</li>}
      {children}
    </ul>
  );
}
