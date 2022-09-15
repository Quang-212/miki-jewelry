import classNames from 'classnames/bind';

import styles from './Menu.module.css';
import Button from 'src/components/Button';

const mk = classNames.bind(styles);

export default function MenuItem({ data, onClick }) {
  const classWrapper = mk('menu-item', 'group', {
    separate: data.separate,
  });

  const classTitle = mk('btn-title', 'group-hover:text-primary-1 group-hover:font-semibold', {});

  return (
    <Button leftIcon={data.icon} onClick={onClick} wrapper={classWrapper} title={classTitle}>
      {data.title}
    </Button>
  );
}
