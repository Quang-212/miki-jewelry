import classNames from 'classnames/bind';

import styles from './Menu.module.css';
import Button from 'src/components/Button';

const mk = classNames.bind(styles);

export default function MenuItem({ data, onClick }) {
  const classWrapper = mk('menu-item', {
    separate: data.separate,
  });

  return (
    <li>
      <Button leftIcon={data.icon} wrapper={classWrapper} onClick={onClick}>
        {data.title}
      </Button>
    </li>
  );
}
