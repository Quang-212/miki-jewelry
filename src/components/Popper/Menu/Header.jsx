import classNames from 'classnames/bind';
import Button from 'src/components/Button';
import { KeyboardArrowIcon } from 'src/components/Icons';
import styles from './Menu.module.css';

const mk = classNames.bind(styles);

export default function Header({ title, onBack }) {
  return (
    <header className={mk('header')}>
      <Button className={mk('back-btn')} title="flex justify-center" onClick={onBack}>
        <KeyboardArrowIcon className={mk('icon')} />
      </Button>
      <h4 className={mk('header-title')}>{title}</h4>
    </header>
  );
}
